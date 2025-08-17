import { JSX, ReactNode, HTMLAttributes } from 'react'
import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

function Code({ children, ...props }: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  const codeHTML = highlight(String(children))
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code,
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
