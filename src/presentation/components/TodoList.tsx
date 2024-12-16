import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { reorderTasks } from "../store/slices/tasksSlice";
import Task from "./Task";
import TaskInput from "./TaskInput";
import NoTask from "./NoTask";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { RootState } from "../store/store";

// Интерфейс для задачи
interface Task {
  id: number;
  title: string;
  about: string;
}

const TodoList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks); // Типизация состояния
  const dispatch = useDispatch();

  const handleOnDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      reorderTasks({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <TaskInput />
      {tasks.length === 0 ? <NoTask /> : null}
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="todo_container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task title={task.title} about={task.about} id={task.id} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
