import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Cell from './Cell';
import { Boards } from './Types';
import use2DState from '../hooks/use2DState';
import useTotalBalloons from '../hooks/useTotalBaloons';
import use2DNumberState from '../hooks/use2DNumberState';

/*
GameBoard 관련 컴포넌트
<GameBoard row?={number} column?={number} />
Parameter
row : 행의 개수
column : 열의 개수

설정하지 않으면 자동으로 6x6칸으로 생성
*/

interface StyleProps {
  column: number;
}

// 상하좌우 체크하기위한 배열
const dx = [0, 1, -1, 0, 0];
const dy = [0, 0, 0, 1, -1];

const GameBoard = ({ row = 6, column = 6 }: Boards) => {
  const [resetchecking, setResetchecking] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [maxNumber, setMaxNumber] = useState<number>(0);
  const [numberballoons, setNumberBalloons] = use2DNumberState({ row, column });
  const [totalballoons, setTotalballoons] = useTotalBalloons({
    row,
    column,
    resetchecking,
  });
  const [balloons, setBalloons] = use2DState({
    row,
    column,
    isRandom: true,
    resetchecking,
  });
  const [clickedCell, setclickedCell] = use2DState({
    row,
    column,
    isRandom: false,
    resetchecking,
  });

  // balloons 배열이 바뀔때마다 각 칸에서 최대 몇개 풍선을 터트릴 수 있는지 확인하는 함수
  useEffect(() => {
    const updatedNumberBalloons = [...numberballoons];
    let updatedMaxNumber = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        let bsum = 0;
        for (let k = 0; k < 5; k++) {
          const nr = i + dx[k];
          const nc = j + dy[k];
          if (
            0 <= nr &&
            nr < row &&
            0 <= nc &&
            nc < column &&
            balloons[nr][nc] === true
          ) {
            bsum += 1;
          }
        }
        updatedNumberBalloons[i][j] = bsum;
        updatedMaxNumber = Math.max(bsum, updatedMaxNumber);
      }
    }
    setNumberBalloons(updatedNumberBalloons);
    setMaxNumber(updatedMaxNumber);
  }, [balloons]);

  // row, column 바뀔때바다 + reset 버튼을 누를때 새로 보드판을 랜덤으로 생성
  useEffect(() => {
    setResetchecking(false);
    setSuccess(true);
  }, [resetchecking, row, column]);

  // 각 셀 클릭시 이벤트
  const onCellClick = useCallback(
    (ridx: number, cidx: number) => {
      if (!clickedCell[ridx][cidx]) {
        const updatedCell = [...clickedCell];
        updatedCell[ridx][cidx] = true;
        setclickedCell(updatedCell);
      }
      const updatedBalloons = [...balloons];
      let updatedTotalBalloons = totalballoons;
      let pop = 0;
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
          pop += 1;
          updatedBalloons[ridx + dx[i]][cidx + dy[i]] = false;
          updatedTotalBalloons -= 1;
        }
      }
      // 최대 터트릴수 있는 개수가 아니라면 실패
      if (pop != maxNumber) {
        setSuccess(false);
      }

      setBalloons(updatedBalloons);
      setTotalballoons(updatedTotalBalloons);
    },
    [
      row,
      column,
      clickedCell,
      balloons,
      totalballoons,
      setBalloons,
      setclickedCell,
      setTotalballoons,
      maxNumber,
    ]
  );

  // reset버튼 용 이벤트
  const onClickReset = useCallback(() => {
    setResetchecking(true);
  }, []);

  return (
    <Container>
      <h4>다음 터트릴 수 있는 최대 풍선수 : {maxNumber}</h4>
      {success && totalballoons > 0 ? (
        <Frame column={column}>
          {balloons.map((rr, ridx) =>
            rr.map((isBalloon, cidx) => (
              <Cell
                isClicked={clickedCell[ridx][cidx]}
                isBalloon={isBalloon}
                onCellClick={() => onCellClick(ridx, cidx)}
              />
            ))
          )}
        </Frame>
      ) : (
        <>
          <h2>{success ? '성공!' : '실패!'}</h2>
          <button onClick={onClickReset}>재시작</button>
        </>
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
