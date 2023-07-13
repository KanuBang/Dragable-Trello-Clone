import {atom, selector} from "recoil";

interface IToDoSate {
  [key:string]: string[]
}
export const toDoState = atom<IToDoSate>({
  key:"toDoState",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"]
  }
})