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
  row: number;
}

const GameBoard = ({ row = 6, column = 6 }: GameBoardProps) => {
  const [balloons, setBalloons] = useState<boolean[]>(Array(36).fill(false));
  const [clickedCell, setclickedCell] = useState<boolean[]>(
    Array(36).fill(false)
  );

  useEffect(() => {
    setclickedCell(Array(row * column).fill(false));
    setBalloons(Array(row * column).fill(false));
  }, [row, column]);

  const onCellClick = (index: number) => {
    if (!clickedCell[index]) {
      const updatedCell = [...clickedCell];
      updatedCell[index] = true;
      setclickedCell(updatedCell);
    }
  };

  return (
    <Container row={row}>
      {balloons.map((isballoons, index) => (
        <Cell
          key={index}
          isClicked={clickedCell[index]}
          isBalloon={isballoons}
          onCellClick={() => onCellClick(index)}
        />
      ))}
    </Container>
  );
};

const Container = styled.section<StyleProps>`
  display: grid;
  grid-template-columns: ${({ row }) => `repeat(${row},auto)`};
`;

export default GameBoard;
