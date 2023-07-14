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
        // 시작 위치 id로 이벤트가 발생한 해당 보드의 내용을 가지고 옴
        const boardCopy = [...allBoards[source.droppableId]] 
        // 드래그 되는 위치의 task를 삭제하고
        boardCopy.splice(source.index, 1);
        // 드래그가 마친 목적지에다가 draggable Id로 해당 task를 추가한다
        boardCopy.splice(destination?.index, 0, draggableId)
        console.log(allBoards)
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
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]}></Board>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App
