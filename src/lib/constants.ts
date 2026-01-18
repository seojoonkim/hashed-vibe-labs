export const PROGRAM_DATA = {
  name: "Hashed Vibe Camp",
  subtitle: "AI-Native Founder Early Selection System",

  dates: {
    meetup: "2025-01-30",
    applicationStart: "2025-02-01",
    applicationEnd: "2025-02-19",
    finalistAnnouncement: "2025-02-27",
    programStart: "2025-03",
    programEnd: "2025-04",
  },

  investment: {
    teamsSelected: "3-5",
    amountPerTeam: "최대 2억 원",
    type: "직접 투자",
  },

  applyUrl: "#apply",
};

export const TIMELINE_ITEMS = [
  {
    date: "1.30",
    title: "Offline Entry Session",
    subtitle: "Seoul Meetup",
    description: "잠재 지원자 대상 오프라인 밋업",
    note: "본 프로그램과 별도, 선발/투자와 직결되지 않음",
  },
  {
    date: "2.1 - 2.19",
    title: "Application",
    subtitle: "공식 지원 접수",
    description: "URL, demo, repo 등 제출",
    note: "장문의 서술형 질문 없음",
  },
  {
    date: "2.27",
    title: "Finalist Announcement",
    subtitle: "팀 발표 + 투자 집행",
    description: "3-5팀 선발, 동시에 직접 투자 집행",
    note: "선발 = 투자",
  },
  {
    date: "3월 - 4월",
    title: "Vibe Camp Seoul",
    subtitle: "Core Program (8주)",
    description: "빌드 → 배포 → 반복",
    note: "Async 중심, 밀도 있는 관찰·지원",
  },
];

export const WHAT_WE_OBSERVE = [
  "실제 빌드 속도",
  "반복 빈도",
  "문제-해결 루프의 밀도",
  "AI 활용의 구조적 깊이",
  "배포 이후 반응에 대한 대응 방식",
];

export const WHAT_WE_DONT_FOCUS = [
  "아이디어의 크기",
  "시장 설명의 완성도",
  "Pitch deck",
];

export const IDEAL_APPLICANTS = [
  "개인 또는 3인 이하 팀",
  "AI를 co-builder / agent로 사용하는 창업자",
  "이미 무언가를 만들고 있거나, 매우 짧은 시간 안에 만들 수 있는 사람",
  "설명보다 실제 결과물로 자신을 증명하는 데 익숙한 사람",
];

export const NOT_IDEAL_APPLICANTS = [
  "아직 아이디어 단계이며, 설명과 설득이 우선인 경우",
  "커리큘럼·강의·멘토링을 주목적으로 기대하는 경우",
  "정해진 과제와 트랙을 선호하는 경우",
];

export const HASHED_PROVIDES = [
  {
    title: "초기 단계에서의 실제 투자 경험",
    description: "아주 초기 단계의 팀에 직접 투자해온 경험. 제품과 팀이 빠르게 변하는 구간에서의 의사결정에 익숙",
    icon: "seed",
  },
  {
    title: "글로벌 네트워크 접근",
    description: "아시아·중동·미국을 잇는 글로벌 투자 및 창업 네트워크. 후속 투자, 파트너십, 시장 진입 연결",
    icon: "globe",
  },
  {
    title: "비정형 팀에 대한 이해",
    description: "전통적인 조직 구조나 성장 경로를 따르지 않는 팀. 소규모, 고밀도, 빠른 반복을 전제로 움직이는 팀",
    icon: "unconventional",
  },
  {
    title: "포트폴리오 추가 지원",
    description: "후속 투자 논의 및 연결, 외부 파트너 및 미디어 노출 기회, 팀 상황에 맞춘 전략적 논의",
    icon: "network",
  },
];

export const GLOBAL_NODES = [
  { name: "Seoul", lat: 37.5665, lng: 126.978, primary: true },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
];
