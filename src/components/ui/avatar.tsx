import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ className, src, alt, size = 'md', ...props }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <User className="h-1/2 w-1/2 text-gray-500" />
        </div>
      )}
    </div>
  );
} 