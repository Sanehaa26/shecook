"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSheCook } from "@/context/SheCookContext";
import { formatRupee, formatServing } from "@/lib/formatters";
import {
  Search,
  ArrowLeft,
  Store,
  ChefHat,
  Star,
  Users,
  ShoppingBag,
  SlidersHorizontal,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Info,
  Trash2,
} from "lucide-react";
import { DishCategory, DietaryType } from "@/types";

type SortOption =
  | "top-rated"
  | "price-asc"
  | "price-desc"
  | "reviews"
  | "name-asc";

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  sellerName: string;
}

export default function CustomerMarketplacePage() {
  const { sellers, dishes, getSellerById } = useSheCook();

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDietary, setSelectedDietary] = useState<string>("All");
  const [selectedSellerId, setSelectedSellerId] = useState<string>("all");
  const [sortOption, setSortOption] = useState<SortOption>("top-rated");

  // Stage 2 Cart Demo state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [lastAddedDishName, setLastAddedDishName] = useState<string | null>(null);

  // Available categories in the mock dataset
  const categories = [
    "All",
    "Breakfast",
    "Main Course",
    "Snacks",
    "Desserts",
    "Regional Specials",
  ];

  // Active open kitchens count
  const openSellersCount = sellers.filter((s) => s.isAvailable).length;

  // Filtered and sorted dishes calculation
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // 1. Search by dish name (case-insensitive)
        if (
          searchQuery.trim() &&
          !dish.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        ) {
          return false;
        }

        // 2. Category filter
        if (selectedCategory !== "All") {
          if (selectedCategory === "Snacks") {
            if (dish.category !== "Snacks & Starters") return false;
          } else {
            if (dish.category !== selectedCategory) return false;
          }
        }

        // 3. Dietary filter (Veg / Non-Veg)
        if (selectedDietary !== "All") {
          if (dish.dietaryType !== selectedDietary) return false;
        }

        // 4. Seller filter
        if (selectedSellerId !== "all" && dish.sellerId !== selectedSellerId) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 5. Deterministic sorting options
        if (sortOption === "top-rated") {
          // Primary: rating (descending), Secondary: review count (descending), Tertiary: name (A-Z)
          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }
          if (b.reviewCount !== a.reviewCount) {
            return b.reviewCount - a.reviewCount;
          }
          return a.name.localeCompare(b.name);
        }

        if (sortOption === "reviews") {
          // Primary: reviewCount (descending), Secondary: rating (descending)
          if (b.reviewCount !== a.reviewCount) {
            return b.reviewCount - a.reviewCount;
          }
          return b.rating - a.rating;
        }

        if (sortOption === "price-asc") {
          if (a.price !== b.price) {
            return a.price - b.price;
          }
          return a.name.localeCompare(b.name);
        }

        if (sortOption === "price-desc") {
          if (b.price !== a.price) {
            return b.price - a.price;
          }
          return a.name.localeCompare(b.name);
        }

        if (sortOption === "name-asc") {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });
  }, [
    dishes,
    searchQuery,
    selectedCategory,
    selectedDietary,
    selectedSellerId,
    sortOption,
  ]);

  // Handle Add to Cart with critical availability enforcement
  const handleAddToCart = (dishId: string) => {
    const dish = dishes.find((d) => d.id === dishId);
    if (!dish) return;

    const seller = getSellerById(dish.sellerId);
    // CRITICAL AVAILABILITY RULE: Never allow ordering from an unavailable seller
    if (!seller || !seller.isAvailable || !dish.isAvailable) {
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          sellerName: seller.kitchenName,
        },
      ];
    });

    setLastAddedDishName(dish.name);
    setTimeout(() => {
      setLastAddedDishName(null);
    }, 3000);
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dishId !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalCartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="py-6 sm:py-10">
      <Container>
        {/* =========================================================================
            1. PAGE HEADER: SheCook branding & link back home
            ========================================================================= */}
        <div className="mb-8 space-y-4">
          {/* Breadcrumb / Back Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#C85A32] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/seller"
              className="inline-flex items-center gap-1.5 text-xs text-[#C85A32] hover:underline font-medium"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Toggle Seller Open/Close Status in Studio →</span>
            </Link>
          </div>

          {/* Main Title & Branding Section */}
          <div className="bg-white rounded-3xl border border-[#ECE5DC] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="terracotta" size="sm">
                    SheCook Customer Marketplace
                  </Badge>
                  <Badge variant="sage" size="sm" dot>
                    {openSellersCount} of {sellers.length} Kitchens Open
                  </Badge>
                  <span className="text-[11px] font-medium text-stone-500 bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#ECE5DC]">
                    Verified Home Kitchens
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Explore Fresh Home-Cooked Dishes
                </h1>
                <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                  Discover regional recipes handcrafted by neighborhood women chefs.
                  Every meal is freshly cooked in small family batches using pure ingredients.
                </p>
              </div>

              {/* Demo Notice Callout */}
              <div className="bg-[#FAF7F2] border border-[#ECE5DC] rounded-2xl p-3.5 text-xs text-stone-600 max-w-xs shrink-0 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-800">
                  <Info className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Academic Prototype Notice</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  All seller listings, dishes, and review counts are simulated demo data.
                  Food photographs are illustrative royalty-free images.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2 & 3 & 5. SEARCH FIELD, CATEGORY FILTERS & SORTING OPTIONS
            ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#ECE5DC] p-5 mb-8 shadow-xs space-y-4">
          {/* Top Row: Search Input & Sort Selector */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5">
            {/* Search field */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes by name (e.g. Biryani, Chole, Dal, Sandesh...)"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#ECE5DC] bg-[#FAF7F2] text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] transition-all"
                aria-label="Search dishes by name"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter by Chef */}
            <div className="flex items-center gap-2">
              <label htmlFor="chef-select" className="text-xs font-semibold text-stone-500 shrink-0">
                Chef:
              </label>
              <select
                id="chef-select"
                value={selectedSellerId}
                onChange={(e) => setSelectedSellerId(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-[#ECE5DC] bg-[#FAF7F2] text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
              >
                <option value="all">All Kitchens ({sellers.length})</option>
                {sellers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.kitchenName}) {s.isAvailable ? "• Open" : "• Unavailable"}
                  </option>
                ))}
              </select>
            </div>

            {/* Deterministic Sorting Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-stone-500 shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="px-3 py-2.5 rounded-xl border border-[#ECE5DC] bg-[#FAF7F2] text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
              >
                <option value="top-rated">Top Rated (Rating & Reviews)</option>
                <option value="reviews">Most Reviewed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Dish Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Filter Chips & Dietary Filter */}
          <div className="pt-3 border-t border-[#F2ECE3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">
                Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#C85A32] text-white shadow-xs font-semibold"
                        : "bg-[#FAF7F2] text-stone-700 hover:bg-[#F2ECE3] border border-[#ECE5DC]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Dietary Preference Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-semibold text-stone-500 mr-1">
                Dietary:
              </span>
              {(["All", "Veg", "Non-Veg"] as const).map((diet) => {
                const isActive = selectedDietary === diet;
                return (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setSelectedDietary(diet)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-stone-800 text-white font-semibold"
                        : "bg-[#FAF7F2] text-stone-600 hover:bg-[#F2ECE3] border border-[#ECE5DC]"
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <div>
            Showing <strong className="text-stone-900">{filteredDishes.length}</strong>{" "}
            {filteredDishes.length === 1 ? "dish" : "dishes"}
            {selectedCategory !== "All" && (
              <span> in <strong>{selectedCategory}</strong></span>
            )}
            {selectedSellerId !== "all" && (
              <span> from <strong>{sellers.find((s) => s.id === selectedSellerId)?.kitchenName}</strong></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;{searchQuery}&rdquo;</span>
            )}
          </div>

          {(searchQuery ||
            selectedCategory !== "All" ||
            selectedDietary !== "All" ||
            selectedSellerId !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedDietary("All");
                setSelectedSellerId("all");
              }}
              className="text-[#C85A32] hover:underline font-medium cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Notification Toast for Add to Cart */}
        {lastAddedDishName && (
          <div className="mb-6 p-3 rounded-2xl bg-[#EBF3EB] border border-[#CDE1CE] text-[#2C4A2D] text-xs flex items-center justify-between animate-fade-in shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Added <strong>&ldquo;{lastAddedDishName}&rdquo;</strong> to demo cart!
                {" "}(Stage 2 ordering prototype)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCartModal(true)}
              className="font-bold underline cursor-pointer hover:text-[#1F331F]"
            >
              View Cart ({totalCartItemsCount})
            </button>
          </div>
        )}

        {/* =========================================================================
            4. DISH CARDS (with Critical Availability Rules enforced)
            ========================================================================= */}
        {filteredDishes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#ECE5DC] p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              No matching dishes found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search keywords, clearing dietary filters, or selecting &ldquo;All Dishes&rdquo;.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedDietary("All");
                  setSelectedSellerId("all");
                }}
              >
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => {
              const seller = getSellerById(dish.sellerId);
              const isSellerAvailable = seller?.isAvailable ?? false;
              // CRITICAL AVAILABILITY RULE: If seller is unavailable, order is never allowed
              const canOrderDish = isSellerAvailable && dish.isAvailable;

              return (
                <Card
                  key={dish.id}
                  className={`flex flex-col justify-between overflow-hidden transition-all duration-200 border ${
                    !isSellerAvailable
                      ? "border-amber-200/80 bg-stone-50/60"
                      : "hover:border-[#C85A32]/40 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Dish Image Visual Header */}
                    <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSellerAvailable ? "hover:scale-105" : "grayscale-30 opacity-80"
                        }`}
                        loading="lazy"
                      />

                      {/* Top Badges: Veg/Non-Veg & Category */}
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        <Badge
                          variant={dish.dietaryType === "Veg" ? "veg" : "nonveg"}
                          size="sm"
                          dot
                          className="bg-white/95 backdrop-blur-xs shadow-xs font-semibold"
                        >
                          {dish.dietaryType}
                        </Badge>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 border border-stone-200 shadow-xs">
                          {dish.category}
                        </span>
                      </div>

                      {/* Top Right: Seller Availability Status Ribbon */}
                      <div className="absolute top-3 right-3">
                        {isSellerAvailable ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#2C4A2D] border border-emerald-200 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Kitchen Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-900/90 text-amber-300 backdrop-blur-xs shadow-xs border border-amber-400/40">
                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                            Currently Unavailable
                          </span>
                        )}
                      </div>

                      {/* Illustrative stock photo notice */}
                      <div className="absolute bottom-2 right-2 bg-stone-900/75 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded-md font-medium">
                        Illustrative Demo Photo
                      </div>
                    </div>

                    {/* Dish Content Body */}
                    <div className="p-5 space-y-3">
                      {/* Seller Information & Prep Time */}
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <div className="flex items-center gap-1.5 truncate max-w-[220px]">
                          <ChefHat className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                          <span
                            className="font-semibold text-stone-800 truncate"
                            title={seller ? `${seller.name} • ${seller.kitchenName}` : "Home Chef"}
                          >
                            {seller?.name} • {seller?.kitchenName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400 shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{dish.prepTime || "25-35 mins"}</span>
                        </div>
                      </div>

                      {/* Dish Name & Description */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base text-stone-900 leading-snug line-clamp-1">
                            {dish.name}
                          </h3>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Portion Size & Demo Rating */}
                      <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1 text-stone-600 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#ECE5DC]">
                          <Users className="w-3 h-3 text-stone-500" />
                          <span>{formatServing(dish.servingSize)}</span>
                        </span>

                        {/* Clearly labeled demo review count */}
                        <span className="inline-flex items-center gap-1 text-stone-800 font-semibold" title="Simulated demo reviews">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <span>{dish.rating.toFixed(1)}</span>
                          <span className="text-[11px] text-stone-500 font-normal">
                            ({dish.reviewCount} demo reviews)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Price, Availability Banner & Add to Cart button */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-[#F2ECE3] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-stone-400 uppercase font-semibold">
                            Price
                          </div>
                          <div className="text-xl font-extrabold text-[#C85A32]">
                            {formatRupee(dish.price)}
                          </div>
                        </div>

                        {/* Dish item status note */}
                        <div className="text-right">
                          {!isSellerAvailable ? (
                            <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              Chef Resting
                            </span>
                          ) : dish.isAvailable ? (
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                              Fresh Batch Today
                            </span>
                          ) : (
                            <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 inline-block">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CRITICAL AVAILABILITY RULE ENFORCEMENT */}
                      {!isSellerAvailable ? (
                        <div className="space-y-1.5">
                          {/* Prominent Currently Unavailable notice */}
                          <div className="py-2 px-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs text-center font-semibold flex items-center justify-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Currently Unavailable</span>
                          </div>

                          {/* Disabled Add to Cart button */}
                          <Button
                            variant="outline"
                            fullWidth
                            size="sm"
                            disabled
                            className="opacity-50 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200"
                            title="Cannot order: This home chef is currently unavailable"
                          >
                            <span>Add to Cart (Disabled)</span>
                          </Button>
                        </div>
                      ) : !dish.isAvailable ? (
                        <div className="space-y-1.5">
                          <div className="py-2 px-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-xs text-center font-medium">
                            Sold Out for Today
                          </div>
                          <Button
                            variant="outline"
                            fullWidth
                            size="sm"
                            disabled
                            className="opacity-50 cursor-not-allowed bg-stone-100 text-stone-400 border-stone-200"
                          >
                            <span>Sold Out</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          fullWidth
                          size="sm"
                          onClick={() => handleAddToCart(dish.id)}
                          className="shadow-xs cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1.5" />
                          <span>Add to Cart</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            6. FLOATING STAGE 2 CART BAR & MODAL
            Stage 2 placeholder for ordering, client-side demo selection
            ========================================================================= */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-5 right-5 z-40 animate-bounce-subtle">
            <button
              type="button"
              onClick={() => setShowCartModal(true)}
              className="bg-[#C85A32] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-[#B04B25] transition-all cursor-pointer border border-[#F6D4C7]/40"
              aria-label="Open Demo Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-white text-[#C85A32] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalCartItemsCount}
                </span>
              </div>
              <div className="text-left text-xs">
                <div className="font-bold">
                  Demo Cart ({totalCartItemsCount} {totalCartItemsCount === 1 ? "item" : "items"})
                </div>
                <div className="text-[11px] text-white/80">
                  {formatRupee(totalCartAmount)} • Stage 2 Prototype
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Stage 2 Cart Prototype Modal */}
        {showCartModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#ECE5DC] shadow-2xl space-y-4 animate-scale-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#ECE5DC]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">
                      Demo Order Cart
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Stage 2 Ordering Placeholder
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCartModal(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                  aria-label="Close cart modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  Your cart is empty. Add dishes from available kitchens above.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.dishId}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-[#ECE5DC] text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-stone-900">{item.name}</div>
                        <div className="text-[11px] text-stone-500">
                          {item.sellerName} • {formatRupee(item.price)} × {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#C85A32]">
                          {formatRupee(item.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.dishId)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total & Stage 2 Explanation Notice */}
              {cartItems.length > 0 && (
                <div className="pt-2 border-t border-[#ECE5DC] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-stone-700">Subtotal:</span>
                    <span className="text-base font-extrabold text-[#C85A32]">
                      {formatRupee(totalCartAmount)}
                    </span>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#ECE5DC] text-[11px] text-stone-600 space-y-1">
                    <div className="font-bold text-stone-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>Stage 2 Ordering Placeholder</span>
                    </div>
                    <p className="leading-relaxed">
                      Per project guidelines, customer personal details (name, phone, address)
                      are not collected during browsing. Full checkout and kitchen order dispatch
                      will be integrated in Stage 2.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-stone-600"
                    >
                      Clear Cart
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => setShowCartModal(false)}
                    >
                      Continue Browsing
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
