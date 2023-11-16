import { useContext } from 'react';
import styled from 'styled-components';
import { DarkmodeContext } from '../context/contextMode';

const ToggleButton = () => {
  const { mode, setMode } = useContext(DarkmodeContext);

  const onhandleModes = () => {
    setMode();
  };

  return (
    <TButton onClick={onhandleModes}>
      {mode ? '라이트모드' : '다크모드'}
    </TButton>
  );
};

const TButton = styled.button`
  width: 100px;
  height: 30px;
  position: absolute;
  top: 50px;
  left: 100px;
`;
export default ToggleButton;
