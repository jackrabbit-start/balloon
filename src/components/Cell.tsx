import { useContext } from 'react';
import styled from 'styled-components';
import { DarkmodeContext } from '../context/contextMode';

/*
게임판 안의 각 셀 관련 컴포넌트
<Cell onCellClick?={()=>void} isClicked={boolean} isBalloon?={boolean} />
Parameter
onCellClick : 셀클릭 발생 이벤트
isClicked : 클릭한 셀인지 확인여부
isBalloon : 풍선이 존재하는 셀인지 확인여부

기본적인 셀 칸 가로세로 길이 : 30px*30px
*/

interface CellProps {
  isClicked: boolean;
  isBalloon?: boolean;
  onCellClick?: () => void;
}

interface StyleProps {
  isClicked: boolean;
}

const Cell = ({ isClicked, isBalloon = false, onCellClick }: CellProps) => {
  const { mode } = useContext(DarkmodeContext);
  return (
    <CellContainer isClicked={isClicked} onClick={onCellClick}>
      {isBalloon && !mode ? <img src="src/assets/balloons.svg" /> : null}
      {isBalloon && mode ? <img src="src/assets/whiteballoons.svg" /> : null}
    </CellContainer>
  );
};

const CellContainer = styled.div<StyleProps>`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.BorderColor};
  padding: 3px;
  align-items: center;
  background-color: ${(props) => props.theme.BackgroundColor};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Cell;
