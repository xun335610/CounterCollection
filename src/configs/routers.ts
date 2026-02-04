import US_HOME from '../pages/us/home.jsx';
import US_ASSESSMENT from '../pages/us/assessment.jsx';
import US_SOLUTIONS from '../pages/us/solutions.jsx';
import US_KNOWLEDGE from '../pages/us/knowledge.jsx';
import US_ILLEGAL_COLLECTION from '../pages/us/illegal-collection.jsx';
import US_RISK_WARNING from '../pages/us/risk-warning.jsx';

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

  // China version
  { id: "cn/home", component: CN_HOME },
  { id: "cn/assessment", component: CN_ASSESSMENT },
  { id: "cn/solutions", component: CN_SOLUTIONS },
  { id: "cn/knowledge", component: CN_KNOWLEDGE },
  { id: "cn/illegal-collection", component: CN_ILLEGAL_COLLECTION },
  { id: "cn/risk-warning", component: CN_RISK_WARNING },
];
