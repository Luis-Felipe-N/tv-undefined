import { createContext, ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";

export interface ICountry {
    name: string,
    code: string,
    languages: string[],
    flag: string
}

export interface IChannel {
    id: string,
    name: string,
    alt_names: string[],
    network: string,
    owners: string[],
    country: string,
    subdivision: string,
    city: string,
    broadcast_area: string[],
    languages: string[],
    categories: string[],
    is_nsfw: false,
    launched: string,
    closed: string,
    replaced_by: string,
    website: string,
    logo: string
}

export interface IStream {
    channel: string,
    url: string,
    http_referrer: string,
    user_agent: string,
    status: string,
    width: number,
    height:  number,
    bitrate:  number,
    frame_rate: number,
    added_at: string,
    updated_at: string,
    checked_at: string,
}
export interface IDataContext {
    dataCountries: ICountry[] | undefined;
    dataChannels: IChannel[] | undefined;
    dataStreams: IStream[] | undefined;
    isLoading: boolean;
}

interface IDataProviderProps {
  children: ReactNode
}

export const DataContext = createContext({} as IDataContext)

export function DataProvider({ children }: IDataProviderProps) {
    const [countryCode, setCountryCode] = useState('BR')
    const [channelId, setChannelId] = useState('BR')
  
    function handleChangeCountry(_countryCode: string) {
        setCountryCode(_countryCode)
    }
  
    function handleChangeChannel(_channelId: string) {
        setChannelId(_channelId)
    }

    const { isLoading: isLoadingChannels, data: dataChannels } = useQuery<IChannel[]>('repoChannels', () =>
    fetch('https://iptv-org.github.io/api/channels.json').then(res =>
            res.json()
        )
    )

    const { isLoading: isLoadingCountries, data: dataCountries } = useQuery<ICountry[]>('repoCountries', () =>
    fetch('https://iptv-org.github.io/api/countries.json').then(res =>
            res.json()
        )
    )

    const { isLoading: isLoadingStreams, data: dataStreams } = useQuery<IStream[]>('repoStreams', () =>
    fetch('https://iptv-org.github.io/api/streams.json').then(res =>
            res.json()
        )
    )
    
    let isLoading = isLoadingCountries || isLoadingChannels || isLoadingStreams


    if (isLoading) return <h1>Loading</h1>
    return (
        <DataContext.Provider value={{ isLoading, dataChannels, dataCountries, dataStreams }}>
            {children}
        </DataContext.Provider>
    )
}
