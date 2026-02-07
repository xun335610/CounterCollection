// @ts-ignore;
// @ts-ignore
import UsNav from '@/components/us/UsNav';
import { getAssessmentResult } from '@/utils/assessmentStorage';
// @ts-ignore;
import { ArrowLeft, Scale, FileText, AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card } from '@/components/ui';
import { contactOptions as usContactOptions } from '@/data/us/contactOptions';


// Fixed locale (separate per-country pages; no i18n)
const isUS = true;
const T = (cn, en) => (isUS ? en : cn);


export default function IllegalCollection(props) {
  const { toast } = useToast();
  const utils = props.$w?.utils || props.$w?.page?.utils || {};
  const navigateTo = utils.navigateTo || ((arg) => {
    // fallback: allow simple string paths
    if (typeof arg === 'string') window.location.href = arg;
  });
  const navigateBack = utils.navigateBack || (() => window.history.back());

  // Strict mode: details MUST equal the behaviors detected in THIS assessment run.
  // We do NOT pass data through URL params (to avoid long URLs).
  // Instead, assessment writes the exact hit list into sessionStorage right before navigation.
  let behaviors = [];
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('illegal_behaviors_us_current');
      behaviors = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(behaviors)) behaviors = [];
    } catch {
      behaviors = [];
    }
  }

  // Fallback: if user refreshes / opens directly, try using the last assessment result
  const lastAssessment = getAssessmentResult('assessment_result_us');
  const selectedState = lastAssessment && lastAssessment.state ? String(lastAssessment.state).toUpperCase() : 'NA';

  if ((!behaviors || behaviors.length === 0) && lastAssessment && Array.isArray(lastAssessment.illegalBehaviors)) {
    behaviors = lastAssessment.illegalBehaviors;
  }

return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => (navigateBack ? navigateBack() : window.history.back())} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{'Back'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Scale className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span onClick={() => navigateTo({ pageId: 'us/home' })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{'Potentially unlawful collection'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Warning Banner */}
        <Card className="bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-red-700 mb-2">
                {'Potentially unlawful collection detected'}
              </h2>
              <p className="text-xs md:text-sm text-red-600 leading-relaxed">
                {'Based on what you selected, the items below may be improper or unlawful. Keep records and protect your rights.'}
              </p>
            </div>
          </div>
        </Card>

{/* State-specific rules link */}
<Card className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
  <div className="flex items-start justify-between gap-3">
    <div>
      <h3 className="text-sm md:text-base font-bold text-[#1E3A5F]">State rules</h3>
      <p className="text-xs md:text-sm text-slate-600 mt-1">
        {selectedState !== "NA"
          ? `You selected ${selectedState}. This state may have additional restrictions beyond federal law.`
          : "Some states add extra restrictions beyond federal law. Select a state to see an overview."}
      </p>
    </div>
    <Button
      variant="outline"
      onClick={() =>
        navigateTo({
          pageId: selectedState !== "NA" ? `us/state-laws/${selectedState.toLowerCase()}` : "us/state-laws",
        })
      }
    >
      View
    </Button>
  </div>
</Card>


        {/* Illegal Behaviors List */}
        <div className="space-y-4 md:space-y-6">
          {behaviors.length > 0 ? behaviors.map((behavior, index) => <Card key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <div className="flex items-start gap-2 mb-3 md:mb-4">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-red-700">
                    {behavior.label}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-xs md:text-sm text-red-600 mb-3 md:mb-4 leading-relaxed">
                  {behavior.lawDetail}
                </p>

                {/* Legal Basis */}
                <div className="bg-red-50 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
                    <p className="text-xs md:text-sm text-red-700 font-semibold">{'Reference:'}</p>
                  </div>
                  <p className="text-xs md:text-sm text-red-600 leading-relaxed">
                    {behavior.law}
                  </p>
                </div>

                {/* Handling Method */}
                <div className="bg-amber-50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-600" />
                    <p className="text-xs md:text-sm text-amber-700 font-semibold">{'What to do:'}</p>
                  </div>
                  <p className="text-xs md:text-sm text-amber-600 leading-relaxed whitespace-pre-line">
                    {behavior.handlingMethod}
                  </p>
                </div>
              </Card>) : <Card className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <div className="text-center py-8 md:py-12">
                <Shield className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2">
                  {'No obvious unlawful behavior detected'}
                </h3>
                <p className="text-xs md:text-sm text-[#64748B]">
                  {'Based on your assessment, we did not flag any obvious unlawful behavior.'}
                </p>
              </div>
            </Card>}
        </div>

        {/* General Recommendations */}
        {behaviors.length > 0 && <Card className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 md:p-6 mt-6 md:mt-8">
            <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-blue-700 mb-2">
                  {'General recommendations'}
                </h3>
              </div>
            </div>
            <ul className="text-xs md:text-sm text-blue-600 space-y-2 md:space-y-3 list-disc list-inside">
              <li>{'Save evidence (call recordings, screenshots, emails, etc.).'}</li>
              <li>{'Start with the original creditor: contact official customer support, report the conduct, and request that communications follow policy.'}</li>
              <li>{'If unresolved, file a complaint with the appropriate regulator (e.g., CFPB/FTC/state AG in the U.S.).'}</li>
              <li>{'If you feel unsafe or there are threats/impersonation, contact local law enforcement.'}</li>
              <li>{'Consider speaking with a qualified attorney or a consumer credit counselor.'}</li>
            </ul>
          </Card>}
        {/* Action Buttons */}
        <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
          <Button onClick={() => (navigateBack ? navigateBack() : window.history.back())} variant="outline" className="flex-1 text-xs md:text-sm">
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
