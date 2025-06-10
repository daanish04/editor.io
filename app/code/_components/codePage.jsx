"use client";

import { useState, useEffect } from "react";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GrDrag } from "react-icons/gr";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import EditorSection from "./editorSection";
import CodeHeader from "./codeHeader";
import { useUserSettings } from "@/context/userSettingsContext";
import { getCode, saveCode } from "@/actions/saveState";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function CodePage() {
  const searchParams = useSearchParams();
  const { settings } = useUserSettings();
  const [filename, setFilename] = useState(null);
  const [layoutKey, setLayoutKey] = useState(0);
  const [codeId, setCodeId] = useState(null);
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
    const id = searchParams.get("id");
    if (!id) {
      setCodeId(null);
      setFilename(null);
      setHtmlCode(`<h1>
    Welcome to Editor.io
</h1>`);
      setCssCode(`body {
    color: #17131a;
    text-align: center;
}`);
      setJsCode(`console.log("Welcome to Editor.io!");`);
      return;
    }

    const fetchCode = async () => {
      const data = await getCode(id);
      if (data.success) {
        setHtmlCode(data.data.html);
        setCssCode(data.data.css);
        setJsCode(data.data.js);
        setCodeId(data.data.id);
        setFilename(data.data.name);
      } else {
        toast.error("Failed to load code");
      }
    };

    fetchCode();
  }, [searchParams]);

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

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) return;
    // Only load localStorage content if there's no id in the URL
    if (settings?.autosaveMode === "LOCAL") {
      const storedHtml = localStorage.getItem("editor-html");
      const storedCss = localStorage.getItem("editor-css");
      const storedJs = localStorage.getItem("editor-js");

      if (storedHtml) setHtmlCode(storedHtml);
      if (storedCss) setCssCode(storedCss);
      if (storedJs) setJsCode(storedJs);
    }
  }, [settings?.autosaveMode]);

  useEffect(() => {
    if (settings?.autosaveMode === "LOCAL") {
      const id = searchParams.get("id");
      if (id) {
        const timeout = setTimeout(() => {
          localStorage.setItem(`editor-html-${id}`, htmlCode);
          localStorage.setItem(`editor-css-${id}`, cssCode);
          localStorage.setItem(`editor-js-${id}`, jsCode);
        }, 1000);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          localStorage.setItem("editor-html", htmlCode);
          localStorage.setItem("editor-css", cssCode);
          localStorage.setItem("editor-js", jsCode);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    }
  }, [htmlCode, cssCode, jsCode, settings?.autosaveMode]);

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

  const handleSave = async (name) => {
    if (!htmlCode.trim() && !cssCode.trim() && !jsCode.trim()) {
      toast.error("Cannot save empty code!");
      return;
    }

    const code = {
      ...(codeId ? { id: codeId } : {}),
      name,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    };

    const saved = await saveCode(code);

    if (saved.success) {
      if (saved.data.id) {
        setCodeId(saved.data.id);
      }
      toast.success("Saved successfully");
    } else {
      toast.error(saved.error || "Internal error occurred");
    }
  };

  return (
    <div>
      <CodeHeader
        handleSave={handleSave}
        autosave={settings?.autosaveMode}
        keepSound={settings?.buttonSounds}
        codeName={filename}
        onResetScreen={handleScreenReset}
        onResetCode={handleCodeReset}
      />

      <div className="h-[calc(100vh-7.5rem)] font-mono text-cream pt-2 px-4 bg-gray-950">
        <PanelGroup
          key={layoutKey}
          direction="vertical"
          autoSaveId="layout-vert"
        >
          <Panel defaultSize={60} minSize={20}>
            <PanelGroup direction="horizontal" autoSaveId="layout-hor">
              <Panel defaultSize={30} minSize={25} className="rounded ">
                <EditorSection
                  icon={<FaHtml5 className="text-red-500" />}
                  title="HTML"
                  value={htmlCode}
                  onChange={setHtmlCode}
                  extension={html()}
                  settings={settings}
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
                  settings={settings}
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
                  settings={settings}
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
    </div>
  );
}
