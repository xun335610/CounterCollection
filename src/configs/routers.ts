import US_HOME from '../pages/us/home.jsx';
import US_ASSESSMENT from '../pages/us/assessment.jsx';
import US_SOLUTIONS from '../pages/us/solutions.jsx';
import US_KNOWLEDGE from '../pages/us/knowledge.jsx';
import US_ILLEGAL_COLLECTION from '../pages/us/illegal-collection.jsx';
import US_RISK_WARNING from '../pages/us/risk-warning.jsx';
import US_STATE_LAWS from '../pages/us/state-laws.jsx';
import US_STATE_LAW from '../pages/us/state-law.jsx';

import US_DISCLAIMER from '../pages/us/disclaimer.jsx';
import US_PRIVACY from '../pages/us/privacy.jsx';

import CN_HOME from '../pages/cn/home.jsx';
import CN_ASSESSMENT from '../pages/cn/assessment.jsx';
import CN_SOLUTIONS from '../pages/cn/solutions.jsx';
import CN_KNOWLEDGE from '../pages/cn/knowledge.jsx';
import CN_ILLEGAL_COLLECTION from '../pages/cn/illegal-collection.jsx';
import CN_RISK_WARNING from '../pages/cn/risk-warning.jsx';

export const routers = [
  // Default landing (US)
  { id: "us/home", component: US_HOME, isHome: true },
  { id: "us/assessment", component: US_ASSESSMENT },
  { id: "us/solutions", component: US_SOLUTIONS },
  { id: "us/knowledge", component: US_KNOWLEDGE },
  { id: "us/illegal-collection", component: US_ILLEGAL_COLLECTION },
  { id: "us/risk-warning", component: US_RISK_WARNING },

  // US: State rules (static routes for PageWrapper stability)
  { id: "us/state-laws", component: US_STATE_LAWS },
  { id: "us/state-laws/ca", component: US_STATE_LAW },
  { id: "us/state-laws/ny", component: US_STATE_LAW },
  { id: "us/state-laws/tx", component: US_STATE_LAW },
  { id: "us/state-laws/fl", component: US_STATE_LAW },
  { id: "us/state-laws/il", component: US_STATE_LAW },
  { id: "us/state-laws/wa", component: US_STATE_LAW },
  { id: "us/state-laws/nj", component: US_STATE_LAW },
  { id: "us/state-laws/ga", component: US_STATE_LAW },
  { id: "us/state-laws/pa", component: US_STATE_LAW },
  { id: "us/state-laws/oh", component: US_STATE_LAW },
  { id: "us/state-laws/nc", component: US_STATE_LAW },
  { id: "us/state-laws/mi", component: US_STATE_LAW },

  // US: Legal/Privacy
  { id: "us/disclaimer", component: US_DISCLAIMER },
  { id: "us/privacy", component: US_PRIVACY },

  // China version
  { id: "cn/home", component: CN_HOME },
  { id: "cn/assessment", component: CN_ASSESSMENT },
  { id: "cn/solutions", component: CN_SOLUTIONS },
  { id: "cn/knowledge", component: CN_KNOWLEDGE },
  { id: "cn/illegal-collection", component: CN_ILLEGAL_COLLECTION },
  { id: "cn/risk-warning", component: CN_RISK_WARNING },
];
