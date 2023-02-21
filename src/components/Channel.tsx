import { IChannel, IStream } from "@/@types/types";
import Link from "next/link";
import { useCallback } from "react";
import { useQuery } from "react-query";

interface IChannelProps {
    
}

export function Channel() {

    
    const { isLoading: isLoadingChannels, data: dataChannels } = useQuery<IChannel[]>('repoChannels', () =>
    fetch('https://iptv-org.github.io/api/channels.json').then(res =>
    res.json()
    )
    )
    
    
    const { isLoading: isLoadingStreams, data: dataStreams } = useQuery<IStream[]>('repoStreams', () =>
    fetch('https://iptv-org.github.io/api/streams.json').then(res =>
        res.json()
        )
    )

    const filterByStreamsActive = useCallback((channels: IChannel[], streams: IStream[]) => {
        const listChannelsActive = streams.map(stream => stream.channel)

        return channels.filter(channels => channels.country === "BR" && listChannelsActive.includes(channels.id))
    }, []) 
    
    if (isLoadingChannels) return <h1>carrengando</h1>

    let channelsFilted = filterByStreamsActive(dataChannels || [], dataStreams || [])

    return (
        <div className="w-1/2 max-h-screen overflow-auto">
                <ul className="overflow-auto pt-32">
                {channelsFilted?.map(channel => (
                    <Link key={channel.id} href={`/stream/${channel.id}`}>
                        <li className="flex rounded-lg gap-4 bg-gray-800 p-4 mb-4">
                            <div className="bg-gray-900 w-40 h-48 flex items-center justify-center rounded-lg">
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
                    </Link>
                ))}
                </ul>
            </div>
    )
}