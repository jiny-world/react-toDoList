import { IToDo, toDoState, categoryState, categoriseState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import styled from "styled-components";
const TodoItem = styled.li`
  padding: 15px;
  font-size: 15px;
  border-bottom: 1px solid white;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...prevToDos.slice(0, targetIndex),
        newToDo,
        ...prevToDos.slice(targetIndex + 1),
      ];
    });
  };

  const DeleteTodo = (text: string) => {
    const confirm = window.confirm(text + " 삭제하시겠습니까?");
    if (confirm == true) {
      setToDos((prevToDos) => {
        // const targetIndex = prevToDos.findIndex((toDo) => toDo.id === id);
        const newToDos = prevToDos.filter((toDo) => toDo.id !== id);
        return newToDos;
      });
    }
  };

  const categories = useRecoilValue(categoriseState);
  const currentCategory = useRecoilValue(categoryState);
  return (
    <TodoItem>
      {text}
      <br />
      {categories.map((cate) => (
        <button
          disabled={cate == currentCategory}
          name={cate + ""}
          onClick={onClick}
        >
          {cate}
        </button>
      ))}
      <button onClick={() => DeleteTodo(text)}>삭제</button>
    </TodoItem>
  );
}

export default ToDo;
