'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';

export default function Header() {
    const { signOut } = useAuth();

    return (
        <div className='p-4 border-b'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-gray-900'>Gestão MEI</h1>
                <Button className='cursor-pointer' onClick={signOut}>
                    Sair
                </Button>
            </div>
        </div>
    );
}
