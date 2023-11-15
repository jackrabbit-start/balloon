import React, { useState } from 'react';
import styled from 'styled-components';

interface OptionProps {
  onhandleOptions: (rows: number, columns: number) => void;
}

const GameOption = ({ onhandleOptions }: OptionProps) => {
  const [form, setForm] = useState({
    rows: 6,
    columns: 6,
  });

  const { rows, columns } = form;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onhandleOptions(form.rows, form.columns);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Row</label>
          <NumberInput
            type="number"
            min="1"
            max="40"
            name="rows"
            value={rows}
            onChange={handleChange}
          />

          <label>Column</label>
          <NumberInput
            type="number"
            min="1"
            max="40"
            name="columns"
            value={columns}
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
