import React, { useState, useMemo } from 'react';

// Types
type Category = 'LABOR' | 'SAFETY' | 'HUMAN_RIGHTS' | 'SUPPLY_CHAIN' | 'ENV';
type Answer = 'YES' | 'PARTIAL' | 'NO';

interface Question {
  id: number;
  category: Category;
  text: string;
}

interface DiagnosisProps {
  onBack: () => void;
}

// ------------------- Data -------------------
const QUESTIONS: Question[] = [
  // 1. 노동법 (Labor)
  { id: 1, category: 'LABOR', text: '모든 근로자와 근로계약서를 서면으로 체결하고 교부하였습니까?' },
  { id: 2, category: 'LABOR', text: '취업규칙을 작성하여 고용노동부에 신고하고 근로자에게 주지시켰습니까?' },
  { id: 3, category: 'LABOR', text: '최저임금 이상의 임금을 지급하고 있습니까?' },
  { id: 4, category: 'LABOR', text: '주 52시간 근무제를 준수하고 있습니까?' },
  { id: 5, category: 'LABOR', text: '연차유급휴가를 법정 기준대로 부여하고 있습니까?' },
  { id: 6, category: 'LABOR', text: '퇴직급여 제도를 설정하고 성실히 운영하고 있습니까?' },

  // 2. 안전보건 (Safety)
  { id: 7, category: 'SAFETY', text: '안전보건관리책임자 등 안전보건관계자를 선임하였습니까?' },
  { id: 8, category: 'SAFETY', text: '정기적으로 위험성평가를 실시하고 개선 조치를 이행합니까?' },
  { id: 9, category: 'SAFETY', text: '근로자에게 정기 안전보건교육을 실시하고 있습니까?' },
  { id: 10, category: 'SAFETY', text: '비상사태 대비 훈련을 정기적으로 실시합니까?' },
  { id: 11, category: 'SAFETY', text: '개인보호구를 적절히 지급하고 착용을 관리하고 있습니까?' },
  { id: 12, category: 'SAFETY', text: '산업재해 발생 시 기록하고 재발방지 대책을 수립합니까?' },

  // 3. 인권 (Human Rights)
  { id: 13, category: 'HUMAN_RIGHTS', text: '직장 내 괴롭힘 예방 교육을 연 1회 이상 실시합니까?' },
  { id: 14, category: 'HUMAN_RIGHTS', text: '성희롱 예방 교육을 연 1회 이상 실시합니까?' },
  { id: 15, category: 'HUMAN_RIGHTS', text: '채용, 승진 등에 있어 차별 금지 규정을 보유하고 있습니까?' },
  { id: 16, category: 'HUMAN_RIGHTS', text: '강제 근로 및 아동 노동을 금지하는 방침이 있습니까?' },
  { id: 17, category: 'HUMAN_RIGHTS', text: '고충처리 기구를 운영하고 비밀을 보장합니까?' },
  { id: 18, category: 'HUMAN_RIGHTS', text: '장애인, 외국인 등 취약계층에 대한 차별 방지 조치가 있습니까?' },

  // 4. 공급망 (Supply Chain)
  { id: 19, category: 'SUPPLY_CHAIN', text: '협력사 선정 시 ESG 기준을 평가합니까?' },
  { id: 20, category: 'SUPPLY_CHAIN', text: '협력사와 공정한 하도급 계약을 체결하고 준수합니까?' },
  { id: 21, category: 'SUPPLY_CHAIN', text: '협력사의 안전보건 역량 강화를 지원하고 있습니까?' },
  { id: 22, category: 'SUPPLY_CHAIN', text: '공급망 내 윤리경영 실천 서약을 받고 있습니까?' },
  { id: 23, category: 'SUPPLY_CHAIN', text: '주요 원자재의 분쟁광물 포함 여부를 확인합니까?' },
  { id: 24, category: 'SUPPLY_CHAIN', text: '협력사의 법 위반 시 제재 및 시정 조치 프로세스가 있습니까?' },

  // 5. 환경 (Environment)
  { id: 25, category: 'ENV', text: '환경 관련 인허가를 적법하게 취득하고 유지하고 있습니까?' },
  { id: 26, category: 'ENV', text: '폐기물 처리 및 관리를 법규에 따라 적절히 수행합니까?' },
  { id: 27, category: 'ENV', text: '에너지 사용량 및 온실가스 배출량을 모니터링합니까?' },
  { id: 28, category: 'ENV', text: '화학물질 관리 대장을 작성하고 MSDS를 비치하였습니까?' },
  { id: 29, category: 'ENV', text: '환경 사고 예방을 위한 시설 점검을 정기적으로 수행합니까?' },
  { id: 30, category: 'ENV', text: '친환경 제품 구매 또는 생산을 위한 노력을 하고 있습니까?' },
];

const CATEGORY_LABELS: Record<Category, string> = {
  LABOR: '노동법',
  SAFETY: '안전보건',
  HUMAN_RIGHTS: '인권',
  SUPPLY_CHAIN: '공급망',
  ENV: '환경',
};

// ------------------- Components -------------------

// 1. Intro Step
const IntroStep: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="text-center max-w-2xl mx-auto py-12 animate-fade-in">
    <div className="w-20 h-20 bg-[#D4FF3F] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
      <svg className="w-10 h-10 text-[#2F4F4F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-[#2F4F4F] mb-6">ESG 공급망 실사 자가진단</h2>
    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
      본 자가진단은 귀사의 ESG 경영 수준을 파악하고 공급망 실사에 대비하기 위한 기초 자료를 제공합니다.<br/>
      총 5개 영역, 30개 문항으로 구성되어 있으며 소요 시간은 약 10분입니다.
    </p>
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-left mb-8">
      <h3 className="font-bold text-gray-800 mb-3">📋 진단 영역</h3>
      <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">✅ 노동 관계법 준수</li>
        <li className="flex items-center gap-2">✅ 산업안전보건 체계</li>
        <li className="flex items-center gap-2">✅ 인권 경영 및 보호</li>
        <li className="flex items-center gap-2">✅ 공급망 협력 관리</li>
        <li className="flex items-center gap-2">✅ 환경 관리 및 규제</li>
      </ul>
    </div>
    <button 
      onClick={onNext}
      className="px-10 py-4 bg-[#2F4F4F] text-white text-lg font-bold rounded-lg hover:bg-[#264040] transition-colors shadow-lg"
    >
      진단 시작하기
    </button>
  </div>
);

// 2. Question Step
const QuestionStep: React.FC<{
  currentQuestionIndex: number;
  totalQuestions: number;
  question: Question;
  onAnswer: (score: number) => void;
  answers: Record<number, number>;
}> = ({ currentQuestionIndex, totalQuestions, question, onAnswer, answers }) => {
  const currentAnswer = answers[question.id];
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>진행률</span>
          <span>{Math.round(progress)}% ({currentQuestionIndex + 1}/{totalQuestions})</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#2F4F4F] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-[#D4FF3F] text-[#0F2522] text-sm font-bold rounded-full">
          {CATEGORY_LABELS[question.category]}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-2xl font-bold text-gray-800 mb-8 leading-normal min-h-[5rem]">
        {question.text}
      </h3>

      {/* Options */}
      <div className="space-y-4">
        {[
          { label: '예 (Yes)', value: 10, desc: '체계적으로 관리하고 증빙자료가 있음' },
          { label: '부분적 (Partial)', value: 5, desc: '실행하고 있으나 체계나 증빙이 미흡함' },
          { label: '아니오 (No)', value: 0, desc: '관련 제도가 없거나 실행하지 않음' },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => onAnswer(opt.value)}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between group ${
              currentAnswer === opt.value
                ? 'border-[#2F4F4F] bg-[#2F4F4F]/5 ring-1 ring-[#2F4F4F]'
                : 'border-gray-200 hover:border-[#2F4F4F] hover:bg-gray-50'
            }`}
          >
            <div>
              <div className={`font-bold text-lg mb-1 ${currentAnswer === opt.value ? 'text-[#2F4F4F]' : 'text-gray-700'}`}>
                {opt.label}
              </div>
              <div className="text-sm text-gray-500">{opt.desc}</div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              currentAnswer === opt.value ? 'border-[#2F4F4F]' : 'border-gray-300'
            }`}>
              {currentAnswer === opt.value && <div className="w-3 h-3 bg-[#2F4F4F] rounded-full" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// 3. User Info Form
const UserInfoForm: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    ceoName: '',
    email: '',
    phone: '',
    industry: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-xl mx-auto py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#2F4F4F]">결과 리포트 발급 정보</h2>
        <p className="text-gray-600 mt-2">진단 결과를 분석하고 리포트를 발송해 드리기 위해 기업 정보를 입력해주세요.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">기업명</label>
          <input 
            required 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent outline-none"
            value={formData.companyName}
            onChange={e => setFormData({...formData, companyName: e.target.value})}
            placeholder="(주)이에스지"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">대표자명</label>
          <input 
            required 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent outline-none"
            value={formData.ceoName}
            onChange={e => setFormData({...formData, ceoName: e.target.value})}
            placeholder="홍길동"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
          <input 
            required 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent outline-none"
            value={formData.industry}
            onChange={e => setFormData({...formData, industry: e.target.value})}
            placeholder="제조업"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input 
            required 
            type="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent outline-none"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            placeholder="report@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input 
            required 
            type="tel" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F4F4F] focus:border-transparent outline-none"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            placeholder="010-1234-5678"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full mt-6 bg-[#2F4F4F] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#264040] transition-colors shadow-md"
        >
          결과 확인하기
        </button>
      </form>
    </div>
  );
};

// 4. Result Step (Radar Chart & Actions)
const RadarChart: React.FC<{ scores: Record<Category, number> }> = ({ scores }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const categories: Category[] = ['LABOR', 'SAFETY', 'HUMAN_RIGHTS', 'SUPPLY_CHAIN', 'ENV'];
  
  // Convert score (0-100) to coordinates
  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Calculate polygon points
  const points = categories.map((cat, i) => {
    const { x, y } = getCoordinates(scores[cat], i);
    return `${x},${y}`;
  }).join(' ');

  // Calculate background pentagons
  const backgroundLevels = [20, 40, 60, 80, 100];

  return (
    <div className="flex justify-center my-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Grids */}
        {backgroundLevels.map((level) => (
          <polygon
            key={level}
            points={categories.map((_, i) => {
              const { x, y } = getCoordinates(level, i);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Axes */}
        {categories.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          );
        })}

        {/* Data Polygon */}
        <polygon points={points} fill="rgba(47, 79, 79, 0.2)" stroke="#2F4F4F" strokeWidth="2" />
        
        {/* Data Points */}
        {categories.map((cat, i) => {
          const { x, y } = getCoordinates(scores[cat], i);
          return <circle key={i} cx={x} cy={y} r="4" fill="#D4FF3F" stroke="#2F4F4F" strokeWidth="2" />;
        })}

        {/* Labels */}
        {categories.map((cat, i) => {
          const { x, y } = getCoordinates(125, i); // Push labels out further
          return (
            <text 
              key={i} 
              x={x} 
              y={y} 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fontSize="12" 
              fontWeight="bold" 
              fill="#374151"
            >
              {CATEGORY_LABELS[cat]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const ResultStep: React.FC<{ 
  scores: Record<Category, number>, 
  userInfo: any, 
  onReset: () => void 
}> = ({ scores, userInfo, onReset }) => {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;

  const handleDownload = () => {
    window.print();
  };

  const handleEmail = () => {
    alert(`${userInfo.email}로 결과 리포트가 발송되었습니다.`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in print:w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-2">진단 결과 리포트</h2>
        <p className="text-gray-500">기업명: {userInfo.companyName} | 작성일: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[350px]">
          <h3 className="text-lg font-bold text-gray-700 mb-4">영역별 진단 차트</h3>
          <RadarChart scores={scores} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-[#2F4F4F] text-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-sm font-medium opacity-80 mb-1">종합 점수</div>
            <div className="text-5xl font-bold mb-2">{Math.round(totalScore)}<span className="text-2xl font-normal opacity-70">/100</span></div>
            <div className="text-sm border-t border-white/20 pt-3 mt-3">
              {totalScore >= 80 ? '매우 우수합니다! 🌟' : totalScore >= 60 ? '양호하지만 개선이 필요합니다. 👍' : '체계적인 관리가 시급합니다. ⚠️'}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">영역별 세부 점수</h3>
             <div className="space-y-3">
               {(Object.keys(scores) as Category[]).map(cat => (
                 <div key={cat} className="flex items-center justify-between">
                   <span className="text-gray-600 font-medium w-24">{CATEGORY_LABELS[cat]}</span>
                   <div className="flex-grow mx-3 h-2 bg-gray-100 rounded-full">
                     <div 
                        className="h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${scores[cat]}%`,
                          backgroundColor: scores[cat] >= 80 ? '#48BB78' : scores[cat] >= 60 ? '#ECC94B' : '#F56565' 
                        }}
                     ></div>
                   </div>
                   <span className="font-bold text-gray-800 w-10 text-right">{Math.round(scores[cat])}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center print:hidden">
        <button 
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          PDF 저장 / 인쇄
        </button>
        <button 
          onClick={handleEmail}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2F4F4F] text-white rounded-lg hover:bg-[#264040] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          이메일로 결과 받기
        </button>
        <button 
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};


// ------------------- Main Component -------------------

export const Diagnosis: React.FC<DiagnosisProps> = ({ onBack }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'info' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [userInfo, setUserInfo] = useState<any>(null);

  // Helper to scroll top on change
  const scrollTop = () => window.scrollTo(0, 0);

  const calculateScores = useMemo(() => {
    const scores: Record<Category, number> = {
      LABOR: 0,
      SAFETY: 0,
      HUMAN_RIGHTS: 0,
      SUPPLY_CHAIN: 0,
      ENV: 0,
    };
    const counts: Record<Category, number> = {
      LABOR: 0,
      SAFETY: 0,
      HUMAN_RIGHTS: 0,
      SUPPLY_CHAIN: 0,
      ENV: 0,
    };

    QUESTIONS.forEach(q => {
      if (answers[q.id] !== undefined) {
        scores[q.category] += answers[q.id];
        counts[q.category] += 1;
      }
    });

    // Normalize to 100 scale
    // Max score per question is 10.
    (Object.keys(scores) as Category[]).forEach(cat => {
      if (counts[cat] > 0) {
        scores[cat] = (scores[cat] / (counts[cat] * 10)) * 100;
      }
    });

    return scores;
  }, [answers]);

  const handleStart = () => {
    setStep('quiz');
    scrollTop();
  };

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIndex].id]: score }));
    
    // Slight delay for better UX
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        scrollTop();
      } else {
        setStep('info');
        scrollTop();
      }
    }, 250);
  };

  const handleInfoSubmit = (data: any) => {
    setUserInfo(data);
    
    // Simulate Data Capture to DB
    const finalScores = calculateScores;
    console.log('------- Data Capture (Mock DB) -------');
    console.log('Company Info:', data);
    console.log('Answers:', answers);
    console.log('Calculated Scores:', finalScores);
    console.log('--------------------------------------');

    setStep('result');
    scrollTop();
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        {step !== 'intro' && step !== 'result' && (
           <div className="mb-6">
              <button onClick={onBack} className="text-gray-500 hover:text-[#2F4F4F] flex items-center gap-1 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                메인으로 나가기
              </button>
           </div>
        )}

        {step === 'intro' && <IntroStep onNext={handleStart} />}
        
        {step === 'quiz' && (
          <QuestionStep 
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            question={QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            answers={answers}
          />
        )}

        {step === 'info' && <UserInfoForm onSubmit={handleInfoSubmit} />}

        {step === 'result' && userInfo && (
          <ResultStep scores={calculateScores} userInfo={userInfo} onReset={onBack} />
        )}
      </div>
    </div>
  );
};