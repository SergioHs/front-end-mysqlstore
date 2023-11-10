// Importe as dependências necessárias
import 'tailwindcss/tailwind.css';
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { fetchProductsPaginated } from '@/app/utils/api';
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles';

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleMenuToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { data: session } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const loadProducts = async (page, pageSize) => {
    try {
      const productsData = await fetchProductsPaginated(page, pageSize);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductContainer>
              <p>{product.product_title}</p>
              <p>{product.product_price}</p>
              <p>{product.product_description}</p>
              <p>{product.product_category} </p>
              <CardButton onClick={() => addToCart(product)}>Add cart</CardButton>
            </ProductContainer>
          </li>
        ))}
      </ul>

      {/* Adicione a navegação de páginação */}
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
