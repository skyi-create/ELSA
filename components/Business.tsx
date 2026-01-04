import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// Domain Type Definition
export type Domain = {
  id: string;
  title: string;
  subtitle: string;
  intro: string; // One line summary
  items: string[]; // Bullet points for the card
  fullDetails: string; // Detailed text for the modal/subpage
  color: string; // Accent color
  aiPrompt: string; // Prompt for Gemini Nano Banana
  fallbackImage: string; // Static fallback URL (Matches content)
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
    // Prompt: 3D Cute Character Handshake (Blue Theme)
    aiPrompt: 'A cute 3D animation style illustration of two friendly business characters shaking hands in a modern office. Soft isometric view, vibrant blue tones, Pixar style, high quality render, minimal background.',
    // Fallback: Handshake
    fallbackImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'education',
    title: '교육 및 자격',
    subtitle: 'Education',
    intro: 'ESG 및 산업안전 전문 인재 양성',
    items: [
      'ESG 공급망 실사 관리사 (1급/2급)',
      'ESG 경영, 산업안전보건 교육',
      '노동 및 인권 교육 프로그램'
    ],
    fullDetails: 'ESG 공급망 실사 관리사 자격 과정을 운영하며, 산업 현장에 필요한 실무 중심의 안전보건 및 노동인권 교육을 제공합니다.',
    color: '#10B981', // Emerald
    // Prompt: 3D Graduation Cap & Books (Green Theme)
    aiPrompt: 'A cute 3D animation style illustration of a green graduation cap, a diploma scroll, and floating books. Education theme, soft 3D render, emerald green tones, clean white background, high quality.',
    // Fallback: Books/Education
    fallbackImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'consulting',
    title: '컨설팅 사업',
    subtitle: 'Consulting',
    intro: '기업의 지속가능한 성장을 위한 솔루션',
    items: [
      '일터 혁신 및 산업전환 컨설팅',
      'ESG 경영 전략 수립',
      '중대재해 예방 솔루션'
    ],
    fullDetails: '기업의 일터 혁신을 지원하고, 급변하는 산업 환경에 대응하기 위한 ESG 경영 전략 및 중대재해 예방 솔루션을 제시합니다.',
    color: '#F59E0B', // Amber
    // Prompt: 3D Lightbulb & Gears (Amber Theme)
    aiPrompt: 'A cute 3D animation style illustration of a glowing lightbulb, gears, and an upward growth chart. Business strategy and innovation theme, vibrant amber and yellow tones, soft shadows, 3D icon style.',
    // Fallback: Lightbulb
    fallbackImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
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
    // Prompt: 3D Magnifying Glass & Shield (Purple Theme)
    aiPrompt: 'A cute 3D animation style illustration of a magnifying glass scanning a secure document with a shield icon. Security and verification theme, soft purple tones, 3D render, secure atmosphere.',
    // Fallback: Magnifying Glass
    fallbackImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
  },
  ];

// Component: AI Image Generator with LocalStorage Caching & Fallback
const AIImage: React.FC<{ item: Domain }> = ({ item }) => {
  // Start with the fallback image to ensure no broken links during build/deploy
  const [imageUrl, setImageUrl] = useState<string>(item.fallbackImage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // Version key to manage caching. 'v_anim_final' ensures we use the new animation prompts.
    const storageKey = `elsa_biz_img_${item.id}_v_anim_final`;

    const generate = async () => {
      // 1. Check LocalStorage first to keep the image "fixed" for the user
      const cachedImage = localStorage.getItem(storageKey);
      if (cachedImage) {
        setImageUrl(cachedImage);
        return;
      }

      // 2. Try to generate via API if Key exists
      try {
        const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
        
        if (!apiKey) {
           // No API Key found (common in build/deploy if not configured). Keep fallback.
           return;
        }

        setLoading(true);

        const ai = new GoogleGenAI({ apiKey });
        
        // Using 'gemini-2.5-flash-image' (Nano Banana) for generation
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
               { text: item.aiPrompt }
            ]
          },
          config: {
             // Optional config for consistency if supported
          }
        });

        if (!isMounted) return;

        // @ts-ignore
        for (const part of response.candidates?.[0]?.content?.parts || []) {
           if (part.inlineData) {
             const base64EncodeString = part.inlineData.data;
             const finalUrl = `data:image/png;base64,${base64EncodeString}`;
             
             // Save to state and cache to "fix" the image
             setImageUrl(finalUrl);
             localStorage.setItem(storageKey, finalUrl);
             break;
           }
        }
      } catch (e) {
        console.warn("AI generation failed or skipped, using fallback.", e);
        // Do nothing, imageUrl is already set to fallbackImage
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generate();
    return () => { isMounted = false; };
  }, [item.id, item.aiPrompt]);

  return (
     <div className="w-full h-full relative">
         <img 
            src={imageUrl} 
            alt={item.title} 
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loading ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'} transition-all`} 
         />
         {loading && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-8 h-8 border-4 border-[#2F4F4F] border-t-transparent rounded-full animate-spin"></div>
             </div>
         )}
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
              className="group relative bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-[#2F4F4F] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 text-left flex flex-col h-full overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="h-2 w-full" style={{ backgroundColor: item.color }}></div>

              {/* Image Area - Expanded Height */}
              <div className="w-full h-56 bg-gray-50 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-300"></div>
                 {/* Using AIImage to handle generation and fallback */}
                 <AIImage item={item} />
                 
                 {/* Floating Subtitle Badge */}
                 <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold shadow-sm uppercase tracking-wider" style={{ color: item.color }}>
                        {item.subtitle}
                    </span>
                 </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#2F4F4F] transition-colors">
                    {item.title}
                </h3>
                
                {/* Highlighted Items List with Custom Bullets */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {item.items.map((subItem, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700 font-bold text-[16px] leading-snug">
                        {subItem}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Action Area */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between group-hover:border-[#2F4F4F]/20 transition-colors">
                  <span className="text-sm font-bold text-gray-400 group-hover:text-[#2F4F4F] transition-colors">자세히 보기</span>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#2F4F4F] group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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
          <div className="w-full md:w-5/12 bg-gray-100 relative min-h-[300px] md:min-h-auto">
             <div className="absolute inset-0 w-full h-full">
                 <AIImage item={domain} />
             </div>
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2" style={{ color: domain.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: domain.color }}></span>
                {domain.subtitle}
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {domain.title}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 border-l-4 border-gray-200 pl-4">
               {domain.fullDetails}
            </p>
            <div className="flex gap-4">
                <button className="px-8 py-4 bg-[#2F4F4F] text-white rounded-xl font-bold hover:bg-[#1e3333] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 flex items-center gap-2">
                    <span>상담 및 문의하기</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
            </div>
          </div>
        </div>

        {/* Detailed Items Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-[#2F4F4F] rounded-full"></div>
            세부 추진 항목
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
           {domain.items.map((item, idx) => {
             const isSpecialItem = item === '미래내일 청년 일경험 사업';
             return (
               <div 
                 key={idx} 
                 className={`bg-white p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:border-[#2F4F4F] transition-all duration-300 hover:shadow-md group flex flex-col h-full ${isSpecialItem ? 'md:col-span-2 lg:col-span-3' : ''}`}
               >
                 <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center font-bold text-xl group-hover:bg-[#2F4F4F] group-hover:text-[#D4FF3F] transition-colors shadow-sm mb-4" style={{ color: domain.color }}>
                   {idx + 1}
                 </div>
                 <h4 className="text-xl font-bold text-gray-900 mb-3">{item}</h4>
                 
                 {isSpecialItem && (
                    <div className="w-full mb-6">
                        {/* Inserted the Youth Job Experience Infographic */}
                        <img 
                          src="/youth_job_experience.png" 
                          alt="2025 청년 일경험 지원사업 (인턴형) 완전 정복" 
                          className="w-full h-auto rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
                          onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             console.warn("Image /youth_job_experience.png not found.");
                          }}
                        />
                    </div>
                 )}

                 <p className="text-sm text-gray-500 leading-relaxed mt-auto">
                   {isSpecialItem 
                    ? "2025년 청년 일경험 지원사업(인턴형)에 대한 상세 안내입니다. 참여 대상, 지원 내용, 절차 등을 인포그래픽으로 한눈에 확인하세요."
                    : "해당 분야의 전문 컨설턴트와 교육 전문가가 체계적인 솔루션을 제공하여 귀사의 역량을 강화합니다."
                   }
                 </p>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};