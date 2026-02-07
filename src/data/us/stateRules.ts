export type StateRule = {
  code: string; // e.g. CA
  name: string;
  bullets: string[];
  sources: { label: string; url: string }[];
};

export const US_STATE_RULES: Record<string, StateRule> = {
  CA: {
    code: "CA",
    name: "California",
    bullets: [
      "California has additional debt-collection restrictions beyond federal FDCPA (often referenced as the Rosenthal Fair Debt Collection Practices Act).",
      "Many debt collectors operating in California must meet state requirements (including licensing/registration obligations depending on the collector type).",
      "California consumer-protection laws may apply to unfair or deceptive collection practices."
    ],
    sources: [
      { label: "CA DFPI – Debt Collection", url: "https://dfpi.ca.gov/debt-collection/" }
    ]
  },
  NY: {
    code: "NY",
    name: "New York",
    bullets: [
      "New York has debt collection regulations that add requirements (including disclosures and conduct standards) beyond federal rules.",
      "Debt collectors may have state registration/licensing obligations and are subject to enforcement by NY regulators."
    ],
    sources: [
      { label: "NYDFS – Debt Collection", url: "https://www.dfs.ny.gov/industry_guidance/debt_collection" }
    ]
  },
  TX: {
    code: "TX",
    name: "Texas",
    bullets: [
      "Texas has state debt-collection rules (commonly referenced under Texas Finance Code Chapter 392) that may restrict threats, harassment, and deceptive conduct.",
      "State enforcement and consumer remedies can apply in addition to federal protections."
    ],
    sources: [
      { label: "Texas OAG – Debt Collection", url: "https://www.texasattorneygeneral.gov/consumer-protection/debt-collection" }
    ]
  },
  FL: {
    code: "FL",
    name: "Florida",
    bullets: [
      "Florida has additional protections for consumers (often discussed under Florida’s consumer collection practices rules) that may go beyond FDCPA.",
      "Certain threatening, abusive, or deceptive collection practices can trigger state enforcement and remedies."
    ],
    sources: [
      { label: "Florida AG – Consumer Protection", url: "http://myfloridalegal.com/consumer" }
    ]
  },
  IL: {
    code: "IL",
    name: "Illinois",
    bullets: [
      "Illinois regulates collection agencies and may require licensing/registration for certain collectors.",
      "State consumer protection laws can apply to unfair, deceptive, or harassing collection behavior."
    ],
    sources: [
      { label: "Illinois AG – Debt Collection", url: "https://illinoisattorneygeneral.gov/consumers/debt_collection.html" }
    ]
  },
  WA: {
    code: "WA",
    name: "Washington",
    bullets: [
      "Washington regulates collection agencies and may require licensing for debt collectors operating in the state.",
      "State law adds conduct requirements and can supplement federal FDCPA protections."
    ],
    sources: [
      { label: "WA DFI – Collection Agency", url: "https://dfi.wa.gov/consumer/collection-agencies" }
    ]
  },
  NJ: {
    code: "NJ",
    name: "New Jersey",
    bullets: [
      "New Jersey may require licensing for collection agencies and enforces additional standards for debt collection conduct.",
      "State consumer protection laws may also apply to deceptive practices."
    ],
    sources: [
      { label: "NJ Division of Consumer Affairs", url: "https://www.njconsumeraffairs.gov/" }
    ]
  },
  GA: {
    code: "GA",
    name: "Georgia",
    bullets: [
      "Georgia consumer protection rules can apply to unfair or deceptive debt collection practices.",
      "State remedies may apply alongside FDCPA."
    ],
    sources: [
      { label: "GA Attorney General – Consumer Protection", url: "https://consumer.georgia.gov/" }
    ]
  },
  PA: {
    code: "PA",
    name: "Pennsylvania",
    bullets: [
      "Pennsylvania consumer protection laws may apply to deceptive or unfair debt collection practices.",
      "State guidance and enforcement may supplement federal protections."
    ],
    sources: [
      { label: "PA Attorney General – Consumer Protection", url: "https://www.attorneygeneral.gov/protect-yourself/" }
    ]
  },
  OH: {
    code: "OH",
    name: "Ohio",
    bullets: [
      "Ohio has consumer protection rules that may apply to deceptive or unfair debt collection practices.",
      "State enforcement can supplement FDCPA protections."
    ],
    sources: [
      { label: "Ohio AG – Consumer Protection", url: "https://www.ohioattorneygeneral.gov/Individuals-and-Families/Consumers" }
    ]
  },
  NC: {
    code: "NC",
    name: "North Carolina",
    bullets: [
      "North Carolina has state debt collection restrictions (often discussed under the NC Debt Collection Act) that may provide added protections beyond FDCPA.",
      "State remedies may apply for certain abusive or deceptive practices."
    ],
    sources: [
      { label: "NC DOJ – Consumer Protection", url: "https://ncdoj.gov/protecting-consumers/" }
    ]
  },
  MI: {
    code: "MI",
    name: "Michigan",
    bullets: [
      "Michigan has state consumer protection rules that may apply to certain collection conduct.",
      "State enforcement can complement federal FDCPA protections."
    ],
    sources: [
      { label: "Michigan AG – Consumer Protection", url: "https://www.michigan.gov/ag/consumer-protection" }
    ]
  }
};

export const US_STATE_LIST: StateRule[] = Object.values(US_STATE_RULES);
