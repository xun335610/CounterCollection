import HOME from '../pages/home.jsx';
import ASSESSMENT from '../pages/assessment.jsx';
import SOLUTIONS from '../pages/solutions.jsx';
import KNOWLEDGE from '../pages/knowledge.jsx';
import ILLEGAL_COLLECTION from '../pages/illegal-collection.jsx';
import RISK_WARNING from '../pages/risk-warning.jsx';
export const routers = [{
                id: "home",
                component: HOME
              }, {
                id: "assessment",
                component: ASSESSMENT
              }, {
                id: "solutions",
                component: SOLUTIONS
              }, {
                id: "knowledge",
                component: KNOWLEDGE
              }, {
                id: "illegal-collection",
                component: ILLEGAL_COLLECTION
              }, {
                id: "risk-warning",
                component: RISK_WARNING
              }]