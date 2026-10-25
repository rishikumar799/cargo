import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  PackageCheck,
  Building2,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import {
  ShipmentType,
  ShippingInquiryFormData,
  InquiryFormErrors,
} from "../types/inquiry";
import {
  buildShippingInquiryMessage,
  generateWhatsAppUrl,
  initiateWhatsAppHandoff,
} from "../lib/whatsapp";

interface InquiryModalProps {
  isOpen: boolean;
  initialShipmentType?: ShipmentType | "";
  onClose: () => void;
}

const SHIPMENT_OPTIONS: ShipmentType[] = [
  "International Courier",
  "Domestic Courier",
  "Documents",
  "Parcel / Package",
  "Business Shipment",
  "Other",
];

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  initialShipmentType = "",
  onClose,
}) => {
  const [formData, setFormData] = useState<ShippingInquiryFormData>({
    fullName: "",
    contactNumber: "",
    email: "",
    shipmentType: (initialShipmentType as ShipmentType) || "International Courier",
    pickupCity: "Ahmedabad",
    destination: "",
    estimatedWeight: "",
    preferredContactTime: "",
    shipmentDescription: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyForWhatsApp, setReadyForWhatsApp] = useState<{
    url: string;
    messageText: string;
    popupBlocked: boolean;
  } | null>(null);

  // Sync initialShipmentType when opened
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        shipmentType: (initialShipmentType as ShipmentType) || "International Courier",
      }));
      setErrors({});
      setReadyForWhatsApp(null);
      setIsSubmitting(false);
    }
  }, [isOpen, initialShipmentType]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: InquiryFormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const cleanPhone = formData.contactNumber.replace(/[\s\-\+\(\)]/g, "");
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (cleanPhone.length < 8) {
      newErrors.contactNumber = "Please enter a valid phone or WhatsApp number";
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.shipmentType) {
      newErrors.shipmentType = "Please select a shipment category";
    }

    if (!formData.pickupCity.trim()) {
      newErrors.pickupCity = "Pickup city is required";
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination city / country is required";
    }

    if (!formData.shipmentDescription.trim()) {
      newErrors.shipmentDescription = "Please briefly describe the contents";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const message = buildShippingInquiryMessage(formData);
    const url = generateWhatsAppUrl(message);

    // Attempt handoff
    const success = initiateWhatsAppHandoff(url);

    // Show ready state with confirmation & fallback link
    setReadyForWhatsApp({
      url,
      messageText: message,
      popupBlocked: !success,
    });
    setIsSubmitting(false);
  };

  const handleManualLaunch = () => {
    if (readyForWhatsApp) {
      window.open(readyForWhatsApp.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B2D5C] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
              <PackageCheck className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 id="inquiry-modal-title" className="text-xl font-bold tracking-tight text-white">
                Request a Shipping Quote
              </h2>
              <p className="text-xs text-slate-300">
                Direct WhatsApp inquiry to {BUSINESS_CONFIG.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {readyForWhatsApp ? (
            /* Confirmation & Handoff Screen */
            <div className="space-y-6 py-2">
              <div className="rounded-xl bg-blue-50/80 border border-blue-200 p-5 text-slate-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#123F7A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-base text-[#0B2D5C]">
                      Your inquiry details are prepared!
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      WhatsApp has been prepared with your structured inquiry.
                      <span className="font-medium text-slate-900 block mt-1">
                        Important: Please tap &ldquo;Send&rdquo; inside WhatsApp to dispatch the message to our team.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {readyForWhatsApp.popupBlocked && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Your browser blocked the popup. Click the button below to proceed to WhatsApp.
                  </span>
                </div>
              )}

              {/* Message Preview Box */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Formatted WhatsApp Message Preview
                </label>
                <pre className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {readyForWhatsApp.messageText}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleManualLaunch}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Continue to WhatsApp</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>
                <button
                  type="button"
                  onClick={() => setReadyForWhatsApp(null)}
                  className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Edit Details
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Direct number: <span className="font-semibold text-slate-700">{BUSINESS_CONFIG.phone}</span> · Chandkheda, Ahmedabad
                </p>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="text-xs text-slate-600 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Fields marked with <span className="text-red-500 font-bold">*</span> are required.</span>
                <span className="text-slate-400">No login or prepayment required</span>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Patel"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.fullName ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                    } focus:outline-hidden focus:ring-2 transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry-contactNumber" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-contactNumber"
                    type="tel"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.contactNumber ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                    } focus:outline-hidden focus:ring-2 transition-all`}
                  />
                  {errors.contactNumber && (
                    <p className="text-xs text-red-600 mt-1">{errors.contactNumber}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Shipment Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.email ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                    } focus:outline-hidden focus:ring-2 transition-all`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry-shipmentType" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Shipment Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiry-shipmentType"
                    value={formData.shipmentType}
                    onChange={(e) => setFormData({ ...formData, shipmentType: e.target.value as ShipmentType })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-[#0B2D5C] focus:ring-2 focus:ring-[#0B2D5C]/20 focus:outline-hidden transition-all text-slate-800"
                  >
                    {SHIPMENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Pickup City & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-pickupCity" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pickup Location / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-pickupCity"
                    type="text"
                    required
                    value={formData.pickupCity}
                    onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                    placeholder="e.g. Ahmedabad, Gujarat"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.pickupCity ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                    } focus:outline-hidden focus:ring-2 transition-all`}
                  />
                  {errors.pickupCity && (
                    <p className="text-xs text-red-600 mt-1">{errors.pickupCity}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry-destination" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Destination City / Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry-destination"
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. London, UK or Mumbai, Maharashtra"
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.destination ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                    } focus:outline-hidden focus:ring-2 transition-all`}
                  />
                  {errors.destination && (
                    <p className="text-xs text-red-600 mt-1">{errors.destination}</p>
                  )}
                </div>
              </div>

              {/* Row 4: Weight & Contact Time (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-weight" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Estimated Weight <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="inquiry-weight"
                    type="text"
                    value={formData.estimatedWeight}
                    onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                    placeholder="e.g. 1.5 kg, 500g, 15 kg box"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-[#0B2D5C] focus:ring-2 focus:ring-[#0B2D5C]/20 focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-contactTime" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Contact Time <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="inquiry-contactTime"
                    type="text"
                    value={formData.preferredContactTime}
                    onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
                    placeholder="e.g. Morning, 2 PM - 5 PM, Urgent"
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:border-[#0B2D5C] focus:ring-2 focus:ring-[#0B2D5C]/20 focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Row 5: Description & Notes */}
              <div>
                <label htmlFor="inquiry-desc" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Shipment Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="inquiry-desc"
                  rows={2}
                  required
                  value={formData.shipmentDescription}
                  onChange={(e) => setFormData({ ...formData, shipmentDescription: e.target.value })}
                  placeholder="e.g. Personal legal documents, clothing samples, university transcripts, household gift item..."
                  className={`w-full px-3.5 py-2 text-sm bg-white rounded-lg border ${
                    errors.shipmentDescription ? "border-red-500 focus:ring-red-400" : "border-slate-300 focus:border-[#0B2D5C] focus:ring-[#0B2D5C]/20"
                  } focus:outline-hidden focus:ring-2 transition-all`}
                />
                {errors.shipmentDescription && (
                  <p className="text-xs text-red-600 mt-1">{errors.shipmentDescription}</p>
                )}
              </div>

              <div>
                <label htmlFor="inquiry-notes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Additional Notes or Questions <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="inquiry-notes"
                  type="text"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="e.g. Door pickup needed, urgent delivery inquiry, fragile packaging query..."
                  className="w-full px-3.5 py-2 text-sm bg-white rounded-lg border border-slate-300 focus:border-[#0B2D5C] focus:ring-2 focus:ring-[#0B2D5C]/20 focus:outline-hidden transition-all"
                />
              </div>

              {/* Notice Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#0B2D5C] shrink-0 mt-0.5" />
                <span>
                  Submitting creates a pre-formatted inquiry message directly to our official WhatsApp (<strong>{BUSINESS_CONFIG.phone}</strong>). You will be able to review and send it directly with our staff.
                </span>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#D7192D] hover:bg-[#BF1526] rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
