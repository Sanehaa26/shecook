export type DishCategory =
  | "Breakfast"
  | "Main Course"
  | "Snacks & Starters"
  | "Breads & Rice"
  | "Desserts"
  | "Regional Specials";

export type DietaryType = "Veg" | "Non-Veg";

export interface Dish {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  servingSize: string; // e.g. "Serves 1-2"
  category: DishCategory;
  dietaryType: DietaryType;
  image: string; // High-quality illustrative food photo URL
  rating: number; // e.g. 4.8
  reviewCount: number; // e.g. 34
  isAvailable: boolean; // Item level availability
  prepTime?: string; // e.g. "30-40 mins"
  tags?: string[]; // e.g. ["Signature", "Slow-cooked"]
}

export interface Seller {
  id: string;
  name: string;
  kitchenName: string;
  story: string;
  specialty: string;
  location: string;
  distance: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean; // Kitchen active/accepting orders
  fssaiNumber?: string;
  hygieneRating?: string;
  joinedYear?: number;
  operatingHours?: string;
}

export type OrderStatus =
  | "Received"
  | "Preparing"
  | "Ready for Pickup"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  sellerId: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderTime: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface Review {
  id: string;
  sellerId: string;
  dishId?: string;
  dishName?: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}
