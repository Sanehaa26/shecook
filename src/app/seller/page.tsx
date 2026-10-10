"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSheCook } from "@/context/SheCookContext";
import { formatRupee, formatRating, formatServing } from "@/lib/formatters";
import {
  ChefHat,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Mic,
  Plus,
  Star,
  ShoppingBag,
  IndianRupee,
  Utensils,
  Clock,
  CheckCircle2,
  Circle,
  Loader2,
  Truck,
  XCircle,
  X,
  Volume2,
  Smartphone,
  Info,
  Shield,
  Users,
  MapPin,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Helper: Order status chip
// ---------------------------------------------------------------------------
function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ReactNode; cls: string }> = {
    Received: {
      icon: <Circle className="w-3.5 h-3.5" />,
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    Preparing: {
      icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
      cls: "bg-amber-50 text-amber-800 border-amber-200",
    },
    "Ready for Pickup": {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      cls: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    "Out for Delivery": {
      icon: <Truck className="w-3.5 h-3.5" />,
      cls: "bg-purple-50 text-purple-800 border-purple-200",
    },
    Delivered: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      cls: "bg-[#EBF3EB] text-[#2C4A2D] border-[#CDE1CE]",
    },
    Cancelled: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      cls: "bg-stone-100 text-stone-600 border-stone-200",
    },
  };
  const cfg = map[status] ?? map["Received"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.cls}`}
    >
      {cfg.icon}
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function SellerPortalPage() {
  const {
    sellers,
    orders,
    currentSellerId,
    setCurrentSellerId,
    currentSeller,
    currentSellerDishes,
    toggleSellerAvailability,
    toggleDishAvailability,
  } = useSheCook();

  // Modal states
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  // Orders relevant to the current demo seller
  const sellerOrders = orders.filter((o) => o.sellerId === currentSellerId);

  // Demo earnings for current seller (static per seller)
  const demoEarnings: Record<string, string> = {
    "seller-1": "₹41,200",
    "seller-2": "₹37,800",
    "seller-3": "₹28,450",
  };
  const monthlyEarning = demoEarnings[currentSellerId] ?? "₹38,500";

  if (!currentSeller) return null;

  const isOpen = currentSeller.isAvailable;

  return (
    <div className="py-6 sm:py-10">
      <Container>
        {/* ================================================================
            NAVIGATION HEADER
            ================================================================ */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#C85A32] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2">
            {/* Switch demo seller */}
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
              Demo Chef:
            </span>
            <select
              value={currentSellerId}
              onChange={(e) => setCurrentSellerId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#ECE5DC] bg-white text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
              aria-label="Switch demo chef"
            >
              {sellers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <Link
              href="/customer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#C85A32] hover:underline font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Test Customer View
            </Link>
          </div>
        </div>

        {/* ================================================================
            1. WELCOMING GREETING
            ================================================================ */}
        <div className="bg-gradient-to-r from-[#FBEBE5] to-[#FAF7F2] rounded-3xl border border-[#ECE5DC] p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Chef Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSeller.avatar}
                alt={currentSeller.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant="terracotta" size="sm">
                  <ChefHat className="w-3 h-3 mr-1" />
                  Chef Kitchen Studio
                </Badge>
                <Badge variant="outline" size="sm">
                  Demo Dashboard
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                🙏 Namaste, Chef {currentSeller.name.split(" ")[0]}!
              </h1>
              <p className="text-sm text-stone-600 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                <span>{currentSeller.kitchenName}</span>
                <span className="text-stone-400">•</span>
                <span>{currentSeller.location}</span>
              </p>
            </div>
          </div>

          {/* Kitchen speciality */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[#ECE5DC] p-4 max-w-xs text-xs text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              Your Specialty
            </div>
            <p className="leading-relaxed">{currentSeller.specialty}</p>
            <p className="text-[11px] text-stone-500 pt-1">
              {currentSeller.operatingHours}
            </p>
          </div>
        </div>

        {/* ================================================================
            2. LARGE AVAILABILITY TOGGLE — critical shared-state toggle
            ================================================================ */}
        <div className="mb-8">
          <div
            className={`rounded-3xl border-2 p-6 sm:p-8 transition-all duration-300 ${
              isOpen
                ? "bg-[#EBF3EB] border-[#547B55]"
                : "bg-stone-50 border-stone-300"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Status description */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isOpen ? "bg-emerald-500 animate-pulse" : "bg-stone-400"
                    }`}
                  />
                  <span
                    className={`text-2xl sm:text-3xl font-extrabold ${
                      isOpen ? "text-[#2C4A2D]" : "text-stone-700"
                    }`}
                  >
                    {isOpen ? "Kitchen is OPEN 🟢" : "Kitchen is CLOSED 🔴"}
                  </span>
                </div>
                <p
                  className={`text-sm pl-7 ${
                    isOpen ? "text-[#426343]" : "text-stone-500"
                  }`}
                >
                  {isOpen
                    ? "Customers can see your menu and place orders right now."
                    : "Your kitchen is not visible for orders. Toggle to open when ready."}
                </p>
                <p className="text-xs text-stone-500 pl-7 mt-1 italic">
                  ⚡ This change updates the Customer Marketplace in real-time.
                </p>
              </div>

              {/* Big toggle button */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleSellerAvailability(currentSeller.id)}
                  className={`relative inline-flex h-12 w-24 items-center rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-4 cursor-pointer ${
                    isOpen
                      ? "bg-[#547B55] focus:ring-[#547B55]/30"
                      : "bg-stone-300 focus:ring-stone-400/30"
                  }`}
                  aria-label={
                    isOpen
                      ? "Click to close kitchen"
                      : "Click to open kitchen"
                  }
                  aria-pressed={isOpen}
                >
                  <span
                    className={`inline-block h-9 w-9 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                      isOpen ? "translate-x-14" : "translate-x-1.5"
                    }`}
                  />
                </button>

                <span
                  className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full ${
                    isOpen
                      ? "bg-[#547B55] text-white"
                      : "bg-stone-400 text-white"
                  }`}
                >
                  {isOpen ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Verify link */}
            <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-stone-500">
                Shared state: changes are visible instantly across all portal views.
              </span>
              <Link
                href="/customer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C85A32] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Verify on Customer Page
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================================
            3. SUMMARY CARDS
            ================================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Card className="text-center p-5">
            <div className="w-12 h-12 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900">
              {currentSellerDishes.length}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Total Dishes
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {currentSellerDishes.filter((d) => d.isAvailable).length} available today
            </div>
          </Card>

          <Card className="text-center p-5">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3EB] text-[#2C4A2D] flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900">
              {sellerOrders.length}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Demo Orders Today
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {sellerOrders.filter((o) => o.status === "Preparing").length} being prepared
            </div>
          </Card>

          <Card className="text-center p-5">
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mx-auto mb-3">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div className="text-2xl font-extrabold text-stone-900">
              {monthlyEarning}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Demo Monthly Earnings
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              Simulated data only
            </div>
          </Card>

          <Card className="text-center p-5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div className="text-3xl font-extrabold text-stone-900">
              {currentSeller.rating.toFixed(1)}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Customer Rating
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">
              {currentSeller.reviewCount} demo reviews
            </div>
          </Card>
        </div>

        {/* ================================================================
            4. MENU SECTION — dish cards with image, name, price, serving,
            rating, availability toggle
            ================================================================ */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                Today&apos;s Menu
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {currentSellerDishes.length} dishes · tap a toggle to mark sold out or available
              </p>
            </div>

            {/* 5. ADD NEW DISH BUTTON */}
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowAddDishModal(true)}
              className="shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Dish
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentSellerDishes.map((dish) => {
              const dishAvailable = dish.isAvailable && isOpen;

              return (
                <div
                  key={dish.id}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-xs transition-all duration-200 ${
                    !dishAvailable
                      ? "border-stone-200 opacity-80"
                      : "border-[#ECE5DC] hover:border-[#C85A32]/40 hover:shadow-md"
                  }`}
                >
                  {/* Dish image */}
                  <div className="relative h-40 bg-stone-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
                        !dishAvailable ? "grayscale-[30%]" : ""
                      }`}
                      loading="lazy"
                    />
                    {/* Dietary badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        variant={dish.dietaryType === "Veg" ? "veg" : "nonveg"}
                        size="sm"
                        dot
                        className="bg-white/95 shadow-xs"
                      >
                        {dish.dietaryType}
                      </Badge>
                    </div>
                    {/* Availability chip */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          dish.isAvailable
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-stone-100 text-stone-500 border-stone-200"
                        }`}
                      >
                        {dish.isAvailable ? "Available" : "Sold Out"}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-stone-900/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                      Demo Photo
                    </div>
                  </div>

                  {/* Dish info */}
                  <div className="p-4 space-y-2.5">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                        {dish.category}
                      </p>
                    </div>

                    {/* Price, serving, rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#C85A32] text-base">
                        {formatRupee(dish.price)}
                      </span>
                      <span className="text-stone-500">
                        {formatServing(dish.servingSize)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                        {dish.rating.toFixed(1)}
                        <span className="text-[11px] text-stone-400 font-normal">
                          ({dish.reviewCount})
                        </span>
                      </span>
                    </div>

                    {/* Individual dish toggle */}
                    <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">
                        {dish.isAvailable ? "Mark as sold out?" : "Make available?"}
                      </span>
                      <Button
                        variant={dish.isAvailable ? "outline" : "primary"}
                        size="sm"
                        onClick={() => toggleDishAvailability(dish.id)}
                        className="text-xs"
                      >
                        {dish.isAvailable ? "Mark Sold Out" : "Mark Available"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            6. RECENT ORDERS SECTION
            ================================================================ */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-xl font-bold text-stone-900">Recent Orders</h2>
            <Badge variant="neutral" size="sm">
              Demo Data
            </Badge>
          </div>

          {sellerOrders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#ECE5DC] p-8 text-center text-stone-500 text-sm space-y-2">
              <ShoppingBag className="w-8 h-8 mx-auto text-stone-300" />
              <p>No demo orders for this kitchen yet.</p>
              <p className="text-xs text-stone-400">
                Switch to Sunita or Fatima's kitchen to see sample orders.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sellerOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-[#ECE5DC] p-5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900 text-sm">
                          Order #{order.id}
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {order.orderTime}
                        </div>
                      </div>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  {/* Items list */}
                  <div className="bg-[#FAF7F2] rounded-xl p-3 space-y-1.5 text-xs mb-3">
                    {order.items.map((item) => (
                      <div
                        key={item.dishId}
                        className="flex items-center justify-between"
                      >
                        <span className="text-stone-700">
                          {item.quantity}× {item.dishName}
                        </span>
                        <span className="font-semibold text-stone-800">
                          {formatRupee(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-1.5 border-t border-[#ECE5DC] flex justify-between font-bold text-stone-900">
                      <span>Total</span>
                      <span>{formatRupee(order.totalAmount)}</span>
                    </div>
                  </div>

                  {/* Special instructions */}
                  {order.specialInstructions && (
                    <div className="text-xs text-stone-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 italic">
                      💬 &ldquo;{order.specialInstructions}&rdquo;
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================================================================
            7. VOICE ASSISTANT BUTTON — prominent microphone CTA
            ================================================================ */}
        <div className="bg-gradient-to-br from-stone-900 via-[#2E2825] to-[#1F1A18] rounded-3xl p-7 sm:p-10 text-white border border-stone-800 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-stone-200 border border-white/15 text-xs font-semibold">
                <Mic className="w-3.5 h-3.5 text-[#F6D4C7]" />
                Innovation Preview · Coming Soon
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Your Hands-Free Voice Assistant 🎙️
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed max-w-lg">
                Manage your dishes, toggle availability, and hear new orders —
                all by speaking naturally in Hindi or English. No typing
                required while you cook!
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowVoiceModal(true)}
              className="flex items-center gap-3 bg-[#C85A32] hover:bg-[#B04B25] text-white px-6 py-4 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer shrink-0 group font-semibold"
              aria-label="Open voice assistant information"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="font-bold text-base">Start Voice Mode</div>
                <div className="text-xs text-white/70">Tap to learn more</div>
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* ==================================================================
          VOICE ASSISTANT DEMO MODAL
          ================================================================== */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-[#ECE5DC] shadow-2xl animate-scale-in overflow-hidden">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-stone-900 to-[#2E2825] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C85A32] flex items-center justify-center">
                    <Mic className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">SheCook Voice Assistant</h3>
                    <p className="text-xs text-stone-300">Concept Preview · Stage 2</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVoiceModal(false)}
                  className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  aria-label="Close voice modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Demo Notice:</strong> This voice assistant is a design
                  concept for Stage 2. No speech recognition or microphone
                  access is active in this prototype.
                </span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">
                The SheCook Voice Assistant is designed to let busy home chefs manage their
                kitchen entirely <strong>hands-free</strong> — even while cooking, without
                touching their phone.
              </p>

              {/* Planned capabilities grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Utensils className="w-4 h-4 text-[#C85A32]" />,
                    title: "Add / Update Dishes",
                    desc: "\"Aaj 5 plate Rajma Chawal add kar do ₹150 mein\"",
                  },
                  {
                    icon: <ShoppingBag className="w-4 h-4 text-[#547B55]" />,
                    title: "Hear New Orders",
                    desc: "\"Ek nayi order aayi hai — 2 plate Chole Bhature\"",
                  },
                  {
                    icon: <Volume2 className="w-4 h-4 text-stone-600" />,
                    title: "Toggle Availability",
                    desc: "\"Kitchen band karo\" or \"Kitchen kholo\"",
                  },
                  {
                    icon: <Smartphone className="w-4 h-4 text-purple-600" />,
                    title: "Vernacular Languages",
                    desc: "Speak in Hindi, English, and regional languages",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#FAF7F2] border border-[#ECE5DC] rounded-xl p-3 space-y-1"
                  >
                    <div className="flex items-center gap-2 font-semibold text-stone-900 text-xs">
                      {item.icon}
                      {item.title}
                    </div>
                    <p className="text-[11px] text-stone-500 italic leading-relaxed">
                      e.g. {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                fullWidth
                onClick={() => setShowVoiceModal(false)}
              >
                Got it! Coming in Stage 2
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================
          ADD NEW DISH MODAL — Stage 2 placeholder
          ================================================================== */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-[#ECE5DC] shadow-2xl animate-scale-in">
            {/* Modal header */}
            <div className="p-6 border-b border-[#ECE5DC]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">
                      Add New Dish
                    </h3>
                    <p className="text-xs text-stone-500">Stage 2 Feature</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                  aria-label="Close add dish modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              <div className="bg-[#FBEBE5] border border-[#F6D4C7] rounded-2xl p-4 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#C85A32]/15 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-[#C85A32]" />
                </div>
                <h4 className="font-bold text-[#923A1A] text-base">
                  Coming in Stage 2 🚀
                </h4>
                <p className="text-xs text-[#923A1A]/80 leading-relaxed">
                  The full dish creation form — with photo upload, price setting,
                  portion management, and instant menu publishing — will be
                  available in the next development sprint.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-stone-700">
                <p className="font-semibold text-stone-800">Stage 2 will include:</p>
                {[
                  "Upload your own dish photograph",
                  "Set price, serving size, and prep time",
                  "Tag dishes as Veg or Non-Veg",
                  "Set daily portion limits",
                  "Publish or schedule dishes",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#547B55] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#EBF3EB] border border-[#CDE1CE] rounded-xl p-3 text-xs text-[#2C4A2D] flex items-start gap-2">
                <Shield className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  All dish data is saved securely. No customer personal information
                  is stored. Only menu content and availability is persisted.
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  onClick={() => setShowAddDishModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  size="sm"
                  onClick={() => setShowAddDishModal(false)}
                >
                  Understood, Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
