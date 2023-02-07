import { count } from "console"
import { useQuery } from "react-query"

interface ICountry {
    name: string,
    code: string,
    languages: string[],
    flag: string
}

interface ICountryProps {
    countryCode: string;
    onChangeCountry: (countryCode: string) => void;
}

export function Country({countryCode, onChangeCountry}: ICountryProps) {
    const { isLoading, error, data } = useQuery<ICountry[]>('repoData', () =>
    fetch('https://iptv-org.github.io/api/countries.json').then(res =>
            res.json()
        )
    )

    if (isLoading) return <h1>Loading...</h1>

    return (
        <aside className="max-h-screen overflow-auto">
            <ul className="overflow-auto">
                {data?.map(country => {
                    if (country.code === countryCode) {
                        return (
                            <li
                            className={`flex items-center text-gray-300 p-4`}
                            key={country.code}
                            onClick={() => onChangeCountry(country.code)} 
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
                            onClick={() => onChangeCountry(country.code)} 
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