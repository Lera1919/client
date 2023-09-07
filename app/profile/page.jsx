'use client'
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';


export default function Profile() {

        const [errorMessage, setErrorMessage] = useState('')
        const [description, setDescription] = useState('')
        const [firstName, setFirstName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')
        const [phone, setPhone] = useState('')
        const [latitude, setLatitude] = useState(0)
        const [longitude, setLongitude] = useState(0)
        const [commercial, setCommercial] = useState(false)

        const galleryRef = useRef(null);
        const { data: session, status, update } = useSession();
        const token  = session?.user?.token

        useEffect(()=>{
            fetch('/back/api/v1/user/profile', {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }).then((res)=>{
                if (res.status >= 500) {
                    setErrorMessage('Извините, сервис не доступен')
                    return
                }

                return res.json()
            }).then((data)=>{
                console.log(data);
                setDescription(data.description || '');
                setFirstName(data.firstName || '');
                setLastName(data.lastName || '');
                setEmail(data.email || '');
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
                setPhone(phone );
                setLongitude(data.longitude || null);
                setLatitude(data.latitude || null);
                setCommercial(data.commercial);
            })
                
        },[token])

        const handleSubmit = async (e) => {
            e.preventDefault();
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

                if (res.status >= 500 ) {
                    setErrorMessage('Извините, сервис не доступен.')
                    return
                }
                const data = await res.json()
                console.log(data);
        }

        const handleAvatar = () => {}
        const handleDescription = e => setDescription(e.target.value)
        
       



        return (
        <div className='grid grid-cols-1 w-full p-4 gap-4 md:max-w-4xl mx-auto'>
            <form className='grid mt-4 gap-4' onSubmit={handleSubmit}>
                <div className='grid md:flex gap-6'>
                    
                </div>

                <input
                    ref={galleryRef}
                    type='file'                 
                    accept='image/jpg, image/png, image/jpeg, image/gif'
                    onChange={handleAvatar}
                    name="gallery"
                    hidden
                />
                 <input                   
                    type='text'           
                    onChange={e => setFirstName(e.target.value)}
                    name="firstName"
                    value={firstName} 
                    required                   
                />
                   <input                   
                    type='text'           
                    onChange={e => setLastName(e.target.value)}
                    name="lastName"
                    value={lastName} 
                    required                      
                />
                 <div className=''>                  
                    {email}                      
                </div>
                
               
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
                <input                   
                    type='tel'           
                    onChange={e => setPhone(e.target.value || null)}
                    name="phone"
                    value={phone}                              
                    placeholder='8(XXX) XXX-XX-XX'  
                    pattern='[0-9]{1}\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}'  
                />
                <input                   
                    type='number'           
                    onChange={e => setLatitude(e.target.value || null)}
                    name="latitude"
                    value={latitude}                              
                    step="0.00001"
                    min="-90.00000"  
                    max="90.00000" 
                />
                <input                   
                    type='number'           
                    onChange={e => setLongitude(e.target.value || null)}
                    name="longitude"
                    value={longitude}                              
                    step="0.00001"
                    min="-180.00000"  
                    max="180.00000"  
                />
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
    )
}