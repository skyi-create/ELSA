import React from 'react';

// Example data structure mimicking real DB content
const communityPosts = [
  {
    id: 1,
    type: 'NOTICE',
    title: '2024년도 제1회 정기총회 개최 결과 안내',
    date: '2024.03.15',
    summary: '지난 3월 12일 개최된 2024년도 정기총회 결과를 회원사 여러분께 안내드립니다. 주요 안건 승인 내용 및 향후 계획을 확인해주세요.',
    imageColor: 'bg-blue-100', // Placeholder color
    textColor: 'text-blue-600',
    link: '#'
  },
  {
    id: 2,
    type: 'INTERVIEW',
    title: '[회원사 인터뷰] (주)미래테크, ESG 경영대상 수상',
    date: '2024.04.02',
    summary: '중소기업 특화형 안전보건 시스템을 도입하여 고용노동부 장관상을 수상한 (주)미래테크 김철수 대표님을 만나보았습니다.',
    imageColor: 'bg-green-100',
    textColor: 'text-green-600',
    link: '#'
  },
  {
    id: 3,
    type: 'ARCHIVE',
    title: '2024 중대재해처벌법 대응 자가진단 체크리스트',
    date: '2024.02.28',
    summary: '50인 미만 사업장 확대 적용에 따른 필수 점검 항목을 정리한 가이드북 PDF 자료입니다. 다운로드하여 활용하시기 바랍니다.',
    imageColor: 'bg-orange-100',
    textColor: 'text-orange-600',
    link: '#'
  },
  {
    id: 4,
    type: 'EVENT',
    title: '하반기 ESG 실무자 역량 강화 워크숍 모집',
    date: '2024.05.10',
    summary: '실무에 바로 적용 가능한 공급망 실사 대응 전략 교육을 실시합니다. 선착순 50명 모집하오니 많은 관심 바랍니다.',
    imageColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    link: '#'
  }
];

export const Community: React.FC = () => {
  return (
    <section id="community" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
             <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-4">커뮤니티</h2>
             <div className="w-16 h-1 bg-[#2F4F4F] rounded-full"></div>
             <p className="mt-4 text-gray-600">협회의 최신 소식과 회원사들의 생생한 이야기를 전해드립니다.</p>
           </div>
           <a href="#" className="hidden md:flex items-center gap-2 text-[#2F4F4F] font-semibold hover:text-[#A9D95D] transition-colors">
              전체 게시글 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group flex flex-col h-full"
            >
              {/* Image Placeholder */}
              <div className={`h-40 w-full ${post.imageColor} flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-[#2F4F4F]/0 group-hover:bg-[#2F4F4F]/10 transition-colors duration-300"></div>
                 <span className={`${post.textColor} font-bold opacity-30 text-4xl`}>
                   {post.type}
                 </span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.imageColor} ${post.textColor}`}>
                    {post.type}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#2F4F4F] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                  {post.summary}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center text-sm font-medium text-gray-500 group-hover:text-[#2F4F4F]">
                  자세히 읽기
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
           <a href="#" className="inline-flex items-center gap-2 text-[#2F4F4F] font-semibold">
              전체 게시글 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
           </a>
        </div>
      </div>
    </section>
  );
};