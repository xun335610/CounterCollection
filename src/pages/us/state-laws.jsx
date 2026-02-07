// @ts-ignore
import { ArrowLeft, Scale, ExternalLink } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { US_STATE_LIST } from '@/data/us/stateRules';

export default function StateLaws(props) {
  const utils = props.$w?.utils || props.$w?.page?.utils || {};
  const navigateTo = utils.navigateTo || (() => {});
  const navigateBack = utils.navigateBack || (() => window.history.back());

  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => (navigateBack ? navigateBack() : window.history.back())} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{'Back'}</span>
          </button>
          <div className="flex items-center gap-2 md:gap-3">
            <Scale className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span onClick={() => navigateTo({
            pageId: 'us/home'
          })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{'State rules'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200 mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2">
            {'State debt collection rules'}
          </h1>
          <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
            {'Federal law applies nationwide, and states may add extra restrictions. Pick your state for a simplified overview and official resources.'}
          </p>
          <div className="mt-3 md:mt-4 flex flex-wrap gap-2 md:gap-3">
            <Button variant="outline" className="text-xs md:text-sm" onClick={() => navigateTo({
            pageId: 'us/disclaimer'
          })}>
              {'Read disclaimer'}
            </Button>
            <Button variant="outline" className="text-xs md:text-sm" onClick={() => navigateTo({
            pageId: 'us/assessment'
          })}>
              {'Back to assessment'}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {US_STATE_LIST.map((s) => <Card key={s.code} className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">{s.name}</div>
                  <div className="text-xs text-[#64748B] mt-1">{`Code: ${s.code}`}</div>
                </div>
                <Button onClick={() => navigateTo({
              pageId: `us/state-laws/${s.code.toLowerCase()}`
            })} className="bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                  {'View'}
                </Button>
              </div>
            </Card>)}
        </div>

        <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mt-4 md:mt-6">
          <div className="flex items-start gap-2 md:gap-3">
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-blue-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
              {'This page is educational only and not legal advice. For legal interpretation and strategy, consult a licensed attorney in your state.'}
            </p>
          </div>
        </Card>
      </main>
    </div>;
}
