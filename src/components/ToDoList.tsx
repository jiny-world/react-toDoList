import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { categoryState, toDoSelector, categoriseState } from "../atoms";
import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 25px auto;
  background-color: #dfe6e9;
  border-radius: 10px;
  padding: 20px;
  font-size: 16px;
  display: grid;
  width: 65%;
`;

const Header = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;
const Category = styled.div`
  width: auto;
  font-weight: 700;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 130px));
  justify-content: center;
`;

const Item = styled(motion.div)`
  border-radius: 10px;
  font-size: 22px;
  background-color: white;
  color: #fd79a8;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* box-shadow: 1px 4px 0 rgb(0 0 0 / 50%); */
  &:active {
    position: relative;
    /* background-color: #fd79a8;
    color: white; */
  }
`;
const itemVariants = {
  hover: {
    scale: 1.1,
  },
  active: {
    // backgroundColor: "#fd79a8",
    // color: "white",
    top: "2px",
  },
};

function ToDoList() {
  const toDoDate = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); // 현재 선택한 카테고리
  const [categories, setCategories] = useRecoilState(categoriseState); // 전체 카테고리 목록

  // 카테고리 변경
  const onInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };

  //카테고리 추가
  const addCategory = () => {
    const newCategory = prompt("새로 추가할 카테고리를 입력하세요.");
    if (newCategory !== "" && newCategory !== null) {
      if (categories.includes(newCategory)) {
        alert("이미 있는 카테고리입니다.");
      } else {
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
      }
    } else {
    }
  };

  //카테고리 삭제
  const removeCategory = () => {
    if (category) {
      if (window.confirm(`카테고리 <${category}>를 삭제하시겠습니까?`)) {
        const newCategory = categories.filter(function (data) {
          return data != category;
        });
        setCategories(newCategory);
        setCategory(newCategory.length == 0 ? "" : categories[0]);
        alert(`삭제되었습니다.`);
      } else {
        alert(`취소되었습니다.`);
      }
    } else {
      alert(`선택된 카테고리가 없습니다.`);
    }
  };

  return (
    <>
      <Container>
        <Header>Todo-List !</Header>
        <Category>
          {categories.map((item) =>
            item == category ? (
              <Item
                variants={itemVariants}
                whileHover="hover"
                onClick={onInputChange}
                key={item}
                style={{
                  backgroundColor: "#fd79a8",
                  color: "white",
                }}
              >
                {item}
              </Item>
            ) : (
              <Item
                variants={itemVariants}
                whileHover="hover"
                onClick={onInputChange}
                key={item}
              >
                {item}
              </Item>
            )
          )}
          <Item
            variants={itemVariants}
            whileHover="hover"
            onClick={addCategory}
          >
            <FontAwesomeIcon icon={faCirclePlus} />
          </Item>
          <Item
            variants={itemVariants}
            whileHover="hover"
            onClick={removeCategory}
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </Item>
        </Category>
      </Container>

      <Container>
        <CreateToDo />
        {toDoDate.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Container>
    </>
  );
}

export default ToDoList;
