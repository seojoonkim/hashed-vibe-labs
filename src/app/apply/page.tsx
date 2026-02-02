"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Types
interface FormData {
  name: string;
  email: string;
  team_size: string;
  live_url: string;
  demo_url: string;
  repo_url: string;
  days_to_first_deploy: string;
  recent_ships: string;
  iteration_example: string;
  ai_tools: string[];
  ai_workflow: string;
  domain_expertise: string;
  why_this_problem: string;
  biggest_blocker: string;
  links: string;
  pitch_deck: FileInfo | null;
  additional_files: FileInfo[];
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

interface QuestionOption {
  label: string;
  description?: string;
}

interface Question {
  id: keyof FormData;
  header: string;
  question: string;
  type: "text" | "email" | "number" | "select" | "multiselect" | "textarea" | "file" | "multifile";
  required: boolean;
  options?: QuestionOption[];
  placeholder?: string;
  validation?: (value: string) => string | null;
  accept?: string;
  maxFiles?: number;
}

// Questions configuration - AskUserQuestion style
const QUESTIONS: Question[] = [
  {
    id: "name",
    header: "기본 정보",
    question: "이름을 입력해주세요 (개인 또는 팀 대표)",
    type: "text",
    required: true,
    placeholder: "홍길동",
  },
  {
    id: "email",
    header: "연락처",
    question: "연락 가능한 이메일을 입력해주세요",
    type: "email",
    required: true,
    placeholder: "founder@startup.com",
    validation: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : "올바른 이메일 형식이 아닙니다";
    },
  },
  {
    id: "team_size",
    header: "팀 규모",
    question: "팀 규모를 선택해주세요",
    type: "select",
    required: true,
    options: [
      { label: "1인 (솔로 파운더)", description: "혼자서 모든 것을 해결하는 빌더" },
      { label: "2인", description: "공동창업자와 함께하는 팀" },
      { label: "3인", description: "3명의 코어 팀" },
    ],
  },
  {
    id: "live_url",
    header: "프로덕트",
    question: "현재 라이브 중인 서비스 URL을 입력해주세요 (가장 중요!)",
    type: "text",
    required: true,
    placeholder: "https://yourproduct.com",
    validation: (value) => {
      try {
        new URL(value);
        return null;
      } catch {
        return "올바른 URL 형식이 아닙니다";
      }
    },
  },
  {
    id: "demo_url",
    header: "데모",
    question: "데모/프로토타입 URL이 있나요?",
    type: "text",
    required: false,
    placeholder: "https://demo.yourproduct.com",
  },
  {
    id: "repo_url",
    header: "코드",
    question: "GitHub/GitLab 레포지토리 URL이 있나요?",
    type: "text",
    required: false,
    placeholder: "https://github.com/username/repo",
  },
  {
    id: "days_to_first_deploy",
    header: "실행 속도",
    question: "아이디어에서 첫 배포까지 며칠이 걸렸나요?",
    type: "number",
    required: true,
    placeholder: "7",
    validation: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0) return "0 이상의 숫자를 입력해주세요";
      return null;
    },
  },
  {
    id: "recent_ships",
    header: "반복 속도",
    question: "최근 2주간 배포/업데이트 횟수는?",
    type: "number",
    required: true,
    placeholder: "5",
    validation: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0) return "0 이상의 숫자를 입력해주세요";
      return null;
    },
  },
  {
    id: "iteration_example",
    header: "반복 사례",
    question: "사용자 피드백 → 수정 → 재배포한 구체적 사례 1개를 알려주세요 (3문장 이내)",
    type: "textarea",
    required: true,
    placeholder: "사용자가 로딩이 느리다고 피드백 → 이미지 최적화 적용 → 로딩 시간 50% 단축",
  },
  {
    id: "ai_tools",
    header: "AI 도구",
    question: "현재 사용 중인 AI 도구들을 선택해주세요 (복수 선택 가능)",
    type: "multiselect",
    required: true,
    options: [
      { label: "Cursor", description: "AI 코드 에디터" },
      { label: "Claude", description: "Anthropic AI 어시스턴트" },
      { label: "ChatGPT", description: "OpenAI 챗봇" },
      { label: "v0", description: "Vercel AI UI 생성기" },
      { label: "Copilot", description: "GitHub AI 페어 프로그래머" },
      { label: "Midjourney", description: "AI 이미지 생성" },
      { label: "기타", description: "다른 AI 도구" },
    ],
  },
  {
    id: "ai_workflow",
    header: "AI 활용",
    question: "AI를 가장 많이 활용하는 작업 단계는?",
    type: "select",
    required: true,
    options: [
      { label: "기획", description: "아이디어 구체화, 리서치" },
      { label: "개발", description: "코딩, 디버깅, 리팩토링" },
      { label: "디자인", description: "UI/UX, 그래픽 제작" },
      { label: "마케팅", description: "콘텐츠 제작, 분석" },
      { label: "기타", description: "그 외 작업" },
    ],
  },
  {
    id: "domain_expertise",
    header: "도메인 전문성",
    question: "이 문제를 풀기 위해 쌓아온 도메인 경험을 알려주세요 (3문장 이내)",
    type: "textarea",
    required: true,
    placeholder: "5년간 물류 스타트업에서 라스트마일 배송 최적화 담당...",
  },
  {
    id: "why_this_problem",
    header: "문제 정의",
    question: "왜 이 문제인가요? (아이템이 아닌 접근 방식/로직 중심으로)",
    type: "textarea",
    required: true,
    placeholder: "시장의 비효율을 어떻게 발견했고, 왜 이 방식으로 해결하려 하는지...",
  },
  {
    id: "biggest_blocker",
    header: "현재 병목",
    question: "현재 가장 큰 병목 1가지는 무엇인가요?",
    type: "textarea",
    required: true,
    placeholder: "유저 획득 채널 확보 / 기술적 스케일링 / 팀원 채용 등",
  },
  {
    id: "pitch_deck",
    header: "피치덱",
    question: "피치덱 또는 소개 자료가 있나요? (PDF, 10MB 이하)",
    type: "file",
    required: false,
    accept: ".pdf,.pptx,.ppt",
  },
  {
    id: "additional_files",
    header: "추가 자료",
    question: "추가 자료가 있나요? (이미지, 문서 등 최대 3개)",
    type: "multifile",
    required: false,
    accept: ".pdf,.png,.jpg,.jpeg,.doc,.docx",
    maxFiles: 3,
  },
  {
    id: "links",
    header: "추가 링크",
    question: "추가 참고 링크가 있나요? (Twitter, LinkedIn, 포트폴리오 등)",
    type: "text",
    required: false,
    placeholder: "https://twitter.com/founder, https://linkedin.com/in/founder",
  },
];

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    team_size: "",
    live_url: "",
    demo_url: "",
    repo_url: "",
    days_to_first_deploy: "",
    recent_ships: "",
    iteration_example: "",
    ai_tools: [],
    ai_workflow: "",
    domain_expertise: "",
    why_this_problem: "",
    biggest_blocker: "",
    links: "",
    pitch_deck: null,
    additional_files: [],
  });
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otherInput, setOtherInput] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUESTIONS[currentStep];

  // 지원 마감일: 2025년 2월 1일 23:59:59 KST
  const deadline = new Date("2025-02-01T23:59:59+09:00");
  const now = new Date();
  const isDeadlinePassed = now > deadline;

  // Auto focus and prefill
  useEffect(() => {
    if (currentQuestion) {
      const savedValue = formData[currentQuestion.id];

      if (currentQuestion.type === "multiselect") {
        setSelectedOptions(savedValue as string[] || []);
      } else if (currentQuestion.type === "file" || currentQuestion.type === "multifile") {
        setSelectedFiles([]);
      } else {
        setInputValue((savedValue as string) || "");
      }

      setTimeout(() => {
        if (currentQuestion.type === "textarea") {
          textareaRef.current?.focus();
        } else if (currentQuestion.type === "text" || currentQuestion.type === "email" || currentQuestion.type === "number") {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [currentStep]);

  // Scroll to top on step change
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const validateAndSubmit = () => {
    const question = currentQuestion;
    let value: string | string[] | FileInfo | FileInfo[] | null = inputValue;

    if (question.type === "multiselect") {
      value = selectedOptions;
      if (showOtherInput && otherInput.trim()) {
        value = [...selectedOptions.filter(o => o !== "기타"), otherInput.trim()];
      }
    } else if (question.type === "file") {
      if (selectedFiles.length > 0) {
        const file = selectedFiles[0];
        value = { name: file.name, size: file.size, type: file.type };
      } else {
        value = null;
      }
    } else if (question.type === "multifile") {
      if (selectedFiles.length > 0) {
        value = selectedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }));
      } else {
        value = [];
      }
    }

    // Validation
    if (question.required) {
      if (question.type === "multiselect" && (value as string[]).length === 0) {
        setError("필수 선택 항목입니다");
        return;
      }
      if (question.type !== "multiselect" && question.type !== "file" && question.type !== "multifile") {
        if (!(value as string).trim()) {
          setError("필수 입력 항목입니다");
          return;
        }
      }
    }

    if (question.validation && typeof value === "string" && value.trim()) {
      const validationError = question.validation(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Save
    setFormData((prev) => ({
      ...prev,
      [question.id]: value,
    }));

    setError(null);
    setShowOtherInput(false);
    setOtherInput("");

    // Next or submit
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setInputValue("");
      setSelectedOptions([]);
      setSelectedFiles([]);
    } else {
      handleFinalSubmit(value);
    }
  };

  const handleFinalSubmit = async (lastValue: unknown) => {
    setIsSubmitting(true);

    const finalFormData = {
      ...formData,
      [currentQuestion.id]: lastValue,
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL;

      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            name: finalFormData.name,
            email: finalFormData.email,
            team_size: finalFormData.team_size,
            live_url: finalFormData.live_url,
            demo_url: finalFormData.demo_url,
            repo_url: finalFormData.repo_url,
            days_to_first_deploy: finalFormData.days_to_first_deploy,
            recent_ships: finalFormData.recent_ships,
            iteration_example: finalFormData.iteration_example,
            ai_tools: Array.isArray(finalFormData.ai_tools) ? finalFormData.ai_tools.join(", ") : "",
            ai_workflow: finalFormData.ai_workflow,
            domain_expertise: finalFormData.domain_expertise,
            why_this_problem: finalFormData.why_this_problem,
            biggest_blocker: finalFormData.biggest_blocker,
            links: finalFormData.links,
            pitch_deck: finalFormData.pitch_deck ? finalFormData.pitch_deck.name : "",
            additional_files: finalFormData.additional_files.map(f => f.name).join(", "),
          }),
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      validateAndSubmit();
    }
  };

  const toggleOption = (label: string) => {
    if (label === "기타") {
      setShowOtherInput(!showOtherInput);
      if (!showOtherInput) {
        setSelectedOptions((prev) => [...prev, "기타"]);
      } else {
        setSelectedOptions((prev) => prev.filter(o => o !== "기타"));
        setOtherInput("");
      }
    } else {
      setSelectedOptions((prev) =>
        prev.includes(label) ? prev.filter((o) => o !== label) : [...prev, label]
      );
    }
    setError(null);
  };

  const selectOption = (label: string) => {
    setInputValue(label);
    setTimeout(validateAndSubmit, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024;
    const oversizedFiles = files.filter(f => f.size > maxSize);

    if (oversizedFiles.length > 0) {
      setError("파일 크기는 10MB 이하여야 합니다");
      return;
    }

    if (currentQuestion.type === "file") {
      setSelectedFiles(files.slice(0, 1));
    } else if (currentQuestion.type === "multifile") {
      const maxFiles = currentQuestion.maxFiles || 3;
      setSelectedFiles(files.slice(0, maxFiles));
    }
    setError(null);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
      setShowOtherInput(false);
      setOtherInput("");
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step <= currentStep) {
      setCurrentStep(step);
      setError(null);
      setShowOtherInput(false);
      setOtherInput("");
    }
  };

  // 지원 마감 화면
  if (isDeadlinePassed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-[#333] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">지원이 마감되었습니다</h2>
            <p className="text-[#888] mb-6">
              Hashed Vibe Labs 1기 지원 기간이 종료되었습니다.<br />
              다음 기회에 만나요!
            </p>
            <p className="text-sm text-[#666] mb-8">
              지원 마감: 2025년 2월 1일
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">지원서 제출 완료!</h2>
            <p className="text-[#888] mb-6">
              지원해주셔서 감사합니다.<br />
              결과는 2026년 2월 27일에 발표됩니다.
            </p>
            <p className="text-sm text-[#666] mb-8">
              입력하신 이메일({formData.email})로 결과를 안내드립니다.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#888] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#888]">{currentStep + 1} / {QUESTIONS.length}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-[#222]">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question navigation dots */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
        {QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => goToStep(idx)}
            disabled={idx > currentStep}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentStep
                ? "bg-green-500 scale-150"
                : idx < currentStep
                ? "bg-[#444] hover:bg-[#666] cursor-pointer"
                : "bg-[#222] cursor-not-allowed"
            }`}
            title={q.header}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-4 pt-24 pb-32 min-h-screen"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header chip */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-xs text-green-400 font-medium">
                {currentQuestion.header}
              </span>
              {!currentQuestion.required && (
                <span className="ml-2 text-xs text-[#666]">선택사항</span>
              )}
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold mb-8 leading-relaxed">
              {currentQuestion.question}
              {currentQuestion.required && <span className="text-red-400 ml-1">*</span>}
            </h2>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Input types */}
            <div className="space-y-3">
              {/* Select options */}
              {currentQuestion.type === "select" && currentQuestion.options && (
                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => selectOption(option.label)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        inputValue === option.label
                          ? "bg-green-500/20 border-green-500 text-white"
                          : "bg-[#1a1a1a] border-[#333] hover:border-[#444] text-white"
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      {option.description && (
                        <div className="text-sm text-[#888] mt-1">{option.description}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Multiselect options */}
              {currentQuestion.type === "multiselect" && currentQuestion.options && (
                <>
                  <div className="grid gap-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => toggleOption(option.label)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          selectedOptions.includes(option.label)
                            ? "bg-green-500/20 border-green-500 text-white"
                            : "bg-[#1a1a1a] border-[#333] hover:border-[#444] text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            selectedOptions.includes(option.label)
                              ? "bg-green-500 border-green-500"
                              : "border-[#444]"
                          }`}>
                            {selectedOptions.includes(option.label) && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{option.label}</div>
                            {option.description && (
                              <div className="text-sm text-[#888] mt-0.5">{option.description}</div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Other input for multiselect */}
                  {showOtherInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3"
                    >
                      <input
                        type="text"
                        value={otherInput}
                        onChange={(e) => setOtherInput(e.target.value)}
                        placeholder="다른 도구를 입력해주세요"
                        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </motion.div>
                  )}

                  <button
                    onClick={validateAndSubmit}
                    disabled={selectedOptions.length === 0}
                    className="mt-4 w-full py-4 bg-white text-black rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    다음
                  </button>
                </>
              )}

              {/* Textarea */}
              {currentQuestion.type === "textarea" && (
                <>
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.metaKey) {
                        validateAndSubmit();
                      }
                    }}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-green-500 transition-colors resize-none min-h-[150px]"
                  />
                  <div className="flex items-center justify-between text-xs text-[#666]">
                    <span>Cmd+Enter로 제출</span>
                    <span>{inputValue.length} 글자</span>
                  </div>
                  <button
                    onClick={validateAndSubmit}
                    className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {currentStep === QUESTIONS.length - 1 ? "제출하기" : "다음"}
                  </button>
                </>
              )}

              {/* File upload */}
              {(currentQuestion.type === "file" || currentQuestion.type === "multifile") && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={currentQuestion.accept}
                    multiple={currentQuestion.type === "multifile"}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed border-[#333] rounded-xl hover:border-[#444] transition-colors"
                  >
                    <div className="flex flex-col items-center gap-3 text-[#888]">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div>
                        <span className="text-white font-medium">파일 선택</span>
                        {currentQuestion.type === "multifile" && (
                          <span className="text-[#666]"> (최대 {currentQuestion.maxFiles || 3}개)</span>
                        )}
                      </div>
                      <span className="text-xs">{currentQuestion.accept?.split(",").join(", ")} 지원</span>
                    </div>
                  </button>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {selectedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#333] rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <div className="text-sm font-medium">{file.name}</div>
                              <div className="text-xs text-[#888]">{formatFileSize(file.size)}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="p-2 text-[#888] hover:text-red-400 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={validateAndSubmit}
                    className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors mt-4"
                  >
                    {selectedFiles.length > 0 ? "다음" : "건너뛰기"}
                  </button>
                </>
              )}

              {/* Text/Email/Number input */}
              {(currentQuestion.type === "text" ||
                currentQuestion.type === "email" ||
                currentQuestion.type === "number") && (
                <>
                  <input
                    ref={inputRef}
                    type={currentQuestion.type === "number" ? "number" : "text"}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full px-4 py-4 bg-[#1a1a1a] border border-[#333] rounded-xl text-white text-lg placeholder-[#666] focus:outline-none focus:border-green-500 transition-colors"
                    autoComplete="off"
                  />
                  <button
                    onClick={validateAndSubmit}
                    className="w-full py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {currentStep === QUESTIONS.length - 1 ? "제출하기" : "다음"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-[#222]">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              currentStep === 0
                ? "text-[#444] cursor-not-allowed"
                : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>

          {!currentQuestion.required && currentQuestion.type !== "select" && currentQuestion.type !== "multiselect" && (
            <button
              onClick={validateAndSubmit}
              className="text-[#888] hover:text-white text-sm transition-colors"
            >
              건너뛰기
            </button>
          )}

          {isSubmitting && (
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              제출 중...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
