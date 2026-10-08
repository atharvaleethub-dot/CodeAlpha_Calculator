// Makes the font smaller as the number gets longer so it never overflows
function getValueSize(length) {
  if (length <= 8) return "text-4xl sm:text-5xl md:text-6xl";
  if (length <= 11) return "text-3xl sm:text-4xl md:text-5xl";
  if (length <= 14) return "text-2xl sm:text-3xl md:text-4xl";
  return "text-xl sm:text-2xl md:text-3xl";
}

function Display({ expression, value }) {
  return (
    <div
      className="mb-3 flex min-h-24 flex-col items-end justify-end overflow-hidden rounded-2xl bg-slate-900 p-3 text-right sm:mb-4 sm:min-h-28 sm:p-4 md:min-h-32"
      aria-live="polite"
    >
      <div
        className="h-6 w-full truncate text-sm text-slate-400 sm:text-base md:h-7 md:text-lg"
        title={expression}
      >
        {expression}
      </div>
      <div
        className={`w-full overflow-hidden whitespace-nowrap font-semibold tabular-nums text-white ${getValueSize(
          value.length
        )}`}
      >
        {value}
      </div>
    </div>
  );
}

export default Display;