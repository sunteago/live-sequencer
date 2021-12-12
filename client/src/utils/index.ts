const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const pentatonicNotes = ["A", "C", "D", "E", "G"];

const pitches = [4, 5, 6];

export const getRandomNote = (
  noteArray = pentatonicNotes,
  pitchArray = pitches
) => {
  const randomNote = Math.floor(Math.random() * noteArray.length);
  const randomPitch = Math.floor(Math.random() * pitchArray.length);

  return noteArray[randomNote] + pitchArray[randomPitch];
};

export const shouldReproduce = (probability = 0) => {
  return Math.random() > probability;
};
