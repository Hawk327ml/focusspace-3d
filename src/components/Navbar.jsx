function Navbar({ isDarkRoom }) {
  return (
    <header className="sticky top-0 z-30 border-b border-base-300/80 bg-base-100/80 px-4 backdrop-blur-md sm:px-8 animate-rise">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <a href="#top" className="group flex items-baseline gap-3">
          <span className="font-display text-2xl font-extrabold tracking-tight text-base-content">
            FocusSpace
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45 sm:inline">
            3D Study Room
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href="#room"
            className="btn btn-ghost btn-sm hidden font-semibold sm:inline-flex"
          >
            进入书房
          </a>
          <span
            className={`badge badge-sm border-0 ${
              isDarkRoom ? 'bg-primary/20 text-primary' : 'bg-base-300 text-base-content'
            }`}
          >
            {isDarkRoom ? 'Night' : 'Day'}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
