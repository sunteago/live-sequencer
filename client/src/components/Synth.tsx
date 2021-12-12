// @ts-nocheck

import { useEffect, useState } from "react";
import * as Tone from "tone";
import { MonoSynthOptions } from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
import { getRandomNote, shouldReproduce } from "../utils";

const synthConfig: RecursivePartial<MonoSynthOptions> = {
  oscillator: {
    type: "sawtooth",
  },
  envelope: {
    attack: 0.01,
    release: 0.01,
  },
};
const synth1 = new Tone.MonoSynth({
  ...synthConfig,
  envelope: {
    ...synthConfig.envelope,
    release: 2,
  },
}).toDestination();
const synth2 = new Tone.MonoSynth({
  ...synthConfig,
  filter: {
    frequency: 1200,
    type: "bandpass",
  },
  filterEnvelope: {
    attack: 0.5,
  },
}).toDestination();
const synth3 = new Tone.MonoSynth({
  ...synthConfig,
  filter: {
    frequency: 1200,
    type: "bandpass",
  },
  filterEnvelope: {
    attack: 0.5,
  },
}).toDestination();

const INITIAL_BPM = 60;
const osc = new Tone.Oscillator().toDestination();
// repeated event every 8th note
Tone.Transport.bpm.value = INITIAL_BPM;
Tone.Transport.scheduleRepeat((time) => {
  // use the callback time to schedule events

  // Bass
  if (shouldReproduce(0.1)) {
    synth1.triggerAttackRelease(getRandomNote(undefined, [3, 4]), "4n");
  }

  if (shouldReproduce(0.6)) {
    synth2.triggerAttackRelease(getRandomNote(), "8n");
  }

  if (shouldReproduce(0.5)) {
    synth3.triggerAttackRelease(getRandomNote(), "8n");
  }
}, "4n");
// transport must be started before it starts invoking events
// Tone.Transport.start();

function Synth() {
  const [bpm, setBpm] = useState(INITIAL_BPM);
  const handleOnClick = () => {
    Tone.Transport.toggle();
  };

  const handleChangeRange = (e) => {
    const num = e.target.value;

    console.log("setting to num = " + bpm);
    Tone.Transport.bpm.value = num;
    setBpm(num);
  };

  useEffect(() => {
    return () => {
      Tone.Transport.stop();
    };
  }, []);

  return (
    <div className="Synth" style={{ padding: "1rem" }}>
      <div style={{ display: "block", margin: "1rem" }}>BPM: {bpm}</div>
      <button onClick={handleOnClick}>Toggle random synth</button>
      <input
        type="range"
        style={{ display: "block", margin: "1rem" }}
        value={bpm}
        min={30}
        max={150}
        onChange={handleChangeRange}
      />
    </div>
  );
}

export default Synth;
