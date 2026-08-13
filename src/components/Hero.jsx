function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-7xl overflow-hidden px-4 pb-8 pt-10 sm:px-8 sm:pt-14"
    >
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <p className="animate-rise text-xs font-bold uppercase tracking-[0.28em] text-primary">
        3D Study Room
      </p>
      <h1 className="animate-rise mt-3 font-display text-5xl font-extrabold tracking-tight text-base-content sm:text-6xl lg:text-7xl">
        FocusSpace
      </h1>
      <p
        className="animate-rise mt-4 max-w-xl text-lg leading-8 text-base-content/70"
        style={{ animationDelay: '0.08s' }}
      >
        点物件切模式 · 灯控日夜 · 时钟开番茄钟
      </p>
      <p
        className="animate-rise mt-3 text-sm text-base-content/45"
        style={{ animationDelay: '0.1s' }}
      >
        Tip: 先点台灯或时钟，再拖拽旋转书房
      </p>
      <div className="animate-rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: '0.14s' }}>
        <a href="#room" className="btn btn-primary">
          进入书房
        </a>
        <a href="#modes" className="btn btn-ghost border border-base-300">
          快捷模式
        </a>
      </div>
    </section>
  );
}

export default Hero;
