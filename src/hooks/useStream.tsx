import { IChannel } from "@/context/DataContext";
import { useCallback } from "react";
import { useDataContext } from "./useDataContext";

export function useStream() {

    const { dataStreams } = useDataContext()

    const filterStreamByChannel = useCallback((channelId: string) => {
        if (!dataStreams) return []
        
        return dataStreams.filter(stream => stream.channel === channelId)
    }, [dataStreams])

    return {
        filterStreamByChannel
    }
}