// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Shield, AlertTriangle, FileText, Scale, ArrowRight } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';


// Fixed locale (separate per-country pages; no i18n)
const isUS = true;
const T = (cn, en) => (isUS ? en : cn);


export default function Home(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo
  } = props.$w.utils;
  const today = new Date();
  const dateLabel = isUS ? today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : today.toLocaleDateString('zh-CN');
  const handleNavigate = (pageId, params = {}) => {
    navigateTo({
      pageId,
      params
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-4 md:py-6 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-[#F59E0B]" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-['Space_Grotesk']">DebtShield</h1>
              <p className="text-xs md:text-sm text-slate-300 hidden sm:block">Debt risk guidance & negotiation tips</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">{'Today'}</p>
            <p className="text-sm font-semibold">{dateLabel}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="col-span-1 md:col-span-7">
              <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] leading-tight mb-4 md:mb-6">
                Handle
                <span className="text-[#F59E0B]">Debt Risk</span>
              </h2>
              <p className="text-sm md:text-lg text-[#64748B] mb-6 md:mb-8 leading-relaxed">
                Practical, low-conflict guidance for dealing with debt collection. We help you document, respond calmly, and reduce risk.
                Not legal advice. For legal advice, consult a licensed attorney.
              </p>
              <button onClick={() => handleNavigate('us/assessment')} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 md:gap-3">
                Start Risk Assessment
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <div className="col-span-1 md:col-span-5 relative hidden md:block">
              <div className="bg-[#1E3A5F] rounded-2xl p-6 md:p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
                  <span className="text-white font-semibold text-base md:text-lg">Disclaimer</span>
                </div>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  This tool provides general information for educational purposes only and does not provide legal advice.
                  If you need legal advice, consult a licensed attorney.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-6 md:mb-8">
            Core Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Feature 1 */}
            <div onClick={() => handleNavigate('us/assessment')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#F59E0B] hover:-translate-y-2">
              <div className="bg-[#F59E0B]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-[#F59E0B]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                Risk Assessment
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Identify behaviors and get a quick risk level snapshot.
              </p>
            </div>

            {/* Feature 2 */}
            <div onClick={() => handleNavigate('us/solutions')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#10B981] hover:-translate-y-2">
              <div className="bg-[#10B981]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-[#10B981]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                Action Plan
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Scripts and checklists to guide practical next steps.
              </p>
            </div>

            {/* Feature 3 */}
            <div onClick={() => handleNavigate('us/knowledge')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#1E3A5F] hover:-translate-y-2">
              <div className="bg-[#1E3A5F]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Scale className="w-6 h-6 md:w-7 md:h-7 text-[#1E3A5F]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                Knowledge
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                Learn the basics of consumer rights and common rules.
              </p>
            </div>
          </div>
        </div>

        {/* What We Don't Do */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-4 md:mb-6">
            Notes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">Not a lawyer substitute — general information only</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">No guaranteed legal conclusions — consult a licensed attorney for specific issues</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">We don’t encourage avoiding debts — we encourage calm negotiation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">We don’t escalate conflict — we provide calm communication guidance</p>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm md:text-base text-[#64748B]">
                <p className="font-semibold mb-2 text-red-600">Watch out for “pay a little to make it go away” pressure:</p>
                <p className="mb-2">{'1) A small payment may not resolve the debt—remaining balance can still be collected.'}</p>
                <p className="mb-2">{'2) Collectors may push partial payments; collection can continue afterward.'}</p>
                <p className="mb-2">{'3) In some cases, a payment can be treated as acknowledging the debt and may affect the statute of limitations.'}</p>
                <p className="mb-2">{'4) If you pay, use official channels and request written confirmation/receipts.'}</p>
                <p>{'5) For legal implications, consult a licensed attorney in your state.'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm md:text-base text-[#64748B]">
                <p className="font-semibold mb-2">How to verify a third-party agreement:</p>
                <p className="mb-2">{'1) Verify the company: check state business registries and reviews; confirm a physical address and license where applicable.'}</p>
                <p className="mb-2">{'2) Review key terms: fees, cancellation/refund, dispute resolution, and what outcomes are (and are not) promised.'}</p>
                <p className="mb-2">{'3) Verify with the creditor: contact official customer support to confirm any “agreement” is recognized.'}</p>
                <p className="mb-2">{'4) Get a second opinion: ask a licensed attorney or a reputable nonprofit credit counselor to review it.'}</p>
                <p>{'5) Keep records: save emails, call logs, contracts, and payment receipts.'}</p>
              </div>
            </div>
          </div>
        </div>
      
      <footer className="mt-12 border-t pt-4 text-xs text-[#64748B]">
        <h4 className="font-semibold mb-1">About This Tool (Free Use Statement)</h4>
        <p>This tool is a free public risk-awareness resource to help identify potentially improper debt-collection practices.</p>
        <p className="mt-1">It is free to use and does not require payment or registration. Information provided is general only and not legal advice.</p>
        <p className="mt-1">The project may receive transparent institutional or public-interest support without affecting content independence or using user data.</p>
        <p className="mt-1">This tool does not store or track individual assessment results.</p>
      </footer>
    
    </main>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-6 md:py-8 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-xs md:text-sm text-slate-400">
            © 2026 DebtShield. General information only — not legal advice.
          </p>
        </div>
      </footer>
    </div>;
}