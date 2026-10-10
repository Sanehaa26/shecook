"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  Store,
  ChefHat,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useSheCook } from "@/context/SheCookContext";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { sellers } = useSheCook();

  const activeSellersCount = sellers.filter((s) => s.isAvailable).length;

  const mainLinks = [
    {
      name: "Home",
      href: "/",
      icon: Sparkles,
      exact: true,
    },
    {
      name: "Explore Food",
      href: "/customer",
      icon: UtensilsCrossed,
      exact: false,
    },
  ];

  const portalLinks = [
    {
      name: "Customer",
      href: "/customer",
      icon: Store,
    },
    {
      name: "Food Seller",
      href: "/seller",
      icon: ChefHat,
    },
    {
      name: "Admin",
      href: "/admin",
      icon: ShieldCheck,
    },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#ECE5DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C85A32] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 duration-200">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-stone-900 group-hover:text-[#C85A32] transition-colors">
                  SheCook
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#FBEBE5] text-[#923A1A] px-2 py-0.5 rounded-full border border-[#F6D4C7]/60">
                  Homemade
                </span>
              </div>
              <span className="text-[11px] text-stone-500 font-medium hidden sm:inline-block">
                Her Passion. Her Kitchen. Her Business.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-white text-[#C85A32] shadow-xs border border-[#ECE5DC] font-semibold"
                      : "text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-[#C85A32]" : "text-stone-500"
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="h-4 w-px bg-stone-300 mx-1.5" />

            <div className="flex items-center gap-1">
              {portalLinks.map((link) => {
                const active = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-white text-[#C85A32] shadow-xs border border-[#ECE5DC] font-semibold"
                        : "text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-[#C85A32]" : "text-stone-500"
                      }`}
                    />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Status Badge & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/customer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3EB] border border-[#CDE1CE] text-xs font-medium text-[#2C4A2D] hover:bg-[#E1EDE1] transition-colors"
              title="Real-time open kitchen status from shared state"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#426343] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#426343]"></span>
              </span>
              <span>
                {activeSellersCount} {activeSellersCount === 1 ? "Kitchen" : "Kitchens"} Open
              </span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-[#F2ECE3] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ECE5DC] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-2">
          <div className="px-3 py-2 bg-[#EBF3EB] rounded-xl text-xs font-medium text-[#2C4A2D] flex items-center justify-between">
            <span>Kitchen Availability:</span>
            <span className="font-semibold">
              {activeSellersCount} / {sellers.length} Active
            </span>
          </div>

          <div className="space-y-1">
            {mainLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-white text-[#C85A32] font-semibold border border-[#ECE5DC]"
                      : "text-stone-700 hover:bg-[#F2ECE3]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-[#C85A32]" : "text-stone-500"
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#ECE5DC]">
            <div className="px-3.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Platform Portals
            </div>
            {portalLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-white text-[#C85A32] font-semibold border border-[#ECE5DC]"
                      : "text-stone-700 hover:bg-[#F2ECE3]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-[#C85A32]" : "text-stone-500"
                    }`}
                  />
                  <span>{link.name} Portal</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
