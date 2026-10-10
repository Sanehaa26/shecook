/**
 * Formatting utilities for SheCook
 * Provides standardized displays for currency, ratings, serving sizes, and availability.
 */

export function formatRupee(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(rating: number, reviewCount?: number): string {
  const formattedScore = rating.toFixed(1);
  if (reviewCount !== undefined) {
    return `★ ${formattedScore} (${reviewCount})`;
  }
  return `★ ${formattedScore}`;
}

export function formatServing(servingSize: string): string {
  if (!servingSize) return "Standard portion";
  if (servingSize.toLowerCase().startsWith("serves")) {
    return servingSize;
  }
  return `Serves ${servingSize}`;
}

export interface AvailabilityStatusInfo {
  label: string;
  badgeClass: string;
  dotClass: string;
  isAvailable: boolean;
  message: string;
}

export function formatAvailability(
  isAvailable: boolean,
  entityType: "seller" | "dish" = "dish"
): AvailabilityStatusInfo {
  if (entityType === "seller") {
    if (isAvailable) {
      return {
        label: "Kitchen Open",
        badgeClass: "bg-sage-50 text-sage-700 border-sage-200",
        dotClass: "bg-sage-600",
        isAvailable: true,
        message: "Accepting orders right now",
      };
    }
    return {
      label: "Kitchen Closed",
      badgeClass: "bg-stone-100 text-stone-600 border-stone-200",
      dotClass: "bg-stone-400",
      isAvailable: false,
      message: "Currently resting or taking advance pre-orders",
    };
  }

  // Dish availability
  if (isAvailable) {
    return {
      label: "Available Today",
      badgeClass: "bg-sage-50 text-sage-700 border-sage-200",
      dotClass: "bg-sage-600",
      isAvailable: true,
      message: "Freshly prepared upon order",
    };
  }
  return {
    label: "Sold Out",
    badgeClass: "bg-stone-100 text-stone-500 border-stone-200",
    dotClass: "bg-stone-400",
    isAvailable: false,
    message: "Sold out for today's batch",
  };
}
