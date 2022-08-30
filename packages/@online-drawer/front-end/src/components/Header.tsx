import styled from "styled-components";
import { HEADER_HEIGHT } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  reverseDrawingMode,
  reverseIsCreatingRectMode,
  selectIsCreatingRectMode,
  selectIsDrawingMode,
} from "../slices/ToolBoxSlice";

function Header() {
  const dispatch = useAppDispatch();
  const isDrawingMode = useAppSelector(selectIsDrawingMode);
  const isCreatingRectMode = useAppSelector(selectIsCreatingRectMode);
  const selectedItems = useAppSelector(
    (state) => state.drawBoard.selectedItems
  );
  const canvas = useAppSelector((state) => state.drawBoard.canvas);
  const handleClickDrawingMode = () => {
    dispatch(reverseDrawingMode());
  };
  const handleClickIsCreatingRectMode = () => {
    dispatch(reverseIsCreatingRectMode());
  };
  const handleDeleteDeletedItems = () => {
    console.log(selectedItems);
    for (const item of canvas.getActiveObjects()) {
      canvas.remove(item);
    }
  };

  return (
    <StyledHeader>
      <div className="title">Online Drawer</div>
      <a
        className={isDrawingMode ? "selected" : ""}
        onClick={handleClickDrawingMode}
      >
        画笔
      </a>
      <a
        className={isCreatingRectMode ? "selected" : ""}
        onClick={handleClickIsCreatingRectMode}
      >
        矩形
      </a>
      <a onClick={handleDeleteDeletedItems}>删除选中元素</a>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #7c7c7c;
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: ${HEADER_HEIGHT}px;
  position: fixed;
  width: 100%;

  .title {
    font-size: 18px;
  }

  a {
    margin-left: 20px;
    cursor: pointer;

    &.selected {
      font-weight: bold;
    }
  }
`;

export default Header;
