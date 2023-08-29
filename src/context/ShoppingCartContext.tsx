import { createContext, ReactNode, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type CartItem = {
  productNum: number;
  quantity: number;
};
type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (productNum: number) => number;
  increaseCartQuantity: (productNum: number) => void;
  decreaseCartQuantity: (productNum: number) => void;
  removeFromCart: (productNum: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const getItemQuantity = (productNum: number) => {
    return cartItems.find(item => item.productNum === productNum)?.quantity || 0;
  };
  function increaseCartQuantity(productNum: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.productNum === productNum) == null) {
        return [...currItems, { productNum, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.productNum === productNum) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(productNum: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.productNum === productNum)?.quantity === 1) {
        return currItems.filter(item => item.productNum !== productNum);
      } else {
        return currItems.map(item => {
          if (item.productNum === productNum) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.productNum !== id);
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
