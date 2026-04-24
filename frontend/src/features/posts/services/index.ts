import { useHttp } from '../../../shared/http'
import { mapComments, mapPost, mapPosts } from '../mappers'
import type { Comment, Post } from '../types'

const { get, post } = useHttp()
const BASE_URL = '/api/posts'

export const fetchPosts = async (): Promise<Post[]> => {
    try {
        const data = await get<any[]>(BASE_URL)
        return mapPosts(data)
    } catch (error) {
        console.error('Error in fetchPosts:', error)
        return []
    }
}

export const fetchPostById = async (id: string): Promise<Post> => {
    const data = await get<any>(`${BASE_URL}/${id}`)
    return mapPost(data)
}

export const fetchComments = async (postId: string): Promise<Comment[]> => {
    const data = await get<any[]>(`${BASE_URL}/${postId}/comments`)
    return mapComments(data)
}

export const postComment = async (
    postId: string,
    commentData: { author: string; content: string },
) => {
    return await post(`${BASE_URL}/${postId}/comments`, commentData)
}
