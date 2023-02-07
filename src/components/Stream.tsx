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
        <section className="h-screen flex flex-col gap-2 w-96 bg-red-900">
            {streamsFilted?.map(stream => (
                <div className="h-full relative" key={stream.url}>
                    <ReactHlsPlayer
                        src={stream.url}
                        autoPlay={true}
                        controls={true}
                        width="100%"
                        height="auto"
                        className="h-full absolute scale-125"
                    />
                </div>
            ))}
        </section>
    )
}