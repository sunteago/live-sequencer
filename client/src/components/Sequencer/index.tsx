// @ts-nocheck

import { memo, useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import useSpecialVar from "../../hooks/useSpecialVar";
import classes from "./index.module.css";
import { makeGrid, makeSynths } from "./utils";

interface Props {
  onBeatChange: () => void;
}

const Sequencer: React.FC<Props> = ({ onBeatChange }) => {
  const [grid, setGrid, getCurrentGrid] = useSpecialVar(() => makeGrid());
  const [synths, setSynths] = useState(() => makeSynths(grid.length));
  const [beat, setBeat, getCurrentBeat] = useSpecialVar(0);
  const [playing, setPlaying] = useState(false);

  const started = useRef(false);

  const handleToggle = useCallback(() => {
    if (!started.current) {
      Tone.start();
      Tone.getDestination().volume.rampTo(-12, 0.001);
      started.current = true;
    }

    setPlaying((p) => !p);
    Tone.Transport.toggle();
  }, []);

  const handleRandomize = useCallback(() => {
    setGrid(makeGrid());
  }, []);

  const repeat = useCallback(
    (time: Time) => {
      getCurrentGrid().forEach((row, index) => {
        const beat = getCurrentBeat();
        const synth = synths[index];
        const note = row[beat];

        if (note.isActive) {
          synth.triggerAttackRelease(note.note, "8n", time);
        }
      });

      setBeat((prevBeat) => (prevBeat + 1) % 16);
    },
    [synths]
  );

  const handleNoteClick = useCallback(
    (rowIdx: number, noteIdx: number, e: any) => {
      setGrid((prevGrid) =>
        prevGrid.map((row, rowIndex) => {
          return row.map((note, noteIndex) => {
            if (rowIdx === rowIndex && noteIdx === noteIndex) {
              return { ...note, isActive: !note.isActive };
            }

            return note;
          });
        })
      );
    },
    []
  );

  useEffect(() => {
    Tone.Transport.bpm.value = 100;
    Tone.Transport.scheduleRepeat(repeat, "8n");
  }, []);

  return (
    <div className={classes.Sequencer}>
      <div className={classes.ActionButtons}>
        <button className={classes.ActionButton} onClick={handleToggle}>
          {playing ? "Stop" : "Play"}
        </button>
        <button className={classes.ActionButton} onClick={handleRandomize}>
          Randomize
        </button>
      </div>
      <div className={classes.Grid}>
        <div className={classes.StepHeaderContainer}>
          {/* Step Headers */}
          {grid[0].map((_, colIdx) => (
            <div
              className={`${classes.StepHeader} ${
                colIdx === beat - 1 ? classes.StepHeaderActive : ""
              } `}
            />
          ))}
        </div>

        {/* Buttons */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex.toString()} className="sequencer-row">
            {row.map(({ note, isActive }, noteIdx) => (
              <button
                className={classes.Button}
                style={{
                  backgroundColor: isActive ? "#e28743" : "#eeeee4",
                  color: isActive ? "white" : "black",
                }}
                key={noteIdx.toString()}
                onClick={(e) => handleNoteClick(rowIndex, noteIdx, e)}
              >
                {note}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sequencer;
