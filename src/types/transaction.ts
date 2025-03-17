export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  created_at: string;
  user_id: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface TransactionFormData {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  category_id: string | null;
}

export interface CategoryFormData {
  name: string;
  type: TransactionType;
} 