import React from "react";
import {
  MessageCircle,
  UserCheck,
  Compass,
  Boxes,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      title: "Personalized Shipping Assistance",
      description:
        "Every consignment has unique needs. Rather than generic automated rate tables, we evaluate your item dimensions, urgency, and destination to suggest suitable shipping solutions.",
      icon: <UserCheck className="w-5 h-5 text-[#D7192D]" />,
    },
    {
      title: "Convenient WhatsApp Inquiry Process",
      description:
        "No complicated software, logins, or tedious account creation required. Send your shipment details directly to our staff on WhatsApp for rapid communication.",
      icon: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
    },
    {
      title: "Domestic & International Shipping Support",
      description:
        "Whether sending a packet across Gujarat or dispatching commercial and personal parcels worldwide, we assist you through domestic and international handling channels.",
      icon: <Compass className="w-5 h-5 text-[#0B2D5C]" />,
    },
    {
      title: "Direct Communication With Local Staff",
      description:
        "Speak directly with knowledgeable personnel based at our Chandkheda office who understand local logistics, packaging needs, and documentation essentials.",
      icon: <MapPin className="w-5 h-5 text-[#123F7A]" />,
    },
    {
      title: "Care for Documents & Fragile Parcels",
      description:
        "From university transcripts, certificates, and legal deeds to cartons and gifts, we advise on suitable packing and care to help your items travel securely.",
      icon: <Boxes className="w-5 h-5 text-[#0B2D5C]" />,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#F4F7FB] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Office Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D7192D] block mb-2">
                Why Mishva International
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight leading-tight">
                Trustworthy, Personable Courier Assistance
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At Mishva International Courier Service, we believe that sending shipments—especially international packages and time-sensitive documents—requires transparent guidance, responsive communication, and dependable local service.
            </p>

            {/* Office Info Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B2D5C]/10 flex items-center justify-center text-[#0B2D5C]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B2D5C]">
                    Office &amp; Receiving Hub
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chandkheda, Ahmedabad
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {BUSINESS_CONFIG.address.full}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Inquiries Welcome</span>
                <span className="font-semibold text-[#0B2D5C]">{BUSINESS_CONFIG.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Benefit Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2D5C] mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
