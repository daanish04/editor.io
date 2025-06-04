export default function HeadLines({ title }) {
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
