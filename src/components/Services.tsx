import React from "react";
import {
  Globe,
  Truck,
  FileCheck,
  PackageCheck,
  Building,
  HeadphonesIcon,
  ArrowRight,
  Shield,
  Clock,
  Check,
} from "lucide-react";
import { ShipmentType } from "../types/inquiry";

interface ServicesProps {
  onSelectService: (service: ShipmentType) => void;
}

interface ServiceItem {
  id: ShipmentType;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tag: string;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services: ServiceItem[] = [
    {
      id: "International Courier",
      title: "International Courier",
      description:
        "Comprehensive worldwide shipping assistance for personal and commercial items, connecting Ahmedabad to global destinations with custom clearance guidance.",
      icon: <Globe className="w-6 h-6 text-[#0B2D5C]" />,
      features: [
        "Worldwide cross-border shipment coordination",
        "Export documentation and packing guidance",
        "Personalized rates based on destination and weight",
      ],
      tag: "Global Reach",
    },
    {
      id: "Domestic Courier",
      title: "Domestic Courier",
      description:
        "Reliable state-wide and pan-India courier solutions for timely transit of urgent parcels, samples, and consignments across all major Indian cities.",
      icon: <Truck className="w-6 h-6 text-[#123F7A]" />,
      features: [
        "Pan-India network coordination",
        "Doorstep pickup assistance across Ahmedabad",
        "Flexible transit solutions for critical deliveries",
      ],
      tag: "All-India",
    },
    {
      id: "Documents",
      title: "Document Shipping",
      description:
        "Specialized handling for critical university applications, passports, contracts, legal papers, and business documents requiring attentive care.",
      icon: <FileCheck className="w-6 h-6 text-[#D7192D]" />,
      features: [
        "Tamper-evident waterproof protective packing",
        "Priority document routing and dispatch care",
        "Prompt status updates via WhatsApp",
      ],
      tag: "High Priority",
    },
    {
      id: "Parcel / Package",
      title: "Parcel & Package Delivery",
      description:
        "Careful delivery of cartons, personal gifts, clothing, student luggage, and assorted goods with careful packing advice and weight-optimized rates.",
      icon: <PackageCheck className="w-6 h-6 text-[#0B2D5C]" />,
      features: [
        "Small parcel to heavy multi-box consignments",
        "Packaging support for fragile and delicate items",
        "Transparent pricing tailored to box dimensions",
      ],
      tag: "Secure Care",
    },
    {
      id: "Business Shipment",
      title: "Business Shipping Inquiries",
      description:
        "Tailored shipping support for commercial enterprises, manufacturers, and trade exporters needing scheduled dispatches and commercial invoice advice.",
      icon: <Building className="w-6 h-6 text-[#123F7A]" />,
      features: [
        "Commercial invoice & packing list review",
        "Support for commercial samples and recurring freight",
        "Dedicated direct account communication",
      ],
      tag: "Corporate",
    },
    {
      id: "Other",
      title: "Customized Shipping Assistance",
      description:
        "Unique or non-standard shipments requiring specialized routing, urgent timelines, or custom packaging solutions. Discuss your specific case directly.",
      icon: <HeadphonesIcon className="w-6 h-6 text-[#D7192D]" />,
      features: [
        "Direct one-on-one consultation with shipping specialist",
        "Evaluation of restricted and special goods requirements",
        "Tailored solutions for complex delivery itineraries",
      ],
      tag: "Tailored",
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#F4F7FB] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D7192D]">
            Our Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight">
            Comprehensive Courier &amp; Logistics Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From urgent overseas legal documents to domestic commercial shipments, Mishva International Courier Service provides hands-on coordination and personalized quotes.
          </p>
        </div>

        {/* 6 Service Cards Grid (Asymmetric Bento/Card Rhythm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-50/50 transition-all">
                    {service.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B2D5C] mb-2.5 group-hover:text-[#123F7A] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#0B2D5C] bg-slate-50 hover:bg-[#D7192D] hover:text-white border border-slate-200 hover:border-[#D7192D] rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footnote / Honest Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Need a specific destination quote or custom advice? Contact our team directly on WhatsApp with your parcel weight and destination details for accurate pricing.
          </p>
        </div>
      </div>
    </section>
  );
};
