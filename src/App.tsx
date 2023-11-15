import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import GameOption from './components/GameOption';

const App = () => {
  const [options, setOptions] = useState({ rows: 6, columns: 6 });

  const handleOptions = (rows: number, columns: number) => {
    setOptions({ rows, columns });
  };

  return (
    <Container>
      <Title>Balloon Game</Title>
      <GameOption onhandleOptions={handleOptions} />
      <GameBoard row={options.rows} column={options.columns} />
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

export default App;
