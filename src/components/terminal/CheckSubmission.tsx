"use client";

interface CheckSubmissionProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function CheckSubmission({ onCancel }: CheckSubmissionProps) {
  return (
    <div className="py-4">
      <div className="text-terminal-accent font-bold mb-4">
        📬 제출 확인
      </div>
      
      <div className="text-[#d8d8d8] mb-4 leading-relaxed">
        <p className="mb-3">
          지원서는 이메일로 제출하는 방식으로 변경되었습니다.
        </p>
        <p className="text-[#a0a0a0]">
          vibelabs@hashed.com 으로 보내신 이메일이 정상적으로 발송되었는지 확인해주세요.
        </p>
      </div>
      
      <button
        onClick={onCancel}
        className="px-4 py-2 text-[#666] hover:text-[#888] transition-colors"
      >
        닫기
      </button>
    </div>
  );
}
