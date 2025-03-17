import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

export function Progress({ className, value, max = 100, variant = 'default', ...props }: ProgressProps) {
  const percentage = (value / max) * 100;

  const variants = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600'
  };

  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-gray-200',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full transition-all duration-300',
          variants[variant]
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
} 