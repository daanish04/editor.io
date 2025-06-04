"use client";

import { useState, useEffect } from "react";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GrDrag } from "react-icons/gr";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { MdRefresh } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditorSection from "./_components/editorSection";

export default function CodePage() {
  const [layoutKey, setLayoutKey] = useState(0);
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
    }, 300);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  const handleScreenReset = () => {
    localStorage.setItem(
      "react-resizable-panels:layout-hor",
      `{"{\"defaultSize\":30,\"minSize\":25},{\"defaultSize\":30,\"minSize\":25},{\"defaultSize\":30,\"minSize\":25}":{"expandToSizes":{},"layout":[33.3333333334,33.3333333333,33.3333333333]}}`
    );
    localStorage.setItem(
      "react-resizable-panels:layout-vert",
      `{"{\"defaultSize\":40,\"minSize\":20},{\"defaultSize\":60,\"minSize\":20}":{"expandToSizes":{},"layout":[60,40]}}`
    );

    setLayoutKey((prev) => prev + 1);
  };

  const handleCodeReset = () => {
    setHtmlCode(`<h1>
    Welcome to Editor.io
</h1>`);
    setCssCode(`body {
    color: #17131a;
    text-align: center;
}`);
    setJsCode(`console.log("Welcome to Editor.io!");`);
  };

  return (
    <div className="h-[calc(100vh-5rem)] font-mono text-cream pt-2 px-4 bg-gray-950">
      <div className="absolute right-5 top-24 text-cream z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdRefresh size={24} className="bg-none text-cream" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-22 bg-dusk/70 text-primary">
            <DropdownMenuItem
              className="hover:bg-dusk"
              onSelect={handleScreenReset}
            >
              Screens
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-dusk"
              onSelect={handleCodeReset}
            >
              Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <PanelGroup key={layoutKey} direction="vertical" autoSaveId="layout-vert">
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
            <PanelResizeHandle className="bg-primary/5 rounded-t-md flex justify-center items-center">
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
            <PanelResizeHandle className="bg-primary/5 rounded-t-md flex justify-center items-center">
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
        <PanelResizeHandle className="bg-primary/5 rounded-t-md flex justify-center items-center">
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
