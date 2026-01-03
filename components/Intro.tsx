import React from 'react';

export const Intro: React.FC = () => {
  const items = [
    { id: 1, title: '이사장 인사말', icon: '👋' },
    { id: 2, title: '협회 연혁', icon: '📜' },
    { id: 3, title: '협회 주요 회원', icon: '🤝' },
    { id: 4, title: '협회 조직도', icon: '📊' },
    { id: 5, title: '찾아 오시는 길', icon: '📍' },
  ];

  return (
    <section id="intro" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-4">협회 소개</h2>
          <div className="w-16 h-1 bg-[#2F4F4F] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600">
            ESG 경영과 노동의 가치를 조화롭게 연결하는 (사)ESG노동사회협회입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {items.map((item) => (
            <a 
              key={item.id}
              href="#"
              className="flex flex-col items-center justify-center p-8 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#2F4F4F] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#2F4F4F]">
                {item.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};