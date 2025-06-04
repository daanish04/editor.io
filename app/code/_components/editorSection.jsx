import HeadLines from "./headLines";
import CodeMirror from "@uiw/react-codemirror";

export default function EditorSection({
  icon,
  title,
  value,
  onChange,
  extension,
}) {
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
