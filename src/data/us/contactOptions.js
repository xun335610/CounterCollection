export const contactOptions = [
  {
    "value": "phone",
    "label": "Phone calls",
    "risk": 1,
    "illegal": false,
    "handlingMethod": "1. Stay calm and keep the call professional.\n2. Ask for the caller’s name, company, callback number, and mailing address.\n3. Write down the date/time and key statements.\n4. Request written debt validation.\n5. If you prefer, ask for communication in writing only."
  },
  {
    "value": "sms",
    "label": "Text / SMS",
    "risk": 1,
    "illegal": false,
    "handlingMethod": "1. Screenshot and save all messages.\n2. Don’t engage with abusive texts.\n3. If you choose to reply, request written validation and professional communication.\n4. Block/report spam numbers if harassment continues.\n5. Keep a log of dates/times."
  },
  {
    "value": "email",
    "label": "Email collection",
    "risk": 1,
    "illegal": false,
    "handlingMethod": "1. Save the full emails (and headers if possible).\n2. Verify the sender and company identity.\n3. Request debt validation in writing.\n4. Avoid clicking unknown links or attachments.\n5. Keep all communication in writing."
  },
  {
    "value": "mail",
    "label": "Collection letters (mail)",
    "risk": 2,
    "illegal": false,
    "handlingMethod": "1. Keep the envelope and letter.\n2. Check creditor/collector details and any account identifiers.\n3. If you dispute or need proof, send a written validation request.\n4. Don’t pay unless you’ve verified who you’re paying.\n5. Organize letters by date for your records."
  },
  {
    "value": "voicemail",
    "label": "Voicemail harassment",
    "risk": 2,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (Fair Debt Collection Practices Act)\n• CFPB Regulation F\n• TCPA (robocalls/texts)\n• State consumer protection & debt collection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Repeated voicemails meant to harass, threaten, or mislead can be improper. Save recordings and note dates/times.",
    "handlingMethod": "1. Save voicemails (audio) and note dates/times.\n2. Do not call back numbers you don’t recognize—verify the company independently.\n3. Request written validation.\n4. Keep a record of how often they contact you.\n5. If it continues, consider filing a complaint (CFPB/FTC/state AG)."
  },
  {
    "value": "robocall",
    "label": "Robocalls / automated dialing",
    "risk": 3,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• TCPA (robocalls/texts)\n• FDCPA / Regulation F (if a debt collector)\n\nGeneral info only — not legal advice.",
    "lawDetail": "If calls/texts are automated and you didn’t consent, this may raise TCPA issues depending on circumstances.",
    "handlingMethod": "1. Save call logs and any recordings you have.\n2. Ask to be placed on a do-not-call list.\n3. Block/report repeated robocalls.\n4. Request written validation of the debt.\n5. If it continues, consider complaints (CFPB/FTC/state AG)."
  },
  {
    "value": "high_frequency",
    "label": "High-frequency calls (harassment)",
    "risk": 3,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (Fair Debt Collection Practices Act)\n• CFPB Regulation F\n• TCPA (robocalls/texts)\n• State consumer protection & debt collection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Repeated contacts intended to annoy, abuse, or harass may be improper.",
    "handlingMethod": "1. Keep a detailed log of every contact.\n2. Clearly state your preferred contact method/time.\n3. Request communication in writing.\n4. Block/report where appropriate.\n5. If it persists, file complaints and consider legal advice."
  },
  {
    "value": "third_party",
    "label": "Contacted third parties (family/roommates)",
    "risk": 3,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (Fair Debt Collection Practices Act)\n• CFPB Regulation F\n• TCPA (robocalls/texts)\n• State consumer protection & debt collection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Collectors generally have strict limits on contacting third parties and what they can disclose.",
    "handlingMethod": "1. Tell them not to contact third parties.\n2. Document who was contacted and what was disclosed.\n3. Request written validation.\n4. File complaints if improper disclosures occurred.\n5. Consider legal advice if harm occurred."
  },
  {
    "value": "workplace",
    "label": "Workplace / employer contact",
    "risk": 3,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (Fair Debt Collection Practices Act)\n• CFPB Regulation F\n• TCPA (robocalls/texts)\n• State consumer protection & debt collection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Workplace contact can be especially sensitive; document any disclosure and request they stop.",
    "handlingMethod": "1. Ask them to stop contacting you at work.\n2. Document dates, numbers, and any disclosures.\n3. Request written communication.\n4. File complaints if it continues.\n5. Consider legal advice if necessary."
  },
  {
    "value": "credit_threat",
    "label": "Credit score / credit report threats",
    "risk": 2,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FCRA (credit reporting)\n• FDCPA / Regulation F (misrepresentation)\n\nGeneral info only — not legal advice.",
    "lawDetail": "Threats about credit reporting can be misleading if false or used to intimidate. Document exact statements.",
    "handlingMethod": "1. Write down exact statements about credit reporting.\n2. Verify the debt and the collector.\n3. Request written validation.\n4. Check your credit reports through official channels.\n5. Dispute inaccurate items if needed."
  },
  {
    "value": "debt_validation_refusal",
    "label": "Refused debt validation / proof",
    "risk": 2,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (validation notice / disputes)\n• CFPB Regulation F\n\nGeneral info only — not legal advice.",
    "lawDetail": "If you request validation and they ignore it but keep collecting, document it carefully.",
    "handlingMethod": "1. Send a written validation request (keep copies).\n2. Save all responses (or lack of response).\n3. Do not pay until you verify the debt.\n4. Keep communications in writing.\n5. Consider complaints if collection continues without validation."
  },
  {
    "value": "legal_threat",
    "label": "False ‘legal action’ threats (pre‑legal)",
    "risk": 3,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (false or misleading representations)\n• State consumer protection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Phrases like “pre‑legal review” may be used to intimidate. Save evidence and verify independently.",
    "handlingMethod": "1. Save messages/voicemails containing “legal” threats.\n2. Ask for written details and validation.\n3. Verify any claims through official court channels if needed.\n4. Do not share sensitive info.\n5. Consider complaints or legal advice."
  },
  {
    "value": "spoofing",
    "label": "Spoofed / rotating numbers",
    "risk": 2,
    "illegal": true,
    "law": "Possible U.S. references (depending on facts):\n• FDCPA (Fair Debt Collection Practices Act)\n• CFPB Regulation F\n• TCPA (robocalls/texts)\n• State consumer protection & debt collection laws\n\nGeneral info only — not legal advice.",
    "lawDetail": "Caller ID spoofing and constantly changing numbers are common harassment/scam tactics.",
    "handlingMethod": "1. Document numbers and patterns.\n2. Don’t trust caller ID—verify the company independently.\n3. Block/report repeated spoofed numbers.\n4. Request written communication.\n5. File complaints if harassment persists."
  },
  {
    "value": "unofficial_payment",
    "label": "Requested payment via unusual method",
    "risk": 3,
    "illegal": true,
    "law": "General info only — not legal advice.",
    "lawDetail": "Gift cards, crypto, wire to individuals, or unusual payment methods are strong scam signals.",
    "handlingMethod": "1. Do not pay via unusual methods.\n2. Verify the creditor/collector independently.\n3. Request official written payment instructions.\n4. Save evidence and report suspected fraud.\n5. Pay only through verified official channels."
  },
  {
    "value": "identity_info",
    "label": "Asked for SSN / verification codes",
    "risk": 3,
    "illegal": true,
    "law": "General info only — not legal advice.",
    "lawDetail": "Requests for SSN, bank logins, or one-time codes can indicate identity theft risk.",
    "handlingMethod": "1. Do not share SSN, bank logins, or one‑time codes.\n2. Ask why the information is needed and request it in writing.\n3. Verify the caller via official sources.\n4. Save evidence.\n5. Consider credit freeze if sensitive info was exposed."
  },
  {
    "value": "other",
    "label": "Other",
    "risk": 1,
    "illegal": false,
    "handlingMethod": "1. Write down exactly what happened.\n2. Save any evidence.\n3. Request written validation.\n4. Escalate via complaints or legal advice if needed."
  }
];

export default contactOptions;
