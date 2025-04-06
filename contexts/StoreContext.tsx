"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem, Product } from "../types/store";
import { toast } from "../components/ui/use-toast";

interface StoreContextProps {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        toast({
          title: "Product updated",
          description: `${product.name} quantity updated in your cart`,
        });

        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Product added",
          description: `${product.name} added to your cart`,
        });

        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(
        (item) => item.product.id === productId
      );

      if (itemToRemove) {
        toast({
          title: "Product removed",
          description: `${itemToRemove.product.name} removed from your cart`,
        });
      }

      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        isLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
