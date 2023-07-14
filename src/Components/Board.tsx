import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
    padding: 20px 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
`

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`

interface IBaordProps {
    toDos: string[];
    boardId: string
}

const Board = ({toDos, boardId} : IBaordProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
          {(magic) => (
            <div ref = {magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
            </div>
          )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
