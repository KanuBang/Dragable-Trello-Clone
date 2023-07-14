import {atom, selector} from "recoil";

interface IToDoSate {
  [key:string]: string[]
}
export const toDoState = atom<IToDoSate>({
  key:"toDoState",
  default: {
    "to do": ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
    "Do Later": ['fifa', 'soccer', 'netflix']
  }
})

/*
공백이 있는 key인 경우에는 " "을 이용한다
*/