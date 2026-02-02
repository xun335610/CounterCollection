// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Shield, AlertTriangle, FileText, Scale, ArrowRight } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

export default function Home(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo
  } = props.$w.utils;
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
              <p className="text-xs md:text-sm text-slate-300 hidden sm:block">负债风险应对与协商指引</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">当前日期</p>
            <p className="text-sm font-semibold">2026年2月2日</p>
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
                理性应对
                <span className="text-[#F59E0B]">负债风险</span>
              </h2>
              <p className="text-sm md:text-lg text-[#64748B] mb-6 md:mb-8 leading-relaxed">
                为负债人提供合法、低冲突的应对方案，帮助您理性协商、降低风险。
                不代替律师，不提供确定性法律结论，但为您提供专业的应对指引。
              </p>
              <button onClick={() => handleNavigate('assessment')} className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 md:gap-3">
                开始风险评估
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <div className="col-span-1 md:col-span-5 relative hidden md:block">
              <div className="bg-[#1E3A5F] rounded-2xl p-6 md:p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
                  <span className="text-white font-semibold text-base md:text-lg">合规声明</span>
                </div>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  本产品仅提供一般性信息，不构成法律意见或结果保证。
                  如需专业法律建议，请咨询执业律师。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-6 md:mb-8">
            核心功能
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Feature 1 */}
            <div onClick={() => handleNavigate('assessment')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#F59E0B] hover:-translate-y-2">
              <div className="bg-[#F59E0B]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-[#F59E0B]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                风险评估
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                行为识别与风险等级评估，快速了解当前处境
              </p>
            </div>

            {/* Feature 2 */}
            <div onClick={() => handleNavigate('solutions')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#10B981] hover:-translate-y-2">
              <div className="bg-[#10B981]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-[#10B981]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                应对方案
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                协商话术、清单指引，提供实用应对策略
              </p>
            </div>

            {/* Feature 3 */}
            <div onClick={() => handleNavigate('knowledge')} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-[#1E3A5F] hover:-translate-y-2">
              <div className="bg-[#1E3A5F]/10 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Scale className="w-6 h-6 md:w-7 md:h-7 text-[#1E3A5F]" />
              </div>
              <h4 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                法律知识
              </h4>
              <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                法律与监管知识引用，了解您的合法权益
              </p>
            </div>
          </div>
        </div>

        {/* What We Don't Do */}
        <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-4 md:mb-6">
            说明
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">不代替律师，仅提供一般性信息</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">不提供确定性法律结论，具体法律问题请咨询执业律师</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">不教逃避债务，倡导理性协商解决</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base text-[#64748B]">不直接对抗催收，提供合法沟通指引</p>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm md:text-base text-[#64748B]">
                <p className="font-semibold mb-2 text-red-600">警惕"还一部分就解决问题"的诱导：</p>
                <p className="mb-2">1）还一部分钱并不能解决债务问题，剩余债务仍需继续偿还</p>
                <p className="mb-2">2）催收人员可能为了完成业绩而诱导还款，还款后仍会继续催收</p>
                <p className="mb-2">3）部分还款可能被视为承认债务，反而加强债权人的追索力度</p>
                <p className="mb-2">4）如需还款，应通过银行官方渠道，并要求出具书面还款协议</p>
                <p>5）任何还款建议应先咨询执业律师，确认还款的合法性和必要性</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="text-sm md:text-base text-[#64748B]">
                <p className="font-semibold mb-2">第三方协议有效性确认方法：</p>
                <p className="mb-2">1）核实第三方资质：通过国家企业信用信息公示系统查询企业注册信息，确认是否具备合法经营资质</p>
                <p className="mb-2">2）检查协议关键条款：仔细阅读协议中的费用标准、违约责任、解约条件等条款，确认是否公平合理</p>
                <p className="mb-2">3）验证银行官方渠道：通过银行官网、客服热线或线下网点核实协议是否为银行官方出具</p>
                <p className="mb-2">4）咨询专业机构：将协议文本提交给执业律师或金融监管部门进行合法性审查</p>
                <p>5）保留完整证据：保存所有沟通记录、协议文本、付款凭证等，以备后续维权使用</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] text-white py-6 md:py-8 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-xs md:text-sm text-slate-400">
            © 2026 DebtShield. 本产品仅提供一般性信息，不构成法律意见。
          </p>
        </div>
      </footer>
    </div>;
}