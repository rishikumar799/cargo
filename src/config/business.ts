/**
 * Centralized business configuration for Mishva International Courier Service.
 * Preserves exact business information, address, and WhatsApp contact details.
 */

export const BUSINESS_CONFIG = {
  name: "Mishva International Courier Service",
  shortName: "Mishva Courier",
  tagline: "Your World, Delivered Without Boundaries",
  description:
    "Reliable courier solutions for your documents, parcels, and international shipping needs. Connect with Mishva International Courier Service for personalized shipping assistance.",
  phone: "+91 76239 09477",
  phoneRaw: "+917623909477",
  whatsappNumber: "917623909477", // E.164 without '+' or spaces for wa.me URL
  email: "mishvainternationalcourier@gmail.com",
  address: {
    line1: "FF, Satymev Arcade",
    line2: "Near Satymev Hospital, Chandkheda",
    city: "Ahmedabad",
    state: "Gujarat",
    postalCode: "382424",
    country: "India",
    full: "FF, Satymev Arcade, Near Satymev Hospital, Chandkheda, Ahmedabad, Gujarat 382424, India",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Satymev+Arcade+Near+Satymev+Hospital+Chandkheda+Ahmedabad+Gujarat+382424",
  assets: {
    logo: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.26.59_PM__3__fc3f0519.jpeg",
    contactBanner: "/assets/aistudio/WhatsApp_Image_2026-10-25_at_1.26.59_PM__2__287ad804.jpeg",
  },
  socials: {
    whatsappDirect: "https://wa.me/917623909477",
  },
  hours: "Monday – Saturday: 9:30 AM – 8:00 PM (IST)",
};
