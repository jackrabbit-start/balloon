import { useEffect, useState } from 'react';

/* 
row, column
random이라면 랜덤으로 true 로 바꾸어줌
row, column 이 바뀔때마다 새로 판을 만듦
 */
interface HookProps {
  row: number;
  column: number;
}

const use2DNumberState = ({ row, column }: HookProps) => {
  const newArray: number[][] = [];
  for (let i = 0; i < row; i++) {
    newArray[i] = [];
    for (let j = 0; j < column; j++) {
      newArray[i][j] = 0;
    }
  }

  const [initState, setInitState] = useState<number[][]>(newArray);

  useEffect(() => {
    const updatedArray: number[][] = [];
    for (let i = 0; i < row; i++) {
      updatedArray[i] = [];
      for (let j = 0; j < column; j++) {
        updatedArray[i][j] = 0;
      }
    }

    setInitState(updatedArray);
  }, [row, column]);

  return [initState, setInitState] as const;
};

export default use2DNumberState;
