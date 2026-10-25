import { BUSINESS_CONFIG } from "../config/business";
import { ShippingInquiryFormData, TrackingInquiryFormData } from "../types/inquiry";

/**
 * Builds a standardized, human-readable WhatsApp message for a shipping inquiry.
 */
export function buildShippingInquiryMessage(data: ShippingInquiryFormData): string {
  const emailDisplay = data.email?.trim() || "Not Provided";
  const weightDisplay = data.estimatedWeight?.trim() || "Not Specified";
  const preferredTimeDisplay = data.preferredContactTime?.trim() || "Not Specified";
  const notesDisplay = data.additionalNotes?.trim() || "None";

  return [
    `New Shipping Inquiry — ${BUSINESS_CONFIG.name}`,
    ``,
    `Customer Name: ${data.fullName.trim()}`,
    `Contact Number: ${data.contactNumber.trim()}`,
    `Email: ${emailDisplay}`,
    `Shipment Type: ${data.shipmentType}`,
    `Pickup City: ${data.pickupCity.trim()}`,
    `Destination: ${data.destination.trim()}`,
    `Estimated Weight: ${weightDisplay}`,
    `Preferred Contact Time: ${preferredTimeDisplay}`,
    `Shipment Description: ${data.shipmentDescription.trim()}`,
    `Additional Notes: ${notesDisplay}`,
    ``,
    `Please contact me regarding this shipment and provide the applicable shipping options and quotation.`,
  ].join("\n");
}

/**
 * Builds a standardized WhatsApp message for a tracking assistance request.
 */
export function buildTrackingInquiryMessage(data: TrackingInquiryFormData): string {
  const notesDisplay = data.notes?.trim() || "None";

  return [
    `Shipment Tracking Assistance — ${BUSINESS_CONFIG.name}`,
    ``,
    `Tracking / Reference Number: ${data.trackingNumber.trim()}`,
    `Customer Name: ${data.fullName.trim()}`,
    `Contact Number: ${data.contactNumber.trim()}`,
    `Additional Notes: ${notesDisplay}`,
    ``,
    `Please help me check the current shipment status and latest transit update for this consignment.`,
  ].join("\n");
}

/**
 * Generates the official WhatsApp wa.me URL with properly encoded message.
 */
export function generateWhatsAppUrl(messageText: string): string {
  const recipient = BUSINESS_CONFIG.whatsappNumber; // e.g. "917623909477"
  const encodedMessage = encodeURIComponent(messageText);
  return `https://wa.me/${recipient}?text=${encodedMessage}`;
}

/**
 * Generates direct general chat URL.
 */
export function generateDirectWhatsAppChatUrl(): string {
  const greeting = `Hello ${BUSINESS_CONFIG.name}, I would like to enquire about your courier services.`;
  return generateWhatsAppUrl(greeting);
}

/**
 * Initiates the WhatsApp handoff.
 * Returns true if a window was opened, or false if blocked by a browser popup blocker.
 */
export function initiateWhatsAppHandoff(url: string): boolean {
  try {
    const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === "undefined") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
