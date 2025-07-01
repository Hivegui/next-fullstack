import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    await connect();

    // Verifica se o e-mail já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Usuário já existe", { status: 400 });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return new NextResponse("Usuário criado com sucesso", { status: 201 });
  } catch (err) {
    console.error("Erro ao registrar:", err);
    return new NextResponse("Erro no servidor", { status: 500 });
  }
};
