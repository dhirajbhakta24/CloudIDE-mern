import { createProjectServive , getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async(req,res)=>{
    //creating the project and getting the new project id
    const projectId = await createProjectServive();

    return res.json({message: 'Project Created' , data : projectId})
}

export const getProjectTree = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree"
    })
}