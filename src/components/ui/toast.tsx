import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({
  className,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  ...props
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center rounded-lg border p-4 shadow-lg transition-all duration-300',
        variants[type],
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className
      )}
      {...props}
    >
      <Icon className="mr-3 h-5 w-5" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-4 rounded-full p-1 hover:bg-current hover:bg-opacity-10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
} 