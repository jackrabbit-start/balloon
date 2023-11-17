import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import GameOption from './components/GameOption';
import { Boards } from './components/Types';
import ToggleButton from './components/ToggleButton';

const App = () => {
  const [options, setOptions] = useState({ row: 6, column: 6 });
  const handleOptions = ({ row, column }: Boards) => {
    setOptions({ row, column });
  };

  return (
    <Container>
      <Title>Balloon Game</Title>
      <ToggleButton />
      <GameOption onhandleOptions={handleOptions} />
      <GameBoard row={options.row} column={options.column} />
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 20px;
  row-gap: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

export default App;
