export interface SocialLinks {
    github: string
    linkedin: string
    instagram: string
}

export interface Member {
    id: string
    name: string
    role: string
    bio: string
    avatar: string
    socials: SocialLinks
}

export interface MemberDTO {
    id: string
    name: string
    role: string
    bio: string
    avatarUrl: string
    instagramUrl: string
    linkedinUrl: string
    githubUrl: string
}

export interface CreateMemberInput {
    name: string
    bio: string
    avatarUrl: string
    instagramUrl: string
    linkedinUrl: string
    githubUrl: string
}
