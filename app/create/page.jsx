'use client'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MAX_COUNT = 10;

export default function Create() {

    const galleryRef = useRef(null);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [fileLimit, setFileLimit] = useState(false);
    const [indexDraggedItem, setIndexDraggedItem] = useState(null);
    const [isDragged, setIsDragged] = useState(false);
    const [newPosition, setNewPosition] = useState(null);

    const handlerCreate = () => {
        console.log('Press Create');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value.slice(0, 255));
    }

    const removeItemGallery = (index) => {
        let temp = uploadedFiles.filter((item, idx) => idx !== index);
        if (temp.length < MAX_COUNT) setFileLimit(false);
        setUploadedFiles(temp);
    }

    const handlerDragStart = (e, index, file) => {
        setIsDragged(true);
        e.target.style.opacity = 0.3;
        setIndexDraggedItem(index);
    }

    const handlerDragEnd = (e, index, file) => {
        setIsDragged(false);
        e.target.style.opacity = 1;
        let copyArrayFiles = [...uploadedFiles];
        if (newPosition !== null && newPosition !== index) {
            copyArrayFiles.splice(newPosition, 0, file);
            copyArrayFiles = copyArrayFiles.filter((item, idx) => {
                let index = newPosition < indexDraggedItem ? indexDraggedItem + 1 : indexDraggedItem
                return index !== idx
            });
        };
        const clearArrayFiles = copyArrayFiles.map( (item, idx) => {
            item.after = false;
            item.before = false;
            return item;
        });
        setIndexDraggedItem(null);
        setUploadedFiles(clearArrayFiles);
    }

    const handlerDragOver = (e, index) => {
        e.preventDefault();
        if (index === indexDraggedItem) return;
        let position = null;
        if (e.nativeEvent.offsetX > (e.target.offsetWidth / 2)) {
            position = index + 1;
            uploadedFiles[index].before = false;
            uploadedFiles[index].after = true;
        };
        if (e.nativeEvent.offsetX <= (e.target.offsetWidth / 2)) {
            position = index;
            uploadedFiles[index].before = true;
            uploadedFiles[index].after = false;
        };
        setNewPosition(position);
        setUploadedFiles([...uploadedFiles]);
    }

    const handlerDragLeave = (e, index) => {
        e.preventDefault();
        uploadedFiles[index].after = false;
        uploadedFiles[index].before = false;
    }

    const handleAddFiles = (event) => {
        let newArrayFiles = [...uploadedFiles.concat(Object.values(event.target.files))];

        if (newArrayFiles.length > MAX_COUNT) {
            newArrayFiles = newArrayFiles.slice(0, MAX_COUNT);
        };
        if (newArrayFiles.length > 9) setFileLimit(true);

        newArrayFiles = newArrayFiles.map((item, idx) => {
            item.before = false;
            item.after = false;
            return item;
        });

        setUploadedFiles(newArrayFiles);
    }


    return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <form className='grid mt-4 gap-4'>
                <div className='grid md:flex gap-6'>
                    <button className='flex gap-4 items-center justify-center rounded-md text-white p-4 border \
                            border-slate-400 dark:border-slate-600 \
                            bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% disabled:grayscale disabled:opacity-50'
                        onClick={() => galleryRef.current.click()}
                        type="button"
                        disabled={fileLimit}
                    >
                        <PhotoIcon className='h-6 w-6 text-white' />
                        <span>Загрузить фото</span>
                    </button>
                    <div className='min-h-[100px] w-full flex flex-wrap gap-4 items-center justify-center bg-slate-300 \
                                    rounded-md dark:bg-slate-700 text-black dark:text-white p-4 border-2 border-dashed \
                                    border-slate-400 dark:border-slate-600'
                    >
                        {uploadedFiles.length > 0 ? uploadedFiles.map((file, index) =>
                            <div
                                key={file.lastModified}
                                className={`before:block before:w-2 before:-left-[14px] before:rounded-md before:h-full before:absolute ${file.before ? 'before:bg-blue-500' : 'bg-transparent'} 
                                    after:block after:top-[0px] after:w-2 after:-right-[14px] after:rounded-md after:h-full after:absolute ${file.after ? 'after:bg-blue-500' : 'bg-transparent'} 
                                    relative border-2 cursor-move border-dashed rounded-md 
                                    ${isDragged ? ' border-slate-400 dark:border-slate-600 ' : ' border-transparent '}`}
                                draggable='true'
                                onDragStart={(e) => { handlerDragStart(e, index, file) }}
                                onDragEnd={(e) => { handlerDragEnd(e, index, file) }}
                                onDragOver={(e) => { handlerDragOver(e, index) }}
                                onDragLeave={(e) => { handlerDragLeave(e, index) }}
                            >
                                <img src={URL.createObjectURL(file)} className='h-20 w-20 object-cover object-center rounded-md' />
                                <button
                                    type='button'
                                    className={`${isDragged ? 'hidden ' : ''} absolute -top-2 -right-2 p-2 rounded-md bg-red-500 hover:bg-red-600`}
                                    onClick={() => removeItemGallery(index)}
                                >
                                    <XMarkIcon className='w-4 h-4 text-white' />
                                </button>
                            </div>

                        )
                            :
                            <span> Добавьте фото </span>}
                    </div>
                </div>

                <input
                    ref={galleryRef}
                    type='file'
                    multiple
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    onChange={handleAddFiles}
                    name="gallery"
                    hidden
                />
                <div className='w-full relative '>
                    <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
                        value={description}
                        onChange={handleDescription}
                        placeholder="Введите описание (максимальное количество символов 255)"
                        rows={5}
                    />
                    <span className='absolute right-2 text-xs top-2 z-10 p-2 rounded-md bg-slate-200 \
                                     dark:bg-slate-800 text-black dark:text-white'>
                        {description.length}/255
                    </span>
                </div>

            </form>
            <button
                className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                            py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                            dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                            dark:to-violet-700 to-100% text-white text-lg'
                onClick={handlerCreate}
            >
                Создать
            </button>
        </div>
    )
}