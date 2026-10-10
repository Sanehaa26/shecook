"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Seller, Dish, Order, Review } from "@/types";
import {
  DEMO_SELLERS,
  DEMO_DISHES,
  DEMO_ORDERS,
  DEMO_REVIEWS,
} from "@/data/mockData";

interface SheCookContextType {
  sellers: Seller[];
  dishes: Dish[];
  orders: Order[];
  reviews: Review[];
  currentSellerId: string;
  setCurrentSellerId: (id: string) => void;
  currentSeller: Seller | undefined;
  currentSellerDishes: Dish[];
  toggleSellerAvailability: (sellerId: string) => void;
  toggleDishAvailability: (dishId: string) => void;
  getSellerById: (sellerId: string) => Seller | undefined;
  getDishesBySeller: (sellerId: string) => Dish[];
  resetDemoData: () => void;
}

const STORAGE_KEY_SELLERS = "shecook_demo_sellers_v1";
const STORAGE_KEY_DISHES = "shecook_demo_dishes_v2";
const STORAGE_KEY_CURRENT_SELLER = "shecook_current_seller_v1";

const SheCookContext = createContext<SheCookContextType | undefined>(undefined);

export function SheCookProvider({ children }: { children: React.ReactNode }) {
  const [sellers, setSellers] = useState<Seller[]>(DEMO_SELLERS);
  const [dishes, setDishes] = useState<Dish[]>(DEMO_DISHES);
  const [orders] = useState<Order[]>(DEMO_ORDERS);
  const [reviews] = useState<Review[]>(DEMO_REVIEWS);
  const [currentSellerId, setCurrentSellerIdState] = useState<string>("seller-1");
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from localStorage once mounted on client
  useEffect(() => {
    try {
      const storedSellers = localStorage.getItem(STORAGE_KEY_SELLERS);
      const storedDishes = localStorage.getItem(STORAGE_KEY_DISHES);
      const storedSellerId = localStorage.getItem(STORAGE_KEY_CURRENT_SELLER);

      if (storedSellers) {
        setSellers(JSON.parse(storedSellers));
      }
      if (storedDishes) {
        const parsed = JSON.parse(storedDishes);
        // Ensure that new dishes (e.g. Seller 3 added dishes) are preserved
        if (Array.isArray(parsed) && parsed.length >= DEMO_DISHES.length) {
          setDishes(parsed);
        } else {
          setDishes(DEMO_DISHES);
        }
      }
      if (storedSellerId) {
        setCurrentSellerIdState(storedSellerId);
      }
    } catch {
      // Fallback gracefully to memory state if storage is restricted
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setCurrentSellerId = (id: string) => {
    setCurrentSellerIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_SELLER, id);
    } catch {}
  };

  const toggleSellerAvailability = (sellerId: string) => {
    setSellers((prev) => {
      const updated = prev.map((s) =>
        s.id === sellerId ? { ...s, isAvailable: !s.isAvailable } : s
      );
      try {
        localStorage.setItem(STORAGE_KEY_SELLERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleDishAvailability = (dishId: string) => {
    setDishes((prev) => {
      const updated = prev.map((d) =>
        d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d
      );
      try {
        localStorage.setItem(STORAGE_KEY_DISHES, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const getSellerById = (sellerId: string) => {
    return sellers.find((s) => s.id === sellerId);
  };

  const getDishesBySeller = (sellerId: string) => {
    return dishes.filter((d) => d.sellerId === sellerId);
  };

  const resetDemoData = () => {
    setSellers(DEMO_SELLERS);
    setDishes(DEMO_DISHES);
    setCurrentSellerIdState("seller-1");
    try {
      localStorage.removeItem(STORAGE_KEY_SELLERS);
      localStorage.removeItem(STORAGE_KEY_DISHES);
      localStorage.removeItem(STORAGE_KEY_CURRENT_SELLER);
    } catch {}
  };

  const currentSeller = sellers.find((s) => s.id === currentSellerId) || sellers[0];
  const currentSellerDishes = dishes.filter(
    (d) => d.sellerId === (currentSeller?.id ?? "seller-1")
  );

  return (
    <SheCookContext.Provider
      value={{
        sellers,
        dishes,
        orders,
        reviews,
        currentSellerId,
        setCurrentSellerId,
        currentSeller,
        currentSellerDishes,
        toggleSellerAvailability,
        toggleDishAvailability,
        getSellerById,
        getDishesBySeller,
        resetDemoData,
      }}
    >
      {children}
    </SheCookContext.Provider>
  );
}

export function useSheCook(): SheCookContextType {
  const context = useContext(SheCookContext);
  if (!context) {
    throw new Error("useSheCook must be used within a SheCookProvider");
  }
  return context;
}
