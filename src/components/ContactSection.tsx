import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Navigation,
  ExternalLink,
  Building2,
  CheckCircle,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { generateDirectWhatsAppChatUrl } from "../lib/whatsapp";

export const ContactSection: React.FC = () => {
  const directWhatsAppUrl = generateDirectWhatsAppChatUrl();

  return (
    <section id="contact" className="py-20 bg-[#F4F7FB] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D7192D]">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight">
            Contact Mishva International Courier Service
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our team in Chandkheda, Ahmedabad, is ready to help you with shipment inquiries, door pickup coordination, and international documentation guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details & 4 Action Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Direct Phone / WhatsApp
                  </span>
                  <p className="text-base font-bold text-[#0B2D5C] mb-1">
                    {BUSINESS_CONFIG.phone}
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Available for direct calls and shipping consultations.
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-[#0B2D5C] hover:bg-[#123F7A] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#123F7A] flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Official Email
                  </span>
                  <p className="text-sm font-bold text-[#0B2D5C] break-all mb-1">
                    {BUSINESS_CONFIG.email}
                  </p>
                  <p className="text-xs text-slate-500 mb-4">
                    Send commercial invoices, documents, or inquiries.
                  </p>
                </div>
                <div>
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#0B2D5C] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B2D5C] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Office Address
                    </span>
                    <h3 className="text-base font-bold text-[#0B2D5C]">
                      Satymev Arcade Branch, Chandkheda
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {BUSINESS_CONFIG.address.full}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{BUSINESS_CONFIG.hours}</span>
                </div>

                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 px-4 text-xs font-bold text-white bg-[#0B2D5C] hover:bg-[#123F7A] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-400" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Reference & Brand Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Official Business Card Reference
                </span>
                <h3 className="text-base font-bold text-[#0B2D5C] mb-3">
                  Verified Contact Information
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  The verified contact banner issued for Mishva International Courier Service:
                </p>

                {/* Contact Banner Image Card */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#071F3F] p-3 shadow-inner">
                  <img
                    src={BUSINESS_CONFIG.assets.contactBanner}
                    alt="Mishva International Courier Service Official Contact Banner"
                    className="w-full h-auto object-contain rounded-sm"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2D5C]">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep Pickup &amp; Walk-ins Welcome</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Located near Satymev Hospital in Chandkheda, serving clients across Ahmedabad and Gandhinagar with parcel drop-off and pickup assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
