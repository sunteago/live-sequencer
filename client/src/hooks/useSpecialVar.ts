import { useState, useRef, useEffect, useCallback } from "react";

// Provides not only a reactive variable but also a getter for the ref
// (this way we don't need to recreate some functions)
export default function useSpecialVar(variable: any) {
  const [state, setState] = useState(variable);

  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  const getCurrentValue = useCallback(() => {
    return ref.current;
  }, []);

  return [state, setState, getCurrentValue];
}
