import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowUpRight,
  Shield,
  Plane,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { ShipmentType } from "../types/inquiry";

interface FooterProps {
  onSelectService: (service: ShipmentType) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenQuote }) => {
  const currentYear = new Date().getFullYear();

  const servicesList: { label: string; type: ShipmentType }[] = [
    { label: "International Courier", type: "International Courier" },
    { label: "Domestic Courier", type: "Domestic Courier" },
    { label: "Document Shipping", type: "Documents" },
    { label: "Parcel & Package Delivery", type: "Parcel / Package" },
    { label: "Business Shipping Inquiries", type: "Business Shipment" },
    { label: "Customized Shipping Assistance", type: "Other" },
  ];

  return (
    <footer className="bg-[#071F3F] text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BUSINESS_CONFIG.assets.logo}
                alt="Mishva International Courier Service"
                className="h-12 w-auto object-contain rounded-md bg-white p-1"
              />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  MISHVA
                </span>
                <span className="text-[11px] font-semibold text-red-400 tracking-wider uppercase block">
                  International Courier
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Reliable courier solutions for your documents, parcels, and international shipping needs. Based in Chandkheda, Ahmedabad, connecting you with prompt, personalized logistics assistance.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp: {BUSINESS_CONFIG.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-white transition-colors">
                  Tracking Assistance
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Courier Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesList.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => onSelectService(s.type)}
                    className="hover:text-white text-slate-300 transition-colors text-left cursor-pointer inline-flex items-center gap-1 group"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Office & Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Office Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300">
                  {BUSINESS_CONFIG.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="hover:text-white transition-colors text-slate-300 break-all"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#D7192D] hover:bg-[#BF1526] rounded-lg transition-colors cursor-pointer"
              >
                <span>Request a Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Ahmedabad, Gujarat, India</span>
            <span>·</span>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Google Maps Location
            </a>
            <span>·</span>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
