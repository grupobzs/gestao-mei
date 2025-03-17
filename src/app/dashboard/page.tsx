'use client';

import Header from "@/components/Header";
import { Summary } from "@/components/dashboard/Summary";
import { TransactionList } from "@/components/dashboard/TransactionList";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 space-y-8">
        <Summary />
        <TransactionList />
      </div>
    </main>
  );
}