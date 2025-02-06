import { useRef, useState, useEffect } from 'react';

export const useGetPriceTrend = (currentPrice: number) => {
  const price = useRef<number | null>(null);
  const [isPositive, setIsPositive] = useState<boolean>(false);
  const [isNegative, setIsNegative] = useState<boolean>(false);

  useEffect(() => {
    if (price.current === null) {
      price.current = currentPrice;
    }

    if (currentPrice !== price.current && price.current !== null) {
      setIsPositive(currentPrice / price.current >= 1.25);
      setIsNegative(currentPrice / price.current <= 0.75);
      price.current = currentPrice;
    }
  }, [currentPrice]);

  return {
    isPositive,
    isNegative
  };
};
