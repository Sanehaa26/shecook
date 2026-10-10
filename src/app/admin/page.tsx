"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useSheCook } from "@/context/SheCookContext";
import { DEMO_METRICS } from "@/data/mockData";
import { formatRupee, formatRating, formatAvailability } from "@/lib/formatters";
import {
  ShieldCheck,
  RotateCcw,
  Users,
  Store,
  Award,
  TrendingUp,
  AlertCircle,
  FileCheck2,
} from "lucide-react";

export default function AdminOverviewPage() {
  const { sellers, dishes, orders, resetDemoData } = useSheCook();
  const activeSellersCount = sellers.filter((s) => s.isAvailable).length;

  return (
    <div className="py-8 md:py-12">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="terracotta" size="sm">
                Admin & Trust Governance
              </Badge>
              <Badge variant="neutral" size="sm">
                Academic Prototype
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Platform Overview & Seller Verification
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Centralized oversight for food hygiene compliance, FSSAI verification, and neighborhood kitchen metrics.
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemoData}
              className="flex items-center gap-2"
              title="Resets seller availability and mock items to original demo defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </Button>
          </div>
        </div>

        {/* Platform KPI Metrics (Demo Data) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Home Kitchens
              </span>
              <Store className="w-4 h-4 text-[#C85A32]" />
            </div>
            <div className="text-2xl font-extrabold text-stone-900">
              {sellers.length}
            </div>
            <div className="text-[11px] text-[#324C33] font-medium mt-1">
              {activeSellersCount} currently open
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Dishes Catalog
              </span>
              <Award className="w-4 h-4 text-[#C85A32]" />
            </div>
            <div className="text-2xl font-extrabold text-stone-900">
              {dishes.length}
            </div>
            <div className="text-[11px] text-stone-500 font-medium mt-1">
              Curated regional specialties
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Monthly Orders
              </span>
              <TrendingUp className="w-4 h-4 text-[#C85A32]" />
            </div>
            <div className="text-2xl font-extrabold text-stone-900">
              {DEMO_METRICS.ordersDeliveredThisMonth}
            </div>
            <div className="text-[11px] text-stone-500 font-medium mt-1">
              Demo monthly simulation
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Chefs Empowered
              </span>
              <Users className="w-4 h-4 text-[#C85A32]" />
            </div>
            <div className="text-2xl font-extrabold text-stone-900">
              {DEMO_METRICS.femaleChefsEmpowered}
            </div>
            <div className="text-[11px] text-[#C85A32] font-semibold mt-1">
              Avg {DEMO_METRICS.averageMonthlyEarningsPerChef} / mo
            </div>
          </Card>
        </div>

        {/* Seller Governance Table */}
        <div className="bg-white rounded-2xl border border-[#ECE5DC] overflow-hidden shadow-2xs">
          <div className="p-5 sm:p-6 border-b border-[#ECE5DC] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Registered Home Chef Verification Status
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                All listed home cooks are audited for kitchen hygiene and certified under local safety regulations.
              </p>
            </div>
            <Badge variant="sage" size="sm" dot>
              100% Verified
            </Badge>
          </div>

          <div className="divide-y divide-[#F2ECE3] overflow-x-auto">
            {sellers.map((seller) => {
              const availability = formatAvailability(seller.isAvailable, "seller");
              const sellerDishes = dishes.filter((d) => d.sellerId === seller.id);

              return (
                <div
                  key={seller.id}
                  className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={seller.avatar}
                        alt={seller.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">
                          {seller.kitchenName}
                        </span>
                        <span className="text-xs text-stone-500">
                          ({seller.name})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <span>{seller.location}</span>
                        <span>•</span>
                        <span>{sellerDishes.length} menu dishes</span>
                        <span>•</span>
                        <span className="font-medium text-stone-700">
                          {formatRating(seller.rating, seller.reviewCount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="hidden sm:block text-right">
                      <div className="font-semibold text-stone-800">
                        {seller.fssaiNumber}
                      </div>
                      <div className="text-[11px] text-[#324C33]">
                        {seller.hygieneRating}
                      </div>
                    </div>

                    <Badge
                      variant={seller.isAvailable ? "sage" : "neutral"}
                      size="sm"
                      dot
                    >
                      {availability.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
