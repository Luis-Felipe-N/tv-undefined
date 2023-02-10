import { IChannel } from "@/context/DataContext";
import { useCallback } from "react";
import { useDataContext } from "./useDataContext";
import { useStream } from "./useStream";

export function useChannel() {

    const { dataStreams, dataChannels } = useDataContext()
    const { filterStreamByChannel } = useStream()

    const checkHasStream = useCallback((channelId: string) => {
        if (!dataStreams) return false

        const streamsFilted = filterStreamByChannel(channelId)

        return streamsFilted.length > 0
    },  [dataStreams, filterStreamByChannel])

    const filterChannelsByCountry = useCallback((countryCode: string) => {
        if (!dataChannels) return []

        return dataChannels.filter(channel => {
            if (!checkHasStream(channel.id)) return false
            
            if (channel.country === countryCode) return true
        })

    }, [dataChannels, checkHasStream])

    return {
        checkHasStream,
        filterChannelsByCountry
    }
}