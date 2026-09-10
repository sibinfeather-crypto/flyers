import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomInquiryModal } from './components/CustomInquiryModal';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { TrackTyresPage } from './pages/TrackTyresPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { ProductItem } from './types';

export default function App() {
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [inquiryInitialTopic, setInquiryInitialTopic] = useState<string>('');

  const handleOpenInquiry = (topic?: string) => {
    setInquiryInitialTopic(topic || '');
    setIsInquiryModalOpen(true);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans selection:bg-[#E8302B] selection:text-white">
        {/* Sticky Racing Navigation Bar */}
        <Navbar onOpenInquiry={handleOpenInquiry} />

        {/* Dynamic Route Pages */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onSelectProduct={setActiveProductModal}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  onSelectProduct={setActiveProductModal}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/track-tyres"
              element={
                <TrackTyresPage
                  onSelectProduct={setActiveProductModal}
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  onOpenInquiry={handleOpenInquiry}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage />
              }
            />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Global Product Specification & Order Modal */}
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
        />

        {/* Global Custom Spare / Fitment WhatsApp Concierge Modal */}
        <CustomInquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          initialTopic={inquiryInitialTopic}
        />
      </div>
    </HashRouter>
  );
}
