// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, XCircle, ChevronRight, Plus, Scale, FileText, AlertCircle, Info } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Input } from '@/components/ui';
import cnContactOptions from '@/data/cn/contactOptions.js';

// Fixed locale (separate per-country pages; no i18n)
const isUS = false;
const T = (cn, en) => (isUS ? en : cn);


export default function Assessment(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const [currentStep, setCurrentStep] = useState(() => {
    // 从本地存储恢复评估状态
    const savedAssessment = localStorage.getItem('assessment_result_cn');
    if (savedAssessment) {
      try {
        const parsed = JSON.parse(savedAssessment);
        // 验证数据结构是否完整
        if (parsed.completed && parsed.currentStep !== undefined) {
          return parsed.currentStep;
        }
      } catch (error) {
        console.error('Failed to parse saved assessment:', error);
      }
    }
    return 0;
  });
  const [answers, setAnswers] = useState(() => {
    // 从本地存储恢复评估状态
    const savedAssessment = localStorage.getItem('assessment_result_cn');
    if (savedAssessment) {
      try {
        const parsed = JSON.parse(savedAssessment);
        // 验证数据结构是否完整
        if (parsed.completed && parsed.answers) {
          return parsed.answers;
        }
      } catch (error) {
        console.error('Failed to parse saved assessment:', error);
      }
    }
    return {};
  });
  const [riskLevel, setRiskLevel] = useState(() => {
    // 从本地存储恢复评估状态
    const savedAssessment = localStorage.getItem('assessment_result_cn');
    if (savedAssessment) {
      try {
        const parsed = JSON.parse(savedAssessment);
        // 验证数据结构是否完整
        if (parsed.completed && parsed.riskLevel && parsed.riskLevel.level) {
          return parsed.riskLevel;
        }
      } catch (error) {
        console.error('Failed to parse saved assessment:', error);
      }
    }
    return null;
  });
  const [otherContactMethod, setOtherContactMethod] = useState(() => {
    // 从本地存储恢复评估状态
    const savedAssessment = localStorage.getItem('assessment_result_cn');
    if (savedAssessment) {
      try {
        const parsed = JSON.parse(savedAssessment);
        // 验证数据结构是否完整
        if (parsed.completed && parsed.otherContactMethod !== undefined) {
          return parsed.otherContactMethod;
        }
      } catch (error) {
        console.error('Failed to parse saved assessment:', error);
      }
    }
    return '';
  });
  const baseQuestions = [{
    id: 'occupation',
    title: '职业',
    description: '请选择您的职业类型',
    options: [{
      value: 'employee',
      label: '企业员工',
      risk: 1
    }, {
      value: 'freelancer',
      label: '自由职业者',
      risk: 2
    }, {
      value: 'business',
      label: '个体工商户',
      risk: 2
    }, {
      value: 'government',
      label: '公务员/事业单位',
      risk: 1
    }, {
      value: 'student',
      label: '学生',
      risk: 2
    }, {
      value: 'retired',
      label: '退休人员',
      risk: 1
    }, {
      value: 'unemployed',
      label: '待业/无业',
      risk: 3
    }, {
      value: 'other',
      label: '其他',
      risk: 2
    }]
  }, {
    id: 'contact_method',
    title: '催收方式',
    description: '催收方主要通过什么方式联系您？（可多选）',
    multiSelect: true,
    options: cnContactOptions
  }, {

    id: 'debt_amount',
    title: '负债金额',
    description: '您的总负债金额大约是多少？',
    options: [{
      value: 'small',
      label: '5万以下',
      risk: 1
    }, {
      value: 'medium',
      label: '5-20万',
      risk: 2
    }, {
      value: 'large',
      label: '20-50万',
      risk: 2
    }, {
      value: 'huge',
      label: '50万以上',
      risk: 3
    }]
  }, {
    id: 'payment_ability',
    title: '还款能力',
    description: '您目前的还款能力如何？',
    options: [{
      value: 'good',
      label: '可以按时还款',
      risk: 1
    }, {
      value: 'partial',
      label: '可以部分还款',
      risk: 2
    }, {
      value: 'difficult',
      label: '暂时无法还款',
      risk: 3
    }]
  }, {
    id: 'legal_action',
    title: '法律行动',
    description: '是否已收到法律文书或被起诉？',
    options: [{
      value: 'no',
      label: '没有',
      risk: 1
    }, {
      value: 'notice',
      label: '收到律师函',
      risk: 2
    }, {
      value: 'sued',
      label: '已被起诉',
      risk: 3
    }]
  }];
  const handleAnswer = (questionId, value, risk) => {
    // 对于催收方式问题，支持多选
    if (questionId === 'contact_method') {
      setAnswers(prev => {
        const currentAnswer = prev[questionId] || {
          value: [],
          risk: 0
        };
        const selectedValues = Array.isArray(currentAnswer.value) ? currentAnswer.value : [currentAnswer.value];
        if (selectedValues.includes(value)) {
          // 取消选择
          const newValues = selectedValues.filter(v => v !== value);
          const newRisk = newValues.length > 0 ? Math.max(...newValues.map(v => {
            const option = questions.find(q => q.id === questionId).options.find(o => o.value === v);
            return option ? option.risk : 0;
          })) : 0;
          return {
            ...prev,
            [questionId]: {
              value: newValues,
              risk: newRisk
            }
          };
        } else {
          // 添加选择
          const newValues = [...selectedValues, value];
          const newRisk = Math.max(...newValues.map(v => {
            const option = questions.find(q => q.id === questionId).options.find(o => o.value === v);
            return option ? option.risk : 0;
          }));
          return {
            ...prev,
            [questionId]: {
              value: newValues,
              risk: newRisk
            }
          };
        }
      });
    } else {
      // 其他问题保持单选
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          value,
          risk
        }
      }));
    }
  };
  const handleNext = () => {
    // 确保 currentStep 在有效范围内
    if (currentStep < 0 || currentStep >= questions.length) {
      console.error('Invalid currentStep:', currentStep);
      toast({
        title: '页面状态异常，请重新开始',
        variant: 'destructive'
      });
      return;
    }
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) {
      console.error('Current question not found:', currentStep);
      toast({
        title: '页面状态异常，请重新开始',
        variant: 'destructive'
      });
      return;
    }
    const currentAnswer = answers[currentQuestion.id];

    // 检查是否已选择答案
    if (!currentAnswer) {
      toast({
        title: '请选择一个选项',
        variant: 'destructive'
      });
      return;
    }

    // 对于多选问题，检查是否至少选择了一个选项
    if (currentQuestion.id === 'contact_method') {
      const selectedValues = Array.isArray(currentAnswer.value) ? currentAnswer.value : [currentAnswer.value];
      if (selectedValues.length === 0) {
        toast({
          title: '请至少选择一个选项',
          variant: 'destructive'
        });
        return;
      }
      // 如果选择了"其他"，检查是否填写了具体内容
      if (selectedValues.includes('other') && !otherContactMethod.trim()) {
        toast({
          title: '请填写其他催收方式的具体内容',
          variant: 'destructive'
        });
        return;
      }
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateRisk();
    }
  };
  const handlePrevious = () => {
    // 确保 currentStep 在有效范围内
    if (currentStep <= 0 || currentStep >= questions.length) {
      return;
    }
    setCurrentStep(prev => prev - 1);
  };


// --- US localization (keeps ALL options/flows; only swaps copy + guidance) ---
const usQuestionCopy = {
  occupation: { title: 'Occupation', description: 'Select your occupation' },
  contact_method: { title: 'Collection methods', description: 'How are they contacting you? (Select all that apply)' }
};

const usOccupationLabels = {
  employee: 'Employee',
  freelancer: 'Freelancer / Contractor',
  business: 'Self-employed / Small business',
  government: 'Government / Public sector',
  student: 'Student',
  retired: 'Retired',
  unemployed: 'Unemployed',
  other: 'Other'
};

const usContactLabels = {
  phone: 'Phone calls',
  sms: 'Text messages',
  visit: 'In-person visit',
  sued: 'Lawsuit / served papers',
  lawyer_letter: 'Attorney letter',
  emergency_contact: 'Calling emergency contact',
  wechat_private: 'Pushing to move to private chat (e.g., WhatsApp/DM)',
  non_working_hours: 'Contacting at inconvenient hours',
  auto_robot: 'Robocalls / automated voice',
  high_frequency: 'High-frequency call bombing',
  third_party: 'Contacting friends/family/employer',
  threat: 'Threats / intimidation',
  fake_police: 'Impersonating law enforcement/court',
  unofficial_payment: 'Asking to pay to an unofficial account',
  third_party_outsource: 'Third-party collection agency',
  frequent_change: 'Frequently changing numbers/accounts',
  request_personal_info: 'Asking for unrelated personal info',
  private_phone: 'Using personal/private numbers'
};

// Generic US references (educational only; not legal advice)
const US_REF_GENERAL = 'References: FDCPA (Fair Debt Collection Practices Act) & CFPB Regulation F (where applicable). State laws may also apply.';
const US_REF_TCPA = 'References: TCPA (Telephone Consumer Protection Act) and related FCC rules (where applicable).';
const US_REF_IMPERSONATION = 'References: Federal/state laws against impersonation, fraud, and harassment; report to local authorities if threatened.';

const usGuidance = {
  phone:
    '1. Stay calm and ask who they are (company name, callback number, mailing address).\n' +
    '2. Write down date/time, number, and what was said.\n' +
    '3. If you want, request written validation/notice and ask them to communicate in writing.\n' +
    '4. Do not share sensitive info (SSN, bank logins).\n' +
    '5. If abusive, document it and consider reporting.',
  sms:
    '1. Screenshot and save all messages.\n' +
    '2. Do not engage with threats; keep replies short and factual.\n' +
    '3. Ask for written validation/notice if needed.\n' +
    '4. Block/report spam if it becomes harassment (keep evidence first).\n' +
    '5. If they ask for payment via odd links, treat as suspicious.',
  visit:
    '1. Do not let unknown people into your home; talk through a door if needed.\n' +
    '2. Ask for ID and written information; do not hand over cash.\n' +
    '3. Record details (time, names, vehicle, statements).\n' +
    '4. If you feel unsafe, contact local authorities.\n' +
    '5. Follow up by requesting written communication.',
  sued:
    '1. Do not ignore court papers. Note deadlines immediately.\n' +
    '2. Gather documents (contracts, statements, payments).\n' +
    '3. Consider legal aid or a consumer attorney for advice on your response.\n' +
    '4. File your response on time.\n' +
    '5. Keep all communication in writing going forward.',
  lawyer_letter:
    '1. Verify the sender (law firm name, phone, address).\n' +
    '2. Keep the envelope and letter as evidence.\n' +
    '3. Do not panic—read carefully and note any deadlines.\n' +
    '4. If unsure, consult a consumer attorney or legal aid.\n' +
    '5. Prefer written communication for any reply.',
  emergency_contact:
    '1. Ask the caller to stop contacting third parties.\n' +
    '2. Tell your contact not to share any information.\n' +
    '3. Save call logs/screenshots from the third party too.\n' +
    '4. Escalate to the original creditor and document the request.\n' +
    '5. Report persistent violations with your evidence pack.',
  wechat_private:
    '1. Keep communications on official, traceable channels (mail/email).\n' +
    '2. Do not click unknown links or share verification codes.\n' +
    '3. Save screenshots of any push to private channels.\n' +
    '4. Request written communication and validation.\n' +
    '5. Treat payment requests over DMs as suspicious.',
  non_working_hours:
    '1. Document date/time of each contact.\n' +
    '2. Tell them your preferred contact window in writing.\n' +
    '3. Block unknown numbers if harassment continues (keep evidence first).\n' +
    '4. Save voicemails/texts as evidence.\n' +
    '5. Report repeated violations with your records.',
  auto_robot:
    '1. Save the robocall recordings/voicemails if possible.\n' +
    '2. Note the calling number and frequency.\n' +
    '3. Do not press buttons that confirm your identity.\n' +
    '4. Request a live agent and written communication.\n' +
    '5. Report unwanted robocalls with evidence.',
  high_frequency:
    '1. Keep a log of every attempt (time, number, duration).\n' +
    '2. Save voicemails and any threatening texts.\n' +
    '3. Send a written request to limit contact (keep a copy).\n' +
    '4. Use call-blocking after preserving evidence.\n' +
    '5. Report harassment with your evidence pack.',
  third_party:
    '1. Ask them to stop contacting third parties.\n' +
    '2. Tell your employer/family to not disclose anything.\n' +
    '3. Collect screenshots/call logs from those third parties.\n' +
    '4. Escalate to the original creditor if applicable.\n' +
    '5. Report persistent third‑party contact using your records.',
  threat:
    '1. Save recordings/messages immediately.\n' +
    '2. Do not argue—end the call if you feel unsafe.\n' +
    '3. Ask for written communication.\n' +
    '4. If there is a credible threat of violence, contact local authorities.\n' +
    '5. Consider reporting harassment with your evidence.',
  fake_police:
    '1. Do not provide personal info or payment.\n' +
    '2. Save recordings/messages and numbers used.\n' +
    '3. Independently verify any claimed case/court via official channels.\n' +
    '4. If impersonation is involved, report to local authorities.\n' +
    '5. Treat as potential fraud until verified.',
  unofficial_payment:
    '1. Do not pay via gift cards, crypto, wire to random accounts, or unknown links.\n' +
    '2. Ask for written details and verify the creditor independently.\n' +
    '3. Save payment instructions as evidence.\n' +
    '4. If you already paid, contact your bank/payment provider quickly.\n' +
    '5. Report suspected fraud with your evidence.',
  third_party_outsource:
    '1. Ask for the collector’s company name/address and the creditor’s name.\n' +
    '2. Request written validation/notice.\n' +
    '3. Keep records of all contacts and any abusive language.\n' +
    '4. If you dispute the debt, communicate in writing.\n' +
    '5. Report misconduct with your evidence pack.',
  frequent_change:
    '1. Log each number/account used and dates of contact.\n' +
    '2. Keep screenshots and voicemail recordings.\n' +
    '3. Ask for written communication to reduce spoofing risk.\n' +
    '4. Use spam protection after preserving evidence.\n' +
    '5. Report patterns with your evidence.',
  request_personal_info:
    '1. Do not share SSN, bank logins, or unrelated personal data.\n' +
    '2. Ask why the info is needed and request written validation.\n' +
    '3. Save messages/recordings where info was demanded.\n' +
    '4. Verify the collector/creditor independently before sharing anything.\n' +
    '5. Report suspicious behavior with your records.',
  private_phone:
    '1. Ask for official contact details and a mailing address.\n' +
    '2. Be cautious—personal numbers can indicate spoofing or scams.\n' +
    '3. Save call logs/recordings.\n' +
    '4. Request written communication.\n' +
    '5. Do not send payments to accounts provided only by personal calls.'
};

const usLaw = {
  visit: US_REF_GENERAL,
  emergency_contact: US_REF_GENERAL,
  third_party: US_REF_GENERAL,
  non_working_hours: US_REF_GENERAL,
  high_frequency: US_REF_GENERAL,
  threat: US_REF_GENERAL,
  third_party_outsource: US_REF_GENERAL,
  wechat_private: US_REF_GENERAL,
  private_phone: US_REF_GENERAL,
  auto_robot: US_REF_TCPA,
  frequent_change: US_REF_TCPA,
  fake_police: US_REF_IMPERSONATION,
  unofficial_payment: US_REF_IMPERSONATION,
  request_personal_info: US_REF_IMPERSONATION
};

const usLawDetail = {
  visit: 'Unwanted visits, harassment, or threats can be unlawful depending on circumstances. Document everything and prioritize safety.',
  emergency_contact: 'Contacting third parties is restricted in many situations. Document and request that they stop.',
  third_party: 'Contacting friends/family/employer can be restricted. Keep evidence and request they stop.',
  non_working_hours: 'Repeated contacts at inconvenient times may be considered harassment depending on context. Keep records.',
  auto_robot: 'Unwanted robocalls may be restricted under TCPA/FCC rules depending on consent and calling technology.',
  high_frequency: 'Repeated calls intended to harass can violate consumer protection rules and state laws.',
  threat: 'Threats, intimidation, or abusive language can violate consumer protection rules and state laws.',
  fake_police: 'Impersonating law enforcement or courts is serious—treat as fraud and report.',
  unofficial_payment: 'Requests to pay via unusual methods can indicate fraud; verify independently.',
  third_party_outsource: 'Third-party collectors are often covered by FDCPA/Regulation F; request validation and keep records.',
  frequent_change: 'Spoofing/changing numbers can be used for harassment or scams; document and report patterns.',
  request_personal_info: 'Demands for unrelated sensitive info can be a red flag; verify identity and avoid sharing.',
  private_phone: 'Collectors should provide verifiable contact details; personal numbers increase spoofing/scam risk.'
};

const localizeToUS = (qs) =>
  qs.map((q) => {
    const qc = usQuestionCopy[q.id];
    const options = (q.options || []).map((opt) => {
      if (q.id === 'occupation') {
        return { ...opt, label: usOccupationLabels[opt.value] || opt.label };
      }
      if (q.id === 'contact_method') {
        const key = opt.value;
        return {
          ...opt,
          label: usContactLabels[key] || opt.label,
          handlingMethod: usGuidance[key] || opt.handlingMethod,
          law: usLaw[key] || (opt.illegal ? US_REF_GENERAL : opt.law),
          lawDetail: usLawDetail[key] || opt.lawDetail
        };
      }
      return opt;
    });
    return {
      ...q,
      title: qc?.title || q.title,
      description: qc?.description || q.description,
      options
    };
  });

  const questions = isUS ? localizeToUS(baseQuestions) : baseQuestions;

  React.useEffect(() => {
    // Clamp currentStep to valid range once questions are available
    setCurrentStep((prev) => {
      const max = Math.max(0, (questions?.length || 1) - 1);
      if (typeof prev !== 'number' || Number.isNaN(prev)) return 0;
      return Math.min(Math.max(prev, 0), max);
    });
  }, []);


  const calculateRisk = async () => {
    const totalRisk = Object.values(answers).reduce((sum, answer) => sum + answer.risk, 0);
    const maxRisk = questions.length * 3;
    const riskPercentage = totalRisk / maxRisk * 100;
    let level;
    if (riskPercentage <= 33) {
      level = 'low';
    } else if (riskPercentage <= 66) {
      level = 'medium';
    } else {
      level = 'high';
    }

    // 检查违法的催收方式
    const illegalBehaviors = [];
    const contactMethodAnswer = answers['contact_method'];
    if (contactMethodAnswer && Array.isArray(contactMethodAnswer.value)) {
      const contactMethodQuestion = questions.find(q => q.id === 'contact_method');
      contactMethodAnswer.value.forEach(value => {
        const option = contactMethodQuestion.options.find(o => o.value === value);
        if (option && option.illegal) {
          illegalBehaviors.push({
            label: option.label,
            law: option.law,
            lawDetail: option.lawDetail,
            handlingMethod: option.handlingMethod
          });
        }
      });
    }

    // 保存{'评估结果'}到本地存储
    const assessmentResult = {
      level,
      percentage: riskPercentage,
      totalRisk,
      illegalBehaviors,
      completed: true,
      currentStep: questions.length,
      answers,
      otherContactMethod
    };
    localStorage.setItem('assessment_result_cn', JSON.stringify(assessmentResult));
    setRiskLevel({
      level,
      percentage: riskPercentage,
      totalRisk,
      illegalBehaviors
    });
  };
  const getRiskInfo = (level, answers) => {
    try {
      // 参数验证：确保 level 和 answers 有效
      if (!level || !answers || typeof answers !== 'object') {
        return null;
      }

      // 根据用户的具体情况生成个性化建议
      const occupation = answers['occupation']?.value;
      const debtAmount = answers['debt_amount']?.value;
      const paymentAbility = answers['payment_ability']?.value;
      const legalAction = answers['legal_action']?.value;
      const contactMethod = Array.isArray(answers['contact_method']?.value) ? answers['contact_method'].value : [];

      // 生成职业相关建议
      const getOccupationSuggestions = occ => {
        try {
          const suggestions = {
            employee: ['保持工作稳定性：避免因债务问题影响工作，这是还款的重要保障', '合理利用公积金：如有公积金贷款，可咨询是否可以提取公积金还款', '关注社保公积金：确保社保公积金正常缴纳，避免断缴影响未来福利', '与家人沟通：与配偶或家人坦诚沟通债务情况，寻求家庭支持'],
            freelancer: ['稳定收入来源：尽量保持稳定的客户和收入，避免收入波动影响还款', '做好税务规划：合理规划税务，避免因税务问题加重债务负担', '维护客户关系：保持良好的客户关系，避免债务问题影响业务', '建立应急基金：自由职业者收入不稳定，建议建立3-6个月的应急基金'],
            business: ['保护经营现金流：优先保障经营现金流，避免因还款影响正常经营', '与供应商协商：与供应商协商延长付款周期，缓解资金压力', '考虑资产变现：如有闲置资产，可考虑变现偿还部分债务', '寻求政府支持：了解当地政府对小微企业的扶持政策，申请相关支持'],
            government: ['关注职业影响：公务员和事业单位人员需注意债务问题可能影响政审和晋升', '遵守纪律规定：了解单位关于个人债务的相关规定，避免违规', '寻求组织帮助：如债务问题严重，可向组织说明情况，寻求帮助', '保持良好形象：避免债务问题影响个人和单位形象'],
            student: ['与家长沟通：如实告知家长债务情况，寻求家庭支持和帮助', '关注学业影响：避免债务问题影响学业，必要时可申请休学或缓考', '了解助学贷款：如有助学贷款，了解相关政策和还款优惠', '寻求学校帮助：可向学校心理咨询中心或学生资助中心寻求帮助'],
            retired: ['关注养老金：确保养老金正常领取，这是还款的重要来源', '利用医疗保障：合理利用医疗保障，减少医疗支出', '与子女沟通：与子女坦诚沟通债务情况，寻求家庭支持', '了解社会救助：如经济困难，可了解当地的社会救助政策'],
            unemployed: ['积极寻找工作：将就业作为首要任务，稳定的收入是还款的基础', '申请社会救助：了解并申请当地的社会救助和失业保险', '参加技能培训：参加政府或社会组织提供的免费技能培训，提升就业能力', '寻求亲友帮助：向亲友说明情况，寻求临时经济支持'],
            other: ['保持积极心态：债务问题可以解决，保持积极乐观的心态', '制定详细计划：根据自身情况制定详细的还款计划', '寻求专业帮助：如有需要，可寻求专业的债务咨询或法律帮助', '避免新增债务：在还清现有债务前，避免新增任何债务']
          };
          return suggestions[occ] || suggestions['other'];
        } catch (error) {
          console.error('Error in getOccupationSuggestions:', error);
          return ['保持积极心态：债务问题可以解决，保持积极乐观的心态', '制定详细计划：根据自身情况制定详细的还款计划', '寻求专业帮助：如有需要，可寻求专业的债务咨询或法律帮助', '避免新增债务：在还清现有债务前，避免新增任何债务'];
        }
      };

      // 生成负债金额相关建议
      const getDebtAmountSuggestions = amount => {
        try {
          const suggestions = {
            small: ['小额债务易解决：5万以下的债务相对容易解决，保持信心', '优先偿还高利率债务：优先偿还信用卡等高利率债务', '考虑一次性还清：如有可能，考虑一次性还清部分债务', '避免逾期：小额债务更要避免逾期，影响征信'],
            medium: ['制定分期计划：5-20万的债务需要制定详细的分期还款计划', '评估债务整合：可考虑债务整合贷款，降低利息负担', '增加收入来源：考虑兼职或副业，增加收入用于还款', '与债权方协商：主动与债权方协商，争取更优惠的还款条件'],
            large: ['寻求专业帮助：20-50万的债务建议寻求专业的债务咨询或律师帮助', '考虑资产处置：如有闲置资产，可考虑处置部分资产偿还债务', '制定长期计划：制定3-5年的长期还款计划，保持耐心', '避免冲动决策：不要因债务压力做出冲动的决策'],
            huge: ['咨询破产律师：50万以上的巨额债务，可咨询律师了解个人破产的法律程序', '保护核心资产：确保住房、养老金等核心资产不受影响', '与家人共同面对：巨额债务需要家人共同面对和支持', '做好长期准备：巨额债务的解决需要较长时间，做好长期准备']
          };
          return suggestions[amount] || suggestions['medium'];
        } catch (error) {
          console.error('Error in getDebtAmountSuggestions:', error);
          return ['制定分期计划：5-20万的债务需要制定详细的分期还款计划', '评估债务整合：可考虑债务整合贷款，降低利息负担', '增加收入来源：考虑兼职或副业，增加收入用于还款', '与债权方协商：主动与债权方协商，争取更优惠的还款条件'];
        }
      };

      // 生成还款能力相关建议
      const getPaymentAbilitySuggestions = ability => {
        try {
          const suggestions = {
            good: ['保持良好习惯：继续保持按时还款的良好习惯', '提前还款：如有余力，可考虑提前还款，减少利息支出', '优化债务结构：评估是否可以整合债务，降低整体利息', '建立信用：通过按时还款，逐步建立良好的信用记录'],
            partial: ['协商分期还款：与债权方协商，制定可行的分期还款计划', '优先偿还高利率债务：优先偿还信用卡等高利率债务', '增加收入来源：考虑兼职或副业，增加收入用于还款', '控制支出：严格控制非必要支出，将更多资金用于还款'],
            difficult: ['主动说明情况：主动联系债权方，说明暂时无法还款的原因', '申请延期还款：申请延期还款或减免利息', '寻求债务重组：可寻求专业的债务重组服务', '避免失联：即使无法还款，也要保持联系，避免失联']
          };
          return suggestions[ability] || suggestions['difficult'];
        } catch (error) {
          console.error('Error in getPaymentAbilitySuggestions:', error);
          return ['主动说明情况：主动联系债权方，说明暂时无法还款的原因', '申请延期还款：申请延期还款或减免利息', '寻求债务重组：可寻求专业的债务重组服务', '避免失联：即使无法还款，也要保持联系，避免失联'];
        }
      };

      // 生成法律行动相关建议
      const getLegalActionSuggestions = action => {
        try {
          const suggestions = {
            no: ['预防为主：目前未收到法律文书，以预防为主', '保持沟通：保持与债权方的正常沟通，避免事态升级', '了解法律知识：学习相关法律知识，了解自己的权利', '保留证据：保留所有沟通记录，以备不时之需'],
            notice: ['认真对待律师函：律师函是法律行动的前奏，需要认真对待', '核实律师函真实性：联系律师事务所确认律师函的真实性', '咨询专业律师：如有疑问，咨询专业律师了解应对方法', '准备应诉材料：提前准备相关证据和材料，以备应诉'],
            sued: ['立即咨询律师：已被起诉，立即咨询专业律师', '准备答辩状：在法定期限内提交答辩状，维护自身权益', '收集证据：收集所有相关证据，包括借款合同、还款记录等', '积极应诉：积极应诉，不要缺席庭审']
          };
          return suggestions[action] || suggestions['no'];
        } catch (error) {
          console.error('Error in getLegalActionSuggestions:', error);
          return ['预防为主：目前未收到法律文书，以预防为主', '保持沟通：保持与债权方的正常沟通，避免事态升级', '了解法律知识：学习相关法律知识，了解自己的权利', '保留证据：保留所有沟通记录，以备不时之需'];
        }
      };

      // 生成催收方式相关建议
      const getContactMethodSuggestions = methods => {
        try {
          const suggestions = [];

          // 确保 methods 是数组
          if (!Array.isArray(methods)) {
            suggestions.push('催收方式信息缺失：无法获取催收方式信息');
            return suggestions;
          }

          // 确保 questions 数组存在且包含 contact_method 问题
          if (!questions || !Array.isArray(questions)) {
            suggestions.push('催收方式信息缺失：无法获取催收方式信息');
            return suggestions;
          }
          const contactQuestion = questions.find(q => q && q.id === 'contact_method');
          if (!contactQuestion || !contactQuestion.options || !Array.isArray(contactQuestion.options)) {
            suggestions.push('催收方式信息缺失：无法获取催收方式信息');
            return suggestions;
          }

          // 检查是否有违法催收方式
          const illegalMethods = methods.filter(m => {
            const option = contactQuestion.options.find(o => o && o.value === m);
            return option && option.illegal;
          });
          if (illegalMethods.length > 0) {
            suggestions.push('检测到违法催收行为：您遭遇了违法催收，请谨慎应对');
            suggestions.push('优先与债权银行沟通：首先联系债权银行的官方客服，说明催收人员的违规行为，要求更换催收人员或调整催收方式');
            suggestions.push('收集违法证据：保留所有违法催收的证据，包括录音、短信、聊天记录，作为与银行沟通的依据');
            suggestions.push('避免直接投诉：不要立即向监管部门投诉，这可能导致银行直接起诉，应先尝试与银行协商解决');
            suggestions.push('寻求内部投诉渠道：通过银行内部的投诉渠道（如客服热线、官网投诉）反映问题，通常比外部投诉更有效');
            suggestions.push('咨询专业律师：如违法催收造成严重后果或银行不予处理，再咨询专业律师了解维权途径');
          } else {
            suggestions.push('催收方式合法：目前催收方式相对合法，保持正常沟通');
            suggestions.push('保持冷静：面对催收保持冷静，不要情绪化回应');
            suggestions.push('记录沟通内容：记录每次沟通的时间、内容和对方身份');
          }

          // 检查是否有高频电话轰炸
          if (methods.includes('high_frequency')) {
            suggestions.push('高频电话骚扰：遭遇高频电话轰炸，先联系银行客服要求停止，如无效再向公安机关报案');
          }

          // 检查是否有上门催收
          if (methods.includes('visit')) {
            suggestions.push('上门催收风险：上门催收可能侵犯隐私权，先联系银行客服要求停止，如无效可报警处理');
          }

          // 检查是否有威胁恐吓
          if (methods.includes('threat')) {
            suggestions.push('威胁恐吓严重：威胁恐吓可能构成犯罪，立即向公安机关报案，同时联系银行客服投诉');
          }
          return suggestions;
        } catch (error) {
          console.error('Error in getContactMethodSuggestions:', error);
          return ['催收方式信息缺失：无法获取催收方式信息'];
        }
      };

      // 合并所有个性化建议
      const allSuggestions = [...getOccupationSuggestions(occupation), ...getDebtAmountSuggestions(debtAmount), ...getPaymentAbilitySuggestions(paymentAbility), ...getLegalActionSuggestions(legalAction), ...getContactMethodSuggestions(contactMethod)];

      // 去重并限制建议数量，确保 suggestions 是数组
      const uniqueSuggestions = Array.isArray(allSuggestions) ? [...new Set(allSuggestions)].slice(0, 12) : [];

      // 根据风险等级{'返回'}对应信息
      const riskInfoMap = {
        low: {
          color: '#10B981',
          icon: CheckCircle,
          title: '低风险',
          description: '当前风险较低，建议保持沟通，按时还款',
          suggestions: uniqueSuggestions
        },
        medium: {
          color: '#F59E0B',
          icon: AlertTriangle,
          title: '中等风险',
          description: '存在一定风险，建议主动协商，制定应对方案',
          suggestions: uniqueSuggestions
        },
        high: {
          color: '#EF4444',
          icon: XCircle,
          title: '高风险',
          description: '风险较高，建议寻求专业法律帮助，谨慎应对',
          suggestions: uniqueSuggestions
        }
      };
      return riskInfoMap[level] || null;
    } catch (error) {
      console.error('Error in getRiskInfo:', error);
      return null;
    }
  };
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
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span onClick={() => navigateTo({ pageId: 'cn/home' })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{'风险评估'}</span>
          </div>
          <div className="w-12 md:w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
        {!riskLevel ? <>
            {/* Progress Bar */}
            <div className="mb-4 md:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-[#64748B]">
                  问题 {Math.min(currentStep + 1, questions.length)} / {questions.length}
                </span>
                <span className="text-xs md:text-sm font-semibold text-[#1E3A5F]">
                  {Math.round(Math.min(currentStep + 1, questions.length) / questions.length * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#1E3A5F] transition-all duration-500" style={{
              width: `${Math.min(currentStep + 1, questions.length) / questions.length * 100}%`
            }}></div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              {(() => {
            // 确保 currentStep 在有效范围内
            const safeCurrentStep = currentStep >= 0 && currentStep < questions.length ? currentStep : 0;
            const currentQuestion = questions[safeCurrentStep];
            if (!currentQuestion) {
              return <div className="text-center py-8">{'加载中...'}</div>;
            }
            return <>
                  <div className="mb-4 md:mb-8">
                    <h2 className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 md:mb-3">
                      {currentQuestion.title}
                    </h2>
                    <p className="text-xs md:text-sm text-[#64748B]">{currentQuestion.description}</p>
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    {currentQuestion.options.map(option => {
                  const currentAnswer = answers[currentQuestion.id];
                  const isMultiSelect = currentQuestion.id === 'contact_method';
                  let isSelected;
                  if (isMultiSelect) {
                    const selectedValues = Array.isArray(currentAnswer?.value) ? currentAnswer.value : currentAnswer?.value ? [currentAnswer.value] : [];
                    isSelected = selectedValues.includes(option.value);
                  } else {
                    isSelected = currentAnswer?.value === option.value;
                  }
                  return <button key={option.value} onClick={() => handleAnswer(currentQuestion.id, option.value, option.risk)} className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-[#1E3A5F] bg-[#1E3A5F]/5' : 'border-slate-200 hover:border-[#1E3A5F]/30 hover:bg-slate-50'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-base font-medium text-[#1E3A5F]">{option.label}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#1E3A5F]" />}
                      </div>
                    </button>;
                })}
              </div>

              {/* 其他催收方式输入框 */}
              {currentQuestion.id === 'contact_method' && (() => {
                const currentAnswer = answers['contact_method'];
                const selectedValues = Array.isArray(currentAnswer?.value) ? currentAnswer.value : currentAnswer?.value ? [currentAnswer.value] : [];
                if (selectedValues.includes('other')) {
                  return <div className="mt-3 md:mt-4 p-3 md:p-4 bg-slate-50 rounded-xl border-2 border-[#1E3A5F]/20">
                      <label className="block text-xs md:text-sm font-medium text-[#1E3A5F] mb-2">
                        请具体说明其他催收方式
                      </label>
                      <Input value={otherContactMethod} onChange={e => setOtherContactMethod(e.target.value)} placeholder={"例如：通过社交媒体联系、发送邮件等"} className="w-full text-xs md:text-sm" />
                    </div>;
                }
                return null;
              })()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 md:mt-8 gap-3">
                <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="px-4 md:px-6 text-xs md:text-sm">
                  上一题
                </Button>
                <Button onClick={handleNext} className="bg-[#1E3A5F] hover:bg-[#0F2744] px-4 md:px-6 text-xs md:text-sm">
                  {currentStep === questions.length - 1 ? '查看结果' : '下一项'}
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                </Button>
              </div>
                </>;
          })()}
            <p className="text-xs text-[#64748B] mt-4">本结果基于你本次选择生成，仅用于风险提示，不构成法律意见。</p>
              </Card>
          </> : <>
            {/* Risk Result */}
            <Card className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              {(() => {
            // 确保 riskInfo 始终是一个有效的对象
            const defaultRiskInfo = {
              color: '#64748B',
              icon: Info,
              title: '评估结果',
              description: '无法加载评估结果',
              suggestions: ['请重新完成评估']
            };
            let riskInfo = defaultRiskInfo;
            if (riskLevel && riskLevel.level && answers) {
              try {
                const result = getRiskInfo(riskLevel.level, answers);
                if (result && result.title && result.suggestions && result.icon) {
                  riskInfo = result;
                }
              } catch (error) {
                console.error('Error getting risk info:', error);
                riskInfo = defaultRiskInfo;
              }
            }
            const RiskIcon = riskInfo.icon || Info;

            // 确保 riskLevel 是有效的，否则使用默认值
            const safeRiskLevel = riskLevel && typeof riskLevel.totalRisk === 'number' && typeof riskLevel.percentage === 'number' ? riskLevel : {
              totalRisk: 0,
              percentage: 0
            };
            return <>
                    <div className="text-center mb-6 md:mb-8">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center" style={{
                  backgroundColor: `${riskInfo.color}20`
                }}>
                        <RiskIcon className="w-8 h-8 md:w-12 md:h-12" style={{
                    color: riskInfo.color
                  }} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] mb-2" style={{
                  color: riskInfo.color
                }}>
                        {riskInfo.title}
                      </h2>
                      <p className="text-xs md:text-sm text-[#64748B]">{riskInfo.description}</p>
                    </div>

                    {/* Risk Score */}
                    <div className="bg-slate-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs md:text-sm text-[#64748B]">{'风险评分'}</span>
                        <span className="text-xl md:text-2xl font-bold font-['Space_Grotesk'] text-[#1E3A5F]">
                          {safeRiskLevel.totalRisk} / {questions.length * 3}
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full transition-all duration-1000" style={{
                    width: `${safeRiskLevel.percentage}%`,
                    backgroundColor: riskInfo.color
                  }}></div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-lg md:text-xl font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-3 md:mb-4">
                        {'建议措施'}
                      </h3>
                      <div className="space-y-2 md:space-y-3">
                        {Array.isArray(riskInfo.suggestions) && riskInfo.suggestions.map((suggestion, index) => <div key={index} className="flex items-start gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      backgroundColor: `${riskInfo.color}20`
                    }}>
                              <span className="text-xs font-bold" style={{
                        color: riskInfo.color
                      }}>
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">{suggestion}</p>
                          </div>)}
                      </div>
                    </div>

                    {/* Legal Warning - 如果有违法行为 */}
                    {riskLevel && riskLevel.illegalBehaviors && riskLevel.illegalBehaviors.length > 0 && <div className="mb-6 md:mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-4 md:p-6">
                        <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                          <Scale className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-red-700 mb-2">
                              检测到可能的违法催收行为
                            </h3>
                            <p className="text-xs md:text-sm text-red-600 mb-3 md:mb-4">
                              根据您提供的信息，检测到 {riskLevel.illegalBehaviors.length} 种可能违反相关法律法规的催收方式，请注意保护自身权益。
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                          {riskLevel.illegalBehaviors.map((behavior, index) => <div key={index} className="bg-white rounded-lg p-3 md:p-4 border border-red-100">
                              <div className="flex items-start gap-2">
                                <FileText className="w-3 h-3 md:w-4 md:h-4 text-red-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm md:text-base font-semibold text-red-700">{behavior.label}</span>
                              </div>
                            </div>)}
                        </div>
                        <Button onClick={() => {
                  try {
                    sessionStorage.setItem('illegal_behaviors_cn_current', JSON.stringify(riskLevel.illegalBehaviors || []));
                    sessionStorage.setItem('illegal_behaviors_cn_ts', String(Date.now()));
                  } catch {}
                  navigateTo({ pageId: 'cn/illegal-collection' });
                }} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm">
                          查看违法催收行为详情
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                      </div>}

                    {/* Risk Warning Card - 债务清算/协商代理风险提示 */}
                    <div className="mb-6 md:mb-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-6">
                      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700 mb-2">
                            风险提示｜关于"债务清算/债务协商代理"的常见风险
                          </h3>
                          <p className="text-xs md:text-sm text-amber-600 mb-3 md:mb-4">
                            请注意：目前市场上存在以"债务清算""债务优化""停息挂账代理"等名义提供服务的机构或个人，其中部分存在较高风险。
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => navigateTo({
                  pageId: 'cn/risk-warning'
                })} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm">
                          查看风险提示详情
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 md:gap-4">
                      <Button onClick={() => {
                  // 清除本地存储的{'评估结果'}
                  localStorage.removeItem('assessment_result_cn');
                  // 重置所有状态
                  setCurrentStep(0);
                  setAnswers({});
                  setRiskLevel(null);
                  setOtherContactMethod('');
                  // 显示成功提示
                  toast({
                    title: '已重置评估状态',
                    variant: 'default'
                  });
                }} variant="outline" className="flex-1 text-xs md:text-sm">
                        重新评估
                      </Button>
                      <Button onClick={() => navigateTo({
                  pageId: 'cn/solutions',
                  params: {
                    riskLevel: riskLevel ? riskLevel.level : 'low'
                  }
                })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                        查看应对方案
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Button>
                    </div>
                  </>;
          })()}
            </Card>
          </>}
      </main>
    </div>;
}