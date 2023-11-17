import { useEffect, useState } from 'react';

/* 
row, column
random이라면 랜덤으로 true 로 바꾸어줌
row, column 이 바뀔때마다 새로 판을 만듦
 */
interface HookProps {
  isRandom: boolean;
  row: number;
  column: number;
  resetchecking: boolean;
}

const use2DState = ({ row, column, isRandom, resetchecking }: HookProps) => {
  const newArray: boolean[][] = [];
  for (let i = 0; i < row; i++) {
    newArray[i] = [];
    for (let j = 0; j < column; j++) {
      newArray[i][j] = false;
    }
  }

  const [initState, setInitState] = useState<boolean[][]>(newArray);

  useEffect(() => {
    const updatedArray: boolean[][] = [];
    for (let i = 0; i < row; i++) {
      updatedArray[i] = [];
      for (let j = 0; j < column; j++) {
        updatedArray[i][j] = false;
      }
    }
    if (isRandom) {
      const updatedtotalballoons = Math.floor((row * column) / 2);
      for (let i = 0; i < updatedtotalballoons; i++) {
        let xpos = Math.floor(row * Math.random());
        let ypos = Math.floor(column * Math.random());
        while (updatedArray[xpos][ypos]) {
          xpos = Math.floor(row * Math.random());
          ypos = Math.floor(column * Math.random());
        }
        updatedArray[xpos][ypos] = true;
      }
    }
    setInitState(updatedArray);
  }, [row, column, isRandom, resetchecking]);

  return [initState, setInitState] as const;
};

export default use2DState;
