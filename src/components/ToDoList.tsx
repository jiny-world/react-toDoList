import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import {
  Categories,
  categoryState,
  toDoSelector,
  toDoState,
  categoriseState,
} from "../atoms";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: column;
  max-width: 480px;
  margin: 25px auto;
  background-color: #f8efba;
  border-radius: 10px;
  padding: 20px;
  font-size: 16px;
`;

const Header = styled.div`
  font-size: 32px;
  font-weight: 700;
  span {
    font-weight: 700;
    display: block;
    font-size: 16px;
  }
`;
const Category = styled.div`
  font-weight: 700;
  select {
    width: 210px;
    font-size: 16px;
    border-radius: 5px;
  }
`;

const getDate = new Date().toLocaleDateString("ko", {
  year: "numeric",
  month: "short",
  day: "numeric",
}); // 2022년 9월 14일 (수)
const getWeekDay = new Date().toLocaleDateString("ko", {
  weekday: "short",
}); // 2022년 9월 14일 (수)

function ToDoList() {
  const toDoDate = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInputChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const [categories, setCategories] = useRecoilState(categoriseState);
  const addCategory = () => {
    const newCategory = prompt("새로 추가할 카테고리를 입력하세요.");
    if (newCategory !== "" && newCategory !== null) {
      if (categories.includes(newCategory)) {
        alert("이미 있는 카테고리입니다.");
      } else {
        setCategories([...categories, newCategory]);
      }
    } else {
    }
  };

  return (
    <>
      <Container>
        <Header>
          {getDate}
          <span>{getWeekDay}요일</span>
        </Header>
      </Container>
      <Container>
        <Category>
          <select value={category} onInput={onInputChange}>
            {categories.map((item) => (
              <option value={item}>{item} </option>
            ))}
          </select>
        </Category>
        <button onClick={addCategory}>카테고리 추가하기</button>
      </Container>

      <Container>
        <CreateToDo />

        {toDoDate.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>

      {/* <AddCategory /> */}
    </>
  );
}

export default ToDoList;

// const [value, setValue] = useState("");
// const todo = (event: React.FormEvent<HTMLInputElement>) => {
//   const {
//     currentTarget: { value },
//   } = event;
//   setValue(value);
// };
// const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();

//   console.log(value);
//   setValue("");
// };
