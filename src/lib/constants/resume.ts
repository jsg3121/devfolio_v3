interface ResumeDocument {
  label: string;
  description: string;
  href: string;
  fileName: string;
}

export const RESUME_DOCUMENTS: ResumeDocument[] = [
  {
    label: '이력서',
    description: '학력, 경력, 보유 기술을 한눈에 정리한 문서',
    href: '/resume/resume-sungyujang.pdf',
    fileName: '장선규_이력서.pdf',
  },
  {
    label: '포트폴리오',
    description: '주요 작업물과 문제 해결 과정을 담은 자료',
    href: '/resume/portfolio-sungyujang.pdf',
    fileName: '장선규_포트폴리오.pdf',
  },
];
