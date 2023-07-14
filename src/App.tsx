import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

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
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    // 드래그 앤 드롭의 위치가 변화가 없을 때 => destination : null => boolean으로 치면 false
    if (!destination) {
      console.log("no move");
      return;
    }
    // 시작 보드와 끝 마친 보드의 id가 같나요? => same board movement
    if (destination?.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        // 시작 위치 id로 이벤트가 발생한 해당 보드의 내용을 가지고 옴
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index]
        // 드래그 되는 위치의 task를 삭제하고
        boardCopy.splice(source.index, 1);
        // 드래그가 마친 목적지에다가 draggable Id로 해당 task를 추가한다
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log(allBoards);
        // 업데이트된 보드의 내용으로 toDoState 수정
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // 시작 보드와 끝 마친 보드가 다르다 => cross movement
    if (destination.droppableId !== source.droppableId) {
      /* 
        발생한 에러: draggableId는 현재 그냥 string일 뿐이다.
         그리고 현재 toDoSate의 IToDoStata는
      
          export interface IToDo {
            id:number;
            text:string;
          }
          interface IToDoSate {
            [key:string]: IToDo[]
          }
          이거다 그래서 문제가 발생한 거다
          

          즉. "Doing": [{text:"blabla" id: "1"},{text:"blabla" id: "2"}]
          이런 형식인데 draggableId는 단순 "1"이여서 알맞는 객체 {text:"blabla" id: "1"}를 가져오지 못하고 있다
      */
      
      setTodos((allBaords) => {
        console.log("Im here");
        const sourceBoard = [...allBaords[source.droppableId]];
        const taskObj = sourceBoard[source.index]
        const destinationBoard = [...allBaords[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBaords,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board
              key={boardId}
              boardId={boardId}
              toDos={toDos[boardId]}
            ></Board>
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
