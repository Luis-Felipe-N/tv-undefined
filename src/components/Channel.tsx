import { channel } from "diagnostics_channel";
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
    countryCode: string;
    channelId: string;
    onChangeChannel: (channelid: string) => void
}

export function Channel({ countryCode, channelId, onChangeChannel }: IChannelProps) {
    
    const { isLoading, error, data } = useQuery<IChannel[]>('repoCountries', () =>
    fetch('https://iptv-org.github.io/api/channels.json').then(res =>
            res.json()
        )
    )
    
    if (isLoading) return <h1>Loading...</h1>
    
    const channelsFilted = data?.filter(channel => channel.country === countryCode)

    return (
        <div className="w-1/2">
            <ul>
            {channelsFilted?.map(channel => (
                <li onClick={() => onChangeChannel(channel.id)} className="flex gap-4 bg-gray-800 p-4 mb-4" key={channel.id}>
                    <div className="bg-gray-900 w-40 h-48 flex items-center justify-center">
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