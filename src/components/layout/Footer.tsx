"use client";

import React from "react";
import Link from "next/link";
import { UtensilsCrossed, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#ECE5DC] bg-[#F7F2EB] text-stone-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C85A32] flex items-center justify-center text-white">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-stone-900 tracking-tight">
                SheCook
              </span>
            </div>
            <p className="text-sm font-medium text-[#C85A32]">
              &ldquo;Her Passion. Her Kitchen. Her Business.&rdquo;
            </p>
            <p className="text-xs text-stone-600 max-w-md leading-relaxed">
              Empowering home chefs and women culinary entrepreneurs with a
              modern, trustworthy digital marketplace for wholesome, hygienic
              home-cooked meals.
            </p>
          </div>

          {/* Platform Portal Routes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
              Navigation & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-stone-600 hover:text-[#C85A32] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/customer"
                  className="text-stone-600 hover:text-[#C85A32] transition-colors"
                >
                  Explore Food
                </Link>
              </li>
              <li>
                <Link
                  href="/customer"
                  className="text-stone-600 hover:text-[#C85A32] transition-colors"
                >
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/seller"
                  className="text-stone-600 hover:text-[#C85A32] transition-colors"
                >
                  Food Seller (Chef) Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-stone-600 hover:text-[#C85A32] transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Notice */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Project Scope</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Developed as a college engineering project for women empowerment &
              hyperlocal food delivery research. All vendor accounts and orders
              are demo representations.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#ECE5DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 SheCook. Built for academic demonstration.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C85A32] fill-current" />
            <span>for home chefs everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
