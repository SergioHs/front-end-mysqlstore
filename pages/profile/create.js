import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import axios from 'axios'; // Adicione esta linha para importar o Axios
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import 'tailwindcss/tailwind.css';
import { useRouter } from "next/router";

const CompleteProfile = () => {
  const { register, handleSubmit } = useForm();
  const editorRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: session } = useSession();

  const router = useRouter();

  // const onSubmit = async (data) => {
  //   try {
  //     console.log(data)
  //     const response = await axios.post('http://localhost:3000/users', data);
  //     console.log('Resposta da API (post): ', response.data);
  //     alert('Usuário criado com sucesso! Redirecionando para Login! ')
  //     router.push('/login')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmit = async (data) => {
    try {
        // Crie uma instância de FormData
        let formData = new FormData();

        // Anexe campos ao formulário
        for (let key in data) {
            formData.append(key, data[key]);
        }

        // Anexe a imagem ao formulário
        // Supondo que 'imageFile' seja um objeto File representando a imagem
        formData.append('user_image', data.user_image[0]);

        // Faça a requisição POST
        const response = await axios.post('http://localhost:3000/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Resposta da API (post): ', response.data);
        alert('Usuário criado com sucesso! Redirecionando para Login! ')
        router.push('/login')
    } catch (error) {
        console.error(error);
    }
};
  
    return(
        <main className="min-h-screen">
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
          <h1> Página de Criação de Usuário </h1>
  
        <form enctype="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)} // Adicione isso para lidar com a submissão do formulário
          className="max-w-wd mx-auto p-6 bg-white rounded-lg shadow-x1"
        >
            <div className="mb-4">
                <label htmlFor="user_name" className="block text-gray-700">
                    Nome:
                </label>
                <input {...register('user_name')} id="user_name" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_email" className="block text-gray-700">
                    E-mail:
                </label>
                <input {...register('user_email')} id="user_email" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_username" className="block text-gray-700">
                    Username:
                </label>
                <input {...register('user_username')} id="user_username" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_password" className="block text-gray-700">
                    Password:
                </label>
                <input {...register('user_password')} id="user_password" className="border rounded w-full py-2 px-3" type="password"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_phone" className="block text-gray-700">
                    Telefone:
                </label>
                <input {...register('user_phone')} id="user_phone" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_city" className="block text-gray-700">
                    Cidade:
                </label>
                <input {...register('user_city')} id="user_city" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_street" className="block text-gray-700">
                    Rua:
                </label>
                <input {...register('user_street')} id="user_street" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_number" className="block text-gray-700">
                    Número:
                </label>
                <input {...register('user_number')} id="user_number" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_cep" className="block text-gray-700">
                    CEP:
                </label>
                <input {...register('user_cep')} id="user_cep" className="border rounded w-full py-2 px-3"></input>
            </div>

            <div className="mb-4">
                <label htmlFor="user_image" className="block text-gray-700">
                    Imagem:
                </label>
                <input type="file" {...register('user_image')} id="user_image" className="border rounded w-full py-2 px-3"></input>
            </div>
            <div className="flex justify">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
        </div>
      </form>
    </main>
  );
};

export default CompleteProfile;
