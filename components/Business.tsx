import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from "@google/genai";

// Domain Type Definition
export type Domain = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  details: string[];
  headerColor: string;
  icon: React.ReactNode;
  textDark?: boolean;
  bgColorCode?: string; // For AI generation reference
};

export const businessDomains: Domain[] = [
  {
    id: 'job-support',
    title: '일자리 지원사업',
    subtitle: 'Job Support Business',
    desc: '청년·중장년 인턴십 매칭 및 계속고용 지원 시스템 구축',
    details: ['청년 일경험 지원', '시니어 인턴십', '계속고용 장려금', '직무 훈련'],
    headerColor: 'bg-[#1e3a8a]', // Dark Blue
    bgColorCode: '#EBF8FF',
    icon: (
      // Default SVG fallback
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#EBF8FF"/>
        <circle cx="50" cy="60" r="25" fill="#4299E1" opacity="0.8"/>
        <circle cx="150" cy="60" r="25" fill="#48BB78" opacity="0.8"/>
        <path d="M75 60 H125" stroke="#2D3748" strokeWidth="3" strokeDasharray="5 5"/>
        <path d="M50 95 C50 115 80 125 100 125 C120 125 150 115 150 95" stroke="#2B6CB0" strokeWidth="4" strokeLinecap="round"/>
        <text x="50" y="65" fontSize="10" textAnchor="middle" fill="white">YOUTH</text>
        <text x="150" y="65" fontSize="10" textAnchor="middle" fill="white">SENIOR</text>
      </svg>
    ),
  },
  {
    id: 'education',
    title: '교육 및 자격사업',
    subtitle: 'Education & Qualification',
    desc: 'ESG 공급망 실사 전문가 양성 및 산업안전 자격 과정',
    details: ['ESG 공급망 실사 1/2급', '산업안전 지도사', '노동인권/공정거래', '고용보험 환급과정'],
    headerColor: 'bg-[#047857]', // Dark Green
    icon: (
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#F0FFF4"/>
        <rect x="30" y="30" width="100" height="60" rx="2" fill="#2D3748" stroke="#1A202C" strokeWidth="2"/>
        <text x="80" y="60" fontSize="12" textAnchor="middle" fill="white" fontWeight="bold">ESG</text>
        <text x="80" y="75" fontSize="10" textAnchor="middle" fill="#A0AEC0">공급망 실사</text>
        <rect x="140" y="20" width="40" height="50" fill="white" stroke="#D69E2E" strokeWidth="2"/>
        <circle cx="160" cy="45" r="10" fill="#ECC94B" opacity="0.5"/>
        <path d="M150 55 L170 55" stroke="#CBD5E0" strokeWidth="2"/>
        <path d="M150 60 L165 60" stroke="#CBD5E0" strokeWidth="2"/>
        <rect x="140" y="100" width="40" height="10" rx="1" fill="#4299E1"/>
        <rect x="140" y="112" width="40" height="10" rx="1" fill="#ED8936"/>
        <rect x="140" y="124" width="40" height="10" rx="1" fill="#48BB78"/>
      </svg>
    ),
  },
  {
    id: 'consulting',
    title: '컨설팅 사업',
    subtitle: 'Consulting Business',
    desc: '일터혁신, 산업안전, ESG 경영 전환을 위한 전문 컨설팅',
    details: ['일터혁신 컨설팅', '산업안전 진단', 'ESG 경영 공시', '산업전환 자문'],
    headerColor: 'bg-[#d9f99d]', // Light Lime (Text will be dark)
    textDark: true,
    icon: (
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#FFFFF0"/>
        <rect x="40" y="30" width="80" height="50" fill="white" stroke="#CBD5E0" strokeWidth="2"/>
        <path d="M50 65 L65 55 L80 60 L100 45" stroke="#4299E1" strokeWidth="2"/>
        <circle cx="40" cy="110" r="15" fill="#2D3748"/>
        <path d="M25 135 Q40 110 55 135" fill="#2D3748"/>
        <circle cx="160" cy="110" r="15" fill="#2D3748"/>
        <path d="M145 135 Q160 110 175 135" fill="#2D3748"/>
        <rect x="60" y="100" width="80" height="40" fill="#E2E8F0" rx="2"/>
        <path d="M160 30 Q180 30 180 50 Q180 70 160 70 Q140 70 140 50 Q140 30 160 30 Z" fill="#48BB78"/>
      </svg>
    ),
  },
  {
    id: 'due-diligence',
    title: '실사, 인증 및 평가사업',
    subtitle: 'Certification & Evaluation',
    desc: 'ESG 경영 평가, ISO/SA8000 인증, 공급망 실사 및 검증',
    details: ['ESG 경영 평가', 'ISO 26000/SA8000', '보고서 검증', '노동인권 실사'],
    headerColor: 'bg-[#6b21a8]', // Purple
    icon: (
      <svg viewBox="0 0 200 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="150" fill="#F3E8FF"/>
        <circle cx="100" cy="75" r="40" stroke="#805AD5" strokeWidth="2" fill="white"/>
        <path d="M60 75 Q100 95 140 75" stroke="#E9D8FD" strokeWidth="1"/>
        <path d="M100 35 Q80 75 100 115" stroke="#E9D8FD" strokeWidth="1"/>
        <circle cx="120" cy="95" r="20" stroke="#2D3748" strokeWidth="3" fill="#ECC94B" fillOpacity="0.3"/>
        <path d="M135 110 L155 130" stroke="#2D3748" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="160" cy="40" r="15" stroke="#E53E3E" strokeWidth="2" strokeDasharray="2 2"/>
        <text x="160" y="44" fontSize="6" textAnchor="middle" fill="#E53E3E" fontWeight="bold">CERTIFIED</text>
      </svg>
    ),
  },
];

// Component to render generated AI image
const AIImage: React.FC<{ item: Domain }> = ({ item }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Only generate for 'job-support' as requested
    if (item.id !== 'job-support') return;

    const generate = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
               { text: `A flat vector style illustration of a young professional shaking hands with a corporate executive or connecting with a company building, symbolizing job matching. Minimalist design suitable for a business website. The background color of the image must be solid light blue with hex code ${item.bgColorCode || '#EBF8FF'}.` }
            ]
          },
        });

        // Extract image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
           if (part.inlineData) {
             const base64EncodeString = part.inlineData.data;
             setImageUrl(`data:image/png;base64,${base64EncodeString}`);
             break;
           }
        }
      } catch (e) {
        console.error("Failed to generate image", e);
      }
    };

    generate();
  }, [item.id, item.bgColorCode]);

  if (item.id === 'job-support' && imageUrl) {
    return <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />;
  }

  return <>{item.icon}</>;
};


interface BusinessProps {
  onSelect?: (id: string) => void;
}

export const Business: React.FC<BusinessProps> = ({ onSelect }) => {
  return (
    <section id="business" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2F4F4F] mb-6">주요 사업 소개</h2>
          <div className="w-20 h-1.5 bg-[#2F4F4F] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            ELSA는 전문적인 교육과 컨설팅, 엄격한 실사 및 평가를 통해<br/>
            지속가능한 기업 생태계를 만들어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {businessDomains.map((item) => (
            <button 
              key={item.id}
              onClick={() => onSelect && onSelect(item.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 flex flex-col group h-full text-left"
            >
              {/* Header Bar */}
              <div className={`${item.headerColor} py-4 px-6 relative overflow-hidden w-full`}>
                <h3 className={`text-xl md:text-2xl font-bold ${item.textDark ? 'text-gray-900' : 'text-white'} relative z-10`}>
                  {item.title}
                </h3>
                <div className="absolute right-0 top-0 h-full w-20 bg-white/10 skew-x-12 transform translate-x-8"></div>
              </div>

              {/* Main Illustration Area */}
              <div className="bg-gray-50 h-64 w-full p-8 flex items-center justify-center overflow-hidden relative">
                 <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <AIImage item={item} />
                 </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex-grow flex flex-col bg-white w-full">
                <div className="mb-4">
                  <span className="text-xs font-bold tracking-wider text-[#2F4F4F] uppercase opacity-70 mb-1 block">
                    {item.subtitle}
                  </span>
                  <p className="text-gray-700 text-lg font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                  <div className="flex flex-wrap gap-2">
                    {item.details.map((detail, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                        #{detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Strip */}
              <div className={`h-2 ${item.headerColor} w-full`}></div>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className={`${domain.headerColor} h-48 md:h-64 relative overflow-hidden flex items-center justify-center`}>
            <div className="absolute inset-0 bg-black/10"></div>
             <h1 className={`text-3xl md:text-5xl font-bold ${domain.textDark ? 'text-gray-900' : 'text-white'} relative z-10 text-center px-4`}>
               {domain.title}
             </h1>
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-wider">{domain.subtitle}</h2>
            <p className="text-2xl md:text-3xl text-gray-800 font-bold leading-tight mb-6">
              {domain.desc}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              (사)ESG노동사회협회는 {domain.title}을 통해 기업의 지속가능경영을 지원하고 
              사회적 가치를 실현합니다. 전문적인 지식과 풍부한 경험을 바탕으로 
              최고의 솔루션을 제공하겠습니다.
            </p>
          </div>
        </div>

        {/* Detailed Items Grid */}
        <h3 className="text-2xl font-bold text-gray-800 mb-6 px-2 border-l-4 border-[#2F4F4F] pl-4">
          세부 사업 항목
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           {domain.details.map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#2F4F4F] transition-colors group">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-[#2F4F4F] font-bold text-xl group-hover:bg-[#2F4F4F] group-hover:text-[#D4FF3F] transition-colors">
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="text-xl font-bold text-gray-900 mb-2">{item}</h4>
                   <p className="text-gray-600 leading-relaxed">
                     {item}에 대한 체계적인 프로세스와 전문 인력을 보유하고 있으며, 
                     고객사의 니즈에 맞춘 맞춤형 서비스를 제공합니다.
                     성공적인 수행을 위해 단계별 전략을 수립하여 지원합니다.
                   </p>
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Contact / CTA */}
        <div className="bg-[#2F4F4F] rounded-2xl p-10 text-center text-white">
           <h3 className="text-2xl font-bold mb-4">사업 관련 문의</h3>
           <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
             {domain.title}에 대해 더 궁금하신 점이 있으신가요? 
             전문 담당자가 친절하게 안내해 드립니다.
           </p>
           <button className="px-8 py-3 bg-[#D4FF3F] text-[#0F2522] font-bold rounded-lg hover:bg-white transition-colors">
             문의하기
           </button>
        </div>
      </div>
    </div>
  );
};