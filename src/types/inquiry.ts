/**
 * Strongly typed inquiry models and shipment categories for Mishva International Courier Service.
 */

export type ShipmentType =
  | "International Courier"
  | "Domestic Courier"
  | "Documents"
  | "Parcel / Package"
  | "Business Shipment"
  | "Other";

export interface ShippingInquiryFormData {
  fullName: string;
  contactNumber: string;
  email?: string;
  shipmentType: ShipmentType;
  pickupCity: string;
  destination: string;
  estimatedWeight?: string;
  preferredContactTime?: string;
  shipmentDescription: string;
  additionalNotes?: string;
}

export interface InquiryFormErrors {
  fullName?: string;
  contactNumber?: string;
  email?: string;
  shipmentType?: string;
  pickupCity?: string;
  destination?: string;
  shipmentDescription?: string;
}

export interface TrackingInquiryFormData {
  trackingNumber: string;
  fullName: string;
  contactNumber: string;
  notes?: string;
}

export interface TrackingFormErrors {
  trackingNumber?: string;
  fullName?: string;
  contactNumber?: string;
}
