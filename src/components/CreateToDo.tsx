import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { toDoState, categoryState } from "../atoms";
import styled from "styled-components";

const InputBox = styled.input`
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Btn = styled.button`
  background-color: transparent;
  border: 0px;
  color: white;
  font-size: 20px;
`;

const FormBox = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: auto;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();
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
          required: "ToDo 를 입력해주세요",
        })}
        placeholder="make your to do"
      />
      {/* <Btn>
        <FontAwesomeIcon icon={faCirclePlus} />
      </Btn> */}
    </FormBox>
  );
}

export default CreateToDo;
