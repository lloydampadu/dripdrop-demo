"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string; color: string; size: string }
  | { type: "UPDATE_QTY"; id: string; color: string; size: string; quantity: number }
  | { type: "CLEAR" };

function cartKey(id: string, color: string, size: string) {
  return `${id}__${color}__${size}`;
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const key = cartKey(action.item.id, action.item.color, action.item.size);
      const exists = state.items.find(
        (i) => cartKey(i.id, i.color, i.size) === key
      );
      if (exists) {
        return {
          items: state.items.map((i) =>
            cartKey(i.id, i.color, i.size) === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (i) => cartKey(i.id, i.color, i.size) !== cartKey(action.id, action.color, action.size)
        ),
      };
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          cartKey(i.id, i.color, i.size) === cartKey(action.id, action.color, action.size)
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  remove: (id: string, color: string, size: string) => void;
  updateQty: (id: string, color: string, size: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] }, () => {
    if (typeof window === "undefined") return { items: [] };
    try {
      const saved = localStorage.getItem("chrisera_cart");
      return saved ? JSON.parse(saved) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem("chrisera_cart", JSON.stringify(state));
  }, [state]);

  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        count,
        subtotal,
        add: (item) => dispatch({ type: "ADD", item }),
        remove: (id, color, size) => dispatch({ type: "REMOVE", id, color, size }),
        updateQty: (id, color, size, quantity) =>
          dispatch({ type: "UPDATE_QTY", id, color, size, quantity }),
        clear: () => dispatch({ type: "CLEAR" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
