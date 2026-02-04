// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, AlertTriangle, Shield, CheckCircle, XCircle, ChevronRight, Plus, Scale, FileText, AlertCircle, Info } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Input } from '@/components/ui';
import usContactOptions from '@/data/us/contactOptions.js';

// Fixed locale (separate per-country pages; no i18n)
const isUS = true;
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
    const savedAssessment = localStorage.getItem('assessment_result_us');
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
    const savedAssessment = localStorage.getItem('assessment_result_us');
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
    const savedAssessment = localStorage.getItem('assessment_result_us');
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
    const savedAssessment = localStorage.getItem('assessment_result_us');
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
    title: 'Occupation',
    description: 'Select your occupation',
    options: [{
      value: 'employee',
      label: 'Employee',
      risk: 1
    }, {
      value: 'freelancer',
      label: 'Freelancer',
      risk: 2
    }, {
      value: 'business',
      label: 'Small business owner',
      risk: 2
    }, {
      value: 'government',
      label: 'Public sector',
      risk: 1
    }, {
      value: 'student',
      label: 'Student',
      risk: 2
    }, {
      value: 'retired',
      label: 'Retired',
      risk: 1
    }, {
      value: 'unemployed',
      label: 'Unemployed',
      risk: 3
    }, {
      value: 'other',
      label: 'Other',
      risk: 2
    }]
  }, {
    id: 'contact_method',
    title: 'Collection methods',
    description: 'How are they contacting you? (Select all that apply)',
    multiSelect: true,
    options: usContactOptions
  }, {

    id: 'debt_amount',
    title: 'Total debt amount',
    description: 'Approximately how much total debt do you have?',
    options: [{
      value: 'small',
      label: 'Under $10,000',
      risk: 1
    }, {
      value: 'medium',
      label: '$10,000–$50,000',
      risk: 2
    }, {
      value: 'large',
      label: '$50,000–$200,000',
      risk: 2
    }, {
      value: 'huge',
      label: 'Over $200,000',
      risk: 3
    }]
  }, {
    id: 'payment_ability',
    title: 'Ability to pay',
    description: 'How is your ability to pay right now?',
    options: [{
      value: 'good',
      label: 'Can pay on time',
      risk: 1
    }, {
      value: 'partial',
      label: 'Can pay partially',
      risk: 2
    }, {
      value: 'difficult',
      label: 'Cannot pay right now',
      risk: 3
    }]
  }, {
    id: 'legal_action',
    title: 'Legal action',
    description: 'Have you received legal papers or been sued?',
    options: [{
      value: 'no',
      label: 'No',
      risk: 1
    }, {
      value: 'notice',
      label: 'Received an attorney letter/notice',
      risk: 2
    }, {
      value: 'sued',
      label: 'Yes, I was sued',
      risk: 3
    }]
  }];
  const handleAnswer = (questionId, value, risk) => {
    // 对于催收方式Question，支持多选
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
      // 其他Question保持单选
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
        title: 'Page state error — please restart',
        variant: 'destructive'
      });
      return;
    }
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) {
      console.error('Current question not found:', currentStep);
      toast({
        title: 'Page state error — please restart',
        variant: 'destructive'
      });
      return;
    }
    const currentAnswer = answers[currentQuestion.id];

    // 检查是否已选择答案
    if (!currentAnswer) {
      toast({
        title: 'Please select an option',
        variant: 'destructive'
      });
      return;
    }

    // 对于多选Question，检查是否至少选择了一个选项
    if (currentQuestion.id === 'contact_method') {
      const selectedValues = Array.isArray(currentAnswer.value) ? currentAnswer.value : [currentAnswer.value];
      if (selectedValues.length === 0) {
        toast({
          title: 'Please select at least one option',
          variant: 'destructive'
        });
        return;
      }
      // 如果选择了"其他"，检查是否填写了具体内容
      if (selectedValues.includes('other') && !otherContactMethod.trim()) {
        toast({
          title: 'Please describe the other method',
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
  contact_method: { title: 'Collection methods', description: 'How are they contacting you? (Select all that apply)' },
  debt_amount: { title: 'Total debt amount', description: 'Roughly how much total debt do you have?' },
  payment_ability: { title: 'Ability to pay', description: 'What is your current ability to pay?' },
  legal_action: { title: 'Legal action', description: 'Have you received any legal notice or been served?' }
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

const usDebtAmountLabels = {
  small: 'Under $10,000',
  medium: '$10,000–$50,000',
  large: '$50,000–$150,000',
  huge: 'Over $150,000'
};

const usPaymentAbilityLabels = {
  good: 'Can pay on schedule',
  partial: 'Can pay partially',
  difficult: 'Cannot pay right now'
};

const usLegalActionLabels = {
  no: 'No',
  notice: 'Received an attorney letter/notice',
  sued: 'Served / sued'
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
      if (q.id === 'debt_amount') {
        return { ...opt, label: usDebtAmountLabels[opt.value] || opt.label };
      }
      if (q.id === 'payment_ability') {
        return { ...opt, label: usPaymentAbilityLabels[opt.value] || opt.label };
      }
      if (q.id === 'legal_action') {
        return { ...opt, label: usLegalActionLabels[opt.value] || opt.label };
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

    // 保存{'Assessment result'}到本地存储
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
    localStorage.setItem('assessment_result_us', JSON.stringify(assessmentResult));
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
            employee: ['Protect your job stability—income is key to repayment.', 'Review benefits and any employer programs that may help during hardship.', 'Keep essential bills current (housing, utilities, insurance).', 'Talk with family/household early to align on a realistic plan.'],
            freelancer: ['Stabilize income where possible (retain clients, diversify).', 'Set aside money for taxes to avoid additional issues.', 'Maintain client relationships and protect your reputation.', 'Build a small emergency buffer (even 2–4 weeks helps).'],
            business: ['Protect business cash flow—keep the business running.', 'Negotiate terms with vendors to ease short-term pressure.', 'Consider selling unused assets to reduce debt.', 'Separate personal and business finances and document everything.'],
            government: ['Be mindful of workplace policies and keep communications professional.', 'Avoid scams or “private payment” requests that could create compliance issues.', 'Document all collector contact and keep it off work channels if possible.', 'Seek professional advice early if the situation escalates.'],
            student: ['Talk with family/guardians if you can—they may help you plan.', 'Protect your studies—avoid actions that disrupt school.', 'Check for hardship programs (student loans/servicers may offer options).', 'Reach out to campus support resources if stress is severe.'],
            retired: ['Protect retirement income and essential expenses (housing/medical).', 'Avoid high-fee “debt relief” promises—verify before paying anyone.', 'Discuss with family if you need support.', 'Consider speaking with a nonprofit credit counselor.'],
            unemployed: ['Prioritize job search—stable income changes everything.', 'Cut non-essential spending and build a bare-minimum budget.', 'Ask creditors for hardship options while you stabilize.', 'Consider community resources or benefits if eligible.'],
            other: ['Stay calm—this is solvable with a plan.', 'Write down a realistic budget and repayment goal.', 'Seek reputable help if needed (nonprofit counseling / consumer attorney).', 'Avoid taking on new debt while resolving the current one.']
          };
          return suggestions[occ] || suggestions['other'];
        } catch (error) {
          console.error('Error in getOccupationSuggestions:', error);
          return ['Stay calm—this is solvable with a plan.', 'Write down a realistic budget and repayment goal.', 'Seek reputable help if needed (nonprofit counseling / consumer attorney).', 'Avoid taking on new debt while resolving the current one.'];
        }
      };

      // 生成负债金额相关建议
      const getDebtAmountSuggestions = amount => {
        try {
          const suggestions = {
            small: ['Smaller balances are often manageable—focus on consistency.', 'Prioritize high-interest debt first (e.g., credit cards).', 'If possible, make an extra payment to reduce interest.', 'Avoid missed payments when you can to protect your credit.'],
            medium: ['Create a structured repayment plan (monthly target).', 'Consider consolidation only if it truly lowers cost (APR/fees).', 'Look for ways to increase income temporarily.', 'Proactively negotiate hardship options with the creditor/collector.'],
            large: ['Consider getting help from a nonprofit credit counselor or attorney.', 'Review whether selling non-essential assets could reduce pressure.', 'Build a 12–36 month plan and stick to it.', 'Avoid high-fee services that promise quick fixes.'],
            huge: ['Consider speaking with a bankruptcy/consumer attorney to understand options.', 'Protect essential assets and basic living expenses.', 'Coordinate with household members—this is a long-term plan.', 'Document everything and avoid rushed decisions.']
          };
          return suggestions[amount] || suggestions['medium'];
        } catch (error) {
          console.error('Error in getDebtAmountSuggestions:', error);
          return ['Create a structured repayment plan (monthly target).', 'Consider consolidation only if it truly lowers cost (APR/fees).', 'Look for ways to increase income temporarily.', 'Proactively negotiate hardship options with the creditor/collector.'];
        }
      };

      // 生成还款能力相关建议
      const getPaymentAbilitySuggestions = ability => {
        try {
          const suggestions = {
            good: ['Keep paying on time—consistency matters.', 'If possible, pay a bit extra to reduce interest.', 'Review whether refinancing/consolidation lowers your total cost.', 'Build/maintain a strong credit profile through on-time payments.'],
            partial: ['Negotiate an affordable payment plan.', 'Prioritize high-interest debt first.', 'Increase income where possible (extra shifts, side work).', 'Cut non-essential spending and track your budget.'],
            difficult: ['Contact the creditor early and explain hardship.', 'Ask about hardship programs, deferment, or fee/interest relief.', 'Consider a nonprofit credit counselor or attorney for options.', 'Do not disappear—keep communication documented.']
          };
          return suggestions[ability] || suggestions['difficult'];
        } catch (error) {
          console.error('Error in getPaymentAbilitySuggestions:', error);
          return ['Contact the creditor early and explain hardship.', 'Ask about hardship programs, deferment, or fee/interest relief.', 'Consider a nonprofit credit counselor or attorney for options.', 'Do not disappear—keep communication documented.'];
        }
      };

      // 生成法律行动相关建议
      const getLegalActionSuggestions = action => {
        try {
          const suggestions = {
            no: ['Stay proactive and keep communications documented.', 'Avoid escalation by responding calmly and in writing when possible.', 'Learn the basics of your rights (general info only).', 'Keep evidence: letters, emails, call logs, and records.'],
            notice: ['Take the letter seriously and keep the envelope/letter.', 'Verify the sender independently (look up official contacts).', 'Consider consulting a consumer attorney if you are unsure.', 'Organize your documents and timeline.'],
            sued: ['Do not ignore court papers—note deadlines immediately.', 'Consider consulting a consumer/bankruptcy attorney.', 'Gather all documents: contracts, statements, payment records.', 'File a timely response and attend hearings.']
          };
          return suggestions[action] || suggestions['no'];
        } catch (error) {
          console.error('Error in getLegalActionSuggestions:', error);
          return ['Stay proactive and keep communications documented.', 'Avoid escalation by responding calmly and in writing when possible.', 'Learn the basics of your rights (general info only).', 'Keep evidence: letters, emails, call logs, and records.'];
        }
      };

      // 生成催收方式相关建议
      const getContactMethodSuggestions = methods => {
        try {
          const suggestions = [];

          // 确保 methods 是数组
          if (!Array.isArray(methods)) {
            suggestions.push('Missing info: unable to determine collection methods.');
            return suggestions;
          }

          // 确保 questions 数组存在且包含 contact_method Question
          if (!questions || !Array.isArray(questions)) {
            suggestions.push('Missing info: unable to determine collection methods.');
            return suggestions;
          }
          const contactQuestion = questions.find(q => q && q.id === 'contact_method');
          if (!contactQuestion || !contactQuestion.options || !Array.isArray(contactQuestion.options)) {
            suggestions.push('Missing info: unable to determine collection methods.');
            return suggestions;
          }

          // 检查是否有违法催收方式
          const illegalMethods = methods.filter(m => {
            const option = contactQuestion.options.find(o => o && o.value === m);
            return option && option.illegal;
          });
          if (illegalMethods.length > 0) {
            suggestions.push('Improper behavior detected: proceed carefully and document everything.');
            suggestions.push('Contact the original creditor through official channels first and report the issue.');
            suggestions.push('Collect evidence: save call logs, recordings where legal, texts, and emails.');
            suggestions.push('Try to resolve with the creditor/collector first; escalate to regulators if needed.');
            suggestions.push('Use the creditor/collector’s internal complaint process when available.');
            suggestions.push('Consider consulting a consumer attorney if harassment is severe or unresolved.');
          } else {
            suggestions.push('No clear improper behavior detected from selected methods; keep communication documented.');
            suggestions.push('Stay calm; avoid emotional arguments.');
            suggestions.push('Keep notes: date/time, who called, and what was said.');
          }

          // 检查是否有高频电话轰炸
          if (methods.includes('high_frequency')) {
            suggestions.push('High-frequency calls: ask to limit contact and file complaints if it continues.');
          }

          // 检查是否有上门催收
          if (methods.includes('visit')) {
            suggestions.push('In-person visits: you can ask them to leave; call local law enforcement if you feel unsafe.');
          }

          // 检查是否有威胁恐吓
          if (methods.includes('threat')) {
            suggestions.push('Threats/intimidation: prioritize safety, document evidence, and report as appropriate.');
          }
          return suggestions;
        } catch (error) {
          console.error('Error in getContactMethodSuggestions:', error);
          return ['Missing info: unable to determine collection methods.'];
        }
      };

      // 合并所有个性化建议
      const allSuggestions = [...getOccupationSuggestions(occupation), ...getDebtAmountSuggestions(debtAmount), ...getPaymentAbilitySuggestions(paymentAbility), ...getLegalActionSuggestions(legalAction), ...getContactMethodSuggestions(contactMethod)];

      // 去重并限制建议数量，确保 suggestions 是数组
      const uniqueSuggestions = Array.isArray(allSuggestions) ? [...new Set(allSuggestions)].slice(0, 12) : [];

      // 根据风险等级{'Back'}对应信息
      const riskInfoMap = {
        low: {
          color: '#10B981',
          icon: CheckCircle,
          title: 'Low risk',
          description: 'Low risk — keep records and communicate calmly; pay on schedule if possible.',
          suggestions: uniqueSuggestions
        },
        medium: {
          color: '#F59E0B',
          icon: AlertTriangle,
          title: 'Medium risk',
          description: 'Medium risk — negotiate proactively and set a plan.',
          suggestions: uniqueSuggestions
        },
        high: {
          color: '#EF4444',
          icon: XCircle,
          title: 'High risk',
          description: 'High risk — consider professional help and proceed carefully.',
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
              <span className="text-sm md:text-base">{'Back'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span onClick={() => navigateTo({ pageId: 'us/home' })} role="button" tabIndex={0} className="text-lg md:text-xl font-bold font-['Space_Grotesk'] hover:opacity-80 cursor-pointer">{'Risk assessment'}</span>
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
                  Question {Math.min(currentStep + 1, questions.length)} / {questions.length}
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
              return <div className="text-center py-8">{'Loading...'}</div>;
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
                        Please describe the other collection method
                      </label>
                      <Input value={otherContactMethod} onChange={e => setOtherContactMethod(e.target.value)} placeholder={"e.g., social media message, email, etc."} className="w-full text-xs md:text-sm" />
                    </div>;
                }
                return null;
              })()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 md:mt-8 gap-3">
                <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline" className="px-4 md:px-6 text-xs md:text-sm">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-[#1E3A5F] hover:bg-[#0F2744] px-4 md:px-6 text-xs md:text-sm">
                  {currentStep === questions.length - 1 ? 'View results' : 'Next'}
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                </Button>
              </div>
                </>;
          })()}
            <p className="text-xs text-[#64748B] mt-4">This result is based on your current selections and is for risk-awareness only, not legal advice.</p>
              </Card>
          </> : <>
            {/* Risk Result */}
            <Card className="bg-white rounded-2xl p-4 md:p-8 shadow-xl">
              {(() => {
            // 确保 riskInfo 始终是一个有效的对象
            const defaultRiskInfo = {
              color: '#64748B',
              icon: Info,
              title: 'Assessment result',
              description: 'Unable to load assessment result',
              suggestions: ['Please complete the assessment again']
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
                        <span className="text-xs md:text-sm text-[#64748B]">{'Risk Score'}</span>
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
                        {'Recommended actions'}
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
                              Potential improper collection behavior detected
                            </h3>
                            <p className="text-xs md:text-sm text-red-600 mb-3 md:mb-4">
                              Based on your inputs, we detected {riskLevel.illegalBehaviors.length} potentially improper/unlawful collection behaviors. Keep records and protect your rights.
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
                    // Strictly bind to THIS assessment result (no URL params to avoid long URLs)
                    sessionStorage.setItem('illegal_behaviors_us_current', JSON.stringify(riskLevel.illegalBehaviors || []));
                    sessionStorage.setItem('illegal_behaviors_us_ts', String(Date.now()));
                  } catch {}
                  navigateTo({ pageId: 'us/illegal-collection' });
                }} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm">
                          View improper collection details
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                      </div>}

                    {/* Risk Warning Card - 债务清算/协商代理风险提示 */}
                    <div className="mb-6 md:mb-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 md:p-6">
                      <div className="flex items-start gap-2 md:gap-3 mb-3 md:mb-4">
                        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold font-['Space_Grotesk'] text-amber-700 mb-2">
                            Warning: common risks of debt relief / settlement services
                          </h3>
                          <p className="text-xs md:text-sm text-amber-600 mb-3 md:mb-4">
                            Please note: Some "debt relief" or "debt settlement" services may charge high fees, make unrealistic promises, or ask you to stop paying creditors. Be cautious and verify any service provider.
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => navigateTo({
                  pageId: 'us/risk-warning'
                })} className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm">
                          View warning details
                          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 md:gap-4">
                      <Button onClick={() => {
                  // 清除本地存储的{'Assessment result'}
                  localStorage.removeItem('assessment_result_us');
                  // 重置所有状态
                  setCurrentStep(0);
                  setAnswers({});
                  setRiskLevel(null);
                  setOtherContactMethod('');
                  // 显示成功提示
                  toast({
                    title: 'Assessment reset',
                    variant: 'default'
                  });
                }} variant="outline" className="flex-1 text-xs md:text-sm">
                        Restart assessment
                      </Button>
                      <Button onClick={() => navigateTo({
                  pageId: 'us/solutions',
                  params: {
                    riskLevel: riskLevel ? riskLevel.level : 'low'
                  }
                })} className="flex-1 bg-[#1E3A5F] hover:bg-[#0F2744] text-xs md:text-sm">
                        View solutions
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