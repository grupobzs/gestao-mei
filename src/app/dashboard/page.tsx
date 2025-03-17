'use client';

import Header from "@/components/Header";
import { Summary } from "@/components/dashboard/Summary";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Button } from "@/components/ui/button";
import { BarChart3Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto py-8 space-y-8 p-4 md:p-0 md:py-8">
        <Summary />
        <TransactionList />
      </div>
    </main>
  );
}