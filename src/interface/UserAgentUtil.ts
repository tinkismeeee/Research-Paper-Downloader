export interface ChromeVersion {
    timestamp: string,
    channel: Channels
}

export interface Channels {
    stable: Stable,
    beta: Beta
    dev: Dev
    canary: Canary
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

