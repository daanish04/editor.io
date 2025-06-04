"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GrDrag } from "react-icons/gr";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";

export default function CodePage() {
  const [htmlCode, setHtmlCode] = useState(`<h1>
    Welcome to Editor.io
</h1>`);
  const [cssCode, setCssCode] = useState(`body {
    color: #17131a;
    text-align: center;
}`);
  const [jsCode, setJsCode] = useState(`console.log("Welcome to Editor.io!");`);
  const [srcDoc, setSrcDoc] = useState(`
        <html>
          <style>${cssCode}</style>
          <body>${htmlCode}</body>
          <script>${jsCode}</script>
        </html>
      `);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${cssCode}</style>
          <body>${htmlCode}</body>
          <script>${jsCode}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="h-[calc(100vh-5rem)] font-mono text-cream pt-2 px-4 bg-gray-950">
      <PanelGroup direction="vertical" autoSaveId="layout-vert">
        <Panel defaultSize={60} minSize={20}>
          <PanelGroup direction="horizontal" autoSaveId="layout-hor">
            <Panel defaultSize={30} minSize={25} className="rounded ">
              <EditorSection
                icon={<FaHtml5 className="text-red-500" />}
                title="HTML"
                value={htmlCode}
                onChange={setHtmlCode}
                extension={html()}
              />
            </Panel>
            <PanelResizeHandle className="flex justify-center items-center">
              <GrDrag className="text-primary/80" />
            </PanelResizeHandle>
            <Panel defaultSize={30} minSize={25} className="rounded">
              <EditorSection
                icon={<FaCss3Alt className="text-blue-500" />}
                title="CSS"
                value={cssCode}
                onChange={setCssCode}
                extension={css()}
              />
            </Panel>
            <PanelResizeHandle className="flex justify-center items-center">
              <GrDrag className="text-primary/80" />
            </PanelResizeHandle>
            <Panel defaultSize={30} minSize={25} className=" rounded">
              <EditorSection
                icon={<RiJavascriptFill className="text-yellow-500" />}
                title="JavaScript"
                value={jsCode}
                onChange={setJsCode}
                extension={javascript()}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="flex justify-center items-center">
          <GrDrag className="text-primary/80 transform rotate-90" />
        </PanelResizeHandle>
        <Panel defaultSize={40} minSize={20} className="bg-white">
          <iframe
            srcDoc={srcDoc}
            title="Live Preview"
            sandbox="allow-scripts"
            className="w-full h-full border-0 bg-none"
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}

function EditorSection({ icon, title, value, onChange, extension }) {
  return (
    <div className="pt-1">
      <div className="relative flex items-center gap-2 mb-2 text-lg ml-3 z-10 font-semibold text-gray-300">
        {icon} {title}
        <HeadLines title={title} />
      </div>
      <CodeMirror
        value={value}
        onChange={(val) => onChange(val)}
        extensions={[extension]}
        height="360px"
        theme="dark"
        basicSetup={{ lineNumbers: true, lineWrapping: true }}
      />
    </div>
  );
}

function HeadLines({ title }) {
  return (
    <div>
      <div
        className="absolute left-7 top-0.5 h-2 bg-primary/20 z-1"
        style={{ width: `${title.length * 0.7}rem` }}
      ></div>
      <div
        className="absolute left-8 top-2.5 h-2 bg-primary/20 z-1"
        style={{ width: `${title.length * 0.7}rem` }}
      ></div>
      <div
        className="absolute left-9 top-4.5 h-2 bg-primary/20 z-1"
        style={{ width: `${title.length * 0.7}rem` }}
      ></div>
    </div>
  );
}
