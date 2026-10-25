import React from "react";
import { ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

interface QuoteBannerProps {
  onOpenQuote: () => void;
}

export const QuoteBanner: React.FC<QuoteBannerProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0B2D5C] via-[#0F356B] to-[#123F7A] text-white relative overflow-hidden">
      {/* Decorative background grid and accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="quote-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quote-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-xs">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
              Fast, Personable Service
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let&rsquo;s Get Your Shipment Moving.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Share a few shipment details, and we&rsquo;ll help you discuss the next steps directly with our team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#D7192D] hover:bg-[#BF1526] rounded-xl shadow-lg hover:shadow-red-950/40 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Request a Shipping Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-red-400" />
              <span>Call Us: {BUSINESS_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
