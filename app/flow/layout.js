import Header from "../../components/header"

export default function FlowLayout({ children }) {
  return (
    <section className="flex h-screen w-full bg-white dark:bg-slate-800 md:bg-slate-50  md:dark:bg-slate-900 items-center justify-center md:p-5">
      <div className="w-full md:shadow-lg dark:bg-slate-800 max-w-3xl rounded-lg bg-white h-screen md:h-auto">
        <Header/>
        { children }
        
      </div>
    </section>
  )
}
