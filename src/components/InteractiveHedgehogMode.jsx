import React, { useState, useEffect } from 'react';
import { HedgehogModeRenderer } from '@posthog/hedgehog-mode';
import { useCampaign } from '../context/CampaignContext';
import { Sparkles, X, Wand2 } from 'lucide-react';

/**
 * InteractiveHedgehogMode integrates the official @posthog/hedgehog-mode package.
 * It renders live PixiJS animated hedgehogs that navigate and walk on UI platforms
 * (buttons, cards, headings) across CampusPulse when toggled on.
 */
export default function InteractiveHedgehogMode() {
  const { hedgehogMode, setHedgehogMode } = useCampaign();
  const [game, setGame] = useState(null);
  const [loadError, setLoadError] = useState(false);

  if (!hedgehogMode) return null;

  return (
    <>
      {/* Floating status widget in bottom right */}
      <div className="fixed bottom-4 right-4 z-50 bg-[#151b2b] text-[#cad5be] border border-[#f5a623] px-3 py-2 rounded-xl shadow-2xl flex items-center space-x-3 text-xs select-none animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center space-x-1.5 font-bold text-[#f5a623]">
          <Sparkles className="w-4 h-4 animate-spin text-[#f5a623]" style={{ animationDuration: '4s' }} />
          <span>Hedgehog Mode Active!</span>
        </div>
        <span className="text-[#8e9f80] hidden sm:inline">
          (Walking on cards & buttons)
        </span>
        <button
          onClick={() => setHedgehogMode(false)}
          className="p-1 rounded-md bg-[#252f40] hover:bg-[#344259] text-white transition-colors"
          title="Turn off Hedgehog Mode"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Official PostHog Hedgehog Mode PixiJS canvas overlay */}
      {!loadError && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <HedgehogModeRenderer
            config={{
              assetsUrl: '/assets', // Pointing to public/assets where sprites.json and sprites.png are
              platforms: {
                selector: '.ph-card, .ph-btn-orange, h1, button, table',
                viewportPadding: { top: 60, bottom: 20 },
              },
            }}
            onGameReady={(g) => {
              setGame(g);
            }}
            onError={(err) => {
              console.warn('HedgehogMode load error:', err);
              setLoadError(true);
            }}
          />
        </div>
      )}
    </>
  );
}

