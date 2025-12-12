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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }
}
