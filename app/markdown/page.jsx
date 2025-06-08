"use client";

import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown.css";
import MarkdownHeader from "./_components/markdownHeader";
import { useUserSettings } from "@/context/userSettingsContext";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getMd, saveMd } from "@/actions/saveState";

const DEFAULT_TEXT = `# Heading 1

## Subheading

This is a paragraph with some **bold**, _italic_, ~strikethrough~ , and \`inline code\`.

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

`;

const MarkdownPage = () => {
  const searchParams = useSearchParams();
  const { settings } = useUserSettings();
  const [markdown, setMarkdown] = useState(DEFAULT_TEXT);
  const [filename, setFilename] = useState(null);
  const [mdId, setMdId] = useState(null);

  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  const isSyncing = useRef({ editor: false, preview: false });

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      setMdId(null);
      setFilename(null);
      setMarkdown(DEFAULT_TEXT);
      return;
    }

    const fetchMd = async () => {
      const data = await getMd(id);
      if (data.success) {
        setMarkdown(data.data.markdown);
        setMdId(data.data.id);
        setFilename(data.data.name);
      } else {
        toast.error("Failed to load code");
      }
    };

    fetchMd();
  }, [searchParams]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) return;
    // Only load localStorage content if there's no id in the URL
    if (settings?.autosaveMode === "LOCAL") {
      const storedMd = localStorage.getItem("markdown");

      if (storedMd) setMarkdown(storedMd);
    }
  }, [settings?.autosaveMode]);

  useEffect(() => {
    if (settings?.autosaveMode === "LOCAL") {
      const id = searchParams.get("id");
      if (id) {
        const timeout = setTimeout(() => {
          localStorage.setItem(`markdown-${id}`, markdown);
        }, 1000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          localStorage.setItem("markdown", markdown);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [markdown, settings?.autosaveMode]);

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

  const handleSave = async (name) => {
    if (!markdown.trim()) {
      toast.error("Cannot save empty markdown!");
      return;
    }

    const md = {
      ...(mdId ? { id: mdId } : {}),
      name,
      markdown,
    };

    const saved = await saveMd(md);

    if (saved.success) {
      if (saved.data.id) {
        setMdId(saved.data.id);
      }
      toast.success("Saved successfully");
    } else {
      toast.error(saved.error || "Internal error occurred");
    }
  };

  return (
    <div>
      <MarkdownHeader
        autosave={settings?.autosaveMode}
        markdown={markdown}
        codeName={filename}
        setMarkdown={setMarkdown}
        handleSave={handleSave}
      />
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
              remarkPlugins={settings?.enableGFM ? [remarkGfm] : []}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");

                  if (!settings?.syntaxHighlighting || inline || !match) {
                    return (
                      <code className="text-amber-600 rounded px-1" {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
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
