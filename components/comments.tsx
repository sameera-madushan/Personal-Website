'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {

  const { theme } = useTheme();

  return (
    <div className="mt-20">
      <Giscus
        id="comments"
        repo="sameera-madushan/Personal-Website"
        repoId="R_kgDOPexzFQ"
        category="Comments"
        categoryId="DIC_kwDOPexzFc4CugJD"
        mapping="url"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="en"
      />
    </div>
  );
}
