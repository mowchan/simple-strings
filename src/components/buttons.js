import styled from 'styled-components';
import {COLOR} from './variables';

export const Submit = styled.button`
  margin-left: 16px;
  padding: 10px 16px;
  background-color: ${COLOR.ACCENT};
  font-size: 16px;
  color: ${COLOR.ONE};

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }

  &:focus,
  &:hover {
    background-color: ${COLOR.TWO};
  }

  &:active {
    background-color: ${COLOR.THREE};
  }
`;
