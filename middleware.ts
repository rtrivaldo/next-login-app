import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === '/' && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
