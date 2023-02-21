export interface ICountry {
    name: string,
    code: string,
    languages: string[],
    flag: string
}

export interface IChannel {
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

export interface IStream {
    channel: string,
    url: string,
    http_referrer: string,
    user_agent: string,
    status: string,
    width: number,
    height:  number,
    bitrate:  number,
    frame_rate: number,
    added_at: string,
    updated_at: string,
    checked_at: string,
}