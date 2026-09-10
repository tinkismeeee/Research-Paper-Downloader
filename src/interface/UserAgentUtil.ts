export interface ChromeVersion {
    timestamp: string,
    channels: Channels
}

export interface Channels {
    Stable: Stable,
    Beta: Beta
    Dev: Dev
    Canary: Canary
}

export interface Stable {
    channel: string,
    version: string,
    revision: string,
}

export interface Beta {
    channel: string,
    version: string,
    revision: string
}

export interface Dev {
    channel: string,
    version: string,
    revision: string
}

export interface Canary {
    channel: string,
    version: string,
    revision: string
}

