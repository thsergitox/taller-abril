import type { Comment, CommentDTO, Post, PostDTO } from '../types'

export const mapPost = (dto: PostDTO): Post => ({
    id: dto.id,
    title: dto.title,
    excerpt: dto.summary,
    body: dto.content,
    createdAt: dto.published_at,
    commentsCount: dto.comments_count || 0,
    author: {
        id: dto.author_name, // Assuming name as ID for simplicity if not provided
        name: dto.author_name,
        avatar:
            dto.author_avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${dto.author_name}`,
    },
})

export const mapPosts = (dtos: PostDTO[]): Post[] => {
    return dtos.map(mapPost)
}

export const mapComment = (dto: CommentDTO): Comment => ({
    id: dto.id,
    author: dto.user_name,
    content: dto.text,
    createdAt: dto.created_at,
})

export const mapComments = (dtos: CommentDTO[]): Comment[] => {
    return dtos.map(mapComment)
}
