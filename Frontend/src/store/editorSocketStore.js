import { create } from "zustand";
import {useActiveFileTabStore} from "./activeFileTabStore"
import {useTreeStructureStore} from './treeStructureStore'

export const useEditorSocketStore = create((set) => ({
  editorSocket: null,

  setEditorSocket: (incomingSocket) => {
    
    const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
    const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;


    incomingSocket?.on("readFileSuccess" ,(data)=>{
      console.log("Read file Success",data);
      const fileExtension = data.path.split('.').pop();
      activeFileTabSetter(data.path, data.value , fileExtension)
    });

    incomingSocket?.on("writeFileSuccess",(data)=>{
      console.log("Write File Success" , data);
      
    });


    incomingSocket?.on("deleteFileSuccess" , ()=>{
      projectTreeStructureSetter();
    })
    
    
    set({
      editorSocket: incomingSocket,
    });
  },
}));
