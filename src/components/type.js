import styled from 'styled-components';
import {COLOR} from './variables';

export const Heading = styled.h1`
  margin-top: 16px;
  font-size: 24px;
`;

export const Label = styled.span`
  margin-right: 16px;
  display: inline-block;
  width: 80px;
  color: ${COLOR.TWO};
  font-weight: lighter;
  vertical-align: bottom;
`;

export const Value = styled.span`
  font-style: italic;
`;
