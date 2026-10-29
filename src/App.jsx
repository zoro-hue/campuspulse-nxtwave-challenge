import React from 'react';
import { useCampaign } from './context/CampaignContext';
import GrassBackground from './components/GrassBackground';
import Navbar from './components/Navbar';
import LeftNavRail from './components/LeftNavRail';
import CampaignPlanModal from './components/CampaignPlanModal';
import WhatsAppOutreachModal from './components/WhatsAppOutreachModal';
import InteractiveHedgehogMode from './components/InteractiveHedgehogMode';

import OverviewScreen from './screens/OverviewScreen';
import ChannelPlanningScreen from './screens/ChannelPlanningScreen';
import ReferralScenariosScreen from './screens/ReferralScenariosScreen';
import NextActionsScreen from './screens/NextActionsScreen';
import AboutDocsScreen from './screens/AboutDocsScreen';
import RegistrationsScreen from './screens/RegistrationsScreen';
import AmbassadorScreen from './screens/AmbassadorScreen';
import WhatsAppOutreachScreen from './screens/WhatsAppOutreachScreen';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const { activeTab, toastMessage } = useCampaign();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewScreen />;
      case 'channels':
        return <ChannelPlanningScreen />;
      case 'referrals':
        return <ReferralScenariosScreen />;
      case 'ambassadors':
        return <AmbassadorScreen />;
      case 'registrations':
      case 'register':
        return <RegistrationsScreen />;
      case 'whatsapp':
      case 'experiments':
        return <WhatsAppOutreachScreen />;
      case 'actions':
        return <NextActionsScreen />;
      case 'docs':
        return <AboutDocsScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <GrassBackground>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Workspace Container */}
      <main className="w-full max-w-[1240px] mx-auto px-2 sm:px-4 pt-2 pb-8 sm:pb-12 flex-1 flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 relative z-10">
        {/* Left Navigation Rail */}
        <LeftNavRail />

        {/* Center / Main Rounded Application Surface Panel */}
        <section className="flex-1 min-w-0 bg-[#eaedda] border border-[#c4d2b2] rounded-[24px] shadow-ph-panel p-4 sm:p-6 lg:p-7 relative flex flex-col justify-between overflow-hidden">
          {/* Active Screen Content */}
          <div className="relative z-10 w-full">
            {renderActiveScreen()}
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div
            className={`px-4 py-3 rounded-xl shadow-lg border flex items-center space-x-2 text-xs sm:text-sm font-bold ${
              toastMessage.type === 'error'
                ? 'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                : 'bg-[#151b2b] text-[#f4f3e9] border-[#2d3a4f]'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#85bb75]" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Modals & Hedgehog Mode */}
      <CampaignPlanModal />
      <WhatsAppOutreachModal />
      <InteractiveHedgehogMode />
    </GrassBackground>
  );
}
