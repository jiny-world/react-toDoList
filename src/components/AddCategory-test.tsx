import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoriseState } from "../atoms";
import { useForm } from "react-hook-form";

const Btn = styled.button`
  background-color: transparent;
  border: 0px;
  color: black;
  font-size: 20px;
`;

interface Icategory {
  newCategory: string;
}

function AddCategory() {
  const [categories, setCategories] = useRecoilState(categoriseState);

  const { register, handleSubmit, setValue } = useForm<Icategory>();
  const handleValid = ({ newCategory }: Icategory) => {
    if (categories.includes(newCategory)) {
      alert("이미 있는 카테고리입니다.");
    } else {
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register("newCategory", {
              required: "CATEGORY 를 입력해주세요",
            })}
            placeholder="ADD CATEGORY"
          />
        </form>
      </div>
    </>
  );
}

export default AddCategory;
