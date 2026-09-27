import { create } from "zustand"


type CounterStore ={
    count: number,
    increment: () => void,
    decrement:() => void
}

export const useCounterStore = create<CounterStore>((set)=>({
    count:10,
    increment: () =>{
        set((state:CounterStore)=>({
            count: state.count+1
        }))
    },
    decrement: () =>{
        set((state:CounterStore)=>({
            count:state.count-1
        }))
    }


}))