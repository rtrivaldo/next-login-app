import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Missing email or password' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
  }

  const token = Buffer.from(user.id.toString()).toString('base64');

  const response = NextResponse.json(
    { message: 'Login successful' },
    { status: 200 }
  );
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
