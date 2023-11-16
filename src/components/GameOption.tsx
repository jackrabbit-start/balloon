import React, { useState } from 'react';
import styled from 'styled-components';
import { Boards } from './Types';

interface OptionProps {
  onhandleOptions: ({ row, column }: Boards) => void;
}

const GameOption = ({ onhandleOptions }: OptionProps) => {
  const [form, setForm] = useState({
    row: 6,
    column: 6,
  });

  const { row, column } = form;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onhandleOptions(form);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Row</label>
          <NumberInput
            type="number"
            min="2"
            max="30"
            name="row"
            value={row}
            onChange={handleChange}
          />

          <label>Column</label>
          <NumberInput
            type="number"
            min="2"
            max="30"
            name="column"
            value={column}
            onChange={handleChange}
          />
        </div>
        <SubmitInput type="submit" value="바꾸기" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;

  form {
    display: flex;
    gap: 20px;
    width: 100%;
  }
`;

const NumberInput = styled.input`
  width: 100%;
`;

const SubmitInput = styled.input`
  width: 50px;
`;
export default GameOption;
