import type { Workshop, WorkshopDTO } from '../types'

export const mapWorkshop = (dto: WorkshopDTO): Workshop => ({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    date: dto.scheduled_at,
    presenters: dto.presenters.map((p) => ({
        id: p.id,
        name: p.name,
        avatar: p.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`,
    })),
})

export const mapWorkshops = (dtos: WorkshopDTO[]): Workshop[] => {
    return dtos.map(mapWorkshop)
}
