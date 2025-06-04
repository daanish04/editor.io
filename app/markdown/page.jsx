"use client";

import React, { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown.css";

const MarkdownPage = () => {
  const [markdown, setMarkdown] = useState(`# Heading 1

## Heading 2

This is some markdown with **bold**, _italic_, and \`inline code\`.

\`\`\`js
console.log("Syntax highlighted code block");
\`\`\`

- List item
- [ ] Task item

| Table | Example |
|-------|---------|
| Cell  | ✅ |
`);

  return (
    <div className=" py-2 px-4 grid grid-cols-2 gap-2 h-full w-full  overflow-y-hidden">
      <textarea
        value={markdown}
        spellCheck={false}
        className=" bg-slate-900 text-blue-100 rounded-md p-2 resize-none"
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="markdown-body overflow-auto p-4 bg-slate-900 rounded-md h-[calc(100vh-5rem)]">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className=" text-orange-400 rounded px-1 overflow-y-hidden"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

export default MarkdownPage;
