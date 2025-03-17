import { cn } from '@/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className, ...props }: FormProps) {
  return (
    <form
      className={cn(
        'space-y-4',
        className
      )}
      {...props}
    />
  );
}

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormGroup({ className, ...props }: FormGroupProps) {
  return (
    <div
      className={cn(
        'space-y-2',
        className
      )}
      {...props}
    />
  );
}

interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormError({ className, ...props }: FormErrorProps) {
  return (
    <p
      className={cn(
        'text-sm text-red-600',
        className
      )}
      {...props}
    />
  );
} 