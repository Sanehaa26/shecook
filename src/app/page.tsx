"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useSheCook } from "@/context/SheCookContext";
import { formatRupee, formatRating, formatServing, formatAvailability } from "@/lib/formatters";
import {
  UtensilsCrossed,
  Store,
  ChefHat,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  MapPin,
  Mic,
  Volume2,
  CheckCircle2,
  Star,
  Users,
  Compass,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { sellers, dishes, getSellerById } = useSheCook();

  // Featured dishes selection: pick 4 representative dishes representing diverse women home chefs
  const curatedDishIds = ["dish-101", "dish-201", "dish-102", "dish-301"];
  const featuredDishes = curatedDishIds
    .map((id) => dishes.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  // Fallback to first 4 if curated list is empty
  const displayDishes = featuredDishes.length > 0 ? featuredDishes : dishes.slice(0, 4);
  const activeSellersCount = sellers.filter((s) => s.isAvailable).length;

  return (
    <div className="flex flex-col gap-16 md:gap-24 py-6 md:py-12">
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Headline on homemade food & empowering women, supporting paragraph,
          prominent 'Explore Homemade Food' button, complementary food visual
          ========================================================================= */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBEBE5] text-[#923A1A] border border-[#F6D4C7] text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Empowering Women Culinary Entrepreneurs</span>
              </div>

              {/* Main Headline */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]"
              >
                Wholesome Homemade Food,{" "}
                <span className="text-[#C85A32] underline decoration-[#F6D4C7] decoration-wavy decoration-2">
                  Cooked with Love
                </span>
                .
              </h1>

              {/* Tagline & Supporting Paragraph */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Taste authentic homestyle cooking prepared by passionate women home
                chefs in your neighborhood. Fresh ingredients, stone-ground spices,
                and heirloom recipes—crafted with the cleanliness and warmth only a home kitchen can offer.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/customer" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-md shadow-[#C85A32]/20 hover:shadow-lg transition-all"
                  >
                    <UtensilsCrossed className="w-5 h-5 mr-2" />
                    <span>Explore Homemade Food</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/seller" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto hover:bg-[#FAF7F2]"
                  >
                    <ChefHat className="w-5 h-5 mr-2 text-[#C85A32]" />
                    <span>Join as a Home Chef</span>
                  </Button>
                </Link>
              </div>

              {/* Trust & Metric Highlights */}
              <div className="pt-4 border-t border-[#ECE5DC] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-stone-900">
                    {sellers.length}+
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Neighborhood Chefs
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#C85A32]">
                    100%
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Homestyle & Preservative-Free
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-stone-900">
                    4.9 ★
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    Average Meal Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Complementary Food Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#F6D4C7]/60 to-[#E3EDE3]/60 rounded-3xl blur-xl opacity-70 -z-10" />

                {/* Main Hero Card & Image */}
                <div className="relative rounded-3xl overflow-hidden border border-[#ECE5DC] bg-white shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80"
                    alt="Authentic traditional Indian home-cooked meal spread"
                    className="w-full h-80 sm:h-96 object-cover"
                    loading="eager"
                  />
                  {/* Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#2C4A2D] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {activeSellersCount} Kitchens Simmering
                    </span>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-900/80 text-stone-200 backdrop-blur-xs">
                      Illustrative Demo
                    </span>
                  </div>

                  {/* Bottom Image Captions & Chef Callout */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-white font-semibold ml-1">4.9 / 5.0</span>
                    </div>
                    <h2 className="text-lg font-bold leading-tight drop-shadow-sm">
                      Small Batches. Pure Ghee. True Family Recipes.
                    </h2>
                    <p className="text-xs text-stone-200 line-clamp-1 drop-shadow-xs">
                      Prepared in hygienic home kitchens and delivered warm.
                    </p>
                  </div>
                </div>

                {/* Floating Micro-Card 1: Featured Chef Insight */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl border border-[#ECE5DC] shadow-lg flex items-center gap-3 max-w-[260px] animate-fade-in hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center shrink-0">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-stone-900">Sunita Sharma</div>
                    <div className="text-stone-500 line-clamp-1">Amritsari Special Chole</div>
                    <div className="text-[11px] font-semibold text-[#C85A32]">3rd Gen Recipe</div>
                  </div>
                </div>

                {/* Floating Micro-Card 2: Hygiene Trust */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#ECE5DC] shadow-md flex items-center gap-2 hidden sm:flex">
                  <ShieldCheck className="w-4 h-4 text-[#547B55]" />
                  <span className="text-xs font-semibold text-stone-800">
                    FSSAI Hygiene Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED DISHES
          Display a selection of dishes from existing centralized demo data:
          dish image, name, price, portion size, rating, seller name
          ========================================================================= */}
      <section id="featured-dishes" aria-labelledby="featured-heading" className="scroll-mt-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Today&apos;s Homestyle Highlights</span>
              </div>
              <h2
                id="featured-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900"
              >
                Featured Homemade Dishes
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                A curated preview of freshly cooked delicacies made from heirloom family
                spices in certified clean kitchens.
              </p>
            </div>

            <Link href="/customer">
              <Button variant="outline" size="sm" className="shrink-0 group">
                <span>View Full Menu ({dishes.length} dishes)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayDishes.map((dish) => {
              const seller = getSellerById(dish.sellerId);
              const availability = formatAvailability(dish.isAvailable, "dish");

              return (
                <Card
                  key={dish.id}
                  interactive
                  className="flex flex-col justify-between group hover:border-[#C85A32]/40"
                >
                  <div>
                    {/* Dish Visual Header */}
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Dietary Type Badge */}
                      <div className="absolute top-2.5 left-2.5">
                        <Badge
                          variant={dish.dietaryType === "Veg" ? "veg" : "nonveg"}
                          dot
                          size="sm"
                          className="bg-white/95 backdrop-blur-xs shadow-xs font-semibold"
                        >
                          {dish.dietaryType}
                        </Badge>
                      </div>

                      {/* Availability Tag */}
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shadow-xs ${
                            dish.isAvailable
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-stone-100 text-stone-600 border-stone-200"
                          }`}
                        >
                          {dish.isAvailable ? "Available Today" : "Sold Out"}
                        </span>
                      </div>
                    </div>

                    {/* Dish Details */}
                    <div className="p-4 sm:p-5 space-y-3">
                      {/* Seller Information */}
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1 font-medium text-stone-700 truncate max-w-[160px]">
                          <ChefHat className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                          <span className="truncate">{seller?.name || "Home Chef"}</span>
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {dish.prepTime}
                        </span>
                      </div>

                      {/* Dish Name */}
                      <div>
                        <h3 className="font-bold text-base text-stone-900 group-hover:text-[#C85A32] transition-colors line-clamp-1">
                          {dish.name}
                        </h3>
                        <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>

                      {/* Portion Size & Rating */}
                      <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-stone-600">
                        <span className="inline-flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#ECE5DC]">
                          <Users className="w-3 h-3 text-stone-500" />
                          <span>{formatServing(dish.servingSize)}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-semibold text-stone-800">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                          <span>{dish.rating.toFixed(1)}</span>
                          <span className="text-stone-400 font-normal">
                            ({dish.reviewCount})
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Direct Link */}
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-[#F2ECE3]">
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-semibold">
                          Price
                        </div>
                        <div className="text-lg font-extrabold text-[#C85A32]">
                          {formatRupee(dish.price)}
                        </div>
                      </div>

                      <Link href="/customer">
                        <Button variant="secondary" size="sm" className="font-medium">
                          <span>Order Meal</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Academic & Illustrative Photography Disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-stone-500">
              * Note: Sample dish photographs are illustrative demo imagery used for project presentation.
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: HOW SHECOOK WORKS
          Explain simply how women list their food and customers discover homemade meals
          ========================================================================= */}
      <section aria-labelledby="how-it-works-heading" className="bg-[#FAF4ED] py-14 sm:py-20 border-y border-[#ECE5DC]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85A32]">
              <Compass className="w-3.5 h-3.5" />
              <span>Simple, Wholesome & Transparent</span>
            </div>
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900"
            >
              How SheCook Works
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              We bridge the gap between talented homemakers creating delicious meals
              and hungry food lovers craving the taste of home.
            </p>
          </div>

          {/* 4-Step Journey Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE5DC] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FBEBE5] text-[#C85A32] font-black text-lg flex items-center justify-center mb-4 shadow-xs">
                  01
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Chefs List Heirloom Menus
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Passionate women chefs configure their signature recipes, specify
                  daily portion counts, prep times, and transparent pricing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-[11px] font-medium text-[#C85A32] flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Zero listing barrier</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE5DC] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EBF3EB] text-[#2C4A2D] font-black text-lg flex items-center justify-center mb-4 shadow-xs">
                  02
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Kitchens Open Live
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  When pots start simmering, chefs toggle their kitchen availability
                  in real-time so customers know meals are freshly prepared.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-[11px] font-medium text-[#2C4A2D] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Flexible home hours</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE5DC] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 font-black text-lg flex items-center justify-center mb-4 shadow-xs">
                  03
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Customers Discover & Order
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Browse neighborhood kitchens, filter by dietary requirements
                  (pure veg, non-veg), and check authentic chef ratings and stories.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-[11px] font-medium text-stone-700 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                <span>Honest customer marketplace</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#ECE5DC] shadow-xs relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FEF5E7] text-[#9A6014] font-black text-lg flex items-center justify-center mb-4 shadow-xs">
                  04
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2">
                  Enjoy Warm & Hygienic Food
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Meals are packaged in food-safe containers and delivered warm,
                  offering clean nutrition that tastes genuine and comforting.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-[11px] font-medium text-[#9A6014] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Cooked with family care</span>
              </div>
            </div>
          </div>

          {/* Value Props Row */}
          <div className="mt-12 bg-white rounded-2xl border border-[#ECE5DC] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EBF3EB] text-[#2C4A2D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Hygiene & FSSAI Standards
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Every home kitchen follows strict cleanliness checklists and food-grade packaging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Direct Economic Independence
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Empowering women with dignified income and self-reliant entrepreneurship from home.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Zero Preservatives or Additives
                </h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  Real home flavors without heavy artificial food colorings or excess palm oils.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: THREE PORTAL CARDS
          Admin, Food Seller (Chef), and Customer. Each card must navigate to its correct route.
          ========================================================================= */}
      <section aria-labelledby="portals-heading">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C85A32]">
              <Store className="w-3.5 h-3.5" />
              <span>Multi-Role Platform Experience</span>
            </div>
            <h2
              id="portals-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900"
            >
              Explore the SheCook Portals
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Experience the platform from three perspectives: as a hungry customer,
              an empowered home chef, or a platform administrator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* PORTAL 1: Customer Portal */}
            <Card interactive className="flex flex-col justify-between border-2 hover:border-[#547B55]">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3EB] text-[#2C4A2D] flex items-center justify-center">
                    <Store className="w-6 h-6" />
                  </div>
                  <Badge variant="sage" dot size="sm">
                    {activeSellersCount} Open Kitchens
                  </Badge>
                </div>
                <CardTitle className="text-xl">Customer Portal</CardTitle>
                <CardDescription>
                  Discover authentic neighborhood kitchens, browse heirloom recipes,
                  filter by dietary preference, and place fresh meal orders.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2.5">
                <div className="text-xs text-stone-600 space-y-1.5 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE5DC]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#547B55] shrink-0" />
                    <span>Browse {dishes.length} handcrafted dishes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#547B55] shrink-0" />
                    <span>Real-time kitchen availability tags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#547B55] shrink-0" />
                    <span>Detailed portion sizes & reviews</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link href="/customer" className="w-full">
                  <Button variant="primary" fullWidth size="md">
                    <span>Enter Customer Portal</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PORTAL 2: Food Seller (Chef) Portal */}
            <Card interactive className="flex flex-col justify-between border-2 hover:border-[#C85A32]">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <Badge variant="terracotta" size="sm">
                    Home Kitchen Studio
                  </Badge>
                </div>
                <CardTitle className="text-xl">Food Seller (Chef) Portal</CardTitle>
                <CardDescription>
                  Empowering home chefs to manage orders, toggle kitchen availability,
                  update daily dish menus, and run their food business independently.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2.5">
                <div className="text-xs text-stone-600 space-y-1.5 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE5DC]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                    <span>1-Click kitchen Open / Closed toggle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                    <span>Dish stock & daily availability controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                    <span>Live order queue & customer requests</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link href="/seller" className="w-full">
                  <Button variant="secondary" fullWidth size="md">
                    <span>Open Food Seller Portal</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* PORTAL 3: Admin Overview Portal */}
            <Card interactive className="flex flex-col justify-between border-2 hover:border-stone-400">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" size="sm">
                    Governance & Trust
                  </Badge>
                </div>
                <CardTitle className="text-xl">Admin Overview Portal</CardTitle>
                <CardDescription>
                  Marketplace oversight, food safety hygiene compliance audits,
                  chef onboarding approvals, and centralized demo data controls.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2.5">
                <div className="text-xs text-stone-600 space-y-1.5 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#ECE5DC]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                    <span>FSSAI compliance & hygiene checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                    <span>Home chef registration review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                    <span>Demo data reset & system status</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Link href="/admin" className="w-full">
                  <Button variant="outline" fullWidth size="md">
                    <span>Inspect Admin Portal</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: VOICE-ASSISTANT INTRODUCTION
          Explain that a voice assistant will help sellers manage dishes and orders.
          Do not implement the real assistant yet.
          ========================================================================= */}
      <section aria-labelledby="voice-assistant-heading">
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-[#2E2825] to-[#1F1A18] text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-stone-800">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-[#C85A32]/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-[#547B55]/20 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Voice Concept Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-stone-200 border border-white/15 text-xs font-semibold backdrop-blur-xs">
                  <Mic className="w-3.5 h-3.5 text-[#F6D4C7]" />
                  <span>Innovation Preview • In Active Development</span>
                </div>

                <h2
                  id="voice-assistant-heading"
                  className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight"
                >
                  Empowering Home Chefs with a{" "}
                  <span className="text-[#F6D4C7]">Hands-Free Voice Assistant</span>
                </h2>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  Cooking requires two hands, undivided attention, and quick adjustments.
                  Typing on phone screens with floured hands or amidst simmering pans is difficult.
                  SheCook is designing an intelligent voice assistant so home chefs can manage
                  their kitchen entirely hands-free.
                </p>

                {/* Planned Voice Assistant Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#F6D4C7]" />
                      <span>Voice Dish & Menu Updates</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      Add today&apos;s special or adjust price by simply speaking naturally.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F6D4C7]" />
                      <span>Hands-Free Availability</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      Toggle kitchen open or closed in seconds without touching your phone.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F6D4C7]" />
                      <span>Audible Order Alerts</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      Listen to incoming customer orders and accept them verbally while cooking.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F6D4C7]" />
                      <span>Vernacular Language Support</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      Speak comfortably in Hindi, English, and regional languages.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-stone-400 italic">
                  * Note: This is an architectural introduction of our upcoming voice assistant. Full voice recognition engine will be integrated in subsequent releases.
                </div>
              </div>

              {/* Right Column: Visual Voice Simulation Card */}
              <div className="lg:col-span-5">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#C85A32] flex items-center justify-center text-white">
                        <Mic className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          SheCook Voice Companion
                        </div>
                        <div className="text-[10px] text-stone-400">
                          Concept Interaction Preview
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Concept
                    </span>
                  </div>

                  {/* Sample Voice Dialog Snippets */}
                  <div className="space-y-3 text-xs">
                    {/* Chef Voice Input 1 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-[10px] shrink-0 font-bold">
                        Chef
                      </div>
                      <div className="bg-white/15 p-2.5 rounded-xl rounded-tl-none text-stone-200">
                        &ldquo;Aaj 5 plate Rajma Chawal add kar do ₹150 mein&rdquo;
                      </div>
                    </div>

                    {/* Assistant Response 1 */}
                    <div className="flex gap-2.5 items-start justify-end">
                      <div className="bg-[#C85A32]/30 border border-[#C85A32]/40 p-2.5 rounded-xl rounded-tr-none text-stone-200 text-right">
                        &ldquo;Done! Added 5 portions of Rajma Chawal at ₹150. Menu is updated.&rdquo;
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#C85A32] flex items-center justify-center text-[10px] shrink-0 font-bold">
                        AI
                      </div>
                    </div>

                    {/* Chef Voice Input 2 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-[10px] shrink-0 font-bold">
                        Chef
                      </div>
                      <div className="bg-white/15 p-2.5 rounded-xl rounded-tl-none text-stone-200">
                        &ldquo;Kitne orders pending hain abhi?&rdquo;
                      </div>
                    </div>

                    {/* Assistant Response 2 */}
                    <div className="flex gap-2.5 items-start justify-end">
                      <div className="bg-[#C85A32]/30 border border-[#C85A32]/40 p-2.5 rounded-xl rounded-tr-none text-stone-200 text-right">
                        &ldquo;Aapke paas 2 active orders hain: 1 Chole Bhature aur 1 Dal Makhani.&rdquo;
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#C85A32] flex items-center justify-center text-[10px] shrink-0 font-bold">
                        AI
                      </div>
                    </div>
                  </div>

                  {/* Visual Soundwave Bar */}
                  <div className="pt-2 flex items-center justify-center gap-1.5 h-6">
                    <span className="w-1 h-3 bg-[#F6D4C7] rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-[#C85A32] rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-6 bg-[#F6D4C7] rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-4 bg-[#C85A32] rounded-full animate-pulse delay-100" />
                    <span className="w-1 h-2 bg-[#F6D4C7] rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: EMPOWERMENT & CALL TO ACTION
          Closing invitation to explore food or join as a woman culinary entrepreneur
          ========================================================================= */}
      <section aria-labelledby="cta-heading">
        <Container>
          <div className="bg-gradient-to-r from-[#FBEBE5] via-[#FAF7F2] to-[#EBF3EB] rounded-3xl border border-[#ECE5DC] p-8 sm:p-14 text-center space-y-6">
            <Badge variant="terracotta" size="md" className="mx-auto">
              <Heart className="w-3.5 h-3.5 mr-1 fill-current text-[#C85A32]" />
              Her Passion. Her Kitchen. Her Business.
            </Badge>

            <h2
              id="cta-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 max-w-2xl mx-auto"
            >
              Ready to Experience Wholesome Home-Cooked Food?
            </h2>

            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
              Order comfort food made by loving hands, or empower your own culinary skills
              by setting up your kitchen studio today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link href="/customer" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <UtensilsCrossed className="w-5 h-5 mr-2" />
                  <span>Explore Homemade Food</span>
                </Button>
              </Link>
              <Link href="/seller" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <ChefHat className="w-5 h-5 mr-2 text-[#C85A32]" />
                  <span>Start Selling Your Dishes</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
