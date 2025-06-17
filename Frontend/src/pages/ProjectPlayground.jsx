import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";

export const ProjectPlayground = () => {

    const { projectId } = useParams();

   return(
    <>
        ProjectId : {projectId}
        <EditorButton isActive={true}/>
        <EditorButton isActive={false}/>

        <EditorComponent/>
    </>
   )
}