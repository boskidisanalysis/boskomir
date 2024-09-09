import { Id } from "@/convex/_generated/dataModel"
import {create} from "zustand"

const defaultValues = {
    id: "",
    title: "",
  };

interface IRenameModal {
    isOpen: boolean
    initialValues: typeof defaultValues
    onOpen: (id:Id<"boards">, title:string)=>void
    onClose: ()=>void
}

export const useRenameModal = create<IRenameModal>((set)=>({
    isOpen: false,
    onOpen: (id, title) => set({
        isOpen:true,
        initialValues: {id, title}
    }),
    onClose: ()=> set({
        isOpen:false,
        initialValues:defaultValues,

    }),
    initialValues: defaultValues

}))