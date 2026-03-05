import React from 'react';
import { LandingSetting } from '@/hooks/useSettings';
import { Eye, EyeOff, Layout } from 'lucide-react';

interface LandingProps {
  landingSettings: LandingSetting[];
  updateLandingSetting: (id: string, isHidden: boolean) => Promise<void>;
}

export default function Landing({ landingSettings, updateLandingSetting }: LandingProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Layout className="w-5 h-5 text-blue-600" />
            Landing Visibility Management
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Toggle visibility of sections on the landing page
          </p>
        </div>
        
        <div className="divide-y divide-slate-100">
          {landingSettings.map((setting) => (
            <div key={setting.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <h3 className="font-medium text-slate-900">{setting.label}</h3>
                <p className="text-xs text-slate-500 mt-0.5">ID: {setting.name}</p>
              </div>
              
              <button
                onClick={() => updateLandingSetting(setting.id, !setting.isHidden)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  setting.isHidden
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                {setting.isHidden ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hidden
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Visible
                  </>
                )}
              </button>
            </div>
          ))}
          
          {landingSettings.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No landing settings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
