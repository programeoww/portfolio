import axios from "axios";
import JSZip, { file } from "jszip";
import { useEffect, useReducer, useState } from "react";
import Dropzone from "react-dropzone";

type StateType = {name: string, size: string | number, status: string, progress: number, blob?: Blob};

function reducer(state: StateType[], action: any) {
    switch (action.type) {
        case 'add':
            return [...state, {
                name: action.payload.name,
                size: action.payload.size,
                status: 'uploading',
                progress: 0
            }];
        case 'update':
            return state.map((image: StateType) => {
                if (image.name === action.payload.name) {
                    return { ...image, progress: action.payload.progress };
                }
                return image;
            });
        case 'clear':
            return [];
        case 'updateBlob':
            return state.map((image: StateType) => {
                if (image.name === action.payload.name) {
                    return { ...image, blob: action.payload.blob };
                }
                return image;
            });
    }
    throw Error('Unknown action.');
  }

function PageImageMin() {
    const [queue, dispatchQueue] = useReducer(reducer, []);
    const [fileLength, setFileLength] = useState(0);
    const [isDone, setIsDone] = useState(false);
    
    const handleDrop = async (acceptedFiles: File[]) => {
        setIsDone(false);
        setFileLength(acceptedFiles.length);
        dispatchQueue({ type: 'clear' });
        await Promise.all(acceptedFiles.map(async(file: File) => {
            dispatchQueue({ type: 'add', payload: {
                name: file.name,
                size: file.size,
                status: 'uploading',
                progress: 0,
            } });

            const formData = new FormData();
            formData.append('files', file);
            const response = await axios.post(`${window.location.origin}/api/image-min`, formData,{ 
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    dispatchQueue({ type: 'update', payload: {
                        name: file.name,
                        progress: Math.round((progressEvent.loaded * 100) / (file.size))
                    } });
                },
                responseType: 'blob'
            })

            dispatchQueue({ type: 'updateBlob', payload: {
                name: file.name,
                blob: response.data
            } });
        }))

        setIsDone(true);
    }

    useEffect(() => {
        (async () => {
            if(fileLength === queue.length && fileLength > 0 && queue.length > 0 && isDone) {
                const zip = new JSZip();
                queue.forEach((item: StateType) => {
                    if(!item.blob) return;
                    zip.file(item.name, item.blob)
                });
    
                const zipData = await zip.generateAsync({
                  type: "blob",
                  streamFiles: true,
                });

                const link = document.createElement("a");
                link.href = URL.createObjectURL(zipData);
                link.download = "image-min.zip";
                link.click();
            }
        })()
    }, [queue, fileLength, isDone]);

    return (
        <div className="max-w-screen-lg mx-auto py-10 space-y-10">
            <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <div className="flex items-center justify-center w-full">
                        <label {...getRootProps()} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                )}
            </Dropzone>
            <div className="space-y-3">
                {
                    queue.reverse().map((image, index) => (
                        <div key={index} className="p-2 flex items-center border border-gray-700 bg-gray-900 rounded-lg space-x-2">
                            <i><svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" fill="currentColor" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"/></svg></i>
                            <div className="flex-1 pr-2 space-y-1">
                                <p className="font-semibold">{image.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className="bg-blue-600 h-2.5 rounded-full duration-150" style={{width: image.progress + '%'}}></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PageImageMin;