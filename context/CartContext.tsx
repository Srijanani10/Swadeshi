// context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";

export type ProductType = {
  id: string; // unique ID
  name: string; // product name
  title?: string; // optional, can use for display
  description?: string; // product description
  category?: string;
  price: number | string; // price can be number or string
  image: string; // product image URL
};

type CartItemsType = {
  [key: string]: {
    product: ProductType;
    quantity: number;
  };
};

type CartContextType = {
  cartItems: CartItemsType;
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemsType>({});

  const addToCart = (product: ProductType) => {
    setCartItems(prev => ({
      ...prev,
      [product.id]: prev[product.id]
        ? { ...prev[product.id], quantity: prev[product.id].quantity + 1 }
        : { product, quantity: 1 },
    }));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (updated[productId]) {
        if (updated[productId].quantity > 1) {
          updated[productId].quantity -= 1;
        } else {
          delete updated[productId];
        }
      }
      return updated;
    });
  };

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
