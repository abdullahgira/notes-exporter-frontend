import { useState, useEffect } from "react";

export default function useLocalStorage(
  key,
  defaultValue = "",
  serialize = (val) => val,
  deserialize = (val) => val
) {
  const [state, setState] = useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  console.log({ state });

  useEffect(() => {
    window.localStorage.setItem(serialize(key), state);
  }, [key, state]);

  return [deserialize(state), setState];
}
