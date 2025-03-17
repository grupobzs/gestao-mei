import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
}

export function Accordion({ className, items, ...props }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 bg-white"
        >
          <button
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.title}
            <ChevronDown
              className={cn(
                'h-5 w-5 transform transition-transform duration-200',
                openIndex === index ? 'rotate-180' : ''
              )}
            />
          </button>
          {openIndex === index && (
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="text-sm text-gray-500">{item.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 