export interface Author {
    id: string
    name: string
    avatar?: string
}

export interface Comment {
    id: string
    author: string
    content: string
    createdAt: string
}

export interface Post {
    id: string
    title: string
    excerpt: string
    body?: string
    author: Author
    createdAt: string
    commentsCount?: number
}

export interface PostDTO {
    id: string
    title: string
    summary: string
    content?: string
    author_name: string
    author_avatar?: string
    published_at: string
    comments_count?: number
}

export interface CommentDTO {
    id: string
    user_name: string
    text: string
    created_at: string
}
