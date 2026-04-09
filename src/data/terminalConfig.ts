import type { BulletColor, MenuCommand } from "@/types/terminal";

// Animation timing constants (all in ms)
export const ANIMATION_SPEED = 118;
export const HERO_STEP_DELAY = 648;
export const ASCII_LINE_DELAY = 91;

// Application deadline: February 19, 2026, 23:59:59 KST
export const DEADLINE = new Date("2026-02-19T23:59:59+09:00").getTime();

// Contact info
export const CONTACT_EMAIL = "vibelabs@hashed.com";
export const FOUNDER_EMAIL = "simon@hashed.com";

// Section flow order
export const SECTION_ORDER = ["about", "who", "program", "timeline", "fellows", "faq", "hashed", "apply"];

// Loading spinner frames (braille pattern)
export const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

// Bullet color map
export const BULLET_COLORS: Record<BulletColor, string> = {
  green: "#4ade80",
  blue: "#60a5fa",
  yellow: "#fbbf24",
  orange: "var(--accent-orange)",
  gray: "#777",
  cyan: "#22d3ee",
};

// Menu commands
export const MENU_COMMANDS: MenuCommand[] = [
  { id: "clear", command: "[0] /home", label: "Back to Home", labelKo: "처음으로" },
  { id: "about", command: "[1] /about", label: "What is Vibe Labs", labelKo: "Vibe Labs 소개" },
  { id: "who", command: "[2] /who", label: "Who Should Apply", labelKo: "지원 대상" },
  { id: "program", command: "[3] /program", label: "Program Structure", labelKo: "프로그램 구조" },
  { id: "timeline", command: "[4] /timeline", label: "Timeline", labelKo: "일정" },
  { id: "fellows", command: "[5] /fellows", label: "Fellows", labelKo: "펠로우" },
  { id: "faq", command: "[6] /faq", label: "FAQ", labelKo: "자주 묻는 질문" },
  { id: "hashed", command: "[7] /hashed", label: "About Hashed", labelKo: "Hashed 소개" },
  { id: "apply", command: "[8] /apply", label: "Apply Now", labelKo: "지원하기" },
  { id: "lang", command: "[9] /lang", label: "한국어로 변경", labelKo: "Switch to English" },
];

// Loading messages for each section
export const LOADING_MESSAGES: Record<string, { ko: string[]; en: string[] }> = {
  home: {
    ko: ["홈 데이터 로딩 중...", "환영 메시지 준비 중...", "완료!"],
    en: ["Loading home data...", "Preparing welcome message...", "Done!"],
  },
  about: {
    ko: ["데이터 로딩 중...", "Vibe Labs 정보 불러오는 중...", "완료!"],
    en: ["Loading data...", "Fetching Vibe Labs info...", "Done!"],
  },
  who: {
    ko: ["지원 자격 확인 중...", "평가 기준 로딩 중...", "완료!"],
    en: ["Checking eligibility...", "Loading criteria...", "Done!"],
  },
  program: {
    ko: ["프로그램 구조 분석 중...", "일정 데이터 로딩 중...", "완료!"],
    en: ["Analyzing program structure...", "Loading schedule data...", "Done!"],
  },
  timeline: {
    ko: ["타임라인 생성 중...", "일정 동기화 중...", "완료!"],
    en: ["Generating timeline...", "Syncing schedule...", "Done!"],
  },
  hashed: {
    ko: ["Hashed 포트폴리오 로딩 중...", "네트워크 데이터 수집 중...", "완료!"],
    en: ["Loading Hashed portfolio...", "Gathering network data...", "Done!"],
  },
  fellows: {
    ko: ["펠로우 명단 로딩 중...", "프로필 데이터 수집 중...", "완료!"],
    en: ["Loading fellows list...", "Gathering profile data...", "Done!"],
  },
  faq: {
    ko: ["FAQ 로딩 중...", "자주 묻는 질문 정리 중...", "완료!"],
    en: ["Loading FAQ...", "Organizing common questions...", "Done!"],
  },
  apply: {
    ko: ["지원서 양식 준비 중...", "투자 조건 확인 중...", "완료!"],
    en: ["Preparing application form...", "Verifying investment terms...", "Done!"],
  },
};
