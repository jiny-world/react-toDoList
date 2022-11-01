import { IToDo, toDoState, categoryState, categoriseState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TodoItem = styled.li`
  padding: 15px;
  font-size: 18px;
  border-bottom: 1px solid grey;
  justify-content: space-between;
  display: flex;
  align-items: center;
  font-weight: 500;
  :last-child {
    border-bottom: 0px;
  }
  color: ${(props) => props.theme.textColor};
`;
const Todo = styled.span``;

const Buttons = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 1fr);
`;

const Btn = styled(motion.button)`
  background-color: white;
  border: 0px;
  color: ${(props) => props.theme.accentColor};
  font-size: 15px;
  border-radius: 5px;
  font-weight: 700;
`;

const itemVariants = {
  hover: {
    scale: 1.1,
  },
  active: {
    top: "2px",
  },
};

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
    const confirm = window.confirm(`<${text}>를 삭제하시겠습니까?`);
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
      <Todo>{text}</Todo>
      <Buttons>
        {categories.map((cate) =>
          cate !== currentCategory ? (
            <Btn
              variants={itemVariants}
              whileHover="hover"
              key={cate + ""}
              name={cate + ""}
              onClick={onClick}
            >
              {cate}
            </Btn>
          ) : null
        )}
        <Btn
          variants={itemVariants}
          whileHover="hover"
          onClick={() => DeleteTodo(text)}
          style={{
            backgroundColor: "#BB2D3B",
            color: "white",
          }}
        >
          삭제
        </Btn>
      </Buttons>
    </TodoItem>
  );
}

export default ToDo;
