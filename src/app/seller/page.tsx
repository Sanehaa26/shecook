"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSheCook } from "@/context/SheCookContext";
import { formatRupee, formatRating, formatServing, formatAvailability } from "@/lib/formatters";
import {
  ChefHat,
  Power,
  Sparkles,
  ArrowRight,
  Clock,
  Utensils,
  MapPin,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function SellerPortalPage() {
  const {
    sellers,
    currentSellerId,
    setCurrentSellerId,
    currentSeller,
    currentSellerDishes,
    toggleSellerAvailability,
    toggleDishAvailability,
  } = useSheCook();

  if (!currentSeller) return null;

  const availability = formatAvailability(currentSeller.isAvailable, "seller");

  return (
    <div className="py-8 md:py-12">
      <Container>
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="terracotta" size="sm">
                Seller Kitchen Studio
              </Badge>
              <Badge variant="sage" size="sm" dot>
                Interactive State Demo
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Manage Your Kitchen & Daily Menus
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Control your kitchen opening status and toggle dish availability in real-time. Changes immediately update the customer marketplace.
            </p>
          </div>

          {/* Switch Demo Chef */}
          <div className="flex items-center gap-2 text-xs bg-white p-2.5 rounded-xl border border-[#ECE5DC] shadow-2xs">
            <span className="text-stone-500 font-medium">Switch Chef:</span>
            <select
              value={currentSellerId}
              onChange={(e) => setCurrentSellerId(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-[#ECE5DC] bg-[#FAF7F2] text-stone-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
            >
              {sellers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.kitchenName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kitchen Status & Master Toggle Card */}
        <div className="mb-8">
          <Card className="border-2 border-[#ECE5DC] bg-white">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-200 border-2 border-white shadow-xs shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentSeller.avatar}
                      alt={currentSeller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-stone-900">
                        {currentSeller.kitchenName}
                      </h2>
                      <Badge variant="outline" size="sm">
                        {currentSeller.fssaiNumber}
                      </Badge>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Chef: <span className="text-stone-800 font-medium">{currentSeller.name}</span> • {currentSeller.location}
                    </p>
                  </div>
                </div>

                {/* Master Availability Toggle Button */}
                <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#ECE5DC]">
                  <div className="text-right">
                    <div className="text-xs font-bold text-stone-900">
                      {availability.label}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {currentSeller.isAvailable
                        ? "Customers can place orders"
                        : "Orders paused for today"}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSellerAvailability(currentSeller.id)}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                      currentSeller.isAvailable
                        ? "bg-[#547B55]"
                        : "bg-stone-300"
                    }`}
                    aria-label="Toggle kitchen online status"
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                        currentSeller.isAvailable
                          ? "translate-x-9"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FCFAF6] p-4 rounded-xl border border-[#F2ECE3] text-xs">
                <div>
                  <span className="text-stone-500">Operating Hours:</span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {currentSeller.operatingHours}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Hygiene Status:</span>
                  <div className="font-semibold text-[#324C33] mt-0.5">
                    {currentSeller.hygieneRating}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Customer Rating:</span>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {formatRating(currentSeller.rating, currentSeller.reviewCount)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500">Test Live View:</span>
                  <div className="mt-0.5">
                    <Link
                      href="/customer"
                      className="text-[#C85A32] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Check Customer Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Dish Availability Toggles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Today&apos;s Menu Availability ({currentSellerDishes.length} Items)
              </h3>
              <p className="text-xs text-stone-500">
                Click any dish&apos;s toggle to switch between &ldquo;Available&rdquo; and &ldquo;Sold Out&rdquo;.
              </p>
            </div>
            <Badge variant="terracotta" size="sm">
              Live Dish Controls
            </Badge>
          </div>

          <div className="space-y-3">
            {currentSellerDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-xl border border-[#ECE5DC] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-[#DFCFC0] transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">
                        {dish.name}
                      </h4>
                      <Badge
                        variant={dish.dietaryType === "Veg" ? "veg" : "nonveg"}
                        size="sm"
                        dot
                      >
                        {dish.dietaryType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span className="font-semibold text-[#C85A32]">
                        {formatRupee(dish.price)}
                      </span>
                      <span>•</span>
                      <span>{formatServing(dish.servingSize)}</span>
                      <span>•</span>
                      <span>{dish.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                  <Badge
                    variant={dish.isAvailable ? "sage" : "neutral"}
                    size="sm"
                    dot
                  >
                    {dish.isAvailable ? "Available Today" : "Sold Out"}
                  </Badge>

                  <Button
                    variant={dish.isAvailable ? "outline" : "primary"}
                    size="sm"
                    onClick={() => toggleDishAvailability(dish.id)}
                  >
                    {dish.isAvailable ? "Mark Sold Out" : "Mark Available"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
