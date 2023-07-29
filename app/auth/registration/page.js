import Image from 'next/image'

export default function Registration() {
    return (

        <div className='flex h-screen w-full bg-slate-50 items-center justify-center'>
            <div className='grid grid-cols-5 max-w-[1024px]'>
                <Image
                    src="/images/phone.png"
                    alt="Phones"
                    className="col-start-1 col-end-4"
                    width={800}
                    height={766}
                    priority
                />
                <div className='col-start-4 col-end-6 rounded-lg bg-white shadow-md p-8'>
                    <div className='flex items-center justify-center gap-2 mt-4'>
                        <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            className=""
                            width={44}
                            height={44}
                            priority
                        />

                        <span className='text-lg font-bold'>Instagram</span>
                    </div>
                    <form className='grid mt-4 gap-4'>
                        <input className='bg-slate-100 py-2 px-4 rounded-md' type='text' name="firstName" placeholder='Имя'/>
                        <input className='bg-slate-100 py-2 px-4 rounded-md' type='text' name="lastName" placeholder='Фамилия'/>
                        <input className='bg-slate-100 py-2 px-4 rounded-md' type='email' name="email" placeholder='Электронная почта'/>
                        <input className='bg-slate-100 py-2 px-4 rounded-md' type='password' name="password" placeholder='Пароль'/>
                        <button className='bg-gradient-to-r from-amber-500 from-0% via-orange-600 via-30% via-pink-500 via-60% to-fuchsia-700 to-100% text-white text-lg py-3 px-4 rounded-md hover:scale-105 hover:drop-shadow-lg easy-in-out duration-300 ' onClick={''}>
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
