import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'error' | 'info' | 'warning';
}

export function Alert({ className, variant = 'info', ...props }: AlertProps) {
  const variants = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle
  };

  const Icon = icons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center p-4 rounded-md border',
        variants[variant],
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5 mr-3" />
      <div className="flex-1">{props.children}</div>
    </div>
  );
} 