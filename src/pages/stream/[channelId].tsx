import { IStream } from "@/@types/types"
import ReactHlsPlayer from "@/components/VideoPlayer"
import { GetStaticPaths, GetStaticProps } from "next"
import { Router, useRouter } from "next/router"
import { useQuery } from "react-query"

interface IStreamProps {
    streams: IStream[]
}

export default function Stream({ }: IStreamProps) {

    const router = useRouter()
    
    const { isLoading: isLoadingStreams, data: dataStreams } = useQuery<IStream[]>('repoStreams', () =>
    fetch('https://iptv-org.github.io/api/streams.json').then(res =>
    res.json()
        )
    )

    if (isLoadingStreams) return (
        <div>
            <div role="status" className="bg-gray-900 flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 384 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
    
    const { channelId } = router.query
    const streams = dataStreams?.filter(stream => stream.channel == channelId)

    return (
        <section  className="bg-gray-900 h-screen flex gap-2 align-center justify-center">
            {streams?.map(stream => (
                <div className="pb-fluid-video overflow-hidden relative w-9/12" key={stream.url}>
                    <div className="w-[100%] h-[50%] z-40 absolute"> </div>
                
                    {/*// @ts-ignore*/}
                    <ReactHlsPlayer
                        src={stream.url}
                        autoPlay={true}
                        controls={true}
                        className="w-[100%] rounded-lg	"
                    />
                </div>
            ))}
        </section>
    )
}