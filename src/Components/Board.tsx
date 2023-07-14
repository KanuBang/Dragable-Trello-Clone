import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import {useRef} from "react";
const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    overflow: hidden; // 왜 안되지?
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

interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) => props.isDraggingOver 
    ? "#dfe6e9" 
    : props.isDraggingFromThis 
    ? "#b2bec3" 
    : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`

const Board = ({toDos, boardId} : IBaordProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = ( ) => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur()
    },5000)
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me"/>
      <button onClick={onClick}>click me</button>
      <Droppable droppableId={boardId}>
          {(magic, snapshot) => (
            <Area 
              isDraggingOver = {Boolean(snapshot.isDraggingOver)}
              isDraggingFromThis = {Boolean(snapshot.draggingFromThisWith)}
              ref = {magic.innerRef} 
              {...magic.droppableProps}
            >
                {toDos.map((toDo, index) => (
                  <DragabbleCard key={toDo} index={index} toDo={toDo} />
                ))}
                {magic.placeholder}
            </Area>
          )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
