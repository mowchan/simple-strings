import styled from 'styled-components';
import {COLOR} from '../variables';

export const TextField = styled.input`
  flex 1;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-color: ${COLOR.TWO};
  padding: 8px 4px;
  background-color: transparent;
  font-size: 20px;

  &:focus {
    border-bottom-color: ${COLOR.ACCENT};
    outline: none;
  }
`;
