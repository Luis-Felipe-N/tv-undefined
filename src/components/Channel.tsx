import { useChannel } from "@/hooks/useChannel";
import { useDataContext } from "@/hooks/useDataContext";
import { useStateContext } from "@/hooks/useStateContext";
import { channel } from "diagnostics_channel";
import { useCallback, useState } from "react";
import { useQuery } from "react-query"

interface IChannel {
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

interface IChannelProps {

}

export function Channel({  }: IChannelProps) {
    const { handleChangeChannel, countryCode } = useStateContext()
    const { filterChannelsByCountry } = useChannel()
    
    const channelsFilted = filterChannelsByCountry(countryCode)
    
    return (
        <div className="w-1/2 max-h-screen overflow-auto">
            <ul className="overflow-auto pt-32">
            {channelsFilted?.map(channel => (
                <li onClick={() => handleChangeChannel(channel.id)} className="flex rounded-lg gap-4 bg-gray-800 p-4 mb-4" key={channel.id}>
                    <div className="bg-gray-900 w-40 h-48 flex items-center justify-center rounded-lg

">
                        <img 
                            className="w-24"
                            src={channel.logo} 
                            alt={`Imagem de logo da ${channel.name}`}
                        />
                    </div>
                    <div className="p-4">
                        <strong className="block text-2xl text-gray-300">{channel.name}</strong>
                        <a className="text-gray-500" target="_blank" rel="noopener noreferrer" href={channel.website}>{channel.website}</a>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    )
}