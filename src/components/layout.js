import styled from 'styled-components';
import {COLOR} from './variables';

export const Container = styled.div`
  margin: 0 auto;
  width: 500px;

  & + & {
    margin-top: 32px;
  }
`;

export const Header = styled.header`
  font-size: 16px;
  line-height: 60px;
  color: ${COLOR.ONE};
  background-color: ${COLOR.THREE};

  ${Container} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  & + ${Container} {
    margin-top: 32px;
  }
`;

export const PendingTxns = styled.div`
  flex: 0;
  white-space: nowrap;
  padding: 0 24px;
  background-color: ${COLOR.ACCENT};
  font-weight: bold;
`

export const NetworkStatus = styled.div`
  flex: 0;
  font-weight: lighter;
  white-space: nowrap;
  color: ${COLOR.ACCENT_LIGHT}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  & + & {
    margin-top: 16px;
  }
`
