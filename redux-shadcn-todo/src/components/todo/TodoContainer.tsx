import TodoCard from "./TodoCard";
import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import { useAppSelector } from "../../redux/hooks";
import { useGetTodosQuery } from "../../redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
  // const { todos, filter } = useAppSelector((state) => state.todos);

  // const filteredTodos = todos.filter((todo) => {
  //   if (filter === "all") return true;
  //   return todo.priority === filter;
  // });

  // const sortedTodos = [...filteredTodos].sort((a, b) => {
  //   if (a.isCompleted === b.isCompleted) {
  //     return 0;
  //   }
  //   return a.isCompleted ? 1 : -1;
  // });

  //*From server
  const [priority, setPriority] = useState("");
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

  return (
    <div>
      <div className="flex justify-between mb-5 ">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {todos?.data?.length > 0 ? (
            todos?.data?.map((item, index) => (
              <TodoCard key={index} {...item} />
            ))
          ) : (
            <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
              <p>There is no task pending</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
