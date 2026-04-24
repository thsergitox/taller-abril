import type { Member, MemberDTO } from '../types'

export const mapMember = (dto: MemberDTO): Member => ({
    id: dto.id,
    name: dto.name,
    role: dto.role,
    bio: dto.bio,
    avatar: dto.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dto.name}`,
    socials: {
        github: dto.githubUrl,
        linkedin: dto.linkedinUrl,
        instagram: dto.instagramUrl,
    },
})

export const mapMembers = (dtos: MemberDTO[]): Member[] => {
    return dtos.map(mapMember)
}
