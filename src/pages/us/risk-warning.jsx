// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, AlertCircle, Info, Shield, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card } from '@/components/ui';


// Fixed locale (separate per-country pages; no i18n)
const isUS = true;

export default function RiskWarning(props) {
  const {
    toast
  } = useToast();
  const {
    navigateBack,
    navigateTo
  } = props.$w.utils;
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{'Back'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">{'Risk notice'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Main Warning Card */}
        <Card className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700 mb-2">
                {'Risk notice: common risks of “debt settlement / negotiation agencies”'}
              </h2>
              <p className="text-xs md:text-sm text-amber-600 leading-relaxed">
                {'Note: Some services marketed as “debt settlement”, “debt optimization”, or “negotiation agents” may carry significant risk.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Common Risk Signals */}
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
            <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700">
              {'Common red flags'}
            </h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {['Ask for upfront fees or deposits', 'Promise “guaranteed success” or “inside channels”', 'Request sensitive info (ID/SSN, bank details, verification codes)', 'Ask you to transfer money to a personal account or non-official channel'].map((item, index) => <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-amber-600">
                <span className="text-amber-500 mt-1 flex-shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>)}
          </ul>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-blue-700">
              Recommendations
            </h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {['Start with the original creditor’s official channels', 'Be cautious with third-party agents or brokers'].map((item, index) => <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-blue-600">
                <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>)}
          </ul>
        </Card>

        {/* Important Notice */}
        <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-start gap-2 md:gap-3">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-blue-700 mb-2">
                {'Important'}
              </h3>
              <ul className="text-xs md:text-sm text-blue-600 space-y-2 md:space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{'This product does not provide agency services and does not charge negotiation-related fees.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{'All information is general guidance and not legal advice or a guarantee of outcome.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{'For legal advice, consult a licensed attorney in your jurisdiction.'}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="text-center">
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              {'⚠️ This product provides general information only and is not legal advice or a guarantee of outcome.'}
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 md:gap-4">
          <Button onClick={navigateBack} variant="outline" className="flex-1 text-xs md:text-sm">
            {'Back to results'}
          </Button>
          <Button onClick={() => navigateTo({
          pageId: 'us/solutions'
        })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
            {'View solutions'}
          </Button>
        </div>
      </main>
    </div>;
}