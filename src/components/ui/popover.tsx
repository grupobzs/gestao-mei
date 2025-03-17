import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Popover({ className, trigger, content, position = 'bottom', ...props }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 translate-y-2',
    left: 'right-full top-1/2 -translate-y-1/2 -translate-x-2',
    right: 'left-full top-1/2 -translate-y-1/2 translate-x-2'
  };

  return (
    <div className="relative inline-block" {...props}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'absolute z-50',
            positions[position],
            className
          )}
        >
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            {content}
          </div>
        </div>
      )}
    </div>
  );
} 