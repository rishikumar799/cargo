import React, { useState } from "react";
import {
  Globe2,
  Plane,
  ArrowRight,
  ShieldCheck,
  Clock3,
  MapPin,
  Sparkles,
  FileText,
  Package,
  PhoneCall,
  Search,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { ShipmentType } from "../types/inquiry";

interface HeroProps {
  onOpenQuote: (service?: ShipmentType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const [quickPickup, setQuickPickup] = useState("Ahmedabad");
  const [quickDestination, setQuickDestination] = useState("");
  const [quickType, setQuickType] = useState<ShipmentType>("International Courier");

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenQuote(quickType);
  };

  return (
    <section id="hero" className="relative bg-gradient-to-b from-[#0B2D5C] via-[#0F356B] to-[#123F7A] text-white pt-10 pb-20 overflow-hidden">
      {/* Background Graphic Shipping Routes & Globe Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Decorative Flight Path Arc (SVG) */}
      <div className="absolute top-1/4 right-0 w-1/2 h-1/2 pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 500 300" fill="none" className="w-full h-full">
          <path
            d="M 20 280 Q 250 50 480 80"
            stroke="#D7192D"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <circle cx="480" cy="80" r="5" fill="#D7192D" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Sub-banner / Trust Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-slate-200 mb-6">
          <Globe2 className="w-3.5 h-3.5 text-red-400" />
          <span>International &amp; Domestic Courier Inquiries</span>
          <span className="text-white/40">·</span>
          <span>Chandkheda, Ahmedabad</span>
        </div>

        {/* 2-Column Split: Content & Interactive Logistics Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Primary CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Your World, Delivered Without Boundaries.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Reliable courier solutions for your documents, parcels, and international shipping needs. Connect with Mishva International Courier Service for personalized shipping assistance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-[#D7192D] hover:bg-[#BF1526] rounded-xl shadow-lg hover:shadow-red-900/30 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Get a Shipping Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all whitespace-nowrap"
              >
                Explore Our Services
              </a>
            </div>

            {/* Supporting Trust Metrics & Features (Quiet Unboxed Metadata) */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-slate-300 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-red-400" />
                  International
                </span>
                <p className="text-slate-300 text-xs">Worldwide document &amp; parcel routing assistance</p>
              </div>

              <div className="space-y-1">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-300" />
                  Documents
                </span>
                <p className="text-slate-300 text-xs">Fast &amp; secure handling for critical paperwork</p>
              </div>

              <div className="space-y-1">
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Clock3 className="w-4 h-4 text-emerald-400" />
                  Personalized
                </span>
                <p className="text-slate-300 text-xs">Direct WhatsApp support with real staff</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Quote Card & Brand Showcase (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-7 relative overflow-hidden">
              {/* Subtle top brand accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2D5C] via-[#123F7A] to-[#D7192D]" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={BUSINESS_CONFIG.assets.logo}
                    alt="Mishva Courier Logo"
                    className="w-12 h-12 object-contain rounded-lg border border-slate-100 p-1 bg-white shadow-xs"
                  />
                  <div>
                    <h2 className="text-base font-bold text-[#0B2D5C]">
                      Quick Shipping Inquiry
                    </h2>
                    <p className="text-xs text-slate-500">
                      Fast quotes via WhatsApp
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Direct Team
                  </span>
                </div>
              </div>

              {/* Quick form */}
              <form onSubmit={handleQuickEstimate} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Shipment Category
                  </label>
                  <select
                    value={quickType}
                    onChange={(e) => setQuickType(e.target.value as ShipmentType)}
                    className="w-full px-3 py-2 text-xs font-medium bg-slate-50 rounded-lg border border-slate-200 focus:border-[#0B2D5C] focus:bg-white focus:outline-hidden"
                  >
                    <option value="International Courier">International Courier</option>
                    <option value="Domestic Courier">Domestic Courier</option>
                    <option value="Documents">Document Shipping</option>
                    <option value="Parcel / Package">Parcel / Package Delivery</option>
                    <option value="Business Shipment">Business Shipment</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Origin / Pickup
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={quickPickup}
                        onChange={(e) => setQuickPickup(e.target.value)}
                        placeholder="Pickup City"
                        className="w-full pl-8 pr-2.5 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:border-[#0B2D5C] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Destination
                    </label>
                    <div className="relative">
                      <Globe2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={quickDestination}
                        onChange={(e) => setQuickDestination(e.target.value)}
                        placeholder="City or Country"
                        className="w-full pl-8 pr-2.5 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:border-[#0B2D5C] focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#0B2D5C] hover:bg-[#123F7A] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>Proceed to WhatsApp Quote</span>
                    <ArrowRight className="w-4 h-4 text-red-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>No login needed</span>
                  <span>Direct reply to {BUSINESS_CONFIG.phone}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
