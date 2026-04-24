export interface Presenter {
    id: string
    name: string
    avatar?: string
}

export interface Workshop {
    id: string
    title: string
    description: string
    presenters: Presenter[]
    date?: string
}

export interface WorkshopDTO {
    id: string
    title: string
    description: string
    presenters: {
        id: string
        name: string
        avatarUrl?: string
    }[]
    scheduled_at?: string
}
