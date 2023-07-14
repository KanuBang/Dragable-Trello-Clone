import {atom, selector} from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id:number;
  text:string;
}

interface IToDoSate {
  [key:string]: IToDo[]
}
// 단순 string[]이 아니라 조금 더 구체적으로 됨


const {persistAtom}  = recoilPersist({
  key: "원하는 값",
  storage:localStorage,
})


export const toDoState = atom<IToDoSate>({
  key:"toDoState",
  default: {
    "TO DO": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom]
})

/*
공백이 있는 key인 경우에는 " "을 이용한다
*/