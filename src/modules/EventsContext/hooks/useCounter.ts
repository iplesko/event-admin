import { useState } from 'react';

interface CounterHook {
  getAndIncrement: () => number;
}

export default (): CounterHook => {
  const [i, setI] = useState<number>(0);

  return {
    getAndIncrement: () => {
      const currentI = i;
      setI((prevI) => prevI + 1);

      return currentI;
    },
  };
};
