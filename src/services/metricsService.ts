import { supabase } from '@/lib/supabase';
import { Transaction } from '@/types/transaction';

interface MetricsData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionsByCategory: {
    category: string;
    amount: number;
    type: 'income' | 'expense';
  }[];
  transactionsByMonth: {
    month: string;
    income: number;
    expense: number;
  }[];
}

export const metricsService = {
  async getMetrics(startDate?: string, endDate?: string): Promise<MetricsData> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Usuário não autenticado');

    let query = supabase
      .from('transactions')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('user_id', user.id);

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data: transactions, error } = await query;
    if (error) throw error;

    const transactionsList = transactions as (Transaction & { category: { name: string } })[];

    // Calcula totais
    const totalIncome = transactionsList
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactionsList
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Agrupa por categoria
    const transactionsByCategory = transactionsList.reduce((acc, t) => {
      const categoryName = t.category?.name || 'Sem categoria';
      const existingCategory = acc.find(c => c.category === categoryName && c.type === t.type);
      
      if (existingCategory) {
        existingCategory.amount += t.amount;
      } else {
        acc.push({
          category: categoryName,
          amount: t.amount,
          type: t.type
        });
      }
      
      return acc;
    }, [] as { category: string; amount: number; type: 'income' | 'expense' }[]);

    // Agrupa por mês
    const transactionsByMonth = transactionsList.reduce((acc, t) => {
      const month = t.date.substring(0, 7); // Formato: YYYY-MM
      const existingMonth = acc.find(m => m.month === month);
      
      if (existingMonth) {
        if (t.type === 'income') {
          existingMonth.income += t.amount;
        } else {
          existingMonth.expense += t.amount;
        }
      } else {
        acc.push({
          month,
          income: t.type === 'income' ? t.amount : 0,
          expense: t.type === 'expense' ? t.amount : 0
        });
      }
      
      return acc;
    }, [] as { month: string; income: number; expense: number }[]);

    // Ordena por mês
    transactionsByMonth.sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionsByCategory,
      transactionsByMonth
    };
  }
}; 