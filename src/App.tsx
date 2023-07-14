import React from 'react'
import { DragDropContext,DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;


const App = () => {
  
  const [toDos, setTodos] = useRecoilState(toDoState)
  const onDragEnd = (info:DropResult) => {
    console.log(info)
    const {destination, draggableId, source} = info
    if (destination?.droppableId === source.droppableId) {
      //same board movement
      setTodos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        }
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}></Board>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App
