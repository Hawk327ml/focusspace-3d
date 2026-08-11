import { FEATURE_CARDS } from '../data/studyObjects';

const toneByColor = {
  primary: 'border-primary/40 bg-primary/10 text-primary',
  secondary: 'border-secondary/40 bg-secondary/10 text-secondary',
  accent: 'border-accent/40 bg-accent/10 text-accent',
  success: 'border-success/40 bg-success/10 text-success',
  warning: 'border-warning/40 bg-warning/10 text-warning',
  info: 'border-info/40 bg-info/10 text-info',
};

function FeatureCards({ selectedId, onSelect }) {
  return (
    <section id="modes" className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Quick select
          </p>
          <h2 className="font-display text-3xl font-bold text-base-content">Study modes</h2>
        </div>
        <p className="max-w-md text-sm text-base-content/55">
          Same six tools as the scene — pick here if you prefer a list over the canvas.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((item) => {
          const Icon = item.Icon;
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`group flex items-start gap-4 rounded-2xl border px-4 py-4 text-left transition duration-200 ${
                isSelected
                  ? 'border-primary bg-primary text-primary-content shadow-calm'
                  : 'border-base-300 bg-base-100/70 hover:-translate-y-0.5 hover:border-primary/40'
              }`}
              onClick={() => onSelect(item.id)}
            >
              <span
                className={`mt-0.5 rounded-xl border p-2.5 ${
                  isSelected ? 'border-white/25 bg-white/15' : toneByColor[item.color]
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-display text-lg font-bold leading-tight">
                  {item.featureTitle ?? item.mode}
                </span>
                <span
                  className={`mt-1 block text-sm ${
                    isSelected ? 'text-primary-content/80' : 'text-base-content/55'
                  }`}
                >
                  {item.name} · {item.badge}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureCards;
