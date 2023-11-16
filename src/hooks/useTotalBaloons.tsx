import { useEffect, useState } from 'react';

/* 
row, column 으로 총 풍선개수 확인
 */

interface HookProps {
  row: number;
  column: number;
  resetchecking: boolean;
}

const useTotalBalloons = ({ row, column, resetchecking }: HookProps) => {
  const [initState, setInitState] = useState<number>(
    Math.floor((row * column) / 2)
  );

  useEffect(() => {
    const updatedState = Math.floor((row * column) / 2);
    setInitState(updatedState);
  }, [row, column, resetchecking]);

  return [initState, setInitState] as const;
};

export default useTotalBalloons;
