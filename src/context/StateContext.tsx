import { createContext, ReactNode, useEffect, useState } from "react";

export interface IStateContext {
    countryCode: string;
    channelId: string;
    handleChangeCountry: (_countryCode: string) => void;
    handleChangeChannel: (_countryCode: string) => void;
}

interface IStateProviderProps {
  children: ReactNode
}

export const StateContext = createContext({} as IStateContext)

export function StateProvider({ children }: IStateProviderProps) {
    const [countryCode, setCountryCode] = useState('BR')
    const [channelId, setChannelId] = useState('BR')
  
    function handleChangeCountry(_countryCode: string) {
        setCountryCode(_countryCode)
    }
  
    function handleChangeChannel(_channelId: string) {
        setChannelId(_channelId)
    }

    return (
        <StateContext.Provider value={{ channelId, countryCode, handleChangeChannel, handleChangeCountry }}>
            {children}
        </StateContext.Provider>
    )
}
