import HeadLines from "./headLines";
import CodeMirror from "@uiw/react-codemirror";

export default function EditorSection({
  icon,
  title,
  value,
  onChange,
  extension,
  settings,
}) {
  return (
    <div className="pt-1">
      <div className="relative flex items-center gap-2 mb-2 text-lg ml-3 z-10 font-semibold text-gray-300">
        {icon} {title}
        <HeadLines title={title} />
      </div>
      {settings && (
        <CodeMirror
          className={`${
            settings.fontSize === "SM"
              ? "text-[12px]"
              : settings.fontSize === "LG"
              ? "text-[16px]"
              : "text-[14px]"
          } ${settings.theme === "light" ? "text-zinc-600" : ""}`}
          value={value}
          onChange={(val) => onChange(val)}
          extensions={[extension]}
          height="500px"
          theme={settings.theme || "dark"}
          basicSetup={{ lineNumbers: settings.lineNumbers }}
        />
      )}
    </div>
  );
}
