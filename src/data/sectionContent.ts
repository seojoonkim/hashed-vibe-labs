import type { TerminalLine } from "@/types/terminal";
import {
  ABOUT_ASCII, WHO_ASCII, PROGRAM_ASCII, TIMELINE_ASCII,
  HASHED_SECTION_ASCII, APPLY_ASCII, FELLOWS_ASCII, FAQ_ASCII,
} from "@/data/asciiArt";
import { CONTACT_EMAIL } from "@/data/terminalConfig";

// Get section content as terminal lines
export function getSectionContent(sectionId: string, language: string): Omit<TerminalLine, "id">[] {
  const lines: Omit<TerminalLine, "id">[] = [];
  const isKo = language === "ko";

  switch (sectionId) {
    // ========== /about: Vibe Labs 소개 (What is + Why Now) ==========
    case "about":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat about.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      ABOUT_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "1-1. VIBE LABS란?" : "1-1. WHAT IS VIBE LABS?", bullet: true },
        { type: "blank", content: "" },
        // 단락 1: Vibe Labs 정의 - 핵심 가치 명확화
        { type: "success", content: isKo
          ? "AI를 동료로 쓰는 창업자에게, 자본보다 빠른 신뢰와 유통을 제공하는 8주 프로그램입니다."
          : "An 8-week program providing trust and distribution faster than capital to founders who use AI as a partner.", bullet: true },
        { type: "blank", content: "" },
        // 단락 2: 무엇을 하는가
        { type: "output", content: isKo
          ? "기존 스타트업의 완만한 성장 곡선과 달리, AI를 활용해 압축적으로 성장하는 파운더를 매우 이른 단계에서 발굴합니다."
          : "Unlike traditional startups' gradual growth curves, we discover founders who grow exponentially with AI at a very early stage.", bullet: true },
        { type: "output", content: isKo
          ? "확신이 서는 팀에는 즉시 투자하고, 약 8주간 밀도 높은 빌딩 과정을 함께합니다."
          : "We invest immediately in teams we believe in, and join them for ~8 weeks of intensive building." },
        { type: "blank", content: "" },
        // 단락 3: 핵심 요약
        { type: "info", content: isKo
          ? "한마디로, 투자를 전제로 설계된 조기 선발 시스템입니다."
          : "In short: an early selection system designed with investment in mind.", bullet: true },
        { type: "blank", content: "" },
        // 단락 4: 평가 방식
        { type: "output", content: isKo
          ? "피치덱보다 실제 움직임을 더 중요하게 봅니다. 지금 만들고 있는 제품, 반복의 속도, 그리고 실제 결과물에 관심이 있습니다."
          : "We value actual movement more than pitch decks. We're interested in products being built, iteration speed, and actual results.", bullet: true },
        { type: "blank", content: "" },
        // 단락 5: X vs O 비교 (각각 독립 항목)
        { type: "error", content: isKo
          ? "✕ Pitch deck, 시장 분석, 장기 로드맵"
          : "✕ Pitch deck, market analysis, long-term roadmap", bullet: true },
        { type: "success", content: isKo
          ? "○ 라이브 URL, 사용자 반응, 커밋 로그, 반복 주기"
          : "○ Live URL, user reactions, commit logs, iteration cycle", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Why Now? 섹션
        { type: "header", content: isKo ? "1-2. 왜 지금인가?" : "1-2. WHY NOW?", bullet: true },
        { type: "blank", content: "" },
        // 단락 1: 협곡의 소멸
        { type: "output", content: isKo
          ? "과거에는 아이디어와 구현 사이에 거대한 협곡이 있었습니다. 그 협곡을 건너려면 개발팀을 꾸리고, 자금을 조달하고, 몇 달을 기다려야 했습니다."
          : "In the past, there was a huge canyon between idea and implementation. Crossing it required building a dev team, raising funds, and waiting months.", bullet: true },
        { type: "blank", content: "" },
        { type: "success", content: isKo
          ? "지금 그 협곡이 사라지고 있습니다. 사실상 처음으로, 생각의 속도와 실행의 속도가 같아지고 있습니다."
          : "That canyon is disappearing. For the first time ever, the speed of thought and the speed of execution are becoming equal.", bullet: true },
        { type: "blank", content: "" },
        // 역삼각형 개념
        { type: "output", content: isKo
          ? "과거의 개발 인재상이 '깊은 기술적 구현력'을 기반으로 한 정삼각형(▲)이었다면, 바이브 코딩 시대의 인재는 '넓은 비즈니스 커버리지'를 가진 역삼각형(▼)입니다."
          : "If the past ideal developer was a triangle (▲) based on 'deep technical implementation', the vibe coding era demands an inverted triangle (▼) with 'wide business coverage'.", bullet: true },
        { type: "info", content: isKo
          ? "이제 깊이는 AI가, 넓이는 인간이 담당합니다."
          : "Now, AI handles depth, humans handle breadth." },
        { type: "blank", content: "" },
        // 과거 vs 지금 비교
        { type: "dim", content: isKo ? "과거:" : "Past:", bullet: true },
        { type: "error", content: isKo
          ? "MVP 출시까지 6개월, 시장 검증까지 1년. 대부분의 아이디어는 \"언젠가 개발팀이 생기면\"이라는 말과 함께 협곡 앞에서 죽었습니다."
          : "6 months to MVP, 1 year to market validation. Most ideas died at the canyon with \"someday when we have a dev team.\"" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo ? "지금:" : "Now:", bullet: true },
        { type: "success", content: isKo
          ? "머릿속에 떠오른 것을 오늘 저녁에 만들어서 내일 아침에 사용자에게 보여줄 수 있습니다."
          : "You can build what's in your head tonight and show it to users tomorrow morning." },
        { type: "blank", content: "" },
        // YC 사례
        { type: "output", content: isKo
          ? "Y Combinator 2025년 Winter 배치에서 25%의 스타트업이 코드베이스의 95%를 AI로 생성했습니다."
          : "In Y Combinator's 2025 Winter batch, 25% of startups generated 95% of their codebase with AI.", bullet: true },
        { type: "blank", content: "" },
        // YC CEO 인용
        { type: "dim", content: isKo
          ? "\"50명, 100명의 엔지니어 팀이 필요 없다. 적게 모금해도 되고, 자본이 훨씬 오래간다.\" — Garry Tan, YC CEO"
          : "\"You don't need teams of 50 or 100 engineers. You can raise less, and capital lasts much longer.\" — Garry Tan, YC CEO", bullet: true },
        { type: "blank", content: "" },
        // 핵심 메시지
        { type: "info", content: isKo
          ? "'아이디어에서 실체화까지의 거리'가 근본적으로 바뀌었습니다. 설득 전에 증명이 가능한 시대입니다."
          : "The distance from 'idea to realization' has fundamentally changed. It's an era where you can prove before you persuade.", bullet: true },
        { type: "blank", content: "" },
        // 김서준 대표 포스팅 링크
        { type: "dim", content: isKo
          ? "📖 Hashed가 Vibe Labs를 기획한 배경에 대한 김서준(Simon Kim) 대표의 포스팅"
          : "📖 Simon Kim's post on why Hashed launched Vibe Labs", bullet: true },
        { type: "link", content: isKo
          ? "→ 역삼각형 인재의 시대: 바이브 코딩이 창업과 투자의 문법을 바꾸다"
          : "→ How Vibe Coding Is Rewriting the Rules of Startups and Venture Capital",
          href: isKo
            ? "https://medium.com/hashed-kr/vibe-founders-64f178fe5497"
            : "https://medium.com/hashed-official/vibe-founders-6c15649b78d4" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 2026 Batch Schedule 섹션
        { type: "header", content: isKo ? "1-3. 2026 배치 일정" : "1-3. 2026 BATCH SCHEDULE", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "2026년에는 3개의 배치가 각 지역의 파트너 및 투자사들과 함께 진행됩니다."
          : "In 2026, three batches will run with local partners and investors." },
        { type: "blank", content: "" },
        // 배치 목록 (각각 독립 항목)
        { type: "success", content: isKo ? "1st Batch · 서울 Edition · 2026년 3월 3일 시작" : "1st Batch · Seoul Edition · March 3, 2026", bullet: true },
        { type: "info", content: isKo ? "2nd Batch · 싱가포르 Edition · 2026년 6월 (예정)" : "2nd Batch · Singapore Edition · June 2026 (TBD)", bullet: true },
        { type: "info", content: isKo ? "3rd Batch · 아부다비 Edition · 2026년 10월 (예정)" : "3rd Batch · Abu Dhabi Edition · October 2026 (TBD)", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Contributors 섹션
        { type: "header", content: isKo ? "1-4. 컨트리뷰터" : "1-4. CONTRIBUTORS", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "Vibe Labs는 다양한 분야의 전문가들이 함께 만들어갑니다."
          : "Vibe Labs is built with experts from diverse fields.", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "Meta, Kakao 출신 데이터 사이언티스트"
          : "Former data scientist at Meta and Kakao", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "이더리움 재단 전 기술 이사"
          : "Former technical director of Ethereum Foundation", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "국내 대표 생성형 엔진 최적화 기업 창업자"
          : "Founder of leading generative engine optimization in Korea", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "글로벌 팔로워를 보유한 디지털 자산 분석 플랫폼 창업자"
          : "Founder of leading digital asset analysis platform with a massive global following", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /who: 지원 대상 (Who Should Apply + Evaluation Criteria) ==========
    case "who":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat eligibility.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      WHO_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        // 2-1. 가치의 재편 섹션 (먼저)
        { type: "header", content: isKo ? "2-1. 가치의 재편" : "2-1. THE SHIFT IN VALUE", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "코드와 단순 유틸리티 서비스의 가치가 빠르게 낮아지고 있습니다. 이제 누구나 몇 시간 안에 'A를 B로 변환하는' 서비스를 만들 수 있게 되었습니다."
          : "The value of code and simple utility services is declining rapidly. Anyone can now build 'convert A to B' services in just hours.", bullet: true },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "반면, 극적으로 중요해지는 것들이 있습니다:"
          : "Meanwhile, some things are becoming dramatically important:", bullet: true },
        { type: "list-item", content: isKo
          ? "복제 불가능한 커뮤니티와 IP — 기술은 복제되지만 문화는 복제되지 않는다"
          : "Irreplaceable community and IP — tech can be forked, culture cannot", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "글로벌 비즈니스 네트워크 — 핵심 파트너를 설득하고, 유통 채널을 확보하는 능력"
          : "Global business network — ability to persuade partners, secure distribution", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "브랜드와 신뢰 — 제품은 복제할 수 있지만 신뢰는 복제할 수 없다"
          : "Brand and trust — products can be copied, but trust cannot", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "success", content: isKo
          ? "앞으로는 코드를 짜는 능력보다 사람을 움직이는 능력이 더 중요해질 것 같습니다."
          : "We believe the ability to move people will become more important than writing code.", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 2-2. 누가 지원해야 할까요?
        { type: "header", content: isKo ? "2-2. 누가 지원해야 할까요?" : "2-2. WHO SHOULD APPLY?", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "바이브 코딩 시대, 창업자의 역할이 달라지고 있다고 느낍니다. '작가'에서 '편집장' 혹은 '영화감독'에 가까워지고 있습니다."
          : "In the vibe coding era, we see the founder's role changing. Moving from 'writer' to something closer to 'editor-in-chief' or 'film director'.", bullet: true },
        { type: "output", content: isKo
          ? "AI가 쏟아내는 수많은 코드 조각 중에서, 우리 브랜드의 톤앤매너에 맞는 컷을 골라내고 연결하는 안목. 그런 안목이 점점 더 중요해지고 있습니다."
          : "From the countless code fragments AI produces, selecting and connecting cuts that match your brand's tone. That eye for quality is becoming increasingly important." },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "✓ 이런 분을 찾습니다:" : "✓ We're looking for:", bullet: true },
        { type: "list-item", content: isKo
          ? "1~3인의 소규모 팀 또는 솔로 빌더"
          : "Small teams of 1-3 or solo builders", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "AI를 보조 도구가 아닌 핵심 빌딩 파트너로 활용하는 사람"
          : "Those who use AI as a core building partner, not just a tool", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "지금 당장 보여줄 수 있는 무언가가 있는 사람 (URL, 프로토타입, 사용자)"
          : "Those with something to show now (URL, prototype, users)", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "무엇이 좋은지 아는 안목과, 도메인에 대한 깊은 이해를 가진 사람"
          : "Those with taste for quality and deep domain understanding", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "빠르게 만들고, 빠르게 고치고, 빠르게 배우는 반복 속도를 가진 사람"
          : "Those with fast iteration: build fast, fix fast, learn fast", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "사람을 움직일 수 있는 사람 — 설득하고, 협력을 이끌어내는 능력"
          : "Those who can move people — ability to persuade and drive collaboration", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "error", content: isKo ? "✕ 이런 경우는 맞지 않습니다:" : "✕ Not a good fit:", bullet: true },
        { type: "list-item", content: isKo
          ? "아직 아이디어 단계이며, 제품보다 설득이 우선인 경우"
          : "Still at idea stage, prioritizing persuasion over product", bulletColor: "orange" },
        { type: "list-item", content: isKo
          ? "강의, 커리큘럼, 체계적인 멘토링을 기대하는 경우"
          : "Expecting lectures, curriculum, or systematic mentoring", bulletColor: "orange" },
        { type: "list-item", content: isKo
          ? "정해진 과제와 마일스톤을 따라가고 싶은 경우"
          : "Wanting to follow set assignments and milestones", bulletColor: "orange" },
        { type: "list-item", content: isKo
          ? "투자 유치가 목표이고, 빌딩은 그 다음인 경우"
          : "When fundraising is the goal and building comes second", bulletColor: "orange" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 2-3. 평가 기준
        { type: "header", content: isKo ? "2-3. 평가 기준" : "2-3. EVALUATION CRITERIA", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "기존 투자 심사 방식과 조금 다른 관점으로 팀을 보려고 합니다. 완성된 사업 계획서나 시장 분석도 의미가 있지만, 지금 이 순간 어떻게 움직이고 있는지에 더 집중하려 합니다."
          : "We try to look at teams from a slightly different perspective than traditional investment. Completed business plans and market analysis have their place, but we're more focused on how you're moving right now.", bullet: true },
        { type: "blank", content: "" },
        { type: "error", content: isKo ? "크게 보지 않는 것:" : "What we don't focus on:", bullet: true },
        { type: "list-item", content: isKo ? "아이디어의 크기나 참신함" : "Size or novelty of the idea", bulletColor: "orange" },
        { type: "list-item", content: isKo ? "시장 규모 설명의 완성도" : "Completeness of market size explanation", bulletColor: "orange" },
        { type: "list-item", content: isKo ? "화려한 경력이나 학력" : "Impressive careers or education", bulletColor: "orange" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "집중해서 보는 것:" : "What we focus on:", bullet: true },
        { type: "list-item", content: isKo
          ? "빌드 속도 — 아이디어가 얼마나 빠르게 제품이 되는가"
          : "Build speed — how fast ideas become products", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "반복 주기 — 피드백 → 수정 → 배포 사이클의 밀도"
          : "Iteration cycle — density of feedback → fix → deploy", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "문제 해결 방식 — 막힐 때 어떻게 돌파하는가"
          : "Problem solving — how you break through blockers", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "AI 활용 깊이 — AI를 워크플로우에 얼마나 깊이 통합했는가"
          : "AI usage depth — how deeply AI is integrated in workflow", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "사용자 대응 — 실제 사용자 반응에 어떻게 대응하는가"
          : "User response — how you respond to real user feedback", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "결국 핵심 질문은 하나입니다:"
          : "Ultimately, the core question is just one:", bullet: true },
        { type: "success", content: isKo
          ? "\"지금, 이미 움직이고 있는가?\""
          : "\"Are they already moving, right now?\"" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /program: 프로그램 구조 ==========
    case "program":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat program.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      PROGRAM_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "3-1. 프로그램 구조" : "3-1. PROGRAM STRUCTURE", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "일회성 행사나 강의 중심 프로그램과는 다른 방식을 시도합니다. 선발과 동시에 투자가 집행되는 실전 빌딩 프로그램입니다."
          : "We're trying a different approach from one-time events or lecture-based programs. A real building program where investment is executed upon selection.", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Phase 1
        { type: "info", content: "Phase 1: Offline Entry Session", bullet: true },
        { type: "dim", content: "Meetup · 2026.01.30(금)" },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "본 프로그램 시작 전 잠재 지원자들이 모이는 네트워킹 밋업"
          : "A networking meetup for potential applicants before the main program", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "Hashed 팀과 직접 만나고, 다른 빌더들과 교류"
          : "Meet the Hashed team directly and network with other builders", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "※ 밋업 참여가 선발에 직접적인 영향을 주지는 않습니다."
          : "※ Meetup participation does not directly affect selection." },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Phase 2
        { type: "info", content: "Phase 2: Vibe Labs Seoul", bullet: true },
        { type: "dim", content: isKo ? "Core Program · 약 8주" : "Core Program · ~8 weeks" },
        { type: "blank", content: "" },

        // 선발과 동시에 투자
        { type: "success", content: isKo ? "선발과 동시에 투자" : "Investment Upon Selection", bullet: true },
        { type: "list-item", content: isKo
          ? "5% 지분에 1억원 투자, 선발 발표 즉시 집행"
          : "₩100M investment for 5% equity, executed immediately upon selection", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "복잡한 협상 없이 동일한 조건으로 시작"
          : "Start with identical terms, no complex negotiations", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "투자금은 제품 개발과 실험에 자유롭게 사용"
          : "Use investment freely for product development and experimentation", bulletColor: "green" },
        { type: "blank", content: "" },

        // 상시 연결된 빌더 커뮤니티
        { type: "success", content: isKo ? "상시 연결된 빌더 커뮤니티" : "Always-Connected Builder Community", bullet: true },
        { type: "list-item", content: isKo
          ? "온라인으로 상시 교류하는 빌더 네트워크"
          : "Builder network with constant online communication", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "서로의 진행 상황을 실시간으로 공유"
          : "Share progress with each other in real-time", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "막힐 때 바로 도움받을 수 있는 환경"
          : "Environment where you can get help immediately when stuck", bulletColor: "green" },
        { type: "blank", content: "" },

        // 매주 밀도 있는 세션
        { type: "success", content: isKo ? "매주 밀도 있는 세션" : "Weekly High-Density Sessions", bullet: true },
        { type: "list-item", content: isKo
          ? "주 1회 Go-To-Market 전략 멘토링"
          : "Weekly Go-To-Market strategy mentoring", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "업계 최고 수준의 바이브 코더로부터 기술 코칭"
          : "Technical coaching from top-tier vibe coders", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "배치 내 상호 피드백 및 학습 교류 세션"
          : "Peer feedback and learning sessions within the batch", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "다양한 관점에서 통찰과 자극을 받는 환경"
          : "Environment for insights and inspiration from diverse perspectives", bulletColor: "green" },
        { type: "blank", content: "" },

        // Hashed의 관찰과 지원
        { type: "success", content: isKo ? "Hashed의 관찰과 지원" : "Hashed's Observation & Support", bullet: true },
        { type: "list-item", content: isKo
          ? "팀의 빌드 속도와 제품 진화를 밀도 있게 관찰"
          : "Closely observe team's build speed and product evolution", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "필요한 순간에 네트워크와 리소스를 연결"
          : "Connect network and resources when needed", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "강제적인 보고 의무나 불필요한 간섭 없음"
          : "No mandatory reporting or unnecessary interference", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Phase 3
        { type: "info", content: "Phase 3: Demo Day & Beyond", bullet: true },
        { type: "dim", content: isKo ? "8주 후" : "After 8 weeks" },
        { type: "blank", content: "" },

        // 데모데이
        { type: "success", content: isKo ? "데모데이" : "Demo Day", bullet: true },
        { type: "list-item", content: isKo
          ? "피치덱이 아니라 대시보드로 이야기합니다. 50+ VC 앞에서 숫자로 피칭합니다."
          : "Pitch with dashboards, not decks. Present with numbers in front of 50+ VCs.", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "8주간의 ARR 성장 그래프를 공개"
          : "Reveal your 8-week ARR growth graph", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "Hashed LP 네트워크 내 50+ 유관 기업 중 사업 연계 가능한 파트너에 선별 연결"
          : "Selective connection to business partners from 50+ companies in Hashed LP network", bulletColor: "yellow" },
        { type: "blank", content: "" },

        // 지속적인 관계
        { type: "success", content: isKo ? "지속적인 관계" : "Ongoing Relationship", bullet: true },
        { type: "list-item", content: isKo
          ? "Hashed 포트폴리오 네트워크 영구 합류"
          : "Permanent access to Hashed portfolio network", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "후속 배치 창업자들과의 커뮤니티"
          : "Community with founders from subsequent batches", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "글로벌 확장 시 각 지역 파트너 연결"
          : "Regional partner connections for global expansion", bulletColor: "yellow" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 우리가 제공하지 않는 것
        { type: "header", content: isKo ? "우리가 제공하지 않는 것" : "WHAT WE DON'T OFFER", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "정해진 커리큘럼이나 강의"
          : "Fixed curriculum or lectures", bulletChar: "✗" },
        { type: "list-item", content: isKo
          ? "주간 보고서나 진행상황 발표 의무"
          : "Mandatory weekly reports or progress presentations", bulletChar: "✗" },
        { type: "list-item", content: isKo
          ? "\"피봇하세요\" 같은 간섭"
          : "Interference like \"you should pivot\"", bulletChar: "✗" },
        { type: "list-item", content: isKo
          ? "엑셀러레이터식 획일적 조건"
          : "Cookie-cutter accelerator terms", bulletChar: "✗" },
        { type: "blank", content: "" },

        // 우리가 제공하는 것
        { type: "header", content: isKo ? "우리가 제공하는 것" : "WHAT WE OFFER", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "선발 즉시 집행되는 1억원 투자"
          : "₩100M investment executed immediately upon selection", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "같은 속도로 달리는 동료들"
          : "Peers running at the same speed", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "매주 성장을 자극하는 멘토링과 코칭"
          : "Weekly mentoring and coaching that stimulates growth", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "필요할 때 연결되는 VC·기업 네트워크"
          : "VC and corporate network connected when needed", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 마무리 비전
        { type: "output", content: isKo
          ? "\"8주 후, 첫 수십억원 상당의 ARR의 확신을 갖고 졸업할 수 있도록 함께 최선을 다합시다.\""
          : "\"Let's do our best together so you graduate in 8 weeks with confidence in your first multi-billion KRW ARR.\"", bullet: true },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    // ========== /timeline: 일정 ==========
    case "timeline":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat timeline.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      TIMELINE_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "4-1. 프로그램 일정" : "4-1. PROGRAM TIMELINE", bullet: true },
        { type: "dim", content: isKo ? "Seoul Edition #1" : "Seoul Edition #1" },
        { type: "blank", content: "" },

        // 1. Offline Entry Session
        { type: "success", content: "1. Offline Entry Session", bullet: true },
        { type: "output", content: isKo ? "2026.01.30(금)" : "Jan 30, 2026 (Fri)" },
        { type: "list-item", content: isKo
          ? "잠재 지원자들이 참여하는 오프라인 밋업"
          : "Offline meetup for potential applicants", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "Hashed 팀과 직접 만나고, 다른 빌더들과 교류"
          : "Meet Hashed team and network with other builders", bulletColor: "blue" },
        { type: "dim", content: isKo
          ? "※ 밋업 참여가 선발에 직접적인 영향을 주지는 않습니다."
          : "※ Meetup participation does not directly affect selection." },
        { type: "blank", content: "" },

        // 2. Application
        { type: "success", content: "2. Application", bullet: true },
        { type: "output", content: isKo ? "2026.02.01(일) - 2026.02.19(목)" : "Feb 1 (Sun) – Feb 19 (Thu), 2026" },
        { type: "list-item", content: isKo
          ? "개인 또는 팀 단위 지원"
          : "Apply as individual or team", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "현재 만들고 있는 것 (URL, demo, repo 등)"
          : "What you're building (URL, demo, repo, etc.)", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "간단한 배경 설명"
          : "Brief background description", bulletColor: "blue" },
        { type: "info", content: isKo
          ? "✓ 장문의 서술형 질문 없음"
          : "✓ No long essay questions" },
        { type: "blank", content: "" },

        // 3. Finalist Announcement
        { type: "success", content: "3. Finalist Announcement", bullet: true },
        { type: "output", content: isKo ? "2026.02.27(금)" : "Feb 27, 2026 (Fri)" },
        { type: "list-item", content: isKo
          ? "본 프로그램에 참여할 3–5팀 발표"
          : "3-5 teams announced for main program", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "발표와 동시에 투자 집행 (5% 지분에 1억원)"
          : "Investment executed upon announcement (₩100M for 5%)", bulletColor: "yellow" },
        { type: "blank", content: "" },

        // 4. Vibe Labs Seoul
        { type: "success", content: "4. Vibe Labs Seoul", bullet: true },
        { type: "output", content: isKo ? "2026.03.03(화) - 2026.04.24(금)" : "Mar 3 (Tue) – Apr 24 (Fri), 2026" },
        { type: "list-item", content: isKo
          ? "선발된 팀들과 함께하는 집중 빌딩 기간"
          : "Intensive building period with selected teams", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "주 1회 GTM 멘토링 + 바이브 코딩 코칭"
          : "Weekly GTM mentoring + vibe coding coaching", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "온라인 상시 교류 + 상호 피드백 세션"
          : "Constant online communication + peer feedback sessions", bulletColor: "green" },
        { type: "blank", content: "" },

        // 5. Demo Day
        { type: "success", content: "5. Demo Day", bullet: true },
        { type: "output", content: isKo ? "2026.04 말 (예정)" : "Late Apr 2026 (TBD)" },
        { type: "list-item", content: isKo
          ? "8주간의 결과물을 투자자와 빌더 커뮤니티에 공개"
          : "Present results to investors and builder community", bulletColor: "cyan" },
        { type: "list-item", content: isKo
          ? "국내외 50+ VC 및 Hashed LP 네트워크에 소개"
          : "Introduction to 50+ VCs and Hashed LP network", bulletColor: "cyan" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 4-2. 8주의 여정
        { type: "header", content: isKo ? "4-2. 8주의 여정" : "4-2. THE 8-WEEK JOURNEY", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "\"목표는 단 하나. 8주 안에 ARR을 의미있게 만들고, 그것을 수 배 이상 높이는 것.\""
          : "\"One goal: Build meaningful ARR in 8 weeks, then multiply it several times over.\"", bullet: true },
        { type: "blank", content: "" },

        // ARR 설명
        { type: "info", content: isKo ? "왜 ARR인가?" : "Why ARR?", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "AI를 쓰면 마케팅 문구 생성도 쉽고, 고객 유입도 쉽습니다. 그럴듯한 랜딩 페이지, 설득력 있는 카피 — 이 모든 것을 AI가 도와줍니다."
          : "With AI, generating marketing copy and acquiring users is easy. Convincing landing pages, persuasive copy — AI helps with all of this.", bullet: true },
        { type: "blank", content: "" },
        { type: "success", content: isKo
          ? "AI가 만들어낼 수 없는 유일한 지표가 있습니다. 고객이 지갑을 여는 순간입니다."
          : "There's one metric AI can't fake: the moment a customer opens their wallet.", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "사용자가 돈을 낸다 = 진짜 문제를 풀고 있다는 증거"
          : "Users pay = proof you're solving a real problem", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "반복해서 낸다 = 제품이 습관이 되었다는 증거"
          : "They pay repeatedly = proof your product became a habit", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "이것은 속일 수 없습니다. 그래서 우리는 ARR에 집착합니다."
          : "This cannot be faked. That's why we obsess over ARR.", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo ? "ARR이 없다면?" : "No ARR yet?" },
        { type: "list-item", content: isKo
          ? "2주 안에 첫 결제를 만드는 것이 첫 번째 마일스톤"
          : "First milestone: get your first payment within 2 weeks", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "첫 $1이 가장 어렵습니다. 그 다음 $1,000은 훨씬 쉽습니다."
          : "The first $1 is the hardest. The next $1,000 is much easier.", bulletColor: "yellow" },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "모든 멘토링, 코칭, 네트워크 연결은 이 목표를 위해 존재합니다."
          : "All mentoring, coaching, and network connections exist for this goal." },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Week 1
        { type: "success", content: isKo ? "Week 1: 현실 직시" : "Week 1: Face Reality", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "투자금 납입 및 법인 셋업 지원"
          : "Investment deposit and corporate setup support", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "현재 상태 정밀 진단 — ARR, 사용자 수, 전환율, 이탈률"
          : "Precise diagnosis — ARR, users, conversion rate, churn rate", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "없으면 0부터 시작. 그것도 좋은 출발점"
          : "Starting from 0 is fine. It's a good starting point", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "8주 후 도달할 목표 수치 설정"
          : "Set target numbers to reach in 8 weeks", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "성장을 막는 가장 큰 병목 1가지 특정"
          : "Identify the single biggest bottleneck blocking growth", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "\"측정하지 않으면 개선할 수 없다.\""
          : "\"You can't improve what you don't measure.\"" },
        { type: "blank", content: "" },

        // Week 2-3
        { type: "success", content: isKo ? "Week 2-3: 첫 결제 (또는 10배 더)" : "Week 2-3: First Payment (or 10x More)", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "ARR 0이라면 → 첫 결제가 일어나는 구조 설계"
          : "If ARR is 0 → design a structure for first payment", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "ARR 있다면 → 결제를 막는 friction 제거"
          : "If ARR exists → remove friction blocking payments", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "가격 실험, 플랜 구조 테스트"
          : "Price experiments, plan structure tests", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "\"무료로 써도 되는 이유\"를 없애기"
          : "Eliminate \"reasons to stay free\"", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "\"첫 1달러가 가장 어렵다. 그 다음 1,000달러는 더 쉽다.\""
          : "\"The first dollar is the hardest. The next 1,000 is easier.\"" },
        { type: "blank", content: "" },

        // Week 4-5
        { type: "success", content: isKo ? "Week 4-5: 작동하는 채널 찾기" : "Week 4-5: Find What Works", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "10개 채널 실험, 1개 채널 발견"
          : "Experiment with 10 channels, discover 1 that works", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "CAC(고객획득비용) vs LTV(고객생애가치) 계산 시작"
          : "Start calculating CAC vs LTV", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "광고? 콘텐츠? 커뮤니티? SEO? — 정답은 숫자가 알려줌"
          : "Ads? Content? Community? SEO? — Numbers tell the answer", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "작동하지 않는 것은 빠르게 버리기"
          : "Quickly abandon what doesn't work", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "\"모든 채널이 작동하지 않는다. 당신의 채널을 찾아라.\""
          : "\"Not all channels work. Find yours.\"" },
        { type: "blank", content: "" },

        // Week 6-7
        { type: "success", content: isKo ? "Week 6-7: 반복 가능한 성장 공식" : "Week 6-7: Repeatable Growth Formula", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "작동하는 채널에 리소스 집중"
          : "Focus resources on working channels", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "\"이렇게 하면 이만큼 자란다\"는 공식 확립"
          : "Establish \"do this, grow this much\" formula", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "후속 투자 시 설명할 성장 스토리 구체화"
          : "Concretize growth story for follow-up investment", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "Unit Economics 정리"
          : "Organize Unit Economics", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "\"운이 아니라 시스템으로 자라는 구조를 만든다.\""
          : "\"Build a structure that grows by system, not luck.\"" },
        { type: "blank", content: "" },

        // Week 8
        { type: "success", content: isKo ? "Week 8: 증명" : "Week 8: Prove It", bullet: true },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "8주간의 ARR 성장 그래프 공개"
          : "Reveal 8-week ARR growth graph", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "50+ VC 앞에서 숫자로 피칭"
          : "Pitch with numbers in front of 50+ VCs", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "후속 라운드 연결"
          : "Connect to follow-up rounds", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "다음 8주의 목표 설정"
          : "Set goals for the next 8 weeks", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "\"피치덱이 아니라 대시보드로 설득한다.\""
          : "\"Convince with dashboards, not pitch decks.\"" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 마무리
        { type: "output", content: isKo
          ? "시작할 때 ARR $0이어도 좋습니다."
          : "Starting with $0 ARR is fine.", bullet: true },
        { type: "output", content: isKo
          ? "8주 후, 수십억 이상의 ARR과 함께 졸업하는 것이 목표입니다."
          : "The goal is to graduate with tens of millions in ARR after 8 weeks." },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "fellows":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat fellows.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      FELLOWS_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "SEOUL EDITION 펠로우" : "SEOUL EDITION FELLOWS", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "세계적인 오픈소스 프로젝트 개발자, 칸 광고제 수상 크리에이터, 대통령직속 AI위원회 위원, 세계 3대 해커, Kaggle Grandmaster, 그리고 차세대 고등학생 개발자까지."
          : "From world-class open-source developers, Cannes Lions winners, Presidential AI Committee members, to world's top 3 hackers, Kaggle Grandmasters, and next-gen high school developers.", bullet: true },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "분야도 나이도 배경도 모두 다르지만 공통점이 있습니다 — 직접 최전선에서 가장 빠르게 빌딩하는 사람들."
          : "Diverse in fields, ages, and backgrounds, but one thing in common — those who build fastest at the frontlines.", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 김민수
        { type: "success", content: isKo
          ? "김민수 · 컨텍스츠아이오 대표"
          : "Minsoo Kim · CEO, Contexts.io", bullet: true },
        { type: "output", content: isKo
          ? "전 Meta, Ground X 엔지니어. NFTBank 운영하며 Hashed, Sequoia, DCG, 1kx 투자 유치. NFT 시장의 '블룸버그 터미널'을 목표로 온체인 자산 공정가치 알고리즘 개발 중."
          : "Former Meta, Ground X engineer. Runs NFTBank, raised from Hashed, Sequoia, DCG, 1kx. Building the 'Bloomberg Terminal' for NFTs." },
        { type: "blank", content: "" },

        // 김서준
        { type: "success", content: isKo
          ? "김서준 · Hashed 대표"
          : "Simon Kim · CEO, Hashed", bullet: true },
        { type: "output", content: isKo
          ? "2회 엑싯 연쇄 창업자이자 투자자. Web3 생태계 투자와 동시에 ETHval, Agenlinter, Promptguard 등 Web3/AI 프로젝트 직접 개발 중."
          : "Serial founder with 2 exits. Investor and builder, actively investing in Web3 while developing ETHval, Agenlinter, Promptguard." },
        { type: "blank", content: "" },

        // 김연규
        { type: "success", content: isKo
          ? "김연규 · 오픈소스 개발자"
          : "Yeongyu Kim · Open Source Developer", bullet: true },
        { type: "output", content: isKo
          ? "oh-my-opencode 창시자. GitHub 스타 3만, 다운로드 60만 회. 글로벌 코딩 에이전트 커뮤니티를 운영하며 AI 코딩 도구의 민주화를 이끄는 중."
          : "Creator of oh-my-opencode. 30K GitHub stars, 600K downloads. Leading democratization of AI coding tools through global community." },
        { type: "blank", content: "" },

        // 김호진
        { type: "success", content: isKo
          ? "김호진 · Hashed Open Finance 대표"
          : "Hojin Kim · CEO, Hashed Open Finance", bullet: true },
        { type: "output", content: isKo
          ? "ShardLab 대표. DeFi와 전통 금융의 접점에서 새로운 인프라 구축 중. 온체인 금융 서비스의 대중화를 목표로 다양한 프로토콜과 협업."
          : "CEO of ShardLab. Building infrastructure at DeFi-TradFi intersection, collaborating with protocols to democratize on-chain finance." },
        { type: "blank", content: "" },

        // 민웅기
        { type: "success", content: isKo
          ? "민웅기 · FriendliAI 소프트웨어 엔지니어"
          : "Woongki Min · Software Engineer, FriendliAI", bullet: true },
        { type: "output", content: isKo
          ? "Vercel AI SDK, vLLM 등 글로벌 오픈소스 프로젝트 핵심 기여자. LLM 추론 효율성과 서빙 최적화 분야에서 실질적 코드 기여로 인정받는 엔지니어."
          : "Core contributor to Vercel AI SDK, vLLM. Recognized for practical contributions to LLM inference efficiency and serving optimization." },
        { type: "blank", content: "" },

        // 신기헌
        { type: "success", content: isKo
          ? "신기헌 · 크리에이티브 디렉터"
          : "Kiheon Shin · Creative Director", bullet: true },
        { type: "output", content: isKo
          ? "19년차 베테랑. 칸 국제광고제 수상 경력. 브랜딩과 커뮤니케이션 전략 노하우를 AI 시대의 새로운 표현 방식에 접목 중."
          : "19-year veteran, Cannes Lions winner. Applying branding and communication expertise to new forms of expression in the AI era." },
        { type: "blank", content: "" },

        // 안수빈
        { type: "success", content: isKo
          ? "안수빈 · Hashed Tech Lead"
          : "Subin An · Tech Lead, Hashed", bullet: true },
        { type: "output", content: isKo
          ? "Kaggle Grandmaster이자 온체인 데이터 분석 플랫폼 Dune 글로벌 1위. 복잡한 블록체인 데이터를 인사이트로 전환하는 전문가이자 AI 개발자."
          : "Kaggle Grandmaster, #1 global on Dune. Expert at transforming complex blockchain data into insights, and an AI developer." },
        { type: "blank", content: "" },

        // 여준호
        { type: "success", content: isKo
          ? "여준호 · 스트로크컴패니 창업자"
          : "Junho Yeo · Founder, Stroke Company", bullet: true },
        { type: "output", content: isKo
          ? "GitHub 스타 5,000+. 반복적이고 고된 작업을 자동화하는 도구들을 만드는 Sisyphus Labs 운영. 개발자 생산성 향상에 집중."
          : "5,000+ GitHub stars. Runs Sisyphus Labs, building tools to automate repetitive tasks. Focused on developer productivity." },
        { type: "blank", content: "" },

        // 이용준
        { type: "success", content: isKo
          ? "이용준 · 팩토마인드 공동창업자"
          : "Yongjun Lee · Co-founder, Factomind", bullet: true },
        { type: "output", content: isKo
          ? "전 시티그룹 채권 트레이더. 월가 경험 기반 AI 투자 인사이트 플랫폼 팩토마인드 창업. 저서 '인사이더 인사이트' 저자."
          : "Former Citigroup bond trader. Founded AI investment platform Factomind. Author of 'Insider Insight'." },
        { type: "blank", content: "" },

        // 이재홍
        { type: "success", content: isKo
          ? "이재홍 · Across Inc. 창업자"
          : "Jaehong Lee · Founder, Across Inc.", bullet: true },
        { type: "output", content: isKo
          ? "LLM 검색결과 최적화 GEO/AEO(Generative Engine Optimization) 스타트업 대표. AI 시대의 새로운 SEO를 정의하며 브랜드 AI 노출 방식을 혁신 중."
          : "CEO of GEO/AEO startup optimizing LLM search results. Defining new SEO for AI era, revolutionizing brand exposure in AI answers." },
        { type: "blank", content: "" },

        // 임완섭
        { type: "success", content: isKo
          ? "임완섭 · Loqu 창업자"
          : "Wansub Lim · Founder, Loqu", bullet: true },
        { type: "output", content: isKo
          ? "전 이더리움재단 응용암호학팀 리드. ZKP 기반 1세대 롤업 개발 핵심 연구자. 프라이버시 보존 기술 상용화 추진 중."
          : "Former Ethereum Foundation Applied Cryptography Lead. Core researcher of 1st-gen ZKP rollups. Commercializing privacy tech." },
        { type: "blank", content: "" },

        // 정성영
        { type: "success", content: isKo
          ? "정성영 · MarketFit Lab 창업자"
          : "Sungyoung Jung · Founder, MarketFit Lab", bullet: true },
        { type: "output", content: isKo
          ? "전 삼성전자 C랩, 카카오벤처스 컨설턴트. 국내 최대 규모 그로스 해킹 전문가 그룹 운영. 수많은 스타트업의 성장 전략을 설계."
          : "Former Samsung C-Lab, Kakao Ventures consultant. Runs Korea's largest growth hacking group. Designed strategies for numerous startups." },
        { type: "blank", content: "" },

        // 주기영
        { type: "success", content: isKo
          ? "주기영 · CryptoQuant 창업자"
          : "Ki Young Ju · Founder, CryptoQuant", bullet: true },
        { type: "output", content: isKo
          ? "트위터 팔로워 42만+의 온체인 데이터 분석 글로벌 리더. 전 세계 크립토 트레이더들이 참조. unbias.fyi 공동창업."
          : "Global on-chain analytics leader with 420K+ Twitter followers. Referenced by crypto traders worldwide. Co-founded unbias.fyi." },
        { type: "blank", content: "" },

        // Sigrid Jin
        { type: "success", content: isKo
          ? "Sigrid Jin · Sionic AI 엔지니어"
          : "Sigrid Jin · Engineer, Sionic AI", bullet: true },
        { type: "output", content: isKo
          ? "AI 엔지니어링 커뮤니티 Instruct.KR 운영. viberank.app 기준 Claude Code 토큰 사용량 전 세계 1위. 한국 AI 개발자 생태계를 키우는 중."
          : "Runs Instruct.KR community. #1 global Claude Code token usage per viberank.app. Growing Korea's AI developer ecosystem." },
        { type: "blank", content: "" },

        // 하용호
        { type: "success", content: isKo
          ? "하용호 · 데이터오븐 대표"
          : "Yongho Ha · CEO, DataOven", bullet: true },
        { type: "output", content: isKo
          ? "ML 스타트업 2회 엑싯. 대통령직속 AI전략위원회 소속으로 국가 AI 정책 수립 참여. 데이터와 AI의 실질적 활용에 기여."
          : "2 ML startup exits. Presidential AI Strategy Committee member, participating in national AI policy. Contributing to practical AI use." },
        { type: "blank", content: "" },

        // 홍민표
        { type: "success", content: isKo
          ? "홍민표 · SEWORKS 창업자"
          : "Minpyo Hong · Founder, SEWORKS", bullet: true },
        { type: "output", content: isKo
          ? "세계 3대 해커. 해커그룹 WOWHACKER 설립, 보안 기업 SEWORKS 창업. 공격자 시각으로 방어를 설계하는 독보적 전문성."
          : "World's top 3 hacker. Founded WOWHACKER and SEWORKS. Unique expertise in designing defense from attacker's perspective." },
        { type: "blank", content: "" },

        // 황인하
        { type: "success", content: isKo
          ? "황인하 · 부산일과학고 신입생"
          : "Inha Hwang · Freshman, Busan Science High School", bullet: true },
        { type: "output", content: isKo
          ? "HVL 최연소 펠로우. 고등학생이면서 오픈소스 프로젝트에 적극 기여하는 차세대 개발자. 나이보다 실력의 바이브 코딩 문화를 상징."
          : "Youngest HVL fellow. High schooler actively contributing to open source. Symbolizes vibe coding culture where talent beats age." },
        { type: "blank", content: "" },

        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "펠로우와 선발 팀, 펠로우와 펠로우가 서로 배우고 성장하는 8주간의 양방향 빌더 커뮤니티입니다."
          : "A bidirectional builder community where fellows and selected teams, and fellows among themselves, learn and grow together for 8 weeks.", bullet: true },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "faq":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat faq.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      FAQ_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "자주 묻는 질문" : "FREQUENTLY ASKED QUESTIONS", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 참여 자격
        { type: "success", content: isKo ? "참여 자격" : "ELIGIBILITY", bullet: true },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. Crypto/Web3 프로젝트만 지원 가능한가요?"
          : "Q. Are only Crypto/Web3 projects eligible?", bullet: true },
        { type: "output", content: isKo
          ? "A. 아닙니다. AI, SaaS, 핀테크, 커머스 등 분야에 관계없이 지원 가능합니다. 핵심은 바이브코딩을 활용해 실제 작동하는 프로덕트를 만들고 있는지 여부입니다."
          : "A. No. You can apply regardless of field — AI, SaaS, fintech, commerce, etc. What matters is whether you're building a working product using vibe coding." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 이미 투자를 받은 팀도 지원할 수 있나요?"
          : "Q. Can teams with existing investment apply?", bullet: true },
        { type: "output", content: isKo
          ? "A. 네, 가능합니다. 기존 투자 이력에 관계없이 지원할 수 있습니다."
          : "A. Yes. You can apply regardless of existing investment history." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 비개발자도 참여 가능한가요?"
          : "Q. Can non-developers participate?", bullet: true },
        { type: "output", content: isKo
          ? "A. 네. 바이브코딩은 비개발자도 AI 도구를 활용해 직접 프로덕트를 만드는 것을 지향합니다. 기술 배경 여부보다 실행력을 봅니다."
          : "A. Yes. Vibe coding enables non-developers to build products using AI tools. We look at execution, not technical background." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 팀원이 직장인이어도 되나요?"
          : "Q. Can team members be employed full-time elsewhere?", bullet: true },
        { type: "output", content: isKo
          ? "A. 풀타임 커밋이 가능한 팀을 선호합니다. 8주간 집중적인 스프린트 기반으로 운영되므로, 충분한 시간 투입이 가능한지 지원서에 구체적으로 설명해 주세요."
          : "A. We prefer teams that can commit full-time. Since the program runs on intensive 8-week sprints, please explain in your application if you can dedicate sufficient time." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 팀원이 해외에 있어도 되나요?"
          : "Q. Can team members be located overseas?", bullet: true },
        { type: "output", content: isKo
          ? "A. 원격 참여 가능합니다. 단, 최소 1명은 서울 오프라인 모임과 프로그램 기간 중 예정된 집중 합숙에 참석해야 합니다."
          : "A. Remote participation is possible. However, at least one member must attend Seoul offline meetings and the intensive bootcamp scheduled during the program." },
        { type: "blank", content: "" },

        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 프로그램 운영
        { type: "success", content: isKo ? "프로그램 운영" : "PROGRAM OPERATIONS", bullet: true },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 8주간 어떻게 진행되나요?"
          : "Q. How does the 8-week program work?", bullet: true },
        { type: "output", content: isKo
          ? "A. 위클리 배포 스프린트 중심으로 운영됩니다. 매주 프로덕트를 배포하고, 스프린트 리뷰를 통해 Fellow와 동료 팀으로부터 피드백을 받습니다. 프로그램 기간 중 집중 합숙도 예정되어 있습니다."
          : "A. It runs on weekly deployment sprints. Each week you deploy your product and receive feedback from Fellows and peer teams through sprint reviews. An intensive bootcamp is also scheduled during the program." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. Fellow는 어떤 역할을 하나요?"
          : "Q. What role do Fellows play?", bullet: true },
        { type: "output", content: isKo
          ? "A. 17명의 업계 전문가가 Fellow로 참여합니다. 스프린트 리뷰 피드백, 1:1 오피스아워(30분), 기술 및 시장 전략 조언 등을 통해 선발팀의 성장을 지원합니다."
          : "A. 17 industry experts participate as Fellows. They support selected teams through sprint review feedback, 1:1 office hours (30 min), and tech/market strategy advice." },
        { type: "blank", content: "" },

        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // 투자 & 선발 기준
        { type: "success", content: isKo ? "투자 & 선발 기준" : "INVESTMENT & SELECTION", bullet: true },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 투자 조건은 어떻게 되나요?"
          : "Q. What are the investment terms?", bullet: true },
        { type: "output", content: isKo
          ? "A. 5% 지분에 1억원이며, 선발 발표 즉시 집행됩니다."
          : "A. 100M KRW for 5% equity, executed immediately upon selection announcement." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 선발 시 가장 중요하게 보는 기준은 무엇인가요?"
          : "Q. What's the most important selection criteria?", bullet: true },
        { type: "output", content: isKo
          ? "A. 실제 작동하는 프로덕트와 구현력을 가장 중요하게 봅니다. 비전보다 실행, 기술 고도화보다 MVP 배포 후 트랙션을 선호합니다. 지원 시 프로덕트 URL과 데모를 함께 제출해 주세요."
          : "A. We value working products and implementation ability most. Execution over vision, traction after MVP deployment over technical sophistication. Please submit product URL and demo with your application." },
        { type: "blank", content: "" },

        { type: "info", content: isKo
          ? "Q. 피벗에 대해 어떻게 생각하나요?"
          : "Q. What's your view on pivoting?", bullet: true },
        { type: "output", content: isKo
          ? "A. 빠른 피벗을 환영합니다. 시장 반응에 따라 과감하게 방향을 전환하는 것은 실패가 아니라 학습의 증거입니다."
          : "A. We welcome fast pivots. Boldly changing direction based on market response is not failure — it's evidence of learning." },
        { type: "blank", content: "" },

        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "hashed":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "cat hashed.md" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      HASHED_SECTION_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "7-1. 왜 Hashed인가?" : "7-1. WHY HASHED?", bullet: true },
        { type: "blank", content: "" },
        { type: "info", content: "200+ 포트폴리오  |  10+ 유니콘 배출  |  6 글로벌 거점", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "Hashed는 2017년 설립 이후, 기술 변화의 가장 앞선 지점에서 팀을 발굴해온 투자사입니다. Web3, AI, 컨텐츠 등 새로운 패러다임이 형성되는 초기 시점에 팀을 만나고, 함께 성장해왔습니다."
          : "Since 2017, Hashed has discovered teams at the forefront of technology shifts. At the early stages of new paradigms like Web3, AI, and content, we've met teams and grown together.", bullet: true },
        { type: "list-item", content: isKo
          ? "서울을 시작으로 샌프란시스코, 싱가포르, 방콕, 뱅갈루루, 아부다비에 오피스를 두고 있으며, 각 지역의 네트워크를 활용해 포트폴리오 팀들의 글로벌 진출과 Go-to-Market을 지원합니다."
          : "With offices in Seoul, San Francisco, Singapore, Bangkok, Bengaluru, and Abu Dhabi, we leverage our regional networks to help portfolio teams with global expansion and Go-to-Market strategies.", bulletColor: "cyan" },
        { type: "blank", content: "" },
        // Hashed Labs 2019 트랙레코드
        { type: "output", content: isKo
          ? "Hashed는 2019년 초, 곧 블록체인 게임 섹터가 부상할 것이라는 논지를 기반으로 'Hashed Labs'라는 3개월간의 극초기투자 및 지원 프로그램을 운영했습니다. 당시 5개 팀 중 2개가 유니콘이 되었습니다:"
          : "In early 2019, based on the thesis that blockchain gaming would soon rise, Hashed ran 'Hashed Labs'—a 3-month pre-seed investment program. 2 out of 5 teams became unicorns:", bullet: true },
        { type: "info", content: isKo
          ? "  · Sky Mavis (베트남) — Axie Infinity"
          : "  · Sky Mavis (Vietnam) — Axie Infinity" },
        { type: "info", content: isKo
          ? "  · The Sandbox (아르헨티나) — 메타버스 플랫폼"
          : "  · The Sandbox (Argentina) — Metaverse platform" },
        { type: "blank", content: "" },
        // Hashed Labs 관련 자료
        { type: "dim", content: isKo
          ? "📖 관련 자료:"
          : "📖 Related materials:" },
        { type: "link", content: isKo
          ? "   → 해시드는 왜 블록체인 게임에 투자하는가?"
          : "   → Why Blockchain Games?",
          href: isKo
            ? "https://medium.com/hashed-kr/why-hashed-does-invest-in-blockchain-games-66144ae924d9"
            : "https://medium.com/hashed-official/why-blockchain-games-28b2ae742544" },
        { type: "link", content: "   → [Hashed Labs] UGC Meets NFTs Within The Sandbox — Sebastien Borget",
          href: "https://www.youtube.com/watch?v=ZQLy29qkrRE" },
        { type: "link", content: "   → [Hashed Labs] Is NFT the Future of Blockchain Game? — Panel Discussion",
          href: "https://www.youtube.com/watch?v=baCCOkq5ISo" },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "Hashed Vibe Labs는 지난 극초기투자 프로그램의 성공과 운영 경험을 바탕으로, 바이브 코딩 창업자의 시대를 맞이하여 런칭하는 프로그램입니다."
          : "Hashed Vibe Labs is a program launched to embrace the era of vibe coding founders, building on the success and operational experience of our previous pre-seed investment program.", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Hashed as Vibe Coding Organization
        { type: "header", content: isKo ? "7-2. 자본가에서 신뢰+유통 라우터로" : "7-2. FROM CAPITALIST TO TRUST+DISTRIBUTION ROUTER", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "2026년 현재, MVP를 만드는데 1억 원도 과할 정도로 비용이 내려갔습니다. 1-2명이 AI로 제품을 만드는데 10억이 필요하지 않습니다."
          : "In 2026, costs have dropped so much that even ₩100M is excessive for building an MVP. 1-2 people building with AI don't need ₩1B.", bullet: true },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "바이브 코딩 시대의 창업자에게 자본보다 더 희소한 것이 있다고 봅니다."
          : "We see something scarcer than capital for founders in the vibe coding era.", bullet: true },
        { type: "success", content: isKo
          ? "바로 '믿을 만한 신호(Signal)'와 '글로벌 연결'입니다."
          : "That's 'trustworthy signal' and 'global connection'." },
        { type: "blank", content: "" },
        { type: "list-item", content: isKo
          ? "노이즈 속의 시그널 — AI가 만든 제품들로 넘쳐나는 세상에서, 'Hashed 포트폴리오'라는 뱃지가 보증수표가 됩니다"
          : "Signal in the noise — In a world flooded with AI-built products, the 'Hashed portfolio' badge becomes a trust guarantee", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "글로벌 유통망 — 아부다비 국부펀드, 도쿄 IP 홀더, 실리콘밸리 빅테크와 즉시 연결. 소개를 '많이' 하는 게 아니라, 성공 확률이 올라가는 방향으로 '정렬'합니다"
          : "Global distribution — instant connection to Abu Dhabi sovereign funds, Tokyo IP holders, Silicon Valley big tech. We don't just make 'many' intros, we 'align' them to increase success probability", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "동료의 밀도 — 솔로 빌더의 가장 큰 어려움은 기술이 아니라 외로움입니다. 같은 속도로 달리는 최고 수준의 빌더 커뮤니티"
          : "Density of peers — Solo builders' biggest challenge isn't technical, it's loneliness. A top-tier builder community running at the same speed", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Agentic VC
        { type: "header", content: isKo ? "7-3. Agentic VC로의 진화" : "7-3. EVOLUTION TO AGENTIC VC", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo
          ? "Hashed는 대표부터 모든 파트너와 전 직원이 바이브 코딩을 학습하고 실제 업무에 적용하고 있습니다."
          : "At Hashed, from the CEO to all partners and staff, everyone learns vibe coding and applies it to their daily work.", bullet: true },
        { type: "blank", content: "" },
        { type: "info", content: isKo
          ? "직접 빌딩해봐야 빌더를 더 잘 이해할 수 있다고 믿습니다. 창업자가 'AI로 이틀 만에 MVP를 만들었는데 스케일링에서 막혔어요'라고 말할 때, 같은 경험을 해본 사람과 그렇지 않은 사람의 대화는 질적으로 다릅니다."
          : "We believe you understand builders better when you build yourself. When a founder says 'I made an MVP in 2 days with AI but hit a wall scaling,' the conversation is qualitatively different with someone who's been there.", bullet: true },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "김서준(Simon Kim) 대표의 바이브 코딩 사례:" : "CEO Simon Kim's Vibe Coding Examples:", bullet: true },
        { type: "list-item", content: isKo
          ? "ETHval — 이더리움의 적정가치를 12개 밸류에이션 모델을 통해 추정하는 대시보드, Kaito Yap에서 글로벌 1위 달성"
          : "ETHval — Dashboard estimating Ethereum's fair value through 12 valuation models, ranked #1 globally on Kaito Yap", bulletColor: "yellow" },
        { type: "link", content: "   → [ETHval] Ethereum Valuation Dashboard ↗",
          href: "https://ethval.com" },
        { type: "link", content: isKo
          ? "   → [Medium] ETHval 프로젝트 1주차 소회 — 이더리움의 가치를 어떻게 평가할까? ↗"
          : "   → [Medium] Reflections on Week One of the ETHval Project ↗",
          href: isKo ? "https://medium.com/hashed-kr/ethval-3342605de841" : "https://medium.com/hashed-official/ereflections-on-week-one-of-the-ethval-project-how-to-assess-the-fair-value-of-ethereum-f9700e1c8d6f" },
        { type: "list-item", content: isKo
          ? "Only In Abu Dhabi — 아부다비 출장 비행 중 제작, 실제 비즈니스 협업으로 연결"
          : "Only In Abu Dhabi — Built during flight, led to actual business partnerships", bulletColor: "yellow" },
        { type: "link", content: "   → [Only In Abu Dhabi] Abu Dhabi Experience Platform ↗",
          href: "https://onlyinabu.com" },
        { type: "list-item", content: isKo
          ? "Hashed Vibe Labs — Hashed Vibe Labs 웹사이트도 바이브 코딩으로 직접 개발"
          : "Hashed Vibe Labs — Website also built with vibe coding", bulletColor: "yellow" },
        { type: "link", content: "   → [Hashed Vibe Labs] Official Website ↗",
          href: "https://vibelabs.hashed.com" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Portfolio Distribution
        { type: "header", content: isKo ? "7-4. Hashed 포트폴리오 분포" : "7-4. HASHED PORTFOLIO DISTRIBUTION", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "전 세계 혁신 스타트업에 투자하고 있으며, 북미와 아시아에 집중하면서도 지리적 다양성을 유지하고 있습니다."
          : "Investing in innovative startups worldwide, focusing on North America and Asia while maintaining geographic diversity.", bullet: true },
        { type: "blank", content: "" },
        // Portfolio Distribution Stats
        { type: "output", content: isKo ? "   ╔══════════════════════════════════════════════════════════════════════╗" : "   ╔══════════════════════════════════════════════════════════════════════╗" },
        { type: "output", content: isKo ? "   ║  ● 아시아 150+팀    ● 북미 ~70팀    ● 유럽 10+팀    ● 기타 6팀      ║" : "   ║  ● Asia 150+    ● N.America ~70    ● Europe 10+    ● Others 6        ║" },
        { type: "output", content: isKo ? "   ╚══════════════════════════════════════════════════════════════════════╝" : "   ╚══════════════════════════════════════════════════════════════════════╝" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // What Hashed Provides
        { type: "header", content: isKo ? "7-5. Hashed가 제공하는 것" : "7-5. WHAT HASHED PROVIDES", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "일반적인 액셀러레이터의 강의나 멘토링 세션과는 조금 다른 접근입니다. 팀이 실제로 필요할 때, 필요한 것을 연결하려고 합니다."
          : "A slightly different approach from typical accelerator lectures or mentoring sessions. We aim to connect what teams actually need, when they need it.", bullet: true },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "1) 초기 투자 전문성" : "1) Early-stage Investment Expertise", bullet: true },
        { type: "list-item", content: isKo
          ? "투자팀 파트너들: 개발자 출신, 엑싯 경험이 있는 연쇄창업자들"
          : "Investment partners: developers turned serial entrepreneurs with exit experience", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "제품도 없고, 팀도 미완성인 단계에서 투자 결정을 해온 경험"
          : "Experience making investment decisions with no product, incomplete team", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "빠르게 변하는 초기 단계에서의 의사결정에 익숙"
          : "Comfortable with decision-making in fast-changing early stages", bulletColor: "yellow" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "2) 글로벌 네트워크" : "2) Global Network", bullet: true },
        { type: "list-item", content: isKo
          ? "한국, 일본, 동남아, 미국, 중동을 잇는 투자자·창업자 네트워크"
          : "Investor and founder network connecting Korea, Japan, Southeast Asia, US, and Middle East", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "해시드 벤처펀드의 50여개 LP 전원이 전략적 투자자(연기금/공제회 없음)로 구성, 국내외 대기업 및 금융기관들과 직접적 협력 네트워크 구축"
          : "All 50+ LPs are strategic investors (no pension funds), with direct partnership networks to major corporations and financial institutions globally", bulletColor: "blue" },
        { type: "list-item", content: isKo
          ? "후속 투자 연결, 파트너십 소개, 해외 시장 진입에 실질적인 도움"
          : "Practical help with follow-on funding, partnerships, market entry", bulletColor: "blue" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "3) 새로운 창업 방식에 대한 이해" : "3) Understanding New Startup Methods", bullet: true },
        { type: "list-item", content: isKo
          ? "창업의 본질은 변하지 않지만, 실현 방식은 많이 달라지고 있습니다"
          : "The essence of entrepreneurship hasn't changed, but the ways to realize it are evolving", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "팀 규모나 형식보다 문제 해결에 대한 집착과 실행 속도에 관심을 둡니다"
          : "We focus on obsession with problem-solving and execution speed over team size or formalities", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "전통적 공식을 따르지 않는 창업자들을 수년간 만나오며 많이 배웠습니다"
          : "We've learned a lot from meeting founders who don't follow traditional formulas over the years", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "4) 바이브 코딩 멘토링" : "4) Vibe Coding Mentorship", bullet: true },
        { type: "list-item", content: isKo
          ? "국내외 최고 수준의 바이브 코딩 개발자들이 플레잉 코치로 참여"
          : "World-class vibe coders as playing coaches", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "배치에 선발된 창업자들과의 학습 및 교류 세션"
          : "Learning and networking sessions with selected batch founders", bulletColor: "yellow" },
        { type: "list-item", content: isKo
          ? "최신 바이브 코딩 노하우, 툴, 워크플로우 공유 환경 조성"
          : "Environment for sharing latest vibe coding know-how, tools, and workflows", bulletColor: "yellow" },
        { type: "blank", content: "" },
        { type: "success", content: isKo ? "5) 맞춤형 지원" : "5) Customized Support", bullet: true },
        { type: "list-item", content: isKo
          ? "후속 투자 라운드 연결 및 전략 논의"
          : "Follow-on round connections and strategy discussions", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "산업별 파트너 및 미디어 연결"
          : "Industry partner and media connections", bulletColor: "green" },
        { type: "list-item", content: isKo
          ? "팀 상황에 맞는 1:1 전략 세션"
          : "1:1 strategy sessions tailored to team situation", bulletColor: "green" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "※ 정해진 커리큘럼이 아닌, 팀의 실제 진척과 필요에 따라 유연하게 지원"
          : "※ Flexible support based on actual progress and needs, not fixed curriculum" },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // Global Co-investors
        { type: "header", content: isKo ? "7-6. 글로벌 공동투자사 네트워크" : "7-6. GLOBAL CO-INVESTOR NETWORK", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: isKo
          ? "Hashed와 함께 딜플로우를 교환하고 공동투자해온 해외 투자사들:"
          : "Global investors exchanging deal flow and co-investing with Hashed:", bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: "Tiger Global | Sequoia | a16z | USV | Pantera Capital" },
        { type: "output", content: "Coatue | Arrington Capital | Multicoin Capital | HF0 | Samsung Next" },
        { type: "output", content: "Galaxy Interactive | GIC | Nyca | SBI | Mubadala Capital" },
        { type: "output", content: "Dragonfly | Binance | Coinbase Ventures | 1kx | Bitkraft" },
        { type: "output", content: "Goodwater | Placeholder | Spartan Capital | Makers Fund | ConsenSys Ventures" },
        { type: "output", content: "Parafi | Race Capital | Electric Capital | Polychain Capital | Collab+Currency" },
        { type: "output", content: "Framework | White Star Capital | Antler | Digital Currency Group | DeFi Alliance" },
        { type: "output", content: "Solana Ventures | Polygon | Avalanche | B-Dash Ventures | Global Brain" },
        { type: "blank", content: "" },
        { type: "blink", content: isKo ? "Enter를 눌러 계속하세요..." : "Press Enter to continue..." },
        { type: "blank", content: "" },
      );
      break;

    case "apply":
      // Terminal prompt style command
      lines.push({ type: "prompt", content: "./apply --batch=1" });
      lines.push({ type: "blank", content: "" });
      // ASCII art header
      APPLY_ASCII.forEach(line => {
        lines.push({ type: "ascii", content: line });
      });
      lines.push(
        { type: "blank", content: "" },
        { type: "header", content: isKo ? "8-1. 투자 조건" : "8-1. INVESTMENT TERMS", bullet: true },
        { type: "blank", content: "" },

        // Investment terms in a box
        { type: "box-top", content: "" },
        { type: "box-content", content: isKo ? "💰 투자 조건 (Investment Terms)" : "💰 Investment Terms" },
        { type: "box-content", content: "" },
        { type: "box-content", content: isKo
          ? "  선발 팀 수    →  3-5팀"
          : "  Teams         →  3-5 teams" },
        { type: "box-content", content: isKo
          ? "  초기 투자     →  1억원 / 지분 5%"
          : "  Initial       →  100M KRW for 5% equity" },
        { type: "box-content", content: isKo
          ? "  추가 투자     →  프로그램 기간 중 추가 1억원, 이후 라운드 투자 별도 협의"
          : "  Follow-on     →  Up to 100M KRW during program, future rounds negotiable" },
        { type: "box-content", content: isKo
          ? "  투자 방식     →  Hashed 직접 투자"
          : "  Method        →  Direct by Hashed" },
        { type: "box-bottom", content: "" },
        { type: "blank", content: "" },

        { type: "status-ok", content: isKo
          ? "선발 = 투자 집행 (선발 발표와 동시에 투자 확정)"
          : "Selection = Investment (confirmed upon announcement)", bullet: true },
        { type: "blank", content: "" },
        { type: "dim", content: "─".repeat(50) },
        { type: "blank", content: "" },

        // How to Apply
        { type: "header", content: isKo ? "8-2. 지원 방법" : "8-2. HOW TO APPLY", bullet: true },
        { type: "blank", content: "" },
        { type: "status-info", content: isKo
          ? `${CONTACT_EMAIL} 으로 아래 내용을 포함해 메일을 보내주세요.`
          : `Send an email to ${CONTACT_EMAIL} with the following:`, bullet: true },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "필수:" : "Required:", bullet: true },
        { type: "list-item", content: isKo
          ? "팀 소개 (인원, 풀타임 여부, 소셜 링크)"
          : "Team intro (size, full-time status, social links)" },
        { type: "list-item", content: isKo
          ? "라이브 서비스 URL"
          : "Live service URL" },
        { type: "blank", content: "" },
        { type: "output", content: isKo ? "선택 (있으면 좋음):" : "Optional (nice to have):", bullet: true },
        { type: "list-item", content: isKo
          ? "데모 영상 또는 스크린샷"
          : "Demo video or screenshots" },
        { type: "list-item", content: isKo
          ? "GitHub/GitLab repo"
          : "GitHub/GitLab repo" },
        { type: "list-item", content: isKo
          ? "현재 트랙션 (유저 수, ARR 등)"
          : "Current traction (users, ARR, etc.)" },
        { type: "blank", content: "" },
        { type: "dim", content: isKo ? "※ 형식은 자유입니다." : "※ Format is flexible.", bullet: true },
        { type: "blank", content: "" },
        { type: "error", content: isKo
          ? "⚠ 지원 마감: 2026년 2월 19일 (목) 23:59:59 KST"
          : "⚠ Deadline: Feb 19, 2026 (Thu) 23:59:59 KST", bullet: true },
        { type: "countdown", content: isKo ? "마감" : "deadline" },
        { type: "blank", content: "" },
      );
      break;
  }

  return lines;
}
