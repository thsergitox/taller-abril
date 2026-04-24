import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { fetchComments, fetchPostById, fetchPosts, postComment } from '../services'

export const usePosts = () => {
    const {
        data: posts,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })

    return {
        posts,
        isLoading,
        isError,
    }
}

export const usePostDetail = (postId: string) => {
    const queryClient = useQueryClient()

    const {
        data: post,
        isLoading: isLoadingPost,
        isError: isErrorPost,
    } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
    })

    const { data: comments, isLoading: isLoadingComments } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    })

    const { mutate: addComment, isPending: isSubmitting } = useMutation({
        mutationFn: (data: { author: string; content: string }) => postComment(postId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
        },
    })

    return {
        post,
        comments,
        isLoading: isLoadingPost || isLoadingComments,
        isError: isErrorPost,
        addComment,
        isSubmitting,
    }
}
