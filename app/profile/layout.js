import Header from "../../components/header"


export default function CreateLayout({ children }) {
    return (
        <div className="w-full  mt-16">
            <Header/>
            {children}
        </div>
    )
}