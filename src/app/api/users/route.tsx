import { NextRequest, NextResponse } from "next/server";
import userSchema, { UserType } from "@/schema/user";
import prisma from "../../../../prisma";

export async function GET(req: NextRequest) {
  const allUsers = await prisma.user.findMany();
  return NextResponse.json(allUsers);
}

export async function POST(req: NextRequest) {
  const body: UserType = await req.json();
  const validate = userSchema.safeParse(body);

  if (!validate.success) return NextResponse.json(validate.error.errors, { status: 404 });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(newUser);
}
