// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, FileText, MessageSquare, ListChecks, ChevronRight, Copy, Check, AlertTriangle } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

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
    const savedAssessment = localStorage.getItem('assessment_result');
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
    const contactOptions = [{
      value: 'phone',
      label: '电话',
      handlingMethod: '1. 保持冷静，不要情绪化回应\n2. 记录通话时间、对方身份、通话内容\n3. 如对方态度恶劣，可要求更换客服人员\n4. 保留通话录音作为证据\n5. 明确告知对方您的还款意愿和困难'
    }, {
      value: 'sms',
      label: '短信',
      handlingMethod: '1. 保留所有短信截图作为证据\n2. 不要回复含有威胁或侮辱内容的短信\n3. 如短信内容违法，可向运营商投诉\n4. 定期清理短信，避免信息过载\n5. 通过短信与对方保持书面沟通'
    }, {
      value: 'visit',
      label: '上门',
      illegal: true,
      law: '《民法典》第1032条：自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄露、公开等方式侵害他人的隐私权。\n《商业银行信用卡业务监督管理办法》第70条：在特殊情况下，确认信用卡欠款金额超出持卡人还款能力、且持卡人仍有还款意愿的，发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '未经同意上门催收可能构成非法侵入住宅或侵犯隐私权，银行应通过合法合规方式与持卡人协商',
      handlingMethod: '1. 明确拒绝上门催收，要求通过电话或书面方式沟通\n2. 立即联系债权银行官方客服，说明上门催收人员违反了《民法典》关于隐私权的规定，要求更换催收人员或调整催收方式\n3. 保留对方上门的证据（录音、录像），作为与银行沟通的依据\n4. 如对方坚持上门，可报警处理\n5. 如银行不予处理，再向监管部门投诉其违规行为'
    }, {
      value: 'sued',
      label: '起诉',
      handlingMethod: '1. 认真阅读起诉状，了解对方诉求\n2. 在法定期限内提交答辩状\n3. 准备相关证据材料\n4. 咨询专业律师，了解法律程序\n5. 积极应诉，维护自身合法权益'
    }, {
      value: 'lawyer_letter',
      label: '律师函',
      handlingMethod: '1. 认真阅读律师函内容\n2. 核实律师函的真实性（可联系律师事务所确认）\n3. 不要被律师函吓倒，保持冷静\n4. 如有疑问，咨询专业律师\n5. 根据实际情况决定是否回应'
    }, {
      value: 'emergency_contact',
      label: '打紧急联系人电话',
      illegal: true,
      law: '《个人信息保护法》第6条：处理个人信息应当具有明确、合理的目的，应当与处理目的直接相关，采取对个人权益影响最小的方式。\n《商业银行信用卡业务监督管理办法》第68条：发卡银行应当对债务人信息保密，不得泄露给第三方。',
      lawDetail: '未经授权联系紧急联系人属于侵犯个人信息权益，银行有义务保护债务人信息',
      handlingMethod: '1. 明确告知对方未经授权联系紧急联系人违法，违反了《个人信息保护法》\n2. 立即联系债权银行官方客服，说明催收人员违反了信息保护规定，要求立即停止联系紧急联系人\n3. 保留通话记录和短信截图作为证据，作为与银行沟通的依据\n4. 如银行不予处理，再向银保监会等监管部门投诉\n5. 如造成严重后果，可向法院起诉'
    }, {
      value: 'wechat_private',
      label: '强烈要求加微信/私下沟通',
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第18条：催收人员不得诱导或逼迫债务人通过违法违规途径筹集资金。\n《商业银行信用卡业务监督管理办法》第70条：发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '要求私下沟通可能涉及不当要求或诱导违规行为，银行应通过官方渠道与持卡人协商',
      handlingMethod: '1. 拒绝添加微信，坚持通过银行官方客服热线或官网渠道沟通\n2. 保留对方要求私下沟通的聊天记录，作为证据\n3. 立即联系债权银行官方客服，说明催收人员要求私下沟通违反了行业自律规范，要求更换催收人员\n4. 警惕对方可能提出的不当要求，不要向非官方渠道转账\n5. 如对方持续骚扰，再向监管部门投诉'
    }, {
      value: 'non_working_hours',
      label: '非工时间联系',
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第16条：催收人员应在每日8:00-22:00进行催收，不得在非工作时间进行催收。\n《商业银行信用卡业务监督管理办法》第70条：发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '非工作时间（晚22:00-早8:00）催收违反行业自律规范，银行应通过合规方式与持卡人沟通',
      handlingMethod: '1. 明确告知对方非工作时间联系违规，违反了《互联网金融逾期债务催收自律公约》第16条\n2. 要求对方只在工作时间联系\n3. 保留非工作时间联系的通话记录\n4. 立即联系债权银行官方客服，说明催收人员在非工作时间联系，要求更换催收人员或调整催收时间\n5. 如银行不予处理，再向监管部门投诉其违规行为'
    }, {
      value: 'auto_robot',
      label: '自动语音与机器人外呼',
      illegal: true,
      law: '《个人信息保护法》第24条：通过自动化决策方式向个人进行信息推送、营销，应当提供不针对其个人特征的选项或提供便捷的拒绝方式。\n《互联网金融逾期债务催收自律公约》第15条：催收人员应当使用文明用语，不得使用侮辱、诽谤、威胁、恐吓等语言。',
      lawDetail: '未经同意的自动外呼可能侵犯个人信息权益，银行应通过人工客服与持卡人沟通',
      handlingMethod: '1. 明确拒绝自动外呼，要求人工客服沟通\n2. 保留自动外呼的录音证据\n3. 立即联系债权银行官方客服，说明使用自动外呼违反了《个人信息保护法》，要求更换为人工客服\n4. 向运营商投诉骚扰电话\n5. 如银行不予处理，再向监管部门投诉其违规使用自动化催收'
    }, {
      value: 'high_frequency',
      label: '高频电话轰炸',
      illegal: true,
      law: '《治安管理处罚法》第42条：多次发送淫秽、侮辱、恐吓或者其他信息，干扰他人正常生活的，处五日以下拘留或者五百元以下罚款。\n《互联网金融逾期债务催收自律公约》第17条：催收人员不得频繁骚扰债务人及其联系人，不得在同一日多次联系。',
      lawDetail: '高频骚扰电话可能构成违法行为，违反了行业自律规范',
      handlingMethod: '1. 保留所有骚扰电话的通话记录和录音\n2. 明确告知对方停止骚扰行为，说明高频电话违反了《治安管理处罚法》第42条和《互联网金融逾期债务催收自律公约》第17条\n3. 立即联系债权银行官方客服，说明催收人员高频电话轰炸，要求更换催收人员或调整催收频率\n4. 如银行不予处理，再向公安机关报案和监管部门投诉\n5. 如造成严重精神损害，可向法院起诉索赔'
    }, {
      value: 'third_party',
      label: '第三方（亲友、单位）',
      illegal: true,
      law: '《个人信息保护法》第6条：处理个人信息应当具有明确、合理的目的，应当与处理目的直接相关。\n《商业银行信用卡业务监督管理办法》第68条：发卡银行应当对债务人信息保密，不得泄露给第三方。',
      lawDetail: '未经授权向第三方泄露债务信息属于侵犯个人信息权益，银行有义务保护债务人信息',
      handlingMethod: '1. 明确告知对方未经授权向第三方泄露信息违法，违反了《个人信息保护法》和《商业银行信用卡业务监督管理办法》\n2. 要求对方立即停止联系第三方\n3. 保留对方联系第三方的证据\n4. 立即联系债权银行官方客服，说明催收人员向第三方泄露信息，要求立即停止并更换催收人员\n5. 如银行不予处理，再向监管部门投诉其侵犯个人信息\n6. 如造成名誉损害，可向法院起诉'
    }, {
      value: 'threat',
      label: '威胁或恐吓',
      illegal: true,
      law: '《刑法》第293条：有下列寻衅滋事行为之一，破坏社会秩序的，处五年以下有期徒刑、拘役或者管制：（二）追逐、拦截、辱骂、恐吓他人。\n《互联网金融逾期债务催收自律公约》第15条：催收人员应当使用文明用语，不得使用侮辱、诽谤、威胁、恐吓等语言。',
      lawDetail: '威胁或恐吓可能构成寻衅滋事罪或其他违法犯罪行为，违反了行业自律规范',
      handlingMethod: '1. 立即保留威胁或恐吓的证据（录音、短信、聊天记录）\n2. 立即联系债权银行官方客服，说明催收人员使用威胁或恐吓语言，违反了《刑法》第293条和《互联网金融逾期债务催收自律公约》第15条，要求立即更换催收人员\n3. 如银行不予处理，再向公安机关报案，可能构成寻衅滋事罪\n4. 向监管部门投诉\n5. 咨询专业律师，了解刑事和民事维权途径\n6. 如人身安全受到威胁，立即报警并寻求保护'
    }, {
      value: 'fake_police',
      label: '冒充公检法',
      illegal: true,
      law: '《刑法》第279条：冒充国家机关工作人员招摇撞骗的，处三年以下有期徒刑、拘役、管制或者剥夺政治权利；情节严重的，处三年以上十年以下有期徒刑。\n《商业银行信用卡业务监督管理办法》第70条：发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '冒充公安、检察院、法院等国家机关工作人员进行催收属于严重违法犯罪行为，银行应通过合法合规方式与持卡人沟通',
      handlingMethod: '1. 立即保留对方冒充公检法的证据（录音、短信、聊天记录）\n2. 立即联系债权银行官方客服，说明催收人员冒充公检法，违反了《刑法》第279条，要求立即更换催收人员\n3. 如银行不予处理，再向公安机关报案，可能构成招摇撞骗罪\n4. 向银保监会等监管部门投诉\n5. 咨询专业律师，了解刑事和民事维权途径\n6. 不要向对方转账或提供任何个人信息'
    }, {
      value: 'unofficial_payment',
      label: '非官方收款',
      illegal: true,
      law: '《刑法》第266条：诈骗公私财物，数额较大的，处三年以下有期徒刑、拘役或者管制，并处或者单处罚金。\n《商业银行信用卡业务监督管理办法》第70条：发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '要求向非官方账户还款可能构成诈骗或非法集资，银行应通过官方渠道收取还款',
      handlingMethod: '1. 立即停止向非官方账户转账\n2. 保留对方要求非官方收款的证据\n3. 立即联系债权银行官方客服，说明催收人员要求向非官方账户还款，违反了《刑法》第266条，要求立即更换催收人员\n4. 如银行不予处理，再向公安机关报案，可能构成诈骗罪\n5. 向监管部门投诉\n6. 只通过银行官方渠道还款'
    }, {
      value: 'third_party_outsource',
      label: '第三方外包催促',
      illegal: true,
      law: '《个人信息保护法》第21条：个人信息处理者委托处理个人信息的，应当与受托人约定委托处理的目的、期限、处理方式、个人信息的种类、保护措施以及双方的权利和义务。\n《商业银行信用卡业务监督管理办法》第68条：发卡银行应当对债务人信息保密，不得泄露给第三方。',
      lawDetail: '未经授权将债务信息外包给第三方催收可能侵犯个人信息权益，银行有义务保护债务人信息',
      handlingMethod: '1. 明确告知对方未经授权外包催收违法，违反了《个人信息保护法》和《商业银行信用卡业务监督管理办法》\n2. 要求对方停止第三方催收行为\n3. 保留第三方催收的证据\n4. 立即联系债权银行官方客服，说明银行将债务信息外包给第三方催收，要求立即停止并更换催收方式\n5. 如银行不予处理，再向监管部门投诉其违规外包\n6. 如造成名誉损害，可向法院起诉'
    }, {
      value: 'frequent_change',
      label: '频繁更换号码/平台',
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第14条：催收人员不得频繁更换联系方式或平台进行骚扰。\n《商业银行信用卡业务监督管理办法》第70条：发卡银行可以与持卡人平等协商，达成个性化分期还款协议。',
      lawDetail: '频繁更换号码或平台进行催收属于逃避监管和持续骚扰行为，银行应通过合规方式与持卡人沟通',
      handlingMethod: '1. 保留所有不同号码和平台的催收记录\n2. 明确告知对方频繁更换联系方式违规，违反了《互联网金融逾期债务催收自律公约》第14条\n3. 立即联系债权银行官方客服，说明催收人员频繁更换联系方式，要求更换催收人员或统一催收渠道\n4. 如银行不予处理，再向监管部门投诉其逃避监管行为\n5. 如造成严重骚扰，可向公安机关报案\n6. 咨询律师，了解维权途径'
    }, {
      value: 'request_personal_info',
      label: '索要个人信息',
      illegal: true,
      law: '《个人信息保护法》第5条：处理个人信息应当遵循合法、正当、必要和诚信原则，不得通过误导、欺诈、胁迫等方式处理个人信息。\n《商业银行信用卡业务监督管理办法》第68条：发卡银行应当对债务人信息保密，不得泄露给第三方。',
      lawDetail: '催收过程中索要与债务无关的个人信息属于侵犯个人信息权益，银行有义务保护债务人信息',
      handlingMethod: '1. 明确拒绝提供与债务无关的个人信息，说明违反了《个人信息保护法》第5条\n2. 要求对方说明索要信息的合法依据\n3. 保留对方索要个人信息的证据（录音、聊天记录）\n4. 立即联系债权银行官方客服，说明催收人员索要与债务无关的个人信息，要求立即停止并更换催收人员\n5. 如银行不予处理，再向监管部门投诉其侵犯个人信息\n6. 如对方持续骚扰，可向公安机关报案'
    }, {
      value: 'private_phone',
      label: '私人电话联系',
      illegal: true,
      law: '《互联网金融逾期债务催收自律公约》第13条：催收人员应当使用合法合规的联系方式进行催收，不得使用非官方或私人联系方式。\n《商业银行信用卡业务监督管理办法》第68条：发卡银行应当对债务人信息保密，不得泄露给第三方。',
      lawDetail: '使用私人电话号码进行催收可能涉及信息泄露或违规外包，银行应通过官方渠道与持卡人沟通',
      handlingMethod: '1. 明确要求对方使用官方座机号码或银行官方客服热线联系\n2. 保留私人电话号码的通话记录和录音作为证据\n3. 立即联系债权银行官方客服，说明催收人员使用私人电话联系，要求更换为官方渠道\n4. 警惕私人电话可能涉及诈骗或违规外包，不要向私人账户转账\n5. 如对方持续使用私人电话骚扰，向监管部门投诉其违规行为'
    }, {
      value: 'other',
      label: '其他',
      handlingMethod: '1. 详细记录对方的催收方式\n2. 保留相关证据\n3. 咨询专业人士了解应对方法\n4. 如对方行为违法，及时投诉或报案'
    }];

    // 根据用户选择的催收方式生成针对性方案
    return selectedContactMethods.map(methodValue => {
      const option = contactOptions.find(opt => opt.value === methodValue);
      if (!option) return null;
      return {
        id: `targeted-${option.value}`,
        title: `针对「${option.label}」的应对方案`,
        category: '针对性方案',
        content: option.handlingMethod,
        tags: option.illegal ? ['违法行为', '紧急处理'] : ['常规处理'],
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
      description: '话术已复制，可直接使用'
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  const negotiationScripts = [{
    id: 1,
    title: '说明当前困难',
    category: '协商话术',
    content: `您好，我目前确实遇到了一些经济困难，暂时无法按时还款。但我有还款意愿，希望能与贵方协商一个合理的还款方案。`,
    tags: ['通用', '初次沟通']
  }, {
    id: 2,
    title: '申请延期还款',
    category: '协商话术',
    content: `由于近期收入减少，我希望能申请延期3个月还款。在此期间，我会尽力筹集资金，并在延期结束后恢复正常还款。请问是否可以办理？`,
    tags: ['延期', '收入减少']
  }, {
    id: 3,
    title: '申请减免利息',
    category: '协商话术',
    content: `考虑到我的实际还款能力，希望能申请减免部分利息或罚息。我承诺会尽快偿还本金，希望贵方能给予一定支持。`,
    tags: ['减免', '利息']
  }, {
    id: 4,
    title: '分期还款方案',
    category: '协商话术',
    content: `我希望能申请分期还款，每月还款XXX元，分XX期还清。这样既能保证我按时还款，也不会影响我的基本生活。请贵方考虑这个方案。`,
    tags: ['分期', '长期']
  }, {
    id: 5,
    title: '应对催收电话',
    category: '应对话术',
    content: `我理解贵方的工作，但请保持专业沟通。我会积极处理债务问题，但请不要频繁打扰我的家人和朋友。如有需要，请通过正规渠道联系我。`,
    tags: ['催收', '第三方']
  }, {
    id: 6,
    title: '拒绝不合理要求',
    category: '应对话术',
    content: `我理解贵方的立场，但您提出的要求超出了我的实际能力范围。我愿意在合理范围内协商，但请尊重我的实际情况。`,
    tags: ['拒绝', '不合理']
  }];
  const checklists = [{
    id: 1,
    title: '协商前准备',
    items: ['整理所有债务明细（本金、利息、罚息）', '准备收入证明和财务状况说明', '制定可行的还款计划', '了解相关法律法规', '准备好录音设备（合法范围内）']
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
    tips: ['态度诚恳，表达还款意愿', '如实说明困难情况', '不要做出无法兑现的承诺', '记录对方的承诺和要求', '要求对方提供书面确认']
  }, {
    id: 3,
    title: '沟通后跟进',
    tips: ['及时整理沟通记录', '确认协商结果并保留凭证', '按时履行约定', '定期主动联系更新情况', '如遇问题及时沟通']
  }, {
    id: 4,
    title: '避免行为',
    tips: ['不要失联或拒接电话', '不要辱骂或威胁对方', '不要提供虚假信息', '不要轻易转账给个人账户', '不要签署不明确的协议']
  }];
  const complaintInfo = [{
    id: 1,
    title: '投诉渠道',
    type: '信息型',
    content: [{
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
    }]
  }, {
    id: 2,
    title: '可投诉行为',
    type: '条件触发',
    content: ['暴力催收、威胁恐吓', '骚扰第三方（亲友、单位）', '泄露个人信息', '虚假诉讼或伪造证据', '收取不合理费用', '超出法定利率上限']
  }, {
    id: 3,
    title: '投诉要点',
    type: '信息型',
    content: ['⚠️ 重要：请先与债权方客服沟通，说明问题并寻求解决方案', '如债权方客服沟通无效，再向监管机构投诉', '提供具体事实和时间（包括与债权方客服沟通的时间、内容）', '保留相关证据（录音、截图、短信、与客服的沟通记录）', '说明受到的影响和损失', '提出合理的诉求', '保持客观和理性']
  }];
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
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#F59E0B]" />
            <span className="text-lg md:text-xl font-bold font-['Space_Grotesk']">应对方案</span>
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
                当前风险等级
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
              针对性方案
            </TabsTrigger>}
            <TabsTrigger value="scripts" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
              话术模板
            </TabsTrigger>
            <TabsTrigger value="checklists" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <ListChecks className="w-3 h-3 md:w-4 md:h-4" />
              清单指引
            </TabsTrigger>
            <TabsTrigger value="complaint" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <FileText className="w-3 h-3 md:w-4 md:h-4" />
              投诉信息
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2 text-xs md:text-sm whitespace-nowrap">
              <AlertTriangle className="w-3 h-3 md:w-4 md:h-4" />
              沟通注意事项
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
                      <p className="text-xs font-semibold text-red-700 mb-1">相关法律：</p>
                      <p className="text-xs text-red-600 leading-relaxed">{solution.law}</p>
                      {solution.lawDetail && <p className="text-xs text-red-600 leading-relaxed mt-2">{solution.lawDetail}</p>}
                    </div>}
                  
                  <div className="mb-3 md:mb-4">
                    <p className="text-xs font-semibold text-[#1E3A5F] mb-2">应对方法：</p>
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
                        已复制
                      </> : <>
                        <Copy className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        复制方案
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
                        已复制
                      </> : <>
                        <Copy className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        复制话术
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
                    沟通注意事项
                  </h3>
                  <p className="text-xs text-amber-600 font-semibold">
                    重要提示
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