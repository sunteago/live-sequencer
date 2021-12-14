import * as Tone from "tone";

const defaultNotes = [
  "A3",
  "C4",
  "D4",
  "E4",
  "G4",
  "A4",
  "C5",
  "D5",
  "E5",
  "G5",
];

export const makeSynths = (count: number) => {
  return Array.from({ length: count }, () => {
    return new Tone.Synth({
      oscillator: { type: "square8" },
    }).toDestination();
  });
};

export const makeGrid = ({
  notes = defaultNotes,
  length = 16,
  cleanRatio = 0.85,
}: {
  notes?: string[];
  length?: number;
  cleanRatio?: number;
} = {}) => {
  return notes.map((note) => {
    return Array.from({ length }, () => {
      return {
        note: note,
        isActive: Math.random() > cleanRatio,
      };
    });
  });
};
