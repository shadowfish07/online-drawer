import styled from "styled-components";
import { HEADER_HEIGHT } from "../constants";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  reverseDrawingMode,
  reverseIsCreatingRectMode,
  selectIsCreatingRectMode,
  selectIsDrawingMode,
} from "../slices/ToolBoxSlice";
import { setUsername } from "../slices/UserSlice";

type Props = {
  canvas: fabric.Canvas | null;
};

function Header({ canvas }: Props) {
  const dispatch = useAppDispatch();
  const isDrawingMode = useAppSelector(selectIsDrawingMode);
  const isCreatingRectMode = useAppSelector(selectIsCreatingRectMode);
  const username = useAppSelector((state) => state.user.username);
  const handleClickDrawingMode = () => {
    dispatch(reverseDrawingMode());
  };
  const handleClickIsCreatingRectMode = () => {
    dispatch(reverseIsCreatingRectMode());
  };
  const handleDeleteDeletedItems = () => {
    if (!canvas) return;
    for (const item of canvas.getActiveObjects()) {
      canvas.remove(item);
    }
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(e.target.value));
  };

  return (
    <StyledHeader>
      <div className="left">
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
      </div>
      <div className="right">
        <div className="username-wrapper">
          <span>昵称</span>
          <input value={username} onChange={handleUsernameChange} />
        </div>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #7c7c7c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: ${HEADER_HEIGHT}px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;

  .left {
    .title {
      font-size: 18px;
      display: inline-block;
    }

    a {
      margin-left: 20px;
      cursor: pointer;
      display: inline-block;

      &.selected {
        font-weight: bold;
      }
    }
  }

  .right {
    .username-wrapper {
      span {
        margin-right: 10px;
      }

      input {
      }
    }
  }
`;

export default Header;
