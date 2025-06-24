import fs from "fs/promises";

export const handleEditorSocketEvents =(socket)=>{
    socket.on("writeFile",async({data,pathToFileOrFolder})=>{
        try{
            const response = await fs.writeFile(pathToFileOrFolder,data);
            socket.emit("writeFileSuccess" , {
                data :"File written successfully",
            })
        }
        catch(error){
            console.log("Error writing the file",error);
            socket.emit("error",{
                data : "Error writing the file",
            });
        }
    });

    socket.on("createFile",async({pathToFileOrFolder})=>{
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
        if(isFileAlreadyPresent){
            socket.emit("error", {
                data :"File already exists",
            });
            return;
        }

        try{
            const response =await fs.writeFile(pathToFileOrFolder,"");
            socket.emit("createFileSuccess",
                {
                  data : "File Created successfully", 
                });
        }catch(error){
            console.log("Error creating the file",error);
            socket.emit("error",{
                data: "error creating the file",
            });
        }
    });

    socket.on("deleteFile",async({pathToFileOrFolder})=>{
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess",{
                data:"File deleted successfully",
            });
        } catch (error) {
            console.log("error deleting the file",error);
            socket.emit("error",{
                data : "error deleting the file"
            });
        }
    });

    socket.on("createFolder",async ({pathToFileOrFolder})=>{
        try{
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess",{
                data : "Folder Created successfully",
            });
        }
        catch(error){
            console.log("error creating the folder",error);
            socket.emit("error",{
                data : "error creating the folder"
            });
        }
    });

    socket.on("deleteFolder", async({pathToFileOrFolder})=>{
        try {
            const response = await fs.rmdir(pathToFileOrFolder,{recursive:true});
            socket.emit("deleteFolderSuccess",{
                data : "Folder Deleted Successfully",
            });
        } catch (error) {
            console.log("Error deleting the folder", error);



            socket.emit("error", {


                data: "Error deleting the folder",


            });
        }
    });
}