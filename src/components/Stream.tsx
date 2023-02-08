import { useQuery } from "react-query";
import ReactHlsPlayer from "./VideoPlayer";

interface IStream {
    channel: string,
    url: string,
    http_referrer: string,
    user_agent: string,
    status: string,
    width: 1280,
    height: 720,
    bitrate: 565040,
    frame_rate: 29.97,
    added_at: string,
    updated_at: string,
    checked_at: string,
}

interface IStreamProps {
    channelId: string;
}

export function Stream({ channelId }: IStreamProps) {
    const { isLoading, error, data } = useQuery<IStream[]>('repoStreams', () =>
    fetch('https://iptv-org.github.io/api/streams.json').then(res =>
            res.json()
        )
    )
    
    if (isLoading) return <h1>Loading...</h1>

    const streamsFilted = data?.filter(stream => stream.channel === channelId)

    console.log(channelId, streamsFilted)

    return (
        <section className="h-screen  flex gap-2 w-96">
            {streamsFilted?.map(stream => (
                <div className="h-full overflow-hidden w-96 relative bg-red-900" key={stream.url}>
                    <div className="w-[100%] h-[50%] z-40 absolute bg-gradient-to-br bg-gradient-to-bt from-gray-900"> </div>
                
                    {/*// @ts-ignore*/}
                    <ReactHlsPlayer
                        src={stream.url}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="auto"
                        className="h-full w-full absolute top-0 left-0 z-10 scale-[4.6]"
                    />
                </div>
            ))}
        </section>
    )
}