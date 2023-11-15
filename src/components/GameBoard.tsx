import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';

/*
GameBoard 관련 컴포넌트
<GameBoard row?={number} column?={number} />
Parameter
row : 행의 개수
column : 열의 개수

설정하지 않으면 자동으로 6x6칸으로 생성
*/

interface GameBoardProps {
  row?: number;
  column?: number;
}

interface StyleProps {
  column: number;
}

// 상하좌우 체크하기위한 배열
const dx = [0, 1, -1, 0, 0];
const dy = [0, 0, 0, 1, -1];

const GameBoard = ({ row = 6, column = 6 }: GameBoardProps) => {
  const [totalballoons, setTotalballoons] = useState<number>(10);
  const [balloons, setBalloons] = useState<boolean[][]>(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(false))
  );
  const [clickedCell, setclickedCell] = useState<boolean[][]>(
    Array(6)
      .fill(null)
      .map(() => Array(6).fill(false))
  );

  useEffect(() => {
    const newClickedCell: boolean[][] = [];
    for (let i = 0; i < row; i++) {
      newClickedCell[i] = [];
      for (let j = 0; j < column; j++) {
        newClickedCell[i][j] = false;
      }
    }

    const newballoons: boolean[][] = [];
    for (let i = 0; i < row; i++) {
      newballoons[i] = [];
      for (let j = 0; j < column; j++) {
        newballoons[i][j] = false;
      }
    }

    const updatedtotalballoons = Math.floor((row * column) / 2);
    for (let i = 0; i < updatedtotalballoons; i++) {
      let xpos = Math.floor(row * Math.random());
      let ypos = Math.floor(column * Math.random());
      while (newballoons[xpos][ypos]) {
        xpos = Math.floor(row * Math.random());
        ypos = Math.floor(column * Math.random());
      }
      newballoons[xpos][ypos] = true;
    }

    setTotalballoons(updatedtotalballoons);
    setBalloons(newballoons);
    setclickedCell(newClickedCell);
  }, [row, column]);

  const onCellClick = (ridx: number, cidx: number) => {
    if (!clickedCell[ridx][cidx]) {
      const updatedCell = [...clickedCell];
      updatedCell[ridx][cidx] = true;
      setclickedCell(updatedCell);
    }
    const updatedBalloons = [...balloons];
    let updatedTotalBalloons = totalballoons;
    for (let i = 0; i < 5; i++) {
      const nr = ridx + dx[i];
      const nc = cidx + dy[i];
      if (
        0 <= nr &&
        nr < row &&
        0 <= nc &&
        nc < column &&
        updatedBalloons[nr][nc] === true
      ) {
        updatedBalloons[ridx + dx[i]][cidx + dy[i]] = false;
        updatedTotalBalloons -= 1;
      }
    }
    setBalloons(updatedBalloons);
    setTotalballoons(updatedTotalBalloons);
  };

  return (
    <Container>
      {totalballoons > 0 ? (
        <Frame column={column}>
          {balloons.map((rr, ridx) =>
            rr.map((isBalloon, cidx) => (
              <Cell
                isClicked={clickedCell[ridx][cidx]}
                isBalloon={isBalloon}
                onCellClick={() => onCellClick(ridx, cidx)}
              />
            ))
          )}{' '}
        </Frame>
      ) : (
        <h2>{'성공!'}</h2>
      )}
      <h3>남은 풍선 개수 : {totalballoons}</h3>
    </Container>
  );
};

const Frame = styled.section<StyleProps>`
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column},auto)`};
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default GameBoard;
