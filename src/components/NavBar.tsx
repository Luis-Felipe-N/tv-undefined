import Link from "next/link";

export function NavBar() {
    return (
        <header className="z-30 gap-60 relative flex px-8 py-8 bg-gray-900">
            <Link href={"/"}>
                <h1 className="text-2xl whitespace-nowrap text-gray-100 font-bold">tv undefined</h1>    
            </Link>
            <div className="w-full">
                <input type="search" placeholder="Pesquise por pais, canal ou programa" className="py-4 w-96 px-8 bg-gray-700 text-gray-100 rounded-full" />
            </div>
        </header>
    )
}