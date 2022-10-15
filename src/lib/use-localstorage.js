import { useState, useEffect } from "react";

export default function useLocalStorage(
  key,
  defaultValue = "",
  serialize = (val) => val,
  deserialize = (val) => val
) {
  const [state, setState] = useState(
    () => deserialize(window.localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, state]);

  return [state, setState];
}
