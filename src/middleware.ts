import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware executado para:', request.nextUrl.pathname);
  
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('Sessão no middleware:', session ? 'Autenticado' : 'Não autenticado');

  // Se o usuário estiver tentando acessar uma rota protegida sem estar autenticado
  if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
    console.log('Redirecionando para /login - Usuário não autenticado');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se o usuário estiver tentando acessar a página de login já estando autenticado
  if (request.nextUrl.pathname === '/login' && session) {
    console.log('Redirecionando para /dashboard - Usuário já autenticado');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return res;
}

// Configuração para quais rotas o middleware deve ser executado
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}; 