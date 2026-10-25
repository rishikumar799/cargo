/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { HowItWorks } from "./components/HowItWorks";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TrackingInquiry } from "./components/TrackingInquiry";
import { QuoteBanner } from "./components/QuoteBanner";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { InquiryModal } from "./components/InquiryModal";
import { ShipmentType } from "./types/inquiry";

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedShipmentType, setSelectedShipmentType] = useState<ShipmentType | "">("");

  const handleOpenQuote = (service?: ShipmentType) => {
    setSelectedShipmentType(service || "");
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] text-[#17243A]">
      {/* Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenQuote={handleOpenQuote} />

        {/* Services Section */}
        <Services onSelectService={(service) => handleOpenQuote(service)} />

        {/* How It Works Section */}
        <HowItWorks onOpenQuote={() => handleOpenQuote()} />

        {/* Why Choose Mishva Section */}
        <WhyChooseUs />

        {/* Shipment Tracking Assistance Section */}
        <TrackingInquiry />

        {/* Action Quote Banner */}
        <QuoteBanner onOpenQuote={() => handleOpenQuote()} />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={(service) => handleOpenQuote(service)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp />

      {/* Reusable Universal WhatsApp Inquiry Modal */}
      <InquiryModal
        isOpen={isQuoteModalOpen}
        initialShipmentType={selectedShipmentType}
        onClose={handleCloseQuote}
      />
    </div>
  );
}
