import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppDispatch } from "../../redux/hooks";
import { updateTodo } from "../../redux/features/TodoSlice";
import { useUpdateTodoMutation } from "../../redux/api/api";

type TUpdateTodoProps = {
  _id: string;
  title: string;
  description: string;
  priority: string;
};

const UpdateTodo = ({
  _id,
  title,
  description,
  priority,
}: TUpdateTodoProps) => {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // const dispatch = useAppDispatch();

  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedTaskDetails = {
      _id,
      title: newTask,
      description: newDescription,
      priority: priority,
    };
    console.log("updated task details", updatedTaskDetails);

    updateTodo(updatedTaskDetails);

    // dispatch(updateTodo(updatedTaskDetails));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C53FE]">
          <svg
            className="size-5"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update task</DialogTitle>
          <DialogDescription>
            Update your tasks that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task" className="text-right">
                Task
              </Label>
              <Input
                onBlur={(e) => setNewTask(e.target.value)}
                id="task"
                className="col-span-3"
                defaultValue={title}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                onBlur={(e) => setNewDescription(e.target.value)}
                id="description"
                className="col-span-3"
                defaultValue={description}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodo;
