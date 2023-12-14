import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/app/contexts/CartContext";
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { AuthProvider } from "@/app/contexts/AuthContext";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SessionProvider session={session}>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </SessionProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default App;