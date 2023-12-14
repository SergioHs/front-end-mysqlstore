'use client'
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState} from 'react';
import 'tailwindcss/tailwind.css'
import { useForm } from 'react-hook-form';
import { authUser } from '@/app/utils/api'
import Link from 'next/link';
import { AuthContext, AuthProvider, useAuth } from '@/app/contexts/AuthContext';

const LoginPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const { register, handleSubmit } = useForm();

  const authContext = useAuth();
  const { login } = authContext;

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  const onSubmit = async (data) => {
    console.log(data)
    const userData = await authUser(data);

    console.log(userData)

    if (userData) {
      alert('Logado');
      login(userData)
      router.push(`/products`);
    }
  };


  if (session) {
    return (
      <main className="min-h-screen">
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        
            <h2>
              {" "}
              Logado como: {session.user.name}, e-mail: {session.user.email} <br />
            </h2>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => router.push("/profile/complete-profile")}
              >
                Complete your profile
              </button>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
      </main>
    );
  }
  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="user" className="block text-sm font-medium text-gray-600">Usuário</label>
              <input {...register('user_username')} className="w-full border rounded py-2 px-3" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Senha</label>
              <input {...register('user_password')} type="password" class="w-full border rounded py-2 px-3" />
            </div>

            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Login</button>
          
            <div className="mb-4">
              Não tem uma conta? <Link href='/profile/create'>Cadastre-se!</Link>
            </div>
          </form>
        </div>
      </div>
      {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
              onClick={() => signIn()}>
        Login with Google
      </button> */}
    </main>
  );
}
export default LoginPage;