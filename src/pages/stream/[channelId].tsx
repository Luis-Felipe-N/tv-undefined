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

    if (isLoadingStreams) return <h1>Carregando</h1>
    
    const { channelId } = router.query
    const streams = dataStreams?.filter(stream => stream.channel == channelId)

    return (
        <section className="h-screen  flex gap-2">
            {streams?.map(stream => (
                <div className="pb-fluid-video overflow-hidden relative bg-red-900" key={stream.url}>
                    <div className="w-[100%] h-[50%] z-40 absolute"> </div>
                
                    {/*// @ts-ignore*/}
                    <ReactHlsPlayer
                        src={stream.url}
                        autoPlay={true}
                        controls={true}
                        className=""
                    />
                </div>
            ))}
        </section>
    )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: true
//     }
// }

// export const getStaticProps: GetStaticProps = async ({params}) => {
//     const id = params?.channelId

//     try {
//         console.log(id)
//         const data = await fetch('https://iptv-org.github.io/api/streams.json')
//         const dataJson: IStream[] = await data.json()
//         const streams = dataJson.filter(stream => stream.channel === id)
//         console.log(streams)

//         return {
//             props: {
//                 streams
//             },
//             revalidate: 60
//         }
//     } catch (error) {
//         return {
//             notFound: true
//         }
//     }
    
// }