import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`

interface IBaordProps {
    toDos: string[];
    boardId: string
}

const Board = ({toDos, boardId} : IBaordProps) => {
  return (
    <div>
      <Droppable droppableId="one">
        {(magic) => (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo}
                toDo={toDo}
                index={index}
              ></DragabbleCard>
            ))}
            {magic.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
