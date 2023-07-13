import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import React from 'react'

const App = () => {
  const onDragEnd = ( ) => {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index ={0}>
                {() => <li>ONE</li>}
              </Draggable>
              <Draggable draggableId="second" index ={1}>
                {() => <li>TWO</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default App
