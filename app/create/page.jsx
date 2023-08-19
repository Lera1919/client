'use client'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const MAX_COUNT = 10;

export default function Create() {

    const galleryRef = useRef(null)

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [description, setDescription] = useState('')
    const [fileLimit, setFileLimit] = useState(false);

    const [indexDraggedItem, setIndexDraggedItem] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);

    const handlerCreate = () => {

        console.log('Press Create');
    }

    const handleDescription = (e) => {
        setDescription(e.target.value.slice(0, 255));
    }

    const PreviewImage = useCallback(() => {
        const removeItemGallery = (index) => {
            let temp = uploadedFiles.filter((item, idx) => idx !== index)
            if (temp.length < 10) setFileLimit(false)
            setUploadedFiles(temp)
        }
        const handlerDragStart = (e, index) => {
            e.dataTransfer.effectAllowed = "move"
            e.target.style.opacity = 0.3
            setIndexDraggedItem(index)
            setDraggedItem(uploadedFiles[index])
        }
    
        const handlerDragEnd = (e, index) => {
            e.dataTransfer.effectAllowed = "move"
            e.target.style.opacity = 1
            setIndexDraggedItem(null)
            setDraggedItem(null)
    
        }
    
        const handlerDragOver = (e, file, index) => {
            e.preventDefault()
            if (index === indexDraggedItem) return
            let position = index
            if (e.nativeEvent.offsetX >= (e.target.offsetWidth / 2)) {
                position = index + 1
            }
            let temp = [...uploadedFiles.filter( (item)=> item.sort !== draggedItem.sort )]
            temp.splice(position, 0, draggedItem)
            temp.map( (item, idx)=>{ item['sort'] = idx} )
            setUploadedFiles(temp)

            // console.log(e.nativeEvent.offsetX);
        }

        return uploadedFiles.length > 0 ?
            uploadedFiles.map((file, index) =>
                <div
                    key={index}
                    className='relative'
                    draggable='true'
                    onDragStart={(e) => { handlerDragStart(e, index) }}
                    onDragEnd={(e) => { handlerDragEnd(e, index) }}
                    onDragOver={(e) => { handlerDragOver(e, file, index) }}
                >
                    <img src={URL.createObjectURL(file)} className='h-16 w-16 object-cover object-center rounded-md' />
                    <button
                        type='button'
                        className='absolute -top-2 -right-2 p-2 rounded-md bg-red-500 hover:bg-red-600'
                        onClick={() => removeItemGallery(index)}
                    >
                        <XMarkIcon className='w-4 h-4 text-white' />
                    </button>
                </div>)
            :
            <span> Добавьте фото </span>
    }, [uploadedFiles, draggedItem, indexDraggedItem])

    const handleAddFiles = (event) => {
        let temp = [...uploadedFiles.concat(Object.values(event.target.files))]

        if (temp.length > 10) {
            temp = temp.slice(0, 10)
        }
        if (temp.length > 9) setFileLimit(true)

        temp.map( (item, idx)=>{item.sort = idx} )

        setUploadedFiles(temp)
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
                        <PreviewImage />
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