"use client";

import React, { useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown.css";
import MarkdownHeader from "./_components/markdownHeader";

const MarkdownPage = () => {
  const [markdown, setMarkdown] = useState(`# Heading 1

## Subheading

This is a paragraph with some **bold**, _italic_, and \`inline code\`.

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`


## To Do List

- [ ] Item 1
- [x] Item 2
- [ ] Item 3

| Feature | Description |
|--------|-------------|
| Bold   | **text** |
| Italic | _text_   |

### More Code Blocks

\`\`\`python
def add(a, b):
    return a + b

print(add(5, 7))
\`\`\`

\`\`\`bash
#!/bin/bash
echo "Shell script!"
\`\`\`

---

`);

  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  const isSyncing = useRef({ editor: false, preview: false });

  const handleEditorScroll = () => {
    if (isSyncing.current.preview) return;
    isSyncing.current.editor = true;

    const editor = textareaRef.current;
    const preview = previewRef.current;

    const ratio =
      editor.scrollTop / (editor.scrollHeight - editor.clientHeight);

    preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);

    isSyncing.current.editor = false;
  };

  const handlePreviewScroll = () => {
    if (isSyncing.current.editor) return;
    isSyncing.current.preview = true;

    const editor = textareaRef.current;
    const preview = previewRef.current;

    const ratio =
      preview.scrollTop / (preview.scrollHeight - preview.clientHeight);

    editor.scrollTop = ratio * (editor.scrollHeight - editor.clientHeight);

    isSyncing.current.preview = false;
  };

  return (
    <div>
      <MarkdownHeader />
      <div className="py-4 px-6 grid grid-cols-2 gap-4 h-full w-full">
        {/* Editor Section */}
        <div className="flex flex-col bg-slate-900 rounded-xl h-[calc(100vh-9.5rem)] overflow-hidden border border-slate-700">
          <div className="text-cream text-xl font-semibold p-3 pl-5 border-b border-slate-700">
            Editor
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            spellCheck={false}
            onChange={(e) => setMarkdown(e.target.value)}
            onScroll={handleEditorScroll}
            className="flex-1 bg-slate-900 text-blue-100 p-4 resize-none 
                     overflow-auto outline-none scrollbar-thin 
                     scrollbar-thumb-slate-700 scrollbar-track-slate-800"
          />
        </div>

        {/* Preview Section */}
        <div className="flex flex-col bg-slate-900 rounded-xl h-[calc(100vh-9.5rem)] overflow-hidden border border-slate-700">
          <div className="text-cream text-xl font-semibold p-3 pl-5 border-b border-slate-700">
            Preview
          </div>
          <div
            ref={previewRef}
            onScroll={handlePreviewScroll}
            className="markdown-body flex-1 p-4 overflow-auto 
                     scrollbar-thin scrollbar-thumb-slate-700 
                     scrollbar-track-slate-800"
          >
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
                    <code className="text-orange-400 rounded px-1" {...props}>
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
      </div>
    </div>
  );
};

export default MarkdownPage;
