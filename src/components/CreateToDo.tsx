import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms";
import styled from "styled-components";

const InputBox = styled.input`
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid black;
  height: 35px;
  width: 100%;
`;

const Btn = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border: 0px;
  color: white;
  font-size: 20px;
  border-radius: 5px;
`;

const FormBox = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 80px;
  gap: 5px;
  justify-content: center;
`;

const ErrorMsg = styled.span`
  color: red;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <FormBox onSubmit={handleSubmit(handleValid)}>
      <InputBox
        {...register("toDo", {
          required: "할 일을 입력해주세요",
          maxLength: {
            value: 30,
            message: "최대 30글자 까지 입력 가능합니다.",
          },
          validate: () =>
            category == "" ? "상단 카테고리를 선택해주세요" : true,
        })}
        placeholder="  할 일을 입력하세요!"
      />
      <Btn>추가!</Btn>
      <ErrorMsg>{errors.toDo?.message}</ErrorMsg>
    </FormBox>
  );
}

export default CreateToDo;
