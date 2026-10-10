"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSheCook } from "@/context/SheCookContext";
import { DEMO_METRICS, DEMO_REVIEWS } from "@/data/mockData";
import { formatRupee, formatRating } from "@/lib/formatters";
import {
  LayoutDashboard,
  Users,
  Utensils,
  ShoppingBag,
  Star,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  IndianRupee,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Award,
  Activity,
  PieChart,
  BookOpen,
  Sparkles,
  Clock,
  MapPin,
  MessageSquare,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AdminView = "dashboard" | "sellers" | "dishes" | "orders" | "reviews";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function StatCard({
  icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accent
              ? "bg-[#FBEBE5] text-[#C85A32]"
              : "bg-stone-100 text-stone-600"
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-none">
        {value}
      </div>
      <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1.5">
        {label}
      </div>
      {sub && (
        <div
          className={`text-[11px] mt-1 font-medium ${
            accent ? "text-[#C85A32]" : "text-stone-400"
          }`}
        >
          {sub}
        </div>
      )}
    </Card>
  );
}

// Stage 2 placeholder panel
function Stage2Panel({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE5DC] p-10 flex flex-col items-center text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-[#FBEBE5] text-[#C85A32] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
        <p className="text-sm text-stone-500 mt-1 max-w-sm">
          Full management tools — search, filter, edit, and bulk actions — are
          planned for Stage 2.
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FBEBE5] text-[#923A1A] text-xs font-bold border border-[#F6D4C7]">
        <Sparkles className="w-3.5 h-3.5" />
        Coming in Stage 2
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar navigation items
// ---------------------------------------------------------------------------
const NAV_ITEMS: { key: AdminView; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: "sellers", label: "Sellers", icon: <Users className="w-4 h-4" /> },
  { key: "dishes", label: "Dishes", icon: <Utensils className="w-4 h-4" /> },
  { key: "orders", label: "Orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { key: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
];

// ---------------------------------------------------------------------------
// Category Chart — pure CSS bar chart, no external library
// ---------------------------------------------------------------------------
function CategoryChart({
  dishes,
}: {
  dishes: { category: string; isAvailable: boolean }[];
}) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    dishes.forEach((d) => {
      map[d.category] = (map[d.category] ?? 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [dishes]);

  const max = counts[0]?.[1] ?? 1;

  const palette = [
    "#C85A32",
    "#547B55",
    "#A0785A",
    "#6B7FCC",
    "#C8A832",
    "#C85A7A",
  ];

  return (
    <div className="space-y-3">
      {counts.map(([cat, count], i) => (
        <div key={cat} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-700 font-medium">{cat}</span>
            <span className="text-stone-500 font-semibold tabular-nums">
              {count} dish{count !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(count / max) * 100}%`,
                backgroundColor: palette[i % palette.length],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo availability donut (SVG)
// ---------------------------------------------------------------------------
function AvailabilityDonut({
  available,
  total,
}: {
  available: number;
  total: number;
}) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const pct = total === 0 ? 0 : available / total;
  const dash = pct * circ;

  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" className="shrink-0 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#F2ECE3"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#547B55"
          strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="space-y-1.5">
        <div className="text-3xl font-extrabold text-stone-900">
          {available}
          <span className="text-base text-stone-400 font-normal">/{total}</span>
        </div>
        <div className="text-xs text-stone-500">Kitchens open now</div>
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
            <div className="w-2.5 h-2.5 rounded-full bg-[#547B55]" />
            Available ({available})
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-600">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
            Offline ({total - available})
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Recent Activity feed
// ---------------------------------------------------------------------------
const DEMO_ACTIVITY = [
  {
    id: "act-1",
    type: "order",
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
    color: "bg-blue-100 text-blue-700",
    text: "New order #ord-801 placed with Sunita's Punjabi Rasoi",
    meta: "Priya Nair · 2 items · ₹490",
    time: "12:45 PM today",
  },
  {
    id: "act-2",
    type: "order",
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
    color: "bg-blue-100 text-blue-700",
    text: "New order #ord-802 placed with Fatima's Hyderabadi Dastarkhwan",
    meta: "Rahul Varma · 2 items · ₹430",
    time: "1:15 PM today",
  },
  {
    id: "act-3",
    type: "review",
    icon: <Star className="w-3.5 h-3.5" />,
    color: "bg-amber-100 text-amber-700",
    text: "5★ review by Neha Kapoor on Maa Ki Dal (Dal Makhani)",
    meta: "Sunita Sharma · \"Tastes genuinely like home!\"",
    time: "Yesterday",
  },
  {
    id: "act-4",
    type: "review",
    icon: <Star className="w-3.5 h-3.5" />,
    color: "bg-amber-100 text-amber-700",
    text: "5★ review by Arjun Reddy on Heirloom Hyderabadi Dum Biryani",
    meta: "Fatima Sheikh · \"Best biryani in months\"",
    time: "2 days ago",
  },
  {
    id: "act-5",
    type: "seller",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    color: "bg-[#EBF3EB] text-[#2C4A2D]",
    text: "Ananya Sen onboarded — Kolkata Heritage Kitchen verified",
    meta: "FSSAI-DEMO-44019283 · A Clean Kitchen Certified",
    time: "3 days ago",
  },
  {
    id: "act-6",
    type: "seller",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    color: "bg-[#EBF3EB] text-[#2C4A2D]",
    text: "Fatima Sheikh renewed FSSAI certification for 2025",
    meta: "Banjara Hills, Hyderabad · A+ Clean Kitchen Certified",
    time: "1 week ago",
  },
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function AdminDashboardPage() {
  const { sellers, dishes, orders, reviews, resetDemoData } = useSheCook();
  const [activeView, setActiveView] = useState<AdminView>("dashboard");

  // Derived stats from live shared context
  const availableSellers = sellers.filter((s) => s.isAvailable).length;
  const availableDishes = dishes.filter((d) => d.isAvailable).length;
  const avgRating =
    sellers.length > 0
      ? (sellers.reduce((s, c) => s + c.rating, 0) / sellers.length).toFixed(2)
      : "—";

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* ================================================================
          TOP BAR
          ================================================================ */}
      <div className="bg-white border-b border-[#ECE5DC] sticky top-0 z-30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#C85A32] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="h-5 w-px bg-stone-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
              <span className="text-sm font-extrabold text-stone-900 tracking-tight">
                SheCook Admin
              </span>
              <Badge variant="neutral" size="sm">
                Demo Mode
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemoData}
              title="Resets all availability toggles to original demo defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </Button>
            <Link href="/seller">
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span className="hidden sm:inline">Seller View</span>
              </Button>
            </Link>
            <Link href="/customer">
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                <span className="hidden sm:inline">Customer View</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          LAYOUT: SIDEBAR + MAIN
          ================================================================ */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* --- Sidebar --- */}
        <aside className="shrink-0 w-48 hidden md:block">
          <nav className="bg-white rounded-2xl border border-[#ECE5DC] overflow-hidden shadow-xs p-2 sticky top-[70px]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveView(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeView === item.key
                    ? "bg-[#FBEBE5] text-[#C85A32]"
                    : "text-stone-600 hover:bg-[#FAF7F2] hover:text-stone-900"
                }`}
              >
                {item.icon}
                {item.label}
                {activeView === item.key && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                )}
              </button>
            ))}

            <div className="mt-3 pt-3 border-t border-[#ECE5DC] px-3 pb-1 space-y-1">
              <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                Quick links
              </p>
              <Link
                href="/seller"
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#C85A32] py-0.5"
              >
                <ExternalLink className="w-3 h-3" />
                Seller Portal
              </Link>
              <Link
                href="/customer"
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#C85A32] py-0.5"
              >
                <ExternalLink className="w-3 h-3" />
                Customer View
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden mb-4 flex gap-1.5 overflow-x-auto pb-1 w-full">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveView(item.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                activeView === item.key
                  ? "bg-[#FBEBE5] text-[#C85A32]"
                  : "bg-white border border-[#ECE5DC] text-stone-600"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* --- Main content --- */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ============================================================
              DASHBOARD VIEW
              ============================================================ */}
          {activeView === "dashboard" && (
            <>
              {/* Page heading */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="terracotta" size="sm">
                    Admin Dashboard
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    Academic Prototype
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Platform Overview
                </h1>
                <p className="text-sm text-stone-500 mt-1">
                  Live statistics sourced from shared demo data. Availability reflects real-time toggle state.
                </p>
              </div>

              {/* 2. Overview cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<Users className="w-5 h-5" />}
                  label="Total Sellers"
                  value={sellers.length}
                  sub={`${availableSellers} available now`}
                  accent
                />
                <StatCard
                  icon={<Activity className="w-5 h-5" />}
                  label="Available Now"
                  value={availableSellers}
                  sub={`${sellers.length - availableSellers} offline`}
                />
                <StatCard
                  icon={<Utensils className="w-5 h-5" />}
                  label="Total Dishes"
                  value={dishes.length}
                  sub={`${availableDishes} available`}
                />
                <StatCard
                  icon={<ShoppingBag className="w-5 h-5" />}
                  label="Demo Orders"
                  value={orders.length}
                  sub="Sample data only"
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<Star className="w-5 h-5" />}
                  label="Avg Chef Rating"
                  value={avgRating}
                  sub="Across all kitchens"
                  accent
                />
                <StatCard
                  icon={<Award className="w-5 h-5" />}
                  label="FSSAI Verified"
                  value="100%"
                  sub="All sellers certified"
                />
                <StatCard
                  icon={<IndianRupee className="w-5 h-5" />}
                  label="Avg Monthly Earnings"
                  value={DEMO_METRICS.averageMonthlyEarningsPerChef}
                  sub="Per chef (demo figure)"
                />
                <StatCard
                  icon={<TrendingUp className="w-5 h-5" />}
                  label="Monthly Orders"
                  value={DEMO_METRICS.ordersDeliveredThisMonth.toLocaleString()}
                  sub="Demo simulation"
                />
              </div>

              {/* 5. Visual summaries row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category bar chart */}
                <div className="bg-white rounded-2xl border border-[#ECE5DC] p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="w-4 h-4 text-[#C85A32]" />
                    <h2 className="font-bold text-stone-900 text-sm">
                      Dishes by Category
                    </h2>
                    <Badge variant="neutral" size="sm">
                      Demo Data
                    </Badge>
                  </div>
                  <CategoryChart dishes={dishes} />
                </div>

                {/* Availability donut */}
                <div className="bg-white rounded-2xl border border-[#ECE5DC] p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <Circle className="w-4 h-4 text-[#547B55]" />
                    <h2 className="font-bold text-stone-900 text-sm">
                      Kitchen Availability
                    </h2>
                    <Badge variant="neutral" size="sm">
                      Live State
                    </Badge>
                  </div>
                  <AvailabilityDonut
                    available={availableSellers}
                    total={sellers.length}
                  />
                  <p className="text-[11px] text-stone-400 mt-4 italic">
                    ⚡ Updates instantly when a seller toggles availability on the Seller Portal.
                  </p>
                </div>
              </div>

              {/* 4. Recent Activity */}
              <div className="bg-white rounded-2xl border border-[#ECE5DC] shadow-xs overflow-hidden">
                <div className="px-5 py-4 border-b border-[#ECE5DC] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#C85A32]" />
                    <h2 className="font-bold text-stone-900 text-sm">
                      Recent Activity
                    </h2>
                  </div>
                  <Badge variant="neutral" size="sm">
                    Sample Data
                  </Badge>
                </div>
                <div className="divide-y divide-[#F2ECE3]">
                  {DEMO_ACTIVITY.map((item) => (
                    <div
                      key={item.id}
                      className="px-5 py-4 flex items-start gap-3 hover:bg-[#FAF7F2]/60 transition-colors"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-800 font-medium leading-snug">
                          {item.text}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {item.meta}
                        </p>
                      </div>
                      <div className="text-[11px] text-stone-400 shrink-0 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ============================================================
              3. SELLERS TABLE VIEW
              ============================================================ */}
          {activeView === "sellers" && (
            <>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                    Registered Sellers
                  </h1>
                  <p className="text-sm text-stone-500 mt-0.5">
                    {sellers.length} home chefs · {availableSellers} currently open
                  </p>
                </div>
                <Badge variant="sage" size="sm" dot>
                  100% FSSAI Verified
                </Badge>
              </div>

              {/* Sellers table */}
              <div className="bg-white rounded-2xl border border-[#ECE5DC] overflow-hidden shadow-xs">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bg-[#FAF7F2] border-b border-[#ECE5DC] text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  <span>Chef / Kitchen</span>
                  <span className="text-right">Dishes</span>
                  <span className="text-right">Rating</span>
                  <span className="text-right hidden md:block">FSSAI / Hygiene</span>
                  <span className="text-right">Status</span>
                </div>

                <div className="divide-y divide-[#F2ECE3]">
                  {sellers.map((seller) => {
                    const sellerDishes = dishes.filter(
                      (d) => d.sellerId === seller.id
                    );
                    const availableCount = sellerDishes.filter(
                      (d) => d.isAvailable
                    ).length;

                    return (
                      <div
                        key={seller.id}
                        className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-3 sm:gap-4 sm:items-center hover:bg-[#FAF7F2]/50 transition-colors"
                      >
                        {/* Chef info */}
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={seller.avatar}
                              alt={seller.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-stone-900 text-sm">
                              {seller.kitchenName}
                            </div>
                            <div className="text-xs text-stone-500 mt-0.5">
                              {seller.name}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {seller.location}
                            </div>
                            <p className="text-[11px] text-stone-500 mt-1 line-clamp-1 sm:hidden">
                              {seller.specialty}
                            </p>
                          </div>
                        </div>

                        {/* Dish count */}
                        <div className="sm:text-right">
                          <div className="text-sm font-bold text-stone-900">
                            {sellerDishes.length}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {availableCount} avail.
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="sm:text-right">
                          <div className="inline-flex items-center gap-1 text-sm font-bold text-stone-900">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                            {seller.rating.toFixed(1)}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {seller.reviewCount} reviews
                          </div>
                        </div>

                        {/* FSSAI */}
                        <div className="hidden md:block sm:text-right">
                          <div className="text-[11px] font-semibold text-stone-700">
                            {seller.fssaiNumber}
                          </div>
                          <div className="text-[11px] text-[#2C4A2D] font-medium">
                            {seller.hygieneRating}
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="sm:text-right">
                          <Badge
                            variant={seller.isAvailable ? "sage" : "neutral"}
                            size="sm"
                            dot
                          >
                            {seller.isAvailable ? "Open" : "Offline"}
                          </Badge>
                          <div className="text-[11px] text-stone-400 mt-1">
                            Since {seller.joinedYear}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specialties summary */}
              <div className="bg-white rounded-2xl border border-[#ECE5DC] p-5 shadow-xs">
                <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C85A32]" />
                  Kitchen Specialties
                </h3>
                <div className="space-y-3">
                  {sellers.map((seller) => (
                    <div key={seller.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={seller.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">
                          {seller.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {seller.specialty}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ============================================================
              DISHES VIEW — Stage 2 placeholder
              ============================================================ */}
          {activeView === "dishes" && (
            <>
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Dishes
                </h1>
                <p className="text-sm text-stone-500 mt-0.5">
                  {dishes.length} total dishes across {sellers.length} kitchens
                </p>
              </div>

              {/* Quick summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard
                  icon={<Utensils className="w-5 h-5" />}
                  label="Total Dishes"
                  value={dishes.length}
                  accent
                />
                <StatCard
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  label="Available"
                  value={availableDishes}
                  sub="Currently listed"
                />
                <StatCard
                  icon={<AlertTriangle className="w-5 h-5" />}
                  label="Sold Out"
                  value={dishes.length - availableDishes}
                  sub="Temporarily unavail."
                />
                <StatCard
                  icon={<PieChart className="w-5 h-5" />}
                  label="Categories"
                  value={
                    new Set(dishes.map((d) => d.category)).size
                  }
                  sub="Distinct categories"
                />
              </div>

              <div className="bg-white rounded-2xl border border-[#ECE5DC] p-5 shadow-xs">
                <h3 className="font-bold text-stone-900 text-sm mb-4">
                  Category Breakdown
                </h3>
                <CategoryChart dishes={dishes} />
              </div>

              <Stage2Panel
                title="Dish Management"
                icon={<Utensils className="w-8 h-8" />}
              />
            </>
          )}

          {/* ============================================================
              ORDERS VIEW — Stage 2 placeholder
              ============================================================ */}
          {activeView === "orders" && (
            <>
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Orders
                </h1>
                <p className="text-sm text-stone-500 mt-0.5">
                  {orders.length} demo orders · sample data only
                </p>
              </div>

              {/* Show existing demo orders in a read-only list */}
              <div className="bg-white rounded-2xl border border-[#ECE5DC] overflow-hidden shadow-xs">
                <div className="px-5 py-4 border-b border-[#ECE5DC] flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                  <h2 className="font-bold text-stone-900 text-sm">
                    Demo Orders (Read-Only)
                  </h2>
                  <Badge variant="neutral" size="sm">
                    Sample Data
                  </Badge>
                </div>
                <div className="divide-y divide-[#F2ECE3]">
                  {orders.map((order) => {
                    const seller = sellers.find(
                      (s) => s.id === order.sellerId
                    );
                    return (
                      <div
                        key={order.id}
                        className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-stone-900 text-sm">
                            Order #{order.id}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {order.customerName} · {order.orderTime}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {seller?.kitchenName ?? order.sellerId} · {order.items.length} item(s)
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-stone-900">
                            {formatRupee(order.totalAmount)}
                          </span>
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "sage"
                                : order.status === "Cancelled"
                                ? "neutral"
                                : "terracotta"
                            }
                            size="sm"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Stage2Panel
                title="Order Management"
                icon={<ShoppingBag className="w-8 h-8" />}
              />
            </>
          )}

          {/* ============================================================
              REVIEWS VIEW — Stage 2 placeholder
              ============================================================ */}
          {activeView === "reviews" && (
            <>
              <div>
                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Reviews
                </h1>
                <p className="text-sm text-stone-500 mt-0.5">
                  {DEMO_REVIEWS.length} demo reviews · sample data only
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#ECE5DC] overflow-hidden shadow-xs">
                <div className="px-5 py-4 border-b border-[#ECE5DC] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C85A32]" />
                  <h2 className="font-bold text-stone-900 text-sm">
                    Customer Reviews (Read-Only)
                  </h2>
                  <Badge variant="neutral" size="sm">
                    Demo Data
                  </Badge>
                </div>
                <div className="divide-y divide-[#F2ECE3]">
                  {reviews.map((review) => {
                    const seller = sellers.find(
                      (s) => s.id === review.sellerId
                    );
                    return (
                      <div key={review.id} className="px-5 py-5">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="font-bold text-stone-900 text-sm">
                              {review.authorName}
                            </div>
                            <div className="text-xs text-stone-500">
                              {seller?.kitchenName ?? review.sellerId}
                              {review.dishName && (
                                <span> · {review.dishName}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating
                                    ? "text-amber-500 fill-current"
                                    : "text-stone-200 fill-current"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-stone-700 italic leading-relaxed">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                        <div className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {review.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Stage2Panel
                title="Review Moderation"
                icon={<Star className="w-8 h-8" />}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
