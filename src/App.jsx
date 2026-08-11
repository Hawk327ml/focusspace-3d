import { useMemo, useState } from 'react';
import FeatureCards from './components/FeatureCards';
import Hero from './components/Hero';
import InfoPanel from './components/InfoPanel';
import Navbar from './components/Navbar';
import StudyRoomScene from './components/StudyRoomScene';
import { STUDY_OBJECTS } from './data/studyObjects';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [isDarkRoom, setIsDarkRoom] = useState(true);

  const selectedObject = useMemo(
    () => (selectedId ? STUDY_OBJECTS[selectedId] : null),
    [selectedId],
  );

  const handleSelectObject = (objectId) => {
    setSelectedId(objectId);

    if (objectId === 'lamp') {
      setIsDarkRoom((currentValue) => !currentValue);
    }
  };

  const handleClearSelection = () => {
    setSelectedId(null);
  };

  return (
    <div
      data-theme={isDarkRoom ? 'focus' : 'focusday'}
      className="min-h-screen bg-base-200 font-sans text-base-content"
    >
      <Navbar isDarkRoom={isDarkRoom} />
      <Hero />

      <main>
        <section
          id="room"
          className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-10 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]"
        >
          <StudyRoomScene
            selectedId={selectedId}
            onSelectObject={handleSelectObject}
            isDarkRoom={isDarkRoom}
          />
          <InfoPanel
            selectedObject={selectedObject}
            onClearSelection={handleClearSelection}
            isDarkRoom={isDarkRoom}
          />
        </section>

        <FeatureCards selectedId={selectedId} onSelect={handleSelectObject} />
      </main>

      <footer className="border-t border-base-300 px-4 py-8 text-center text-sm text-base-content/50 sm:px-8">
        FocusSpace · React Three Fiber study room by Hawk327ml
      </footer>
    </div>
  );
}

export default App;
