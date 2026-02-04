// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, Scale, BookOpen, Search, ChevronRight, ExternalLink } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Card, Input } from '@/components/ui';


// Fixed locale (separate per-country pages; no i18n)
const isUS = true;
const T = (cn, en) => (isUS ? en : cn);


export default function Knowledge(props) {
  const {
    toast
  } = useToast();
  const {
    navigateTo,
    navigateBack
  } = props.$w.utils;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoriesCN = [];
const categoriesUS = [
    { id: 'all', name: 'All' },
    { id: 'law', name: 'Laws & rules' },
    { id: 'regulation', name: 'Regulators' },
    { id: 'rights', name: 'Your rights' },
    { id: 'case', name: 'Examples' },
    { id: 'contact', name: 'Contacts' }
  ];
  const categories = isUS ? categoriesUS : categoriesCN;
  const knowledgeItemsCN = [];
const knowledgeItemsUS = [
    {
      id: 1,
      title: 'FDCPA basics',
      category: 'law',
      summary: 'Key federal protections for many third‑party debt collectors (what they can and cannot do).',
      content: `The Fair Debt Collection Practices Act (FDCPA) generally covers third‑party debt collectors.

Common themes:
1) No harassment, threats, or obscene language.
2) Limits on third‑party contact and disclosures.
3) You can request “debt validation” and get key information in writing.
4) You can request that communications stop (with some exceptions).

Scope and state law details vary. Consult a licensed attorney for legal advice.`,
      tags: ['FDCPA', 'debt collector', 'rights']
    },
    {
      id: 2,
      title: 'CFPB Regulation F (debt collection)',
      category: 'regulation',
      summary: 'Modern rules on communications, disclosures, and model notices for debt collectors.',
      content: `CFPB Regulation F implements parts of the FDCPA.

Practical takeaways:
• Standardized “validation information” and notices.
• Communication limits and rules for electronic communications.
• Clear rules around time/place and how collectors can contact you.

If you believe a collector violated these rules, keep records and consider filing a complaint.`,
      tags: ['CFPB', 'Reg F', 'validation']
    },
    {
      id: 3,
      title: 'Debt validation (what to ask for)',
      category: 'rights',
      summary: 'How to request written proof and details before you pay.',
      content: `Before paying, consider asking for:
1) Creditor name and account details
2) Amount breakdown (principal, interest, fees)
3) Proof the collector has the right to collect
4) How to dispute if you believe it is wrong

Keep everything in writing and save copies.`,
      tags: ['validation', 'dispute', 'records']
    },
    {
      id: 4,
      title: 'Phone calls, texts, and the TCPA',
      category: 'law',
      summary: 'Robocalls/autodialed calls and texts may be restricted depending on consent and context.',
      content: `The Telephone Consumer Protection Act (TCPA) can restrict robocalls and certain automated texts.

What to do:
• Keep call/text logs and screenshots.
• Ask the caller to stop automated calls/texts.
• Verify who is contacting you.

Rules are fact‑specific. Consider legal advice if harassment is severe.`,
      tags: ['TCPA', 'robocall', 'text']
    },
    {
      id: 5,
      title: 'Credit reports (FCRA basics)',
      category: 'rights',
      summary: 'How disputes work for inaccuracies on credit reports.',
      content: `Under the Fair Credit Reporting Act (FCRA), you can dispute inaccurate information with credit bureaus.

Steps:
1) Pull your reports.
2) Dispute inaccuracies in writing.
3) Keep documentation of responses.

If the issue persists, consider professional advice.`,
      tags: ['FCRA', 'credit report', 'dispute']
    },
    {
      id: 6,
      title: 'Harassment and threats',
      category: 'case',
      summary: 'What to document when a collector is abusive or threatening.',
      content: `If you receive threats or abusive language:
1) Save voicemails, texts, emails, and call logs.
2) Write down dates/times and exactly what was said.
3) If you feel unsafe, contact local law enforcement.
4) Consider filing complaints (CFPB/FTC/state AG).

Do not meet collectors in person.`,
      tags: ['harassment', 'threats', 'evidence']
    },
    {
      id: 7,
      title: 'Talking to collectors: practical rules',
      category: 'rights',
      summary: 'How to communicate calmly and reduce misunderstandings.',
      content: `Best practices:
• Verify identity (name, company, mailing address).
• Prefer written communication.
• Don’t share SSN/bank logins/verification codes.
• Don’t pay via gift cards or transfers to individuals.
• Ask for written confirmation of any settlement.`,
      tags: ['communication', 'safety', 'scams']
    },
    {
      id: 8,
      title: 'Statute of limitations (general concept)',
      category: 'law',
      summary: 'Old debts may be time‑barred, but rules vary by state and debt type.',
      content: `The statute of limitations for collecting a debt varies by state and debt type.

Important:
• A payment or written acknowledgment may affect timelines in some states.
• Being “time‑barred” does not always remove the debt; it can affect lawsuits.

Check your state rules or seek legal advice.`,
      tags: ['limitations', 'state law']
    },
    {
      id: 9,
      title: 'Where to complain',
      category: 'contact',
      summary: 'Official channels to report abusive or fraudulent collection.',
      content: `Common channels:
• CFPB: consumerfinance.gov/complaint
• FTC: reportfraud.ftc.gov
• Your State Attorney General: search “<state> attorney general consumer complaint”
• Local law enforcement for threats/impersonation

Always include dates, evidence, and what outcome you want.`,
      tags: ['CFPB', 'FTC', 'complaint']
    },
    {
      id: 10,
      title: 'Nonprofit credit counseling',
      category: 'contact',
      summary: 'Consider reputable nonprofit counseling before paying third‑party “settlement” firms.',
      content: `If you need budgeting or repayment planning help, consider a reputable nonprofit credit counseling organization.

Be cautious with firms that:
• Demand large upfront fees
• Promise guaranteed outcomes
• Ask you to stop paying creditors without clear risks explained`,
      tags: ['counseling', 'budget', 'debt plan']
    }
  ];
  const knowledgeItems = isUS ? knowledgeItemsUS : knowledgeItemsCN;
  const filteredItems = knowledgeItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase()) || item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  const getCategoryName = categoryId => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  const getCategoryColor = categoryId => {
    switch (categoryId) {
      case 'law':
        return 'bg-blue-100 text-blue-700';
      case 'regulation':
        return 'bg-purple-100 text-purple-700';
      case 'rights':
        return 'bg-green-100 text-green-700';
      case 'case':
        return 'bg-orange-100 text-orange-700';
      case 'contact':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-['JetBrains_Mono']">
      {/* Header */}
      <header className="bg-[#1E3A5F] text-white py-4 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={navigateBack} className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-[#F59E0B]" />
            <span className="text-xl font-bold font-['Space_Grotesk']">Debt Collection Knowledge</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Search Bar */}
        <Card className="bg-white rounded-xl p-4 sm:p-6 shadow-lg mb-4 sm:mb-6 lg:mb-8">
          <div className="flex gap-2 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#64748B]" />
              <Input placeholder="Search laws, rules, and examples..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base" />
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
          {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`px-3 sm:px-4 py-2 sm:py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all touch-manipulation ${selectedCategory === category.id ? 'bg-[#1E3A5F] text-white' : 'bg-white text-[#64748B] hover:bg-slate-50'}`}>
              {category.name}
            </button>)}
        </div>

        {/* Knowledge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map(item => <Card key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${getCategoryColor(item.category)}`}>
                  {getCategoryName(item.category)}
                </span>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] flex-shrink-0" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-[#1E3A5F] mb-2 sm:mb-3 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                {item.summary}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {item.tags.slice(0, 3).map(tag => <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-600 text-[10px] sm:text-xs rounded whitespace-nowrap">
                    {tag}
                  </span>)}
                {item.tags.length > 3 && <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-100 text-slate-600 text-[10px] sm:text-xs rounded">
                    +{item.tags.length - 3}
                  </span>}
              </div>
              <Button variant="outline" className="w-full group text-xs sm:text-sm py-2 sm:py-2.5" onClick={() => {
            toast({
              title: item.title,
              description: item.content.substring(0, 100) + '...'
            });
          }}>
                View details
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>)}
        </div>

        {filteredItems.length === 0 && <div className="text-center py-12 sm:py-16">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-[#64748B] mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-[#64748B]">No results found</p>
          </div>}
      </main>
    </div>;
}