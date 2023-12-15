// Importe as dependências necessárias
import 'tailwindcss/tailwind.css';
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchProducts } from '@/app/utils/api';
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles';
import { AuthContext } from '@/app/contexts/AuthContext';

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const { userInfo } = useContext(AuthContext);
  
  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    loadProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const [orderPrice, setOrderPrice] = useState(''); // Estado para armazenar a ordenação
  const [categoryId, setCategoryId] = useState(''); // Estado para armazenar o ID da categoria

  const handleOrderChange = (event) => {
    setOrderPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadProducts(currentPage, pageSize, orderPrice, categoryId);
  };

  const loadProducts = async (page, pageSize, orderPrice, categoryId) => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
      setCurrentPage(productsData.currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts(currentPage, pageSize, orderPrice, categoryId);
  }, [currentPage, pageSize, orderPrice, categoryId]);

  return (
    <main className="min-h-screen">
     <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
            
      <form onSubmit={handleSubmit} className="flex justify-center mt-4">
        <select value={orderPrice} onChange={handleOrderChange} className="mr-2">
          <option value="">Ordenar por</option>
          <option value="asc">Preço mais baixo</option>
          <option value="desc">Preço mais alto</option>
        </select>
        <input
          type="text"
          placeholder="ID da Categoria"
          value={categoryId}
          onChange={handleCategoryChange}
          className="mr-2"
        />

        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Filtrar
        </button>
      </form>

   
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductContainer>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <p>{product.category} </p>
              <CardButton onClick={() => addToCart(product)}>Add cart</CardButton>
            </ProductContainer>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
    </main>
  );
};

export default ProductsPage;
