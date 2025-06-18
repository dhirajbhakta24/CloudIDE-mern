import uuid4 from "uuid4"

import fs from 'fs/promises';

import {REACT_PROJECT_COMMAND} from '../config/serverConfig.js'

import {execPromisified} from '../utils/execUtility.js'

import path from "path";

import directoryTree from "directory-tree";


export const createProjectServive = async () => {
    //create a unique id then with that id create a folder in which the user project will be

    const projectId = uuid4();
    console.log("new project id is ", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    //after this call the npm create vite command in the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND,{
        cwd : `./projects/${projectId}`
    });
    return projectId;

}

//returning the tree structure 

export const getProjectTreeService = async(projectId)=>{
        const projectPath = path.resolve(`./projects/${projectId}`);
        const tree = directoryTree(projectPath);
        return tree;
}
