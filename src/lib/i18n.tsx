"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "ko" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Detect browser/OS language
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "ko";

  // navigator.languages contains all preferred languages in order of preference
  // This typically reflects OS language settings
  const languages = navigator.languages || [navigator.language || (navigator as { userLanguage?: string }).userLanguage || ""];

  // Check if any of the preferred languages is Korean
  for (const lang of languages) {
    if (lang.toLowerCase().startsWith("ko")) {
      return "ko";
    }
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ko");
  const [isInitialized, setIsInitialized] = useState(false);

  // Detect browser language on mount
  useEffect(() => {
    if (!isInitialized) {
      const detectedLang = detectBrowserLanguage();
      setLanguage(detectedLang);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

const translations: Record<Language, Record<string, unknown>> = {
  ko: {
    nav: {
      apply: "지원하기",
    },
    hero: {
      presents: "Hashed Presents",
      title: "Vibe Camp",
      subtitle: "AI-Native 파운더 조기 선발 시스템",
      deadline: "지원 마감",
      applyNow: "지원하기",
      learnMore: "자세히 보기",
      scrollToEnter: "스크롤하여 시작",
      weeks: "주간 프로그램",
      founders: "선발 파운더",
      investment: "팀당 투자금",
    },
    whatIs: {
      title: "Vibe Camp란 무엇인가요?",
      notAccelerator: "Hashed Vibe Camp는 기존의 교육 프로그램이나 일반적인 스타트업 액셀러레이터와는 완전히 다른 방식으로 운영됩니다. 우리는 강의나 커리큘럼을 제공하지 않으며, 정해진 과제를 부여하지도 않습니다.",
      description: "Vibe Camp는 AI를 활용해 기존 스타트업의 전통적인 J-curve 성장 곡선과는 다른 방식으로 빠르게 제품을 만들고 시장에 검증받는 'AI-native 파운더'를 매우 이른 단계에서 발견하고, 투자하며, 그들의 초기 여정을 가까이에서 지켜보고 지원하는 조기 선발 시스템입니다.",
      observe: "우리는 아이디어를 듣고 판단하지 않습니다. 아이디어의 크기나 시장 설명의 완성도보다는,",
      observeHighlight: "이미 만들고 있는 것의 속도, 반복 주기, 그리고 실제 결과물을 직접 관찰합니다.",
      notPitchDeck: "Pitch deck 중심의 평가",
      yesUrl: "URL, 실제 제품, 사용자 반응, 반복 로그 중심의 평가",
    },
    whyNow: {
      title: "왜 지금인가요?",
      subtitle: "AI의 등장으로 창업의 기본 순서가 근본적으로 바뀌었습니다.",
      past: "과거의 방식",
      now: "지금의 방식",
      pastFlow: "아이디어 → 팀 구성 → 투자 유치 → 제품 개발",
      nowFlow: "먼저 만들기 → 배포 → 학습 → 결정",
      description: "과거에는 투자금과 팀을 먼저 갖춰야 제품을 만들 수 있었습니다. 하지만 지금은 다릅니다. AI를 co-builder이자 agent로 활용하면, 개인이나 2-3명의 소규모 팀도 불과 며칠 만에 글로벌 수준의 제품을 프로토타이핑하고 시장에 배포할 수 있게 되었습니다.",
      keyMessage: "이러한 환경에서 가장 중요한 것은 \"무엇을 말하느냐\"가 아니라,",
      keyMessageHighlight: "\"얼마나 빠르게 만들고, 얼마나 자주 반복하느냐\"",
      keyMessageEnd: "입니다.",
      designed: "Hashed Vibe Camp는 바로 이 변화를 전제로 설계되었습니다. 우리는 설명을 잘하는 사람보다, 이미 움직이고 있는 사람을 찾습니다.",
    },
    whoShould: {
      title: "누가 지원해야 하나요?",
      idealTitle: "이런 분들에게 적합합니다",
      notIdealTitle: "이런 분들에게는 적합하지 않습니다",
      ideal1: "개인 창업자이거나 3인 이하의 소규모 팀으로 움직이고 있는 분",
      ideal2: "AI를 단순한 도구가 아닌, 함께 제품을 만드는 co-builder 또는 자율적인 agent로 활용하고 있는 분",
      ideal3: "이미 무언가를 만들고 있거나, 아이디어가 있다면 매우 짧은 시간 안에 직접 만들어낼 수 있는 실행력을 가진 분",
      ideal4: "긴 설명이나 발표보다 실제 결과물로 자신을 증명하는 것을 선호하는 분",
      notIdeal1: "아직 아이디어 단계에 머물러 있으며, 우선 설명과 설득을 통해 시작하고 싶은 분",
      notIdeal2: "체계적인 커리큘럼, 강의, 멘토링을 주된 목적으로 기대하시는 분",
      notIdeal3: "정해진 과제와 명확한 트랙을 따라가는 것을 선호하시는 분",
    },
    howStructured: {
      title: "프로그램은 어떻게 구성되나요?",
      subtitle: "Vibe Camp Seoul은 단순한 일회성 행사나 단기 부트캠프가 아닙니다. 처음부터 투자를 전제로 설계된 파운더 조기 선발 시스템입니다.",
      twoStages: "프로그램은 다음 두 단계로 구성됩니다:",
      stage1Title: "오프라인 엔트리 세션 (서울)",
      stage1Subtitle: "Meetup",
      stage1Desc1: "이 세션은 Vibe Camp Seoul의 본 프로그램이 아닙니다.",
      stage1Desc2: "잠재적인 지원자들을 한자리에 모아 Hashed 팀과 직접 만나고, 프로그램에 대해 더 깊이 이해할 수 있는 오프라인 밋업 형태의 네트워킹 행사입니다.",
      stage2Title: "Vibe Camp Seoul 본 프로그램",
      stage2Subtitle: "Core Program",
      stage2Desc1: "엄격한 심사를 거쳐 최종 선발된 3–5개 팀만을 대상으로 진행되는 핵심 프로그램입니다.",
      stage2Desc2: "선발되는 순간 Hashed로부터 직접 투자가 집행되며, 이후 약 8주 동안 각 팀의 빌드 과정과 반복 주기를 밀도 있게 관찰하고 필요한 지원을 제공합니다.",
      stage2Desc3: "형식적인 보고나 정기 미팅보다는, 실제 진척과 필요에 따라 유연하게 소통하는 Async 중심의 운영 방식을 취합니다.",
    },
    howEvaluate: {
      title: "어떻게 평가하나요?",
      notFocus: "우리는 다음과 같은 요소들에만 집중하지 않습니다:",
      notFocus1: "아이디어의 크기나 야심찬 비전",
      notFocus2: "시장 분석의 완성도나 사업 계획서의 정교함",
      observe: "대신, 우리는 다음을 직접 관찰합니다:",
      observe1: "실제로 얼마나 빠르게 만들고 있는가 (빌드 속도)",
      observe2: "얼마나 자주 새로운 버전을 내놓는가 (반복 빈도)",
      observe3: "문제를 발견하고 해결하는 루프가 얼마나 촘촘한가",
      observe4: "AI를 어느 깊이까지, 어떤 구조로 활용하고 있는가",
      observe5: "제품을 배포한 후 실제 반응에 어떻게 대응하는가",
      coreQuestion: "핵심 기준은 매우 단순합니다:",
      coreQuestionHighlight: "\"이 사람은 이미 움직이고 있는가?\"",
    },
    timeline: {
      title: "프로그램 일정",
      subtitle: "Seoul Edition",
      phase1Date: "1월 30일",
      phase1Title: "오프라인 엔트리 세션 (서울)",
      phase1Desc: "잠재 지원자들을 위한 네트워킹 밋업",
      phase1Note: "본 프로그램과는 별도이며, 선발이나 투자와 직접 연결되지 않습니다",
      phase2Date: "2월 1일 – 19일",
      phase2Title: "지원서 접수 기간",
      phase2Desc: "공식 지원서 접수",
      phase2Note: "장문의 서술형 질문 없이 간결하게 제출할 수 있습니다",
      phase3Date: "2월 27일",
      phase3Title: "최종 선발 팀 발표",
      phase3Desc: "본 프로그램 참여 팀 발표",
      phase3Note: "발표와 동시에 투자가 집행됩니다",
      phase4Date: "3월 – 4월",
      phase4Title: "Vibe Camp Seoul 본 프로그램",
      phase4Desc: "투자 기반 집중 프로그램 (약 8주)",
      phase4Note: "빌드 → 배포 → 반복, 비동기 중심 운영",
    },
    investment: {
      title: "투자 구조",
      teams: "3–5개",
      teamsLabel: "팀",
      teamsDesc: "총 선발 팀 수",
      amount: "최대 2억 원",
      amountLabel: "팀당 투자 금액",
      amountDesc: "각 팀에게 제공되는 투자 규모",
      type: "직접 투자",
      typeLabel: "투자 방식",
      typeDesc: "Hashed가 직접 투자합니다",
      keyMessage: "선발 = 투자 집행",
      footer: "Vibe Camp Seoul은 처음부터 투자를 전제로 설계된 프로그램입니다. 선발된 팀은 발표 즉시 투자를 받게 되며, 별도의 추가 심사 과정이 없습니다.",
    },
    whyHashed: {
      title: "왜 Hashed인가요?",
      intro: "Hashed는 Web3, AI, 디지털 자산 등 기술 변화의 가장 초기 국면에서 유망한 팀을 발굴하고 투자해온 글로벌 투자사입니다. 단순히 트렌드를 따르는 것이 아니라, 기술 변화의 신호를 먼저 읽고 그 신호를 만들어가는 팀과 함께해왔습니다.",
      approach: "Vibe Camp는 Hashed가 오랜 기간에 걸쳐 축적해온 \"초기 신호를 읽는 방식\"을 체계화하고, 이를 실제 투자 집행이 가능한 구조로 정리한 새로운 시도입니다.",
      providesTitle: "Hashed가 제공하는 것",
      providesIntro: "Vibe Camp Seoul을 통해 Hashed가 제공하는 것은 일반적인 멘토링 프로그램이나 네트워킹 행사와는 본질적으로 다릅니다.",
      provide1Title: "초기 단계에서의 실제 투자 경험",
      provide1Desc1: "Hashed는 아이디어와 프로토타입 수준의 매우 초기 단계 팀에 직접 투자해온 풍부한 경험을 보유하고 있습니다.",
      provide1Desc2: "제품과 팀이 빠르게 변화하는 불확실한 구간에서의 의사결정에 능숙하며, 그 과정을 함께 할 준비가 되어 있습니다.",
      provide2Title: "글로벌 네트워크에 대한 접근",
      provide2Desc1: "한국에서 시작했지만, 현재 아시아, 중동, 미국을 연결하는 광범위한 글로벌 투자 및 창업 네트워크를 구축하고 있습니다.",
      provide2Desc2: "후속 투자 유치, 전략적 파트너십 구축, 새로운 시장 진출과 관련하여 실질적이고 즉각적인 연결을 제공할 수 있습니다.",
      provide3Title: "새로운 유형의 팀에 대한 이해",
      provide3Desc1: "전통적인 조직 구조나 예측 가능한 성장 경로를 따르지 않는 비정형적인 팀들.",
      provide3Desc2: "소규모이지만 밀도 높고, 매우 빠른 반복 주기로 움직이는 팀들.",
      provide3Desc3: "Hashed는 이러한 새로운 유형의 팀들과 함께 일해온 경험을 바탕으로 그들의 잠재력을 정확하게 판단할 수 있습니다.",
      provide4Title: "Hashed 포트폴리오에게 제공되는 추가 지원",
      provide4Desc1: "후속 투자 라운드에 대한 논의 및 적합한 투자자 연결",
      provide4Desc2: "외부 파트너사 및 미디어 노출 기회 제공",
      provide4Desc3: "각 팀의 상황과 필요에 맞춘 1:1 전략적 논의",
      note: "※ 모든 지원은 각 팀의 실제 진척 상황과 구체적인 필요에 따라 유연하게 이루어집니다.",
    },
    apply: {
      title: "지원 방법",
      target: "지원 대상",
      targetDesc: "개인 창업자 또는 3인 이하의 팀이 지원할 수 있습니다.",
      submission: "제출물",
      submission1: "현재 만들고 있는 것의 URL, 데모, 또는 GitHub 저장소 등",
      submission2: "본인 또는 팀에 대한 간단한 배경 설명",
      deadline: "지원 마감일",
      deadlineDate: "2월 19일 (목)",
      noEssay: "장문의 서술형 질문이 없습니다. 핵심만 간결하게 보여주세요.",
      applyButton: "지원하기",
    },
    footer: {
      tagline: "기술의 미래에 투자합니다",
      copyright: "© 2025 Hashed",
    },
    common: {
      days: "일",
      hours: "시간",
      minutes: "분",
      seconds: "초",
    },
  },
  en: {
    nav: {
      apply: "Apply",
    },
    hero: {
      presents: "Hashed Presents",
      title: "Vibe Camp",
      subtitle: "AI-Native Founder Early Selection System",
      deadline: "Application Deadline",
      applyNow: "Apply Now",
      learnMore: "Learn More",
      scrollToEnter: "Scroll to begin",
      weeks: "Week Program",
      founders: "Selected Founders",
      investment: "Investment/Team",
    },
    whatIs: {
      title: "What is Vibe Camp?",
      notAccelerator: "Hashed Vibe Camp operates in a completely different way from traditional education programs or typical startup accelerators. We don't provide lectures or curricula, and we don't assign predetermined tasks.",
      description: "Vibe Camp is an early selection system designed to discover 'AI-native founders' at a very early stage—those who build products rapidly and validate them in the market using AI in ways that differ from the traditional startup J-curve growth pattern. We invest in them and closely observe and support their early journey.",
      observe: "We don't judge by listening to ideas. Rather than the size of an idea or the completeness of market analysis,",
      observeHighlight: "we directly observe the speed of what you're already building, your iteration cycles, and your actual results.",
      notPitchDeck: "Pitch deck-centric evaluation",
      yesUrl: "Evaluation focused on URL, actual product, user feedback, and iteration logs",
    },
    whyNow: {
      title: "Why Now?",
      subtitle: "The emergence of AI has fundamentally changed the basic order of starting a company.",
      past: "The Old Way",
      now: "The New Way",
      pastFlow: "Idea → Build Team → Raise Funds → Build Product",
      nowFlow: "Build First → Deploy → Learn → Decide",
      description: "In the past, you needed investment and a team before you could build a product. But things are different now. By using AI as a co-builder and agent, individuals or small teams of 2-3 people can prototype global-quality products and deploy them to market in just a few days.",
      keyMessage: "In this environment, what matters most is not \"what you say\" but",
      keyMessageHighlight: "\"how fast you build and how often you iterate.\"",
      keyMessageEnd: "",
      designed: "Hashed Vibe Camp is designed with precisely this shift in mind. We're looking for people who are already moving, not those who explain well.",
    },
    whoShould: {
      title: "Who Should Apply?",
      idealTitle: "This is a good fit for you if",
      notIdealTitle: "This may not be the right fit if",
      ideal1: "You are a solo founder or part of a small team of 3 or fewer people",
      ideal2: "You use AI not just as a simple tool, but as a co-builder or autonomous agent that helps you create products",
      ideal3: "You are already building something, or if you have an idea, you have the execution ability to build it yourself in a very short time",
      ideal4: "You prefer proving yourself through actual results rather than lengthy explanations or presentations",
      notIdeal1: "You are still at the idea stage and want to start through explanation and persuasion first",
      notIdeal2: "You are primarily expecting structured curricula, lectures, and mentoring as the main purpose",
      notIdeal3: "You prefer following predetermined assignments and clear tracks",
    },
    howStructured: {
      title: "How is the program structured?",
      subtitle: "Vibe Camp Seoul is not a simple one-time event or short-term bootcamp. It is a founder early selection system designed from the start with investment in mind.",
      twoStages: "The program consists of two stages:",
      stage1Title: "Offline Entry Session (Seoul)",
      stage1Subtitle: "Meetup",
      stage1Desc1: "This session is not the main Vibe Camp Seoul program.",
      stage1Desc2: "It is a networking event in the form of an offline meetup where potential applicants gather to meet the Hashed team directly and gain a deeper understanding of the program.",
      stage2Title: "Vibe Camp Seoul Main Program",
      stage2Subtitle: "Core Program",
      stage2Desc1: "This is the core program conducted only for the 3-5 teams selected through rigorous screening.",
      stage2Desc2: "The moment you are selected, investment is executed directly from Hashed, and for approximately 8 weeks thereafter, we closely observe each team's build process and iteration cycles while providing necessary support.",
      stage2Desc3: "Rather than formal reports or regular meetings, we take an async-centric operating approach that communicates flexibly based on actual progress and needs.",
    },
    howEvaluate: {
      title: "How do we evaluate?",
      notFocus: "We don't focus solely on these factors:",
      notFocus1: "The size of your idea or ambitious vision",
      notFocus2: "The completeness of market analysis or sophistication of business plans",
      observe: "Instead, we directly observe the following:",
      observe1: "How fast you are actually building (build velocity)",
      observe2: "How frequently you release new versions (iteration frequency)",
      observe3: "How tight your problem-discovery and solution loops are",
      observe4: "How deeply and structurally you are utilizing AI",
      observe5: "How you respond to actual feedback after deploying your product",
      coreQuestion: "The core criterion is very simple:",
      coreQuestionHighlight: "\"Is this person already moving?\"",
    },
    timeline: {
      title: "Program Timeline",
      subtitle: "Seoul Edition",
      phase1Date: "January 30",
      phase1Title: "Offline Entry Session (Seoul)",
      phase1Desc: "Networking meetup for potential applicants",
      phase1Note: "Separate from the main program; not directly connected to selection or investment",
      phase2Date: "February 1 – 19",
      phase2Title: "Application Period",
      phase2Desc: "Official application submission period",
      phase2Note: "You can submit concisely without lengthy essay questions",
      phase3Date: "February 27",
      phase3Title: "Final Team Announcement",
      phase3Desc: "Announcement of teams participating in the main program",
      phase3Note: "Investment is executed simultaneously with the announcement",
      phase4Date: "March – April",
      phase4Title: "Vibe Camp Seoul Main Program",
      phase4Desc: "Investment-based intensive program (~8 weeks)",
      phase4Note: "Build → Deploy → Iterate, Async-centric operation",
    },
    investment: {
      title: "Investment Structure",
      teams: "3–5",
      teamsLabel: "Teams",
      teamsDesc: "Total number of teams selected",
      amount: "Up to 200M KRW",
      amountLabel: "Investment per team",
      amountDesc: "Investment amount provided to each team",
      type: "Direct Investment",
      typeLabel: "Investment method",
      typeDesc: "Hashed invests directly",
      keyMessage: "Selection = Investment Execution",
      footer: "Vibe Camp Seoul is a program designed from the start with investment in mind. Selected teams receive investment immediately upon announcement, with no additional screening process.",
    },
    whyHashed: {
      title: "Why Hashed?",
      intro: "Hashed is a global investment firm that has been discovering and investing in promising teams at the earliest stages of technological change, including Web3, AI, and digital assets. Rather than simply following trends, we have partnered with teams that read the signals of technological change first and help create those signals.",
      approach: "Vibe Camp is a new initiative that systematizes Hashed's long-accumulated method of 'reading early signals' and organizes it into a structure where actual investment execution is possible.",
      providesTitle: "What Hashed Provides",
      providesIntro: "What Hashed provides through Vibe Camp Seoul is fundamentally different from typical mentoring programs or networking events.",
      provide1Title: "Real investment experience at the early stage",
      provide1Desc1: "Hashed has extensive experience directly investing in very early-stage teams at the idea and prototype level.",
      provide1Desc2: "We are skilled at making decisions during uncertain periods when products and teams are rapidly changing, and we are prepared to go through that process together.",
      provide2Title: "Access to a global network",
      provide2Desc1: "Starting in Korea, we have built an extensive global investment and startup network connecting Asia, the Middle East, and the United States.",
      provide2Desc2: "We can provide practical and immediate connections for follow-on fundraising, building strategic partnerships, and entering new markets.",
      provide3Title: "Understanding of new types of teams",
      provide3Desc1: "Unconventional teams that don't follow traditional organizational structures or predictable growth paths.",
      provide3Desc2: "Teams that are small but dense, moving with very fast iteration cycles.",
      provide3Desc3: "Based on our experience working with these new types of teams, Hashed can accurately assess their potential.",
      provide4Title: "Additional support for Hashed portfolio companies",
      provide4Desc1: "Discussion and connection to suitable investors for follow-on funding rounds",
      provide4Desc2: "Providing opportunities for exposure to external partners and media",
      provide4Desc3: "1:1 strategic discussions tailored to each team's situation and needs",
      note: "※ All support is provided flexibly based on each team's actual progress and specific needs.",
    },
    apply: {
      title: "How to Apply",
      target: "Eligibility",
      targetDesc: "Solo founders or teams of 3 or fewer people can apply.",
      submission: "What to Submit",
      submission1: "URL, demo, or GitHub repository of what you're currently building",
      submission2: "A brief background description of yourself or your team",
      deadline: "Application Deadline",
      deadlineDate: "February 19 (Thu)",
      noEssay: "No lengthy essay questions. Just show us the essentials, concisely.",
      applyButton: "Apply Now",
    },
    footer: {
      tagline: "Investing in the future of technology",
      copyright: "© 2025 Hashed",
    },
    common: {
      days: "Days",
      hours: "Hrs",
      minutes: "Min",
      seconds: "Sec",
    },
  },
};
