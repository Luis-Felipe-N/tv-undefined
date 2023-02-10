import { useDataContext } from "@/hooks/useDataContext"
import { useStateContext } from "@/hooks/useStateContext"
import { count } from "console"
import { useQuery } from "react-query"

interface ICountry {
    name: string,
    code: string,
    languages: string[],
    flag: string
}

interface ICountryProps {

}

export function Country({ }: ICountryProps) {
    const { countryCode, handleChangeCountry } = useStateContext()   
    const { dataCountries } = useDataContext()

    return (
        <aside className="max-h-screen overflow-auto">
            <ul className="overflow-auto pt-32">
                {dataCountries?.map(country => {
                    if (country.code === countryCode) {
                        return (
                            <li
                            className={`flex items-center text-gray-300 p-4`}
                            key={country.code}
                            onClick={() => handleChangeCountry(country.code)} 
                            >
                                <div className="flex ease-in duration-100 cursor-pointer gap-4 items-center scale-150 translate-x-6">
                                    <span className="text-4xl">{country.flag}</span><p>{country.name}</p>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li
                            className={`flex items-center text-gray-300 p-4`}
                            key={country.code}
                            onClick={() => handleChangeCountry(country.code)} 
                            >
                                <div className="flex ease-in duration-100 cursor-pointer gap-4 items-center hover:scale-125">
                                    <span className="text-4xl">{country.flag}</span> <p>{country.name}</p>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        </aside>
    )
}