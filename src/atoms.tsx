import { stringify } from "querystring";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { json } from "stream/consumers";

const { persistAtom } = recoilPersist({
  key: "toDoData",
  storage: localStorage,
});

export enum Categories {
  "운동",
  "코딩",
  "공부",
}

export let defaultCategories: string[] = ["운동", "코딩", "공부"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
});

export const categoriseState = atom<string[]>({
  key: "categories",
  default: JSON.parse(JSON.stringify(defaultCategories)),
  // JSON.parse(localStorage.getItem("toDoData"))["categories"] ??,
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
