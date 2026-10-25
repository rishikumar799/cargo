import React, { useState } from "react";
import {
  Search,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Package,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { TrackingInquiryFormData, TrackingFormErrors } from "../types/inquiry";
import {
  buildTrackingInquiryMessage,
  generateWhatsAppUrl,
  initiateWhatsAppHandoff,
} from "../lib/whatsapp";

export const TrackingInquiry: React.FC = () => {
  const [formData, setFormData] = useState<TrackingInquiryFormData>({
    trackingNumber: "",
    fullName: "",
    contactNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState<TrackingFormErrors>({});
  const [readyHandoff, setReadyHandoff] = useState<{
    url: string;
    messageText: string;
    popupBlocked: boolean;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: TrackingFormErrors = {};
    if (!formData.trackingNumber.trim()) {
      newErrors.trackingNumber = "Please enter your tracking or consignment number";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name";
    }
    const cleanPhone = formData.contactNumber.replace(/[\s\-\+\(\)]/g, "");
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Please enter your contact number";
    } else if (cleanPhone.length < 8) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildTrackingInquiryMessage(formData);
    const url = generateWhatsAppUrl(message);
    const success = initiateWhatsAppHandoff(url);

    setReadyHandoff({
      url,
      messageText: message,
      popupBlocked: !success,
    });
  };

  return (
    <section id="tracking" className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-xs">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D7192D]">
              Direct Tracking Assistance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D5C] tracking-tight">
              Inquire About Your Shipment Status
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Have an active consignment with Mishva? Provide your reference number below to connect with our operations desk on WhatsApp for an up-to-date tracking and location report.
            </p>
          </div>

          {/* Honest Notice: No fake live tracking */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 mb-8 flex items-start gap-3 text-slate-800 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 text-[#123F7A] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-[#0B2D5C]">Honest Status Lookup:</span>
              <p className="text-slate-600 leading-relaxed">
                We do not display simulated or automated tracking graphs. Your inquiry connects directly to our dispatch supervisor on WhatsApp (<strong>{BUSINESS_CONFIG.phone}</strong>), who verifies the carrier records and provides real status updates.
              </p>
            </div>
          </div>

          {readyHandoff ? (
            /* Ready / Confirmation screen */
            <div className="space-y-5 bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-[#0B2D5C]">
                    Tracking Inquiry Message Prepared
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    WhatsApp has been initialized with your consignment lookup request. Please tap &ldquo;Send&rdquo; inside WhatsApp to dispatch it to our desk.
                  </p>
                </div>
              </div>

              {readyHandoff.popupBlocked && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-xs text-amber-800 rounded-lg">
                  Browser popup was blocked. Click &ldquo;Continue to WhatsApp&rdquo; below.
                </div>
              )}

              <pre className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 whitespace-pre-wrap">
                {readyHandoff.messageText}
              </pre>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={readyHandoff.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Continue to WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setReadyHandoff(null)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors"
                >
                  Edit Number
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="track-number" className="block text-xs font-semibold text-slate-700 mb-1">
                    Tracking / AWB Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="track-number"
                    type="text"
                    required
                    value={formData.trackingNumber}
                    onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                    placeholder="e.g. MSH-94812"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                      errors.trackingNumber ? "border-red-500" : "border-slate-300 focus:border-[#0B2D5C]"
                    } focus:outline-hidden transition-all`}
                  />
                  {errors.trackingNumber && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.trackingNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="track-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Sender / Receiver Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="track-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your Full Name"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                      errors.fullName ? "border-red-500" : "border-slate-300 focus:border-[#0B2D5C]"
                    } focus:outline-hidden transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="track-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="track-phone"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                      errors.contactNumber ? "border-red-500" : "border-slate-300 focus:border-[#0B2D5C]"
                    } focus:outline-hidden transition-all`}
                  />
                  {errors.contactNumber && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.contactNumber}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="track-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific Query or Instructions <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="track-notes"
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Inquiring regarding delivery estimated date or customs clearance update..."
                  className="w-full px-3.5 py-2 text-xs bg-white rounded-lg border border-slate-300 focus:border-[#0B2D5C] focus:outline-hidden transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  Connects to dispatch desk via official WhatsApp
                </span>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0B2D5C] hover:bg-[#123F7A] rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-3.5 h-3.5 text-red-400" />
                  <span>Request Status Assistance on WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
