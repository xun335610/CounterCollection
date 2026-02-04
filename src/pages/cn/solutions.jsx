// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, FileText, MessageSquare, ListChecks, ChevronRight, Copy, Check, AlertTriangle } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import cnContactOptions from '@/data/cn/contactOptions.js';


// Fixed locale (separate per-country pages; no i18n)
const isUS = false;
const T = (cn, en) => (isUS ? en : cn);


// US references (general, not legal advice)
const US_REF_GENERAL = `Possible U.S. references (depending on facts):
• FDCPA (Fair Debt Collection Practices Act)
• CFPB Regulation F
• TCPA (robocalls/texts)
• State consumer protection & debt collection laws

This is general information only. For legal advice, consult a licensed attorney in your state.`;

const usContactLabels = {
  phone: 'Phone call',
  sms: 'Text / SMS',
  visit: 'In-person visit',
  sued: 'Lawsuit / served',
  lawyer_letter: 'Attorney letter',
  emergency_contact: 'Called your emergency contact',
  wechat_private: 'Pushed for private chat (off official channels)',
  non_working_hours: 'Contacted at unreasonable hours',
  auto_robot: 'Robocalls / automated dialing',
  high_frequency: 'High-frequency calls (harassment)',
  third_party: 'Contacted third parties (family/employer)',
  threat: 'Threats / intimidation',
  fake_police: 'Impersonating law enforcement/courts',
  unofficial_payment: 'Requested payment to unofficial account/method',
  third_party_outsource: 'Third-party collection agency',
  frequent_change: 'Spoofing / frequently changing numbers',
  request_personal_info: 'Asked for unrelated sensitive info',
  private_phone: 'Using personal phone number',
  other: 'Other'
};

const usGuidance = {
  phone: `1. Stay calm; do not argue.
2. Ask for the caller's name, company, callback number, and mailing address.
3. Take notes (date/time, what was said).
4. Ask for written validation of the debt.
5. If you want, state you will respond in writing.`,
  sms: `1. Save screenshots of all messages.
2. Avoid engaging with abusive/threatening texts.
3. Ask for written validation and opt out of text if you prefer.
4. Block/report spam numbers if harassment continues.
5. Keep a log of dates/times.`,
  visit: `1. You can refuse to speak and ask them to leave.
2. Do not let strangers into your home.
3. Document the encounter (time, name, company, photos/video if safe).
4. If they refuse to leave or you feel unsafe, contact local law enforcement.
5. Request all communication in writing.`,
  sued: `1. Do not ignore court papers.
2. Note deadlines and file a response/answer on time.
3. Gather documents (contracts, statements, payment records).
4. Consider speaking with a consumer attorney.
5. Attend all hearings and keep copies of filings.`,
  lawyer_letter: `1. Read carefully and keep the envelope/letter.
2. Verify the sender and the creditor/collector.
3. Ask for validation if you have not received it.
4. Do not send money to unverified contacts.
5. Consult an attorney if you are unsure.`,
  emergency_contact: `1. Tell them not to contact third parties.
2. Document the calls and what was disclosed.
3. Request debt validation and communications in writing.
4. File a complaint if improper disclosures occurred.
5. Consider legal advice if harassment continues.`,
  wechat_private: `1. Keep communication in verifiable channels (mail/email).
2. Do not share extra personal data.
3. Save screenshots/chats as evidence.
4. Request written validation.
5. Be cautious of scams and unofficial payment requests.`,
  non_working_hours: `1. Tell them your preferred contact hours.
2. Document repeated out-of-hours contacts.
3. Request communications in writing.
4. Block/report if harassment continues.
5. Consider filing a complaint.`,
  auto_robot: `1. Save recordings and call logs.
2. If you did not consent, consider it a potential TCPA issue.
3. Ask to be placed on a do-not-call list.
4. Block/report repeated robocalls.
5. Request written validation of the debt.`,
  high_frequency: `1. Keep a detailed call/text log.
2. Clearly state you want written communication.
3. Block/report spam where appropriate.
4. File complaints with CFPB/FTC/state AG if it continues.
5. Seek legal advice if harassment is severe.`,
  third_party: `1. Tell them not to contact your family/employer.
2. Document who was contacted and what was said.
3. Request written validation.
4. File complaints for improper third-party contact.
5. Consider legal advice for damages.`,
  threat: `1. Save all evidence (recordings, texts, voicemails).
2. If you feel unsafe, contact local law enforcement.
3. Do not meet in person.
4. File complaints with CFPB/FTC/state AG.
5. Consult an attorney.`,
  fake_police: `1. Treat as fraud—do not provide info or send money.
2. Save evidence and report to local law enforcement.
3. Independently verify any “case number” via official channels.
4. Notify the creditor if you can identify them.
5. Consider freezing your credit if identity info was shared.`,
  unofficial_payment: `1. Do not pay via gift cards, wire to individuals, or unusual methods.
2. Verify the creditor/collector independently.
3. Request written validation and official payment instructions.
4. Save evidence and report suspected fraud.
5. Only pay through verified official channels.`,
  third_party_outsource: `1. Ask for the agency’s name/address and written validation.
2. Keep communication in writing.
3. Document any harassment.
4. File complaints if they violate rules.
5. Consider legal advice.`,
  frequent_change: `1. Document numbers, dates, and patterns.
2. Do not trust caller ID—verify independently.
3. Block/report repeated spoofed calls.
4. Request written communication.
5. File complaints if harassment persists.`,
  request_personal_info: `1. Do not share SSN, bank logins, or verification codes.
2. Ask why the information is needed and request it in writing.
3. Verify the caller’s identity via official channels.
4. Save evidence of improper requests.
5. Report suspected fraud.`,
  private_phone: `1. Ask for official business contact details.
2. Verify the collector/agency independently.
3. Keep communications in writing.
4. Do not pay without validation.
5. Block/report if harassment continues.`,
  other: `1. Write down exactly what happened.
2. Save any evidence.
3. Request written validation.
4. Escalate via complaints or legal advice if needed.`
};

const usLawDetail = {
  visit: 'Unwanted in-person visits can be harassment; you can ask them to leave and document the incident.',
  emergency_contact: 'Contacting third parties may be restricted (especially disclosures).',
  wechat_private: 'Pushing off official channels can increase scam risk; keep records.',
  non_working_hours: 'Repeated contacts at unreasonable times may be harassment.',
  auto_robot: 'Robocalls/texts may trigger TCPA issues depending on consent.',
  high_frequency: 'Repeated contacts intended to harass can violate consumer protection rules.',
  third_party: 'Improper third-party contact/disclosure is often prohibited or restricted.',
  threat: 'Threats or abusive language can violate consumer protection rules.',
  fake_police: 'Impersonating law enforcement/courts is serious and may be criminal fraud.',
  unofficial_payment: 'Unusual payment methods can indicate scams—verify independently.',
  third_party_outsource: 'Third-party collectors are often covered by FDCPA/Regulation F.',
  frequent_change: 'Spoofing/changing numbers can be used for harassment or scams.',
  request_personal_info: 'Requests for unrelated sensitive info can be a red flag.',
  private_phone: 'Collectors should provide verifiable business contact details.'
};

const usLaw = {
  visit: US_REF_GENERAL,
  emergency_contact: US_REF_GENERAL,
  wechat_private: US_REF_GENERAL,
  non_working_hours: US_REF_GENERAL,
  auto_robot: US_REF_GENERAL,
  high_frequency: US_REF_GENERAL,
  third_party: US_REF_GENERAL,
  threat: US_REF_GENERAL,
  fake_police: US_REF_GENERAL,
  unofficial_payment: US_REF_GENERAL,
  third_party_outsource: US_REF_GENERAL,
  frequent_change: US_REF_GENERAL,
  request_personal_info: US_REF_GENERAL,
  private_phone: US_REF_GENERAL
};


export default function Solutions(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const riskLevel = props.$w.page.dataset.params.riskLevel || 'medium';
  const [copiedId, setCopiedId] = useState(null);

  // 从 localStorage 获取评估结果
  const [assessmentResult, setAssessmentResult] = useState(() => {
    const savedAssessment = localStorage.getItem('assessment_result_cn');
    if (savedAssessment) {
      const parsed = JSON.parse(savedAssessment);
      return parsed.completed ? parsed : null;
    }
    return null;
  });

  // 获取用户选择的催收方式
  const selectedContactMethods = assessmentResult?.answers?.contact_method?.value || [];

  // 根据选择的催收方式生成针对性应对方案
  const getTargetedSolutions = () => {
    if (!assessmentResult || selectedContactMethods.length === 0) {
      return [];
    }

    // 催收方式选项定义（与 assessment.jsx 保持一致）
    const contactOptionsLocalized = cnContactOptions;

// 根据用户选择的催收方式生成{'针对性方案'}
    return selectedContactMethods.map(methodValue => {
      const option = contactOptionsLocalized.find(opt => opt.value === methodValue);
      if (!option) return null;
      return {
        id: `targeted-${option.value}`,
        title: isUS ? `Plan for “${option.label}”` : `针对「${option.label}」的应对方案`,
        category: '针对性方案',
        content: option.handlingMethod,
        tags: option.illegal ? (isUS ? ['Improper/illegal', 'Act now'] : ['违法行为', '紧急处理']) : (isUS ? ['Standard'] : ['常规处理']),
        illegal: option.illegal || false,
        law: option.law || null,
        lawDetail: option.lawDetail || null
      };
    }).filter(Boolean);
  };
  const targetedSolutions = getTargetedSolutions();
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: '已复制到剪贴板',
      description: '内容已复制，可直接使用'
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  const negotiationScripts = [{
    id: 1,
    title: '说明当前困难',
    category: '协商话术',
    content: (isUS ? `Hi, I’m experiencing financial hardship and can’t pay on time right now. I do want to resolve this. Could we discuss a reasonable repayment option?` : `您好，我目前确实遇到了一些经济困难，暂时无法按时还款。但我有还款意愿，希望能与贵方协商一个合理的还款方案。`),
    tags: (isUS ? ['General', 'First contact'] : ['通用', '初次沟通'])
  }, {
    id: 2,
    title: '申请延期还款',
    category: '协商话术',
    content: (isUS ? `Due to reduced income, I’m requesting a 3‑month hardship extension. During that time I’ll work to stabilize finances and then resume regular payments. Is this possible?` : `由于近期收入减少，我希望能申请延期3个月还款。在此期间，我会尽力筹集资金，并在延期结束后恢复正常还款。请问是否可以办理？`),
    tags: (isUS ? ['Hardship', 'Income change'] : ['延期', '收入减少'])
  }, {
    id: 3,
    title: '申请减免利息',
    category: '协商话术',
    content: (isUS ? `Given my current ability to pay, I’m requesting a reduction or waiver of some interest/fees. I’m committed to paying the principal as quickly as possible. Can you help with that?` : `考虑到我的实际还款能力，希望能申请减免部分利息或罚息。我承诺会尽快偿还本金，希望贵方能给予一定支持。`),
    tags: (isUS ? ['Fees', 'Interest'] : ['减免', '利息'])
  }, {
    id: 4,
    title: '分期还款方案',
    category: '协商话术',
    content: (isUS ? `I’d like to set up an installment plan of $XXX per month for XX months. This would let me pay consistently while still covering basic living expenses. Please consider this option.` : `我希望能申请分期还款，每月还款XXX元，分XX期还清。这样既能保证我按时还款，也不会影响我的基本生活。请贵方考虑这个方案。`),
    tags: (isUS ? ['Installments', 'Long-term'] : ['分期', '长期'])
  }, {
    id: 5,
    title: '应对催收电话',
    category: '应对话术',
    content: (isUS ? `I understand you’re doing your job. Please keep communications professional. I’m working on resolving the debt, but do not contact my family or employer. Please communicate with me through official channels.` : `我理解贵方的工作，但请保持专业沟通。我会积极处理债务问题，但请不要频繁打扰我的家人和朋友。如有需要，请通过正规渠道联系我。`),
    tags: (isUS ? ['Collection', 'Third parties'] : ['催收', '第三方'])
  }, {
    id: 6,
    title: '拒绝不合理要求',
    category: '应对话术',
    content: (isUS ? `I understand your position, but what you’re asking is beyond my ability to pay right now. I’m willing to negotiate within a reasonable range—please consider my current circumstances.` : `我理解贵方的立场，但您提出的要求超出了我的实际能力范围。我愿意在合理范围内协商，但请尊重我的实际情况。`),
    tags: (isUS ? ['Boundary', 'Negotiation'] : ['拒绝', '不合理'])
  }];
  const checklists = [{
    id: 1,
    title: '协商前准备',
    items: (isUS ? ['Gather debt details (principal, interest, fees)', 'Prepare income and budget information', 'Draft a realistic repayment plan', 'Understand basic consumer protection rules', 'Keep a call log and written records'] : ['整理所有债务明细（本金、利息、罚息）', '准备收入证明和财务状况说明', '制定可行的还款计划', '了解相关法律法规', '准备好录音设备（合法范围内）'])
  }, {
    id: 2,
    title: '协商中注意事项',
    items: ['保持冷静和礼貌', '如实说明情况，不要夸大或隐瞒', '不要做出无法兑现的承诺', '记录协商过程和结果', '要求对方提供书面确认']
  }, {
    id: 3,
    title: '协商后跟进',
    items: ['确认协商结果并保留书面凭证', '按时履行协商约定', '定期与债权方沟通进度', '如遇问题及时联系', '保存所有还款记录']
  }];
  const communicationTips = [{
    id: 1,
    title: '沟通前准备',
    tips: ['保持冷静，不要情绪化', '准备好相关文件和证据', '明确自己的还款能力和底线', '选择合适的沟通时间', '确保通话环境安静']
  }, {
    id: 2,
    title: '沟通中要点',
    tips: (isUS ? ['Be respectful; show intent to resolve', 'Explain hardship honestly', 'Don’t promise what you can’t do', 'Write down what they say/request', 'Ask for written confirmation'] : ['态度诚恳，表达还款意愿', '如实说明困难情况', '不要做出无法兑现的承诺', '记录对方的承诺和要求', '要求对方提供书面确认'])
  }, {
    id: 3,
    title: '沟通后跟进',
    tips: (isUS ? ['Organize notes immediately', 'Confirm terms in writing', 'Follow the agreed plan', 'Check in periodically', 'Communicate quickly if issues arise'] : ['及时整理沟通记录', '确认协商结果并保留凭证', '按时履行约定', '定期主动联系更新情况', '如遇问题及时沟通'])
  }, {
    id: 4,
    title: '避免行为',
    tips: (isUS ? ['Don’t disappear completely', 'Don’t threaten or insult', 'Don’t provide false info', 'Don’t pay to personal accounts', 'Don’t sign unclear agreements'] : ['不要失联或拒接电话', '不要辱骂或威胁对方', '不要提供虚假信息', '不要轻易转账给个人账户', '不要签署不明确的协议'])
  }];
  const complaintInfo = [{
    id: 1,
    title: '投诉渠道',
    type: '信息型',
    content: (isUS ? [{ label: 'CFPB', value: 'consumerfinance.gov/complaint' }, { label: 'FTC', value: 'reportfraud.ftc.gov' }, { label: 'State Attorney General', value: 'Find your state AG website' }, { label: 'Local law enforcement', value: '911 (emergency)' }] : [{
      label: '银保监会投诉热线',
      value: '12378'
    }, {
      label: '互联网金融协会',
      value: 'www.nifa.org.cn'
    }, {
      label: '消费者协会',
      value: '12315'
    }, {
      label: '公安机关',
      value: '110（紧急情况）'
    }])
  }, {
    id: 2,
    title: '可投诉行为',
    type: '条件触发',
    content: (isUS ? ['Threats or harassment', 'Improper third‑party contact (family/employer)', 'Improper disclosure of personal information', 'False claims or fake documents', 'Unreasonable fees', 'Calling/texting without consent (as applicable)'] : ['暴力催收、威胁恐吓', '骚扰第三方（亲友、单位）', '泄露个人信息', '虚假诉讼或伪造证据', '收取不合理费用', '超出法定利率上限'])
  }, {
    id: 3,
    title: '投诉要点',
    type: '信息型',
    content: (isUS ? ['⚠️ First, contact the original creditor through official channels and explain the issue', 'If unresolved, file complaints with CFPB/FTC/state AG as appropriate', 'Provide specific facts and dates (who/when/what was said)', 'Attach evidence (call logs, recordings where legal, screenshots, emails)', 'Explain the impact and any losses', 'State what you want (stop calls, validation, correct records, etc.)', 'Stay factual and calm'] : ['⚠️ 重要：请先与债权方客服沟通，说明问题并寻求解决方案', '如债权方客服沟通无效，再向监管机构投诉', '提供具体事实和时间（包括与债权方客服沟通的时间、内容）', '保留相关证据（录音、截图、短信、与客服的沟通记录）', '说明受到的影响和损失', '提出合理的诉求', '保持客观和理性'])
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-3 md:py-4 px-4 md:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-2 md:px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{'返回'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span onClick={() => navigateTo({ pageId: 'cn/home' })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{'应对方案'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Risk Level Indicator */}
        <Card className="bg-white rounded-xl p-4 md:p-6 shadow-lg mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base md:text-lg font-semibold font-['Space_Grotesk'] text-[#1E3A5F] mb-1">
                {'当前风险等级'}
              </h2>
              <p className="text-xs md:text-sm text-[#64748B]">
                {riskLevel === 'low' && '低风险 - 保持沟通，按时还款'}
                {riskLevel === 'medium' && '中等风险 - 主动协商，制定方案'}
                {riskLevel === 'high' && '高风险 - 寻求专业帮助，谨慎应对'}
              </p>
            </div>
            <div className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-xs md:text-sm ${riskLevel === 'low' ? 'bg-green-100 text-green-700' : riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              {riskLevel === 'low' && '低风险'}
              {riskLevel === 'medium' && '中等风险'}
              {riskLevel === 'high' && '高风险'}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue={targetedSolutions.length > 0 ? 'targeted' : 'scripts'} className="space-y-4 md:space-y-6">
          <TabsList className="bg-white p-1 rounded-lg shadow w-full overflow-x-auto">
            {targetedSolutions.length > 0 && <TabsTrigger value="targeted" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
              {'针对性方案'}
            </TabsTrigger>}
            <TabsTrigger value="scripts" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
              {'话术模板'}
            </TabsTrigger>
            <TabsTrigger value="checklists" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <ListChecks className="w-3 h-3 md:w-4 md:h-4" />
              {'清单指引'}
            </TabsTrigger>
            <TabsTrigger value="complaint" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
              {'投诉信息'}
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
              {'沟通注意事项'}
            </TabsTrigger>
          </TabsList>

          {/* Targeted Solutions Tab */}
          {targetedSolutions.length > 0 && <TabsContent value="targeted">
            <div className="space-y-4 md:space-y-6">
              {targetedSolutions.map(solution => <Card key={solution.id} className={`${solution.illegal ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200' : 'bg-white'} rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-wider ${solution.illegal ? 'text-red-600' : 'text-[#F59E0B]'}`}>
                        {solution.category}
                      </span>
                      <h3 className={`text-base md:text-lg font-bold font-['Space_Grotesk'] mt-1 ${solution.illegal ? 'text-red-700' : 'text-[#1E3A5F]'}`}>
                        {solution.title}
                      </h3>
                    </div>
                    {solution.illegal && <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                      </div>}
                  </div>
                  
                  {solution.illegal && solution.law && <div className="mb-3 md:mb-4 p-3 md:p-4 bg-red-100 border-l-4 border-red-500 rounded-r-lg">
                      <p className="text-xs font-semibold text-red-700 mb-1">{'相关法律：'}</p>
                      <p className="text-xs text-red-600 leading-relaxed">{solution.law}</p>
                      {solution.lawDetail && <p className="text-xs text-red-600 leading-relaxed mt-2">{solution.lawDetail}</p>}
                    </div>}
                  
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs font-semibold text-[#1E3A5F] mb-2">{'应对方法：'}</p>
                    <p className="text-xs md:text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                      {solution.content}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {solution.tags.map(tag => <span key={tag} className={`px-2 py-1 text-xs rounded ${solution.illegal ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                        {tag}
                      </span>)}
                  </div>
                  
                  <Button onClick={() => handleCopy(solution.content, solution.id)} variant={solution.illegal ? 'default' : 'outline'} size="sm" className={`w-full text-xs md:text-sm ${solution.illegal ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}>
                    {copiedId === solution.id ? <>
                        <Check className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {'已复制'}
                      </> : <>
                        <Copy className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {'复制方案'}
                      </>}
                  </Button>
                </Card>)}
            </div>
          </TabsContent>}

          {/* Scripts Tab */}
          <TabsContent value="scripts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {negotiationScripts.map(script => <Card key={script.id} className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <span className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                        {script.category}
                      </span>
                      <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mt-1">
                        {script.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {script.tags.map(tag => <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        {tag}
                      </span>)}
                  </div>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed mb-3 md:mb-4">
                    {script.content}
                  </p>
                  <Button onClick={() => handleCopy(script.content, script.id)} variant="outline" size="sm" className="w-full text-xs md:text-sm">
                    {copiedId === script.id ? <>
                        <Check className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {'已复制'}
                      </> : <>
                        <Copy className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        {'复制话术'}
                      </>}
                  </Button>
                </Card>)}
            </div>
          </TabsContent>

          {/* Checklists Tab */}
          <TabsContent value="checklists">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {checklists.map(checklist => <Card key={checklist.id} className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3 md:mb-4">
                    {checklist.title}
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {checklist.items.map((item, index) => <li key={index} className="flex items-start gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#10B981]" />
                        </div>
                        <span className="text-xs md:text-sm text-[#64748B] leading-relaxed">{item}</span>
                      </li>)}
                  </ul>
                </Card>)}
            </div>
          </TabsContent>

          {/* Complaint Tab */}
          <TabsContent value="complaint">
            <div className="space-y-4 md:space-y-6">
              {complaintInfo.map(info => <Card key={info.id} className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${info.type === '条件触发' ? 'bg-red-100' : 'bg-blue-100'}`}>
                      <FileText className={`w-4 h-4 md:w-5 md:h-5 ${info.type === '条件触发' ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                        {info.title}
                      </h3>
                      <span className={`text-xs font-semibold ${info.type === '条件触发' ? 'text-red-600' : 'text-blue-600'}`}>
                        {info.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {info.content.map((item, index) => <div key={index} className={`p-3 md:p-4 rounded-lg ${info.type === '条件触发' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-blue-50 border-l-4 border-blue-500'}`}>
                        {typeof item === 'string' ? <p className="text-xs md:text-sm text-[#64748B]">{item}</p> : <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm text-[#64748B]">{item.label}</span>
                            <span className="text-xs md:text-sm font-semibold text-[#1E3A5F]">
                              {item.value}
                            </span>
                          </div>}
                      </div>)}
                  </div>
                </Card>)}
            </div>
          </TabsContent>

          {/* Communication Tips Tab */}
          <TabsContent value="communication">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 md:p-6 shadow-lg border-2 border-amber-200">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                    {'沟通注意事项'}
                  </h3>
                  <p className="text-xs text-amber-600 font-semibold">
                    {'重要提示'}
                  </p>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                {communicationTips.map(tip => <div key={tip.id}>
                    <h4 className="text-xs md:text-sm font-bold text-[#1E3A5F] mb-2 md:mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      {tip.title}
                    </h4>
                    <ul className="space-y-1 md:space-y-2">
                      {tip.tips.map((item, index) => <li key={index} className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span className="text-xs text-[#64748B] leading-relaxed">{item}</span>
                        </li>)}
                    </ul>
                  </div>)}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
}