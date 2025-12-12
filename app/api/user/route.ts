import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

    let userId;
    try {
      userId = Buffer.from(token, 'base64').toString('utf8');
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'User fetched successfully', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
