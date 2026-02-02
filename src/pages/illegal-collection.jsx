// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, Scale, FileText, AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card } from '@/components/ui';

export default function IllegalCollection(props) {
  const {
    toast
  } = useToast();
  const {
    navigateBack,
    navigateTo
  } = props.$w.utils;
  const {
    illegalBehaviors
  } = props.$w.page.dataset.params;

  // 解析违法行为数据
  const behaviors = illegalBehaviors ? JSON.parse(decodeURIComponent(illegalBehaviors)) : [];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">返回</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Scale className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">违法催收行为</span>
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
                检测到可能的违法催收行为
              </h2>
              <p className="text-xs md:text-sm text-red-600 leading-relaxed">
                根据您提供的信息，以下催收方式可能违反相关法律法规，请注意保护自身权益。
              </p>
            </div>
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
                    <p className="text-xs md:text-sm text-red-700 font-semibold">法律依据：</p>
                  </div>
                  <p className="text-xs md:text-sm text-red-600 leading-relaxed">
                    {behavior.law}
                  </p>
                </div>

                {/* Handling Method */}
                <div className="bg-amber-50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-600" />
                    <p className="text-xs md:text-sm text-amber-700 font-semibold">处理方法：</p>
                  </div>
                  <p className="text-xs md:text-sm text-amber-600 leading-relaxed whitespace-pre-line">
                    {behavior.handlingMethod}
                  </p>
                </div>
              </Card>) : <Card className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <div className="text-center py-8 md:py-12">
                <Shield className="w-12 h-12 md:w-16 md:h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2">
                  未检测到违法催收行为
                </h3>
                <p className="text-xs md:text-sm text-[#64748B]">
                  根据您的评估结果，未发现明显的违法催收行为。
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
                  建议采取以下措施
                </h3>
              </div>
            </div>
            <ul className="text-xs md:text-sm text-blue-600 space-y-2 md:space-y-3 list-disc list-inside">
              <li>保留所有违法催收的证据（通话录音、短信截图等）</li>
              <li>优先与债权银行沟通：首先联系债权银行的官方客服，说明催收人员的违规行为，要求更换催收人员或调整催收方式</li>
              <li>如银行不予处理，再向监管部门投诉（银保监会、地方金融监管局）</li>
              <li>如情节严重，可向公安机关报案</li>
              <li>咨询专业律师，了解维权途径</li>
            </ul>
          </Card>}

        {/* Action Buttons */}
        <div className="flex gap-3 md:gap-4 mt-6 md:mt-8">
          <Button onClick={navigateBack} variant="outline" className="flex-1 text-xs md:text-sm">
            返回评估结果
          </Button>
          <Button onClick={() => navigateTo({
          pageId: 'solutions'
        })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
            查看应对方案
          </Button>
        </div>
      </main>
    </div>;
}