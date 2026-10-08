const VARIANTS = {
  number: "bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-500",
  function: "bg-slate-500 text-white hover:bg-slate-400 active:bg-slate-300 active:text-slate-900",
  operator: "bg-orange-700 text-white hover:bg-orange-600 active:bg-orange-500",
};

function Button({ label, ariaLabel, variant = "number", wide = false, onClick }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className={`h-14 min-w-0 select-none touch-manipulation rounded-2xl text-xl font-medium shadow-sm transition duration-150 ease-out active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 sm:h-16 sm:text-2xl md:h-20 md:rounded-3xl md:text-3xl ${
        wide ? "col-span-2" : ""
      } ${VARIANTS[variant]}`}
    >
      {label}
    </button>
  );
}

export default Button;