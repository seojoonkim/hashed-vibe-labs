"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PROGRAM_DATA } from "@/lib/constants";

interface TerminalSectionProps {
  sectionId: string;
  onBack: () => void;
}

export default function TerminalSection({ sectionId, onBack }: TerminalSectionProps) {
  const { t, language } = useI18n();

  const renderSection = () => {
    switch (sectionId) {
      case "about":
        return <AboutSection />;
      case "criteria":
        return <CriteriaSection />;
      case "timeline":
        return <TimelineSection />;
      case "investment":
        return <InvestmentSection />;
      case "apply":
        return <ApplySection />;
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="terminal-prompt mb-4 hover:glow transition-all flex items-center gap-2"
      >
        <span>←</span>
        <span>{language === "ko" ? "뒤로가기" : "back"}</span>
        <span className="text-[var(--muted)] text-xs ml-2">[ESC]</span>
      </button>

      {/* Section content */}
      {renderSection()}
    </motion.div>
  );
}

function AboutSection() {
  const { t, language } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="terminal-section-title">$ cat /about/program.txt</h2>
        <div className="terminal-section-content">
          <p className="mb-4">
            {language === "ko"
              ? "Vibe Camp은 기존 액셀러레이터와 다릅니다."
              : "Vibe Camp is not a traditional accelerator."}
          </p>
          <p className="mb-4">
            {language === "ko"
              ? "피칭을 배우거나 투자자 앞에서 발표하는 프로그램이 아닙니다. 대신, 실제로 제품을 만들고 실행하는 AI 네이티브 파운더를 관찰합니다."
              : "It's not about learning to pitch or presenting to investors. Instead, we observe AI-native founders as they actually build and ship products."}
          </p>
        </div>
      </div>

      <div className="terminal-divider" />

      <div>
        <h3 className="terminal-success mb-3">
          {language === "ko" ? "핵심 관점" : "Core Perspective"}
        </h3>
        <p className="terminal-output">
          {language === "ko"
            ? "\"이 사람이 6개월 후에도 같은 열정으로 만들고 있을까?\""
            : "\"Will this person still be building with the same passion 6 months from now?\""}
        </p>
      </div>

      <div className="terminal-divider" />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="terminal-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--terminal-red)]">✕</span>
            <span className="text-[var(--muted)] line-through">
              {language === "ko" ? "피치덱 기반 평가" : "Pitch deck evaluation"}
            </span>
          </div>
        </div>
        <div className="terminal-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--terminal-green)]">✓</span>
            <span className="text-[var(--foreground)]">
              {language === "ko" ? "실제 URL과 Github 기반 평가" : "URL & Github-based evaluation"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CriteriaSection() {
  const { language } = useI18n();

  const notFocus = language === "ko"
    ? ["시장 크기나 비즈니스 모델", "학력이나 이전 경력"]
    : ["Market size or business model", "Education or previous career"];

  const observe = language === "ko"
    ? [
        "실제로 작동하는 제품이 있는가?",
        "만드는 것에 대한 명확한 의견이 있는가?",
        "빠르게 반복하고 개선하는가?",
        "사용자 피드백에 반응하는가?",
        "AI 도구를 효과적으로 활용하는가?",
      ]
    : [
        "Do they have a working product?",
        "Do they have strong opinions about what they build?",
        "Do they iterate and improve quickly?",
        "Do they respond to user feedback?",
        "Do they effectively leverage AI tools?",
      ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="terminal-section-title">$ cat /criteria/evaluation.txt</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Not Focus */}
        <div className="terminal-card">
          <h3 className="text-[var(--muted)] mb-4 flex items-center gap-2">
            <span className="status-dot offline" />
            {language === "ko" ? "우리가 보지 않는 것" : "What we don't focus on"}
          </h3>
          <ul className="space-y-2">
            {notFocus.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[var(--muted)]">
                <span className="text-[var(--terminal-red)]">✕</span>
                <span className="line-through opacity-60">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Observe */}
        <div className="terminal-card" style={{ borderColor: "var(--terminal-green)" }}>
          <h3 className="terminal-success mb-4 flex items-center gap-2">
            <span className="status-dot online" />
            {language === "ko" ? "우리가 관찰하는 것" : "What we observe"}
          </h3>
          <ul className="space-y-2">
            {observe.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-[var(--terminal-green)]">&gt;</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="terminal-divider" />

      <div className="terminal-card text-center" style={{ borderColor: "var(--terminal-green)" }}>
        <p className="text-[var(--muted)] mb-2">
          {language === "ko" ? "핵심 질문" : "Core Question"}
        </p>
        <p className="text-xl terminal-success">
          {language === "ko"
            ? "\"이 사람이 6개월 후에도 같은 열정으로 만들고 있을까?\""
            : "\"Will this person still be building with the same passion 6 months from now?\""}
        </p>
      </div>
    </div>
  );
}

function TimelineSection() {
  const { language } = useI18n();

  const phases = language === "ko"
    ? [
        { date: "5월 중순", title: "지원 마감", desc: "선착순 마감, 조기 지원 권장", status: "pending" },
        { date: "5월 말", title: "참가자 선정", desc: "선정 결과 개별 통보", status: "pending" },
        { date: "6월 초", title: "Vibe Camp 시작", desc: "2주간 집중 프로그램 진행", status: "online" },
        { date: "6월 중순", title: "데모데이 & 투자", desc: "최대 $100K SAFE 투자", status: "pending" },
      ]
    : [
        { date: "Mid May", title: "Application Deadline", desc: "First-come basis, apply early", status: "pending" },
        { date: "Late May", title: "Selection", desc: "Individual notification", status: "pending" },
        { date: "Early June", title: "Vibe Camp Starts", desc: "2-week intensive program", status: "online" },
        { date: "Mid June", title: "Demo Day & Investment", desc: "Up to $100K SAFE investment", status: "pending" },
      ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="terminal-section-title">$ cat /timeline/schedule.txt</h2>
      </div>

      <div className="space-y-4">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            className="terminal-card flex gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={phase.status === "online" ? { borderColor: "var(--terminal-green)" } : {}}
          >
            <div className="text-[var(--terminal-cyan)] font-mono w-24 flex-shrink-0">
              {phase.date}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`status-dot ${phase.status}`} />
                <span className={phase.status === "online" ? "terminal-success" : ""}>
                  {phase.title}
                </span>
              </div>
              <p className="text-[var(--muted)] text-sm">{phase.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="terminal-progress mt-6">
        <div className="terminal-progress-bar" style={{ width: "25%" }} />
      </div>
      <p className="text-xs text-[var(--muted)] text-center">
        {language === "ko" ? "현재: 지원 접수 중" : "Current: Accepting Applications"}
      </p>
    </div>
  );
}

function InvestmentSection() {
  const { language } = useI18n();

  const stats = [
    {
      value: "~20",
      label: language === "ko" ? "선발 팀" : "Selected Teams",
      desc: language === "ko" ? "팀당 1~2인" : "1-2 per team",
    },
    {
      value: "$100K",
      label: language === "ko" ? "투자 금액" : "Investment",
      desc: "SAFE",
      highlight: true,
    },
    {
      value: "Pre-Seed",
      label: language === "ko" ? "투자 단계" : "Stage",
      desc: language === "ko" ? "시드 전 단계" : "Before seed",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="terminal-section-title">$ cat /investment/terms.txt</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="terminal-card text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={stat.highlight ? { borderColor: "var(--terminal-green)" } : {}}
          >
            <div className={`text-3xl font-bold mb-2 ${stat.highlight ? "terminal-success glow" : ""}`}>
              {stat.value}
            </div>
            <div className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-[var(--muted)]">{stat.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="terminal-divider" />

      <div className="terminal-card" style={{ borderColor: "var(--terminal-green)" }}>
        <p className="terminal-output text-center">
          {language === "ko"
            ? "Vibe Camp 기간 동안 관찰을 통해 잠재력을 확인한 후, 데모데이에서 최대 $100K를 SAFE로 투자합니다."
            : "After observing potential during Vibe Camp, we invest up to $100K via SAFE at Demo Day."}
        </p>
      </div>
    </div>
  );
}

function ApplySection() {
  const { language } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="terminal-section-title">$ ./apply.sh</h2>
      </div>

      <div className="terminal-card text-center" style={{ borderColor: "var(--terminal-yellow)" }}>
        <p className="text-[var(--terminal-yellow)] text-sm mb-2">
          {language === "ko" ? "지원 마감" : "Application Deadline"}
        </p>
        <p className="text-2xl font-bold terminal-warning">
          2025년 5월 18일
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="terminal-success">
          {language === "ko" ? "제출 항목" : "Required Submissions"}
        </h3>
        <div className="terminal-card">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-[var(--terminal-green)]">1.</span>
            <span>
              {language === "ko"
                ? "작동하는 제품 URL (데모, 웹사이트, 앱스토어 등)"
                : "Working product URL (demo, website, app store, etc.)"}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--terminal-green)]">2.</span>
            <span>
              {language === "ko"
                ? "Github 프로필 또는 레포지토리 링크"
                : "Github profile or repository link"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-center py-4">
          <span className="text-[var(--terminal-green)]">✓</span>
          <span className="text-[var(--foreground)]">
            {language === "ko"
              ? "긴 에세이나 피치덱이 필요 없습니다"
              : "No long essays or pitch decks required"}
          </span>
        </div>
      </div>

      <div className="terminal-divider" />

      <motion.button
        onClick={() => window.open(PROGRAM_DATA.applyUrl, "_blank")}
        className="terminal-btn-primary w-full justify-center py-4 text-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>{language === "ko" ? "지원하기" : "Apply Now"}</span>
        <span>→</span>
      </motion.button>

      <p className="text-center text-xs text-[var(--muted)]">
        {language === "ko"
          ? "선착순 마감 · 조기 지원 권장"
          : "First-come basis · Early application recommended"}
      </p>
    </div>
  );
}
