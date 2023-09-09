'use client'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { MapPinIcon, PhotoIcon, XMarkIcon, ArrowPathIcon, UserIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { setLazyProp } from 'next/dist/server/api-utils';


export default function Profile() {

    const [loading, setLoading] = useState(true)


    const [description, setDescription] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [commercial, setCommercial] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [successful, setSuccessful] = useState(false)

    const [errMessage, setErrMessage] = useState('')
    const [errFirstName, setErrFirstName] = useState('')
    const [errLastName, setErrLastName] = useState('')
    const [errPhone, setErrPhone] = useState('')
    const [errLongitude, setErrLongitude] = useState('')
    const [errLatitude, setErrLatitude] = useState('')


    const galleryRef = useRef(null);
    const { data: session, status, update } = useSession();
    const token = session?.user?.token

    useEffect(() => {
        fetch('/back/api/v1/user/profile', {
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log(res);
            if (res.status >= 500) {
                setErrMessage('Извините, сервис не доступен')
                return
            }            
        
            return res.json()
        }).then((data) => {
            setLoading(false);            
            setDescription(data.description || '');
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            let phone = data.phone || null
            if (phone) {
                phone = phone.replace('+3', '') // 80677580680
                let arr = phone.split('')
                arr.splice(1, 0, "(") // 8(0677580680
                arr.splice(5, 0, ")") // 8(067)7580680
                arr.splice(9, 0, "-") // 8(067)758-0680
                arr.splice(12, 0, "-") // 8(067)758-06-80
                phone = arr.join('')
                console.log(phone);
            }
            setPhone(phone);
            setLongitude(data.longitude || null);
            setLatitude(data.latitude || null);
            setCommercial(data.commercial);
            setAvatar(data.avatar);
        })

    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let temp = phone
        if (temp) {
            temp = temp.replace('(', '')
            temp = temp.replace(')', '')
            temp = temp.replace('-', '')
            temp = temp.replace('-', '')
            temp = '+3' + temp
        }

        const res = await fetch('/back/api/v1/user/update', {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                longitude,
                latitude,
                commercial,
                phone: temp
            }),
        })

        if (res.status >= 500) {
            setErrorMessage('Извините, сервис не доступен.')
            return
        }
        const data = await res.json()
        
        if (res.status === 400) {
            const {errors} = data;
            errors.forEach((err) => {
                if (err.path === "firstName") setErrFirstName(err.msg);
                if (err.path === "lastName") setErrLastName(err.msg);
                if (err.path === "phone") setErrPhone(err.msg);
                if (err.path === "latitude") setErrLatitude(err.msg);
                if (err.path === "longitude") setErrLongitude(err.msg);
            } ) ;   
           setLoading(false);
           return
        }

        if (res.status === 200) {
            setLoading(false);
            setSuccessful(true);
            setTimeout(()=>{setSuccessful(false)}, 3000);
            return
        }
    }

    const handleAvatar = async (e) => {
        setAvatar(e.target.files[0])

        let formdata = new FormData();
        formdata.append("avatar", e.target.files[0]);
        const res1 = await fetch('/back/api/v1/user/avatar', {
            method: "DELETE",
            headers: {
                Authorization: token,
            }
          
        })
            const res2 = await fetch('/back/api/v1/user/avatar', {
            method: "POST",
            headers: {
                Authorization: token,
            },
            body: formdata,
        })

        const data = await res2.json()

        update({...user, image: URL.createObjectURL(e.target.files[0])});
    }
    const handleDescription = e => setDescription(e.target.value)


    return (
        <>
            {loading ? 
            <div className='bg-[#0000003d] backdrop-blur-sm z-[9999] p-12 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
                <span className='p-6 rounded-md bg-white'>
                <ArrowPathIcon className='h-6 w-6 animate-spin'/>
                </span>
            </div>  
            : 
            ''
            }
             {successful ? 
            <div className='bg-green-500 z-[1000] p-12 absolute rounded-md top-[80px] right-[40px] flex justify-center items-center'>
               <CheckIcon className='h-6 w-6 text-white'/>
                <span className='text-white'>
                Данные сохранены!
                </span>
            </div>  
            : 
            ''
            }

            <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>

                <div className='flex justify-center p-6' onClick={() => { galleryRef.current.click() }}
                >
                    {avatar ?

                        <img className='h-32 w-32 rounded-full object-cover object-center' src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)} />
                        :
                        <span>Добавьте аватар</span>
                    }
                </div>
                <input
                    ref={galleryRef}
                    type='file'
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    onChange={handleAvatar}
                    name="avatar"
                    hidden
                />

                <form className='grid mt-4 gap-4' onSubmit={handleSubmit}>
                <div className='flex gap-6 items-center'>
                        <UserIcon className='h-12 w-12 dark:text-slate-400' />
                    
                    <div className='relative w-full'>
                        <input className={`${errFirstName ? 'border-red-500' : 'bordertransparent'} border bg-slate-100 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                            type='text'
                            name="firstName"
                            placeholder='Имя'
                            required
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value); setErrFirstName(''); setErrMessage('') }}
                        />
                        {errFirstName && <div className='absolute text-red-500 text-[10px] -top-[16px]'> {errFirstName} </div>}
                    </div>

                    <div className='relative w-full'>
                        <input className={`${errLastName ? 'border-red-500' : 'bordertransparent'} border bg-slate-100 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                            type='text'
                            name="lastName"
                            placeholder='Фамилия'
                            required
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value); setErrLastName(''); setErrMessage('') }}
                        />
                        {errLastName && <div className='absolute text-red-500 text-[10px] -top-[16px]'> {errLastName} </div>}
                    </div>
                 </div>
                    <hr className='mt-4 dark:border-slate-700' />
                    <div className='dark:text-slate-400'> Краткое описание:</div>
                    <div className='w-full relative '>
                        <textarea className='bg-slate-300 w-full dark:bg-slate-700 text-black dark:text-white \
                                         py-2 px-4 pr-20 rounded-md'
                            value={description}
                            onChange={e => setDescription(e.target.value)
                            }
                            placeholder="Новое описание"
                            rows={5}
                        />
                        <span className='absolute right-2 text-xs top-2 z-10 p-2 rounded-md bg-slate-200 \
                                     dark:bg-slate-800 text-black dark:text-white'>
                            {description.length}/255
                        </span>
                    </div>
                    <div className='relative w-full'>
                        <input className={`${errPhone ? 'border-red-500' : 'bordertransparent'} border bg-slate-100 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                            type='tel'
                            name="phone"
                            placeholder='8(XXX) XXX-XX-XX'
                            pattern='[0-9]{1}\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value); setErrPhone(''); setErrPhone('') }}
                        />
                        {errPhone && <div className='absolute text-red-500 text-[10px] -top-[16px]'> {errPhone} </div>}
                    </div>
                    <div className='flex gap-6 items-center'>
                        <MapPinIcon className='h-12 w-12 dark:text-slate-400' />

                        <div className='relative w-full'>
                            <input className={`${errLatitude ? 'border-red-500' : 'bordertransparent'} border bg-slate-100 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='number'
                                name="latitude"
                                step="0.00001"
                                min="-90.00000"
                                max="90.00000"
                                value={latitude}
                                onChange={(e) => { setLatitude(e.target.value); setErrLatitude(''); setErrLatitude('') }}
                            />
                            {errLatitude && <div className='absolute text-red-500 text-[10px] -top-[16px]'> {errLatitude} </div>}
                        </div>
                        <div className='relative w-full'>
                            <input className={`${errLongitude ? 'border-red-500' : 'bordertransparent'} border bg-slate-100 dark:bg-slate-700 text-black dark:text-white py-2 px-4 rounded-md w-full`}
                                type='number'
                                name="longitude"
                                step="0.00001"
                                min="-180.00000"
                                max="180.00000"
                                value={longitude}
                                onChange={(e) => { setLongitude(e.target.value); setErrLongitude(''); setErrLongitude('') }}
                            />
                            {errLongitude && <div className='absolute text-red-500 text-[10px] -top-[16px]'> {errLongitude} </div>}
                        </div>
                    </div>
                    <label className='flex gap-4 items-center' for commercial>
                        Коммерческий аккаунт
                        <input
                            type='checkbox'
                            name='commercial'
                            onChange={e => setCommercial(e.target.checked)}
                            checked={commercial}
                        />
                    </label>
                    <button
                        type="submit" className='scale-100 mt-4 w-full hover:scale-105 hover:drop-shadow-xl ease-in-out duration-300 \
                        py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 dark:from-purple-600 from-0% via-orange-600 \
                        dark:via-cyan-600 via-30% via-pink-500 dark:via-blue-500 via-60% to-fuchsia-700 \
                        dark:to-violet-700 to-100% text-white text-lg'

                    >
                        Сохранить
                    </button>
                </form>

            </div>
        </>
    )
}