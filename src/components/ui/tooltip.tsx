import { cn } from '@/lib/utils';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ className, content, children, position = 'top', ...props }: TooltipProps) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2'
  };

  return (
    <div className="group relative inline-block" {...props}>
      {children}
      <div className={cn('absolute z-50', positions[position])}>
        <div className="relative">
          <div
            className={cn(
              'absolute h-2 w-2 rotate-45 bg-gray-900',
              position === 'top' && 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
              position === 'bottom' && 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
              position === 'left' && 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
              position === 'right' && 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
            )}
          />
          <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
} 