// @ts-ignore
import { ArrowLeft, Scale, FileText, ExternalLink } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { Card, Button } from "@/components/ui";
import { US_STATE_RULES } from "@/data/us/stateRules";

function getStateCodeFromPath(pathname) {
  const seg = (pathname || "").split("/").filter(Boolean);
  const last = seg[seg.length - 1] || "";
  return last.toUpperCase();
}

export default function StateLaw(props) {
  const utils = props.$w?.utils || props.$w?.page?.utils || {};
  const navigateTo = utils.navigateTo || (() => {});
  const navigateBack = utils.navigateBack || (() => window.history.back());
  const location = useLocation();
  const code = getStateCodeFromPath(location.pathname);
  const rule = US_STATE_RULES[code];

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
            pageId: 'us/state-laws'
          })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{rule ? rule.name : 'State rules'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-4 md:space-y-6">
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
          <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
            {'Federal FDCPA applies nationwide; states may add extra restrictions. This page is a simplified educational summary and not legal advice.'}
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
              {'Take assessment'}
            </Button>
          </div>
        </Card>

        {!rule ? <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-red-200">
            <p className="text-sm text-red-700">
              {`No rule data found for ${code}. Please go back and choose a state.`}
            </p>
            <div className="mt-3 md:mt-4">
              <Button onClick={() => navigateTo({
              pageId: 'us/state-laws'
            })} className="bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                {'Browse states'}
              </Button>
            </div>
          </Card> : <>
            <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A5F]" />
                <h2 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                  {'Simplified overview'}
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-[#334155]">
                {rule.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </Card>

            <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A5F]" />
                <h2 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                  {'Official resources'}
                </h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm">
                {rule.sources.map((s, i) => <li key={i}>
                    <a className="text-blue-700 underline hover:text-blue-900" href={s.url} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>)}
              </ul>
            </Card>

            <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6">
              <h3 className="text-sm md:text-base font-bold font-['Space_Grotesk'] text-blue-800 mb-3">
                {'Next steps'}
              </h3>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Button onClick={() => navigateTo({
                pageId: 'us/illegal-collection'
              })} variant="outline" className="text-xs md:text-sm">
                  {'Review illegal behaviors'}
                </Button>
                <Button onClick={() => navigateTo({
                pageId: 'us/solutions'
              })} className="bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                  {'View solutions'}
                </Button>
              </div>
            </Card>
          </>}
      </main>
    </div>;
}
