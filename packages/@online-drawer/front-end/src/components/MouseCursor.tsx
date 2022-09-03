import styled from "styled-components";

type StyledProps = {
  left: number;
  top: number;
};

const StyledMouseCursor = styled.div<StyledProps>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;

  /* height: 20px; */
  /* background-color: red; */
  background-image: url("/cursor.png");

  pointer-events: none;

  white-space: nowrap;

  img {
    width: 50px;
    position: relative;
    top: -16px;
    left: -22px;
  }

  span {
    position: relative;
    top: -21px;
    left: -30px;
  }
`;

type Props = {
  mousePosition: [number, number];
  username: string;
};

function MouseCursor({ mousePosition, username }: Props) {
  return (
    <StyledMouseCursor left={mousePosition[0]} top={mousePosition[1]}>
      <img src="/cursor.png" />
      <span>{username}</span>
    </StyledMouseCursor>
  );
}

export default MouseCursor;
