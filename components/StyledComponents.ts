import styled from "styled-components";

export const Conatiner = styled.div`
  width: 100%;
  box-shadow: 0px 5px 10px black;
  border: 1px solid black;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;
export const Box = styled.div``;

export const FlexBox = styled.div`
  display: flex;
`;
export const FlexColumn = styled(FlexBox)`
  flex-direction: column;
`;
