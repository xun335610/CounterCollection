// @ts-ignore
import { ArrowLeft, Shield, Database } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export default function Privacy(props) {
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
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">{'Privacy'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-4 md:space-y-6">
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A5F]" />
            <h1 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
              {'Local-only storage'}
            </h1>
          </div>
          <div className="space-y-3 text-xs md:text-sm text-[#334155] leading-relaxed">
            <p>
              This tool runs in your browser. Assessment answers and results are stored locally on your device to support
              navigation and page refresh.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><b>Default:</b> stored in <b>session storage</b> (cleared when the tab/window is closed).</li>
              <li><b>Optional:</b> if you enable <b>"Remember my results"</b>, results are stored in <b>local storage</b> with a <b>7-day expiration</b>.</li>
            </ul>
            <p>
              We do not require registration and this app does not include server-side tracking in this project codebase.
            </p>
          </div>
        </Card>

        <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
          <h2 className="text-sm md:text-base font-bold font-['Space_Grotesk'] text-blue-800 mb-2">
            {'How to clear data'}
          </h2>
          <p className="text-xs md:text-sm text-blue-700 leading-relaxed">
            {'You can clear stored results at any time via your browser settings (site data/storage). You can also rerun the assessment to overwrite stored results.'}
          </p>
        </Card>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <Button onClick={() => navigateTo({
          pageId: 'us/assessment'
        })} className="bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
            {'Take assessment'}
          </Button>
          <Button variant="outline" onClick={() => navigateTo({
          pageId: 'us/home'
        })} className="text-xs md:text-sm">
            {'Home'}
          </Button>
          <Button variant="outline" onClick={() => navigateTo({
          pageId: 'us/disclaimer'
        })} className="text-xs md:text-sm">
            {'Disclaimer'}
          </Button>
        </div>
      </main>
    </div>;
}
