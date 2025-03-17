import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

export function Tabs({ className, tabs, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={cn(
                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">{tabs[activeTab].content}</div>
    </div>
  );
} 