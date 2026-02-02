"use client";

interface ApplyFormProps {
  language: "ko" | "en";
  onComplete: () => void;
  onCancel: () => void;
}

export default function ApplyForm({ language, onComplete, onCancel }: ApplyFormProps) {
  const isKo = language === "ko";

  return (
    <div className="py-4">
      <div className="text-[#e07a5f] font-bold mb-4">
        {isKo ? "📧 지원 안내" : "📧 Application Guide"}
      </div>
      
      <div className="text-[#d8d8d8] mb-4 leading-relaxed">
        <p className="mb-3">
          {isKo 
            ? "vibelabs@hashed.com 으로 아래 내용을 포함해 메일을 보내주세요."
            : "Please send an email to vibelabs@hashed.com with the following:"}
        </p>
        
        <div className="mb-3">
          <span className="text-[#4ade80]">{isKo ? "필수:" : "Required:"}</span>
          <ul className="ml-4 mt-1 text-[#a0a0a0]">
            <li>• {isKo ? "팀 소개 (인원, 풀타임 여부, 소셜 링크)" : "Team intro (size, full-time status, social links)"}</li>
            <li>• {isKo ? "라이브 서비스 URL" : "Live service URL"}</li>
          </ul>
        </div>
        
        <div className="mb-3">
          <span className="text-[#fbbf24]">{isKo ? "선택 (있으면 좋음):" : "Optional (nice to have):"}</span>
          <ul className="ml-4 mt-1 text-[#a0a0a0]">
            <li>• {isKo ? "데모 영상 또는 스크린샷" : "Demo video or screenshots"}</li>
            <li>• GitHub/GitLab repo</li>
            <li>• {isKo ? "현재 트랙션 (유저 수, ARR 등)" : "Current traction (users, ARR, etc.)"}</li>
          </ul>
        </div>
        
        <p className="text-[#666] text-sm">
          {isKo ? "* 형식은 자유입니다." : "* Format is flexible."}
        </p>
      </div>
      
      <div className="text-[#ef4444] text-sm mb-4">
        ⚠️ {isKo ? "지원 마감: 2026년 2월 19일 (목) 23:59:59 KST" : "Deadline: Feb 19, 2026 (Thu) 23:59:59 KST"}
      </div>
      
      <div className="flex gap-3">
        <a
          href="mailto:vibelabs@hashed.com?subject=[HVL 지원] "
          className="px-4 py-2 bg-[#e07a5f] text-white rounded hover:bg-[#d06a4f] transition-colors"
        >
          {isKo ? "이메일 보내기" : "Send Email"}
        </a>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-[#666] hover:text-[#888] transition-colors"
        >
          {isKo ? "닫기" : "Close"}
        </button>
      </div>
    </div>
  );
}
