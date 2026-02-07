// @ts-ignore
import { ArrowLeft, AlertTriangle, Scale } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export default function Disclaimer(props) {
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
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">{'Disclaimer'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-4 md:space-y-6">
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
          <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
            {'General information only. This tool does not provide legal advice and does not create an attorney-client relationship.'}
          </p>
        </Card>

        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
          <div className="space-y-3 text-xs md:text-sm text-[#334155] leading-relaxed">
            <p>
              This site and its tools provide general, educational information about debt collection practices.
              It does not provide legal advice and does not create an attorney-client relationship.
            </p>
            <p>
              Laws can change and may vary by state and by the facts of a situation.
              If you need advice for your specific circumstances, consult a licensed attorney in your jurisdiction.
            </p>
            <p>
              Any "risk level" or "illegal behavior" labels are informational signals based on user-selected scenarios
              and simplified rule summaries. They are not determinations of legality.
            </p>
          </div>
        </Card>

        <Card className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs md:text-sm text-red-700 leading-relaxed">
              {'If you feel threatened or are in immediate danger, contact local emergency services immediately.'}
            </p>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <Button onClick={() => navigateTo({
          pageId: 'us/assessment'
        })} className="bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
            {'Take assessment'}
          </Button>
          <Button variant="outline" onClick={() => navigateTo({
          pageId: 'us/state-laws'
        })} className="text-xs md:text-sm">
            {'View state rules'}
          </Button>
          <Button variant="outline" onClick={() => navigateTo({
          pageId: 'us/privacy'
        })} className="text-xs md:text-sm">
            {'Privacy'}
          </Button>
        </div>
      </main>
    </div>;
}
