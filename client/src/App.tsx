// @ts-nocheck

import React, { useCallback, useState } from "react";
// import Synth from "./components/Synth";
import Sequencer from "./components/Sequencer";

const components: { [k: string]: React.FC } = {
  // synth: Synth,
  sequencer: Sequencer,
};

function App() {
  const [current, setCurrent] = useState("sequencer");

  const handleSetCurrent = useCallback((componentToRender) => {
    return () => {
      setCurrent(componentToRender);
    };
  }, []);

  const Current = components[current];

  return (
    <div className="App" style={{ padding: "1rem" }}>
      Displaying: {current}
      {/* <button onClick={handleSetCurrent("synth")}>Random Synth</button>
      <button onClick={handleSetCurrent("sequencer")}>Sequencer</button> */}
      <Current />
    </div>
  );
}

export default App;
