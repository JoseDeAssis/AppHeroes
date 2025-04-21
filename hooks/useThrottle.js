import { useEffect, useRef } from "react";

const useThrottle = (value, delay = 500) => {
	const lastExecuted = useRef(0);
  const timeoutId = useRef();

  const throttledvalue = (...args) => {
    const context = this;
    const now = Date.now(); 

    if (!lastExecuted.current) {
      value.apply(context, args);
      lastExecuted.current = now;
    } else {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        if (now - lastExecuted.current >= delay) {
          value.apply(context, args);
          lastExecuted.current = now;
        }
      }, delay - (now - lastExecuted.current));
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId.current);
  }, [value, delay]);

  return throttledvalue;
};

export default useThrottle;
