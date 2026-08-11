import { CheckCircle2, MousePointer2, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';

const colorClasses = {
  primary: {
    panel: 'bg-primary/10',
    icon: 'bg-primary text-primary-content',
    badge: 'badge-primary',
    dot: 'badge-primary',
  },
  secondary: {
    panel: 'bg-secondary/10',
    icon: 'bg-secondary text-secondary-content',
    badge: 'badge-secondary',
    dot: 'badge-secondary',
  },
  accent: {
    panel: 'bg-accent/10',
    icon: 'bg-accent text-accent-content',
    badge: 'badge-accent',
    dot: 'badge-accent',
  },
  success: {
    panel: 'bg-success/10',
    icon: 'bg-success text-white',
    badge: 'badge-success',
    dot: 'badge-success',
  },
  warning: {
    panel: 'bg-warning/10',
    icon: 'bg-warning text-neutral',
    badge: 'badge-warning',
    dot: 'badge-warning',
  },
  info: {
    panel: 'bg-info/10',
    icon: 'bg-info text-white',
    badge: 'badge-info',
    dot: 'badge-info',
  },
};

const studyPlanItems = [
  'Review lecture notes',
  'Finish the current task',
  'Ship or share the link',
];

function InfoPanel({ selectedObject, onClearSelection, isDarkRoom }) {
  const [focusSessionStarted, setFocusSessionStarted] = useState(false);
  const Icon = selectedObject?.Icon;
  const classes = selectedObject ? colorClasses[selectedObject.color] : null;
  const isClockSelected = selectedObject?.id === 'clock';

  const getSelectionMessage = () => {
    if (!selectedObject) return '';
    if (selectedObject.id === 'lamp') {
      return isDarkRoom ? 'Warm study light on' : 'Day study mode';
    }
    return `${selectedObject.name} selected · ${selectedObject.mode}`;
  };

  return (
    <aside className="panel-shell rounded-2xl border border-base-300 bg-base-100 p-5 shadow-calm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Selection
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-base-content">
            {selectedObject ? selectedObject.name : 'Nothing selected'}
          </h2>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onClearSelection}>
          <RotateCcw size={16} />
          Clear
        </button>
      </div>

      {!selectedObject ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-base-300 bg-base-200/60 px-4 py-3 text-sm text-base-content/70">
          <MousePointer2 size={18} className="mt-0.5 shrink-0" />
          <span>Click a 3D object in the room to open its study mode.</span>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <div className={`flex items-center gap-3 rounded-xl border border-base-300 px-4 py-3 ${classes.panel}`}>
            <Icon size={18} />
            <span className="text-sm font-medium">{getSelectionMessage()}</span>
          </div>

          <div className={`rounded-2xl border border-base-300 p-5 ${classes.panel}`}>
            <div className="flex items-center gap-3">
              {Icon && (
                <span className={`rounded-xl p-3 ${classes.icon}`}>
                  <Icon size={22} />
                </span>
              )}
              <div>
                <h3 className="font-display text-xl font-bold">{selectedObject.mode}</h3>
                <span className={`badge mt-1 border-0 ${classes.badge}`}>
                  {selectedObject.badge}
                </span>
              </div>
            </div>
            <p className="mt-4 leading-7 text-base-content/70">{selectedObject.description}</p>

            {selectedObject.id === 'laptop' && (
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => setFocusSessionStarted(true)}
                >
                  Start focus session
                </button>
                {focusSessionStarted && (
                  <div className="flex items-center gap-2 rounded-xl bg-success/15 px-3 py-2 text-sm text-success">
                    <CheckCircle2 size={16} />
                    <span>Session started. Keep one task on screen.</span>
                  </div>
                )}
              </div>
            )}

            {selectedObject.id === 'book' && (
              <div className="mt-4 rounded-xl bg-base-100/70 p-4">
                <p className="mb-3 font-semibold">Checklist</p>
                <ol className="space-y-2 text-sm">
                  {studyPlanItems.map((item, index) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="badge badge-sm badge-primary">{index + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-base-content/55">
              Tips
            </h3>
            <ul className="space-y-2">
              {selectedObject.tips.map((tip) => (
                <li key={tip} className="flex items-center gap-2 text-sm text-base-content/70">
                  <span className={`badge badge-xs ${classes.dot}`} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-5">
        <PomodoroTimer isFeatured={isClockSelected} />
      </div>
    </aside>
  );
}

export default InfoPanel;
