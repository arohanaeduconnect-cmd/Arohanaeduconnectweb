import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisualShowcase } from './components/VisualShowcase';
import { About } from './components/About';
import { Services } from './components/Services';
import { Courses } from './components/Courses';
import { Colleges } from './components/Colleges';
import { Roadmap } from './components/Roadmap';
import { RegistrationForm } from './components/RegistrationForm';
import { StudentSuccessStories } from './components/StudentSuccessStories';
import { Trust } from './components/Trust';
import { GlobalEdu } from './components/GlobalEdu';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AppsScriptSettingsModal } from './components/AppsScriptSettingsModal';
import { isAppsScriptUrlConfigured } from './services/appsScriptService';

export default function App() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [endpointConfigured, setEndpointConfigured] = useState(isAppsScriptUrlConfigured());

  const handleEndpointUpdated = (newUrl: string) => {
    setEndpointConfigured(isAppsScriptUrlConfigured(newUrl));
  };

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans selection:bg-[#00A6A6]/20 selection:text-[#123B6D]">
      <Header
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        isEndpointConfigured={endpointConfigured}
      />

      <main className="w-full pt-20 bg-white flex-1">
        <Hero />
        <VisualShowcase />
        <About />
        <Services />
        <Courses />
        <Colleges />
        <Roadmap />
        
        {/* Student Registration Form with automatic Google Apps Script submission */}
        <RegistrationForm
          onOpenEndpointSettings={() => setIsSettingsModalOpen(true)}
        />

        {/* Student Success Stories & Testimonials */}
        <StudentSuccessStories />

        <Trust />
        <GlobalEdu />
        <Contact />
      </main>

      <Footer />

      {/* Google Apps Script Web App Endpoint Settings Modal */}
      <AppsScriptSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onEndpointUpdated={handleEndpointUpdated}
      />
    </div>
  );
}
