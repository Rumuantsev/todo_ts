import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, reorderTasks } from "../redux/tasksSlice";
import Task from "./Task";
import TaskInput from "./TaskInput";
import NoTask from "./NoTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onTaskCreated = (task) => {
    const newTask = { ...task, id: Date.now() };
    dispatch(addTask(newTask));
  };

  const handleOnDragEnd = (result) => {
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
      <TaskInput onTaskCreated={onTaskCreated} />
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
