'use client';

import { useEffect, useState } from 'react';
import { transactionService } from '@/services/transactionService';
import { Card } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from 'lucide-react';

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

export function Summary() {
  const [summary, setSummary] = useState<Summary>({
    income: 0,
    expense: 0,
    balance: 0
  });

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await transactionService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <ArrowUpIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entradas</p>
            <p className="text-2xl font-bold text-primary">
              R$ {summary.income.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-destructive/10 rounded-full">
            <ArrowDownIcon className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saídas</p>
            <p className="text-2xl font-bold text-destructive">
              R$ {summary.expense.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-foreground/10 rounded-full">
            <WalletIcon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Saldo</p>
            <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-primary' : 'text-destructive'}`}>
              R$ {summary.balance.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 