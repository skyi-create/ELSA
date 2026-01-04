import React, { useEffect, useState } from 'react';

// Domain Type Definition
export type Domain = {
  id: string;
  title: string;
  subtitle: string;
  intro: string; // One line summary
  items: string[]; // Bullet points for the card
  fullDetails: string; // Detailed text for the modal/subpage
  color: string; // Accent color
  aiPrompt: string;    // Specific subject for the image
};

export const businessDomains: Domain[] = [
  {
    id: 'job-support',
    title: '일자리 지원',
    subtitle: 'Job Support',
    intro: '전 세대를 아우르는 맞춤형 일자리 창출',
    items: [
      '미래내일 청년 일경험 사업',
      '계속 고용 지원 사업',
      '시니어 인턴십 지원'
    ],
    fullDetails: '청년층에게는 실무 경험을, 중장년층에게는 재취업과 계속 고용의 기회를 제공하여 노동 시장의 활력을 불어넣습니다.',
    color: '#3B82F6', // Blue
    aiPrompt: 'A simple, modern vector illustration of a puzzle piece being connected between a young person and an older person in business attire. Symbolizing connection, employment, and generational harmony. Flat design, blue and white theme, minimal background.',
  },
  {
    id: 'education',
    title: '교육 및 자격',
    subtitle: 'Education',
    intro: 'ESG 및 산업안전 전문 인재 양성',
    items: [
      'ESG 공급망 실사 관리사 (1급/2급)',
      'ESG 경영 및 산업안전보건 교육',
      '노동 및 인권 교육 프로그램'
    ],
    fullDetails: 'ESG 공급망 실사 관리사 자격 과정을 운영하며, 산업 현장에 필요한 실무 중심의 안전보건 및 노동인권 교육을 제공합니다.',
    color: '#10B981', // Emerald
    aiPrompt: 'A simple, modern vector illustration of a graduation cap, a certificate scroll, and a safety helmet arranged together. Symbolizing education, qualification, and safety. Flat design, green and white theme, minimal background.',
  },
  {
    id: 'consulting',
    title: '컨설팅 사업',
    subtitle: 'Consulting',
    intro: '기업의 지속가능한 성장을 위한 솔루션',
    items: [
      '일터 혁신 및 산업전환 컨설팅',
      'ESG 경영 전략 수립',
      '중대재해 예방 및 안전 체계 구축'
    ],
    fullDetails: '기업의 일터 혁신을 지원하고, 급변하는 산업 환경에 대응하기 위한 ESG 경영 전략 및 중대재해 예방 솔루션을 제시합니다.',
    color: '#F59E0B', // Amber
    aiPrompt: 'A simple, modern vector illustration of an upward trending graph on a tablet or board, with a lightbulb idea icon. Symbolizing innovation, strategy, and growth. Flat design, orange and white theme, minimal background.',
  },
  {
    id: 'due-diligence',
    title: '실사, 인증 및 평가',
    subtitle: 'Certification',
    intro: '글로벌 스탠다드 부합성 검증',
    items: [
      'ESG 공급망 실사 및 경영 평가',
      'ESG 인증 및 노동인권 실사',
      '지속가능경영 보고서 검증'
    ],
    fullDetails: '글로벌 공급망 기준에 부합하는 ESG 실사 및 평가를 수행하고, 투명하고 신뢰성 있는 인증 및 검증 서비스를 제공합니다.',
    color: '#8B5CF6', // Violet
    aiPrompt: 'A simple, modern vector illustration of a magnifying glass examining a document with a shield icon. Symbolizing evaluation, verification, and trust. Flat design, purple and white theme, minimal background.',
  },
];

// Component to render generated AI image with LocalStorage Caching
const AIImage: React.FC<{ item: Domain }> = ({ item }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // Updated key version to force refresh with new prompt style
    const storageKey = `elsa_biz_img_${item.id}_v4`; 

    const generate = async () => {
      // 1. Check LocalStorage first
      const cachedImage = localStorage.getItem(storageKey);
      if (cachedImage) {
        setImageUrl(cachedImage);
        return;
      }

      // 2. If not in cache, generate via API
      try {
        setLoading(true);
        const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
        
        if (!apiKey) {
           console.warn("API Key not found");
           return;
        }

        // Dynamically import GoogleGenAI
        // @ts-ignore
        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
               { text: `${item.aiPrompt} Use the style of high-quality flat vector art icons. White background. Clean lines. No text in the image.` }
            ]
          },
        });

        if (!isMounted) return;

        // Extract image
        // @ts-ignore
        for (const part of response.candidates?.[0]?.content?.parts || []) {
           if (part.inlineData) {
             const base64EncodeString = part.inlineData.data;
             const finalUrl = `data:image/png;base64,${base64EncodeString}`;
             
             // Save to state and cache
             setImageUrl(finalUrl);
             localStorage.setItem(storageKey, finalUrl);
             break;
           }
        }
      } catch (e) {
        console.warn("Failed to generate image", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generate();
    return () => { isMounted = false; };
  }, [item.id, item.aiPrompt]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2F4F4F] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (imageUrl) {
    return <img src={imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />;
  }

  return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
          <span className="text-4xl">🖼️</span>
      </div>
  );
};


interface BusinessProps {
  onSelect?: (id: string) => void;
}

export const Business: React.FC<BusinessProps> = ({ onSelect }) => {
  return (
    <section id="business" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-[#2F4F4F] mb-4">주요 사업</h2>
                <div className="w-12 h-1.5 bg-[#D4FF3F] rounded-full"></div>
                <p className="text-gray-600 mt-4 max-w-xl text-lg">
                    ELSA는 전문적인 역량을 바탕으로<br/> 기업과 노동이 상생하는 미래를 만들어갑니다.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessDomains.map((item) => (
            <button 
              key={item.id}
              onClick={() => onSelect && onSelect(item.id)}
              className="group relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-[#2F4F4F] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: item.color }}></div>

              {/* Image Area */}
              <div className="w-full h-48 bg-gray-50 relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                 <AIImage item={item} />
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: item.color }}>
                    {item.subtitle}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#2F4F4F] transition-colors">
                    {item.title}
                </h3>
                
                {/* Highlighted Items List */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {item.items.map((subItem, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={item.color}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-semibold text-[15px] leading-snug">
                        {subItem}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Learn More Button Style */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-gray-400 group-hover:text-[#2F4F4F]">
                  <span>자세히 보기</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#2F4F4F] group-hover:text-white transition-all">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ----------------------------------------------------------------------------
// Business Detail Component
// ----------------------------------------------------------------------------

interface BusinessDetailProps {
  id: string | null;
  onBack: () => void;
}

export const BusinessDetail: React.FC<BusinessDetailProps> = ({ id, onBack }) => {
  const domain = businessDomains.find(d => d.id === id);

  if (!domain) {
    return <div>Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Navigation */}
        <div className="mb-8">
           <button onClick={onBack} className="text-gray-500 hover:text-[#2F4F4F] flex items-center gap-2 font-medium transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             사업 목록으로 돌아가기
           </button>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-100 relative min-h-[300px] md:min-h-auto">
             <div className="absolute inset-0 w-full h-full">
                 <AIImage item={domain} />
             </div>
          </div>
          <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: domain.color }}>{domain.subtitle}</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {domain.title}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
               {domain.fullDetails}
            </p>
            <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#2F4F4F] text-white rounded-lg font-bold hover:bg-[#1e3333] transition-colors shadow-md">
                    상담 및 문의하기
                </button>
            </div>
          </div>
        </div>

        {/* Detailed Items Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-[#2F4F4F] rounded-full"></span>
            세부 추진 항목
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           {domain.items.map((item, idx) => (
             <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-[#2F4F4F] transition-all hover:shadow-md group flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-xl group-hover:bg-[#2F4F4F] group-hover:text-[#D4FF3F] transition-colors flex-shrink-0 shadow-sm" style={{ color: domain.color }}>
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-gray-900 mb-1">{item}</h4>
                   <p className="text-sm text-gray-500">
                     전문성을 바탕으로 한 맞춤형 솔루션을 제공합니다.
                   </p>
                 </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};