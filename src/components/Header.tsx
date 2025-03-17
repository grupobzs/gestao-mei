'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { CircleHelp , LogOut } from 'lucide-react';

export default function Header() {
    const { signOut } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <div className="p-4 border-b space-y-2 bg-accent">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className='flex items-center gap-2'>
                        <img src="/icon.svg" alt="Logo do Gestão MEI" className='w-10 h-10' />
                        <p className="text-xl font-bold">Gestão MEI</p>
                    </span>
                    
                    <div className='flex items-center gap-2'>
                        <Button className="cursor-pointer" variant={'link'}>
                            <CircleHelp className='hidden md:block' />
                            Suporte
                        </Button>

                        <Button className="cursor-pointer" variant={'link'} onClick={signOut}>
                            <LogOut className='hidden md:block' />
                            Sair
                        </Button>
                    </div>
                </div>
            </div>

            <div className='p-4 border-b space-y-2'>
                <div className='max-w-7xl mx-auto'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(
                                        "transition-colors hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2",
                                        isActive("/dashboard") && "bg-accent text-accent-foreground font-medium"
                                    )}>
                                        Fluxo de caixa
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/metricas" legacyBehavior passHref>
                                    <NavigationMenuLink className={cn(
                                        "transition-colors hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2",
                                        isActive("/metricas") && "bg-accent text-accent-foreground font-medium"
                                    )}>
                                        Métricas
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </>
    );
}
