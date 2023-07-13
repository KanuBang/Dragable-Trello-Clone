import React from 'react'
import { DragDropContext,DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  /*
    repeat는 반복되는 값을 자동으로 처리할 수 있는 함수입니다.
    repeat(반복횟수, 반복값)
    grid-template-rows는 행(row)의 배치
    grid-template-columns는 열(column)의 배치
    1fr 1fr 1fr: 같은 비율로 3개
    그리드 갭(Grid Gap)
    Grid 셀 사이의 간격입니다.
  */
  width: 100%;
  gap: 10px;
`;


const App = () => {
  
  const [toDos, setTodos] = useRecoilState(toDoState)
  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) return; // 도착지가 없는 경우: 같은 자리에 올려 놓았을 때
    /*
    setTodos((oldToDos) => {
      const toDosCopy = [...oldToDos]
      //1) Delete item on source.index
      toDosCopy.splice(source.index , 1);
      //2) put back the item on the destination.index
      //console.log("Put back", draggableId, "on ", destination.index)
      toDosCopy.splice(destination?.index, 0, draggableId)
      //console.log(toDosCopy)
      return toDosCopy
    })
    */
    
  };

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
