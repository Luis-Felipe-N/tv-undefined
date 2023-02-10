import { useDataContext } from "@/hooks/useDataContext";
import { useStateContext } from "@/hooks/useStateContext";
import { useStream } from "@/hooks/useStream";
import ReactHlsPlayer from "./VideoPlayer";

interface IStreamProps {
    
}

export function Stream({  }: IStreamProps) {
    const { channelId } = useStateContext()
    const { filterStreamByChannel } = useStream()

    const streamsFilted = filterStreamByChannel(channelId)

    return (
        <section className="h-screen  flex gap-2 w-96">
            {streamsFilted?.map(stream => (
                <div className="h-full overflow-hidden w-96 relative bg-red-900" key={stream.url}>
                    <div className="w-[100%] h-[50%] z-40 absolute"> </div>
                
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