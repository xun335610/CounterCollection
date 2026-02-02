// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, AlertCircle, Info, Shield, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card } from '@/components/ui';

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
              <span className="text-sm md:text-base">返回</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">风险提示</span>
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
                风险提示｜关于"债务清算/债务协商代理"的常见风险
              </h2>
              <p className="text-xs md:text-sm text-amber-600 leading-relaxed">
                请注意：目前市场上存在以"债务清算""债务优化""停息挂账代理"等名义提供服务的机构或个人，其中部分存在较高风险。
              </p>
            </div>
          </div>
        </Card>

        {/* Common Risk Signals */}
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
            <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700">
              常见风险信号
            </h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {['要求提前支付服务费、保证金', '承诺"包成功""内部渠道""无需本人参与"', '要求提供身份证、银行卡、验证码等敏感信息', '要求通过个人账户或非官方渠道转账'].map((item, index) => <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-amber-600">
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
              建议
            </h3>
          </div>
          <ul className="space-y-2 md:space-y-3">
            {['优先通过原债权机构的官方渠道了解协商政策', '谨慎对待第三方代理或中介服务'].map((item, index) => <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-blue-600">
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
                重要提示
              </h3>
              <ul className="text-xs md:text-sm text-blue-600 space-y-2 md:space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>本产品不提供代理服务，也不收取协商相关费用</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>所有信息均为一般性指引，不构成法律意见或结果保证</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>如需专业法律建议，请咨询执业律师</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <div className="text-center">
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              ⚠️ 本产品仅提供一般性信息，不构成法律意见或结果保证
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 md:gap-4">
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