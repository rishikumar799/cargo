import React from "react";
import {
  ClipboardList,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface HowItWorksProps {
  onOpenQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      step: "01",
      title: "Tell Us About Your Shipment",
      description:
        "Provide basic shipment information such as pickup location, destination, approximate weight, and package type using our simple inquiry form.",
      icon: <ClipboardList className="w-6 h-6 text-[#0B2D5C]" />,
    },
    {
      step: "02",
      title: "Submit Your Shipping Inquiry",
      description:
        "Your details are automatically compiled into a clear, structured message ready to transmit directly to our official WhatsApp number (+91 76239 09477).",
      icon: <Send className="w-6 h-6 text-[#123F7A]" />,
    },
    {
      step: "03",
      title: "Discuss Details With Our Team",
      description:
        "Our logistics coordinator reviews your requirement, answers queries, explains customs or packaging guidelines, and provides suitable quote options.",
      icon: <MessageCircle className="w-6 h-6 text-[#25D366]" />,
    },
    {
      step: "04",
      title: "Confirm Shipping Arrangements",
      description:
        "Finalize transit timelines, arrange doorstep pickup in Ahmedabad or drop-off at our Chandkheda office, and obtain consignment documentation.",
      icon: <CheckCircle className="w-6 h-6 text-[#D7192D]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D7192D]">
            Simple &amp; Transparent
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2D5C] tracking-tight">
            How Shipping With Mishva Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We prioritize personal consultation over automated guesswork so you get accurate pricing and the right shipping instructions every time.
          </p>
        </div>

        {/* 4 Steps: Horizontal Timeline on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-1/4 left-12 right-12 h-0.5 bg-slate-200 -z-0" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative z-10 flex flex-col bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-black text-[#0B2D5C]/30 font-mono">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
              </div>

              <h3 className="text-base font-bold text-[#0B2D5C] mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Clear Booking Clarification Notice */}
        <div className="mt-12 max-w-3xl mx-auto bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-slate-800">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <span className="font-bold text-[#0B2D5C] block">
              Inquiry Clarification:
            </span>
            <p className="text-slate-700 leading-relaxed">
              Submitting an inquiry message via WhatsApp connects you directly with our logistics team to discuss rates, dimensions, and documentation. It is not an automated booking or charge. Formal shipment confirmation occurs directly after terms and paperwork are finalized with our team.
            </p>
          </div>
        </div>

        {/* Centered CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#0B2D5C] hover:bg-[#123F7A] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Start Your Shipping Inquiry</span>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
