import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faLightbulb,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  categoryState,
  toDoSelector,
  categoriseState,
  isDarkModeState,
} from "../atoms";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { inflate } from "zlib";

const Container = styled.div`
  position: relative;
  margin: 25px auto;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  padding: 20px;
  font-size: 16px;
  display: grid;
  width: 65%;
  max-width: 700px;
  border: 2px solid ${(props) => props.theme.borderColor};
`;

const Header = styled.div`
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;
`;
const Category = styled.div`
  width: auto;
  font-weight: 700;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 95px));
  justify-content: center;
`;

const HeaderBtn = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  span {
    font-size: 10px;
  }
`;

const Item = styled(motion.div)`
  border-radius: 10px;
  font-size: 22px;
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* box-shadow: 1px 4px 0 rgb(0 0 0 / 50%); */
  &:active {
    position: relative;
  }
`;

const SelectItem = styled(motion.div)`
  background-color: ${(props) => props.theme.accentColor};
  color: white;
`;
const itemVariants = {
  hover: {
    scale: 1.1,
  },
  active: {
    top: "2px",
  },
};

function ToDoList() {
  const toDoDate = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); // ?????? ????????? ????????????
  const [categories, setCategories] = useRecoilState(categoriseState); // ?????? ???????????? ??????

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  // ???????????? ??????
  const onInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    setCategory(event.currentTarget.innerText as any);
  };

  //???????????? ??????
  const addCategory = () => {
    const newCategory = prompt("?????? ????????? ??????????????? ???????????????.");
    if (newCategory !== "" && newCategory !== null) {
      if (categories.includes(newCategory)) {
        alert("?????? ?????? ?????????????????????.");
      } else {
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
      }
    } else {
    }
  };

  //???????????? ??????
  const removeCategory = () => {
    if (category) {
      if (window.confirm(`???????????? <${category}>??? ?????????????????????????`)) {
        const newCategory = categories.filter(function (data) {
          return data != category;
        });
        setCategories(newCategory);

        console.log(newCategory.length);
        setCategory(newCategory.length == 0 ? "" : newCategory[0]);
        alert(`?????????????????????.`);
      } else {
        alert(`?????????????????????.`);
      }
    } else {
      alert(`????????? ??????????????? ????????????.`);
    }
  };

  const changeDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const resetTodoData = () => {
    if (window.confirm(`????????????, ????????? ????????? ??????????????????.`)) {
      localStorage.removeItem("toDoData");
    }
  };

  return (
    <>
      <Container>
        <Header
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
          }}
        >
          <HeaderBtn onClick={resetTodoData}> </HeaderBtn>
          <div>Category !</div>
          <HeaderBtn onClick={changeDarkMode}>
            {isDarkMode ? (
              <>
                <FontAwesomeIcon icon={faLightbulb} />
                <span>&nbsp;Light Mode</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMoon} /> <span>&nbsp;Dark Mode</span>
              </>
            )}
          </HeaderBtn>
        </Header>
        <Category>
          {categories.map((item) =>
            item == category ? (
              <Item
                as={SelectItem}
                variants={itemVariants}
                whileHover="hover"
                onClick={onInputChange}
                key={item}
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
        <Header>Todo-List !</Header>

        <CreateToDo />
      </Container>

      {toDoDate.length != 0 ? (
        <Container
          style={{
            padding: "0",
          }}
        >
          {toDoDate.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Container>
      ) : null}
    </>
  );
}

export default ToDoList;
