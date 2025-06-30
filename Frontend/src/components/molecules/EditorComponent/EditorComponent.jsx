import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useActiveFileTabStore } from '../../../store/activeFileTabStore';
import { extensionToFileType } from '../../../utils/extensionToFileType';

export const EditorComponent = () => {

    let timerId = null;
    const [editorState, setEditorState] = useState({
        theme: null
    });
    const {activeFileTab} = useActiveFileTabStore();
    const { editorSocket } = useEditorSocketStore();
    

    async function downloadTheme() {
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        console.log(data);
        setEditorState({ ...editorState, theme: data });
    }

    function handleEditorTheme(editor, monaco) {
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }
///debouncing in react
    function handleChange(value){
        //Clear old Timer
        if(timerId!=null){
            clearTimeout(timerId);
        }
        //set the new timer
        timerId = setTimeout(()=>{
            const editorContent = value;
            console.log("Sending writeFile event");
            editorSocket.emit("writeFile" , {
                data : editorContent,
                pathToFileorFolder : activeFileTab.path
            })
        },2000);
    }

    useEffect(() => {
        downloadTheme();
    });

    return (
        <>
            {   editorState.theme &&
                <Editor 
                    height={'100vh'}
                    width={'100%'}
                    defaultLanguage={undefined}
                    defaultValue='// Welcome to the playground'
                    options={{
                        fontSize: 18,
                        fontFamily: 'monospace'
                    }}
                    language={extensionToFileType(activeFileTab?.extension)}
                    onChange={handleChange}
                    value={activeFileTab?.value ? activeFileTab.value : '// Welcome to the playground'}

                    onMount={handleEditorTheme}
                />
            }
        </>
    )
}