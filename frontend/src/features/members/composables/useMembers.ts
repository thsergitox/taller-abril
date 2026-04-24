import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { createMember, fetchMembers } from '../services'
import type { CreateMemberInput } from '../types'

export const useMembers = () => {
    const queryClient = useQueryClient()

    const {
        data: members,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
    })

    const { mutate: addMember, isPending: isCreating } = useMutation({
        mutationFn: (data: CreateMemberInput) => createMember(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] })
        },
    })

    return {
        members,
        isLoading,
        isError,
        error,
        refetch,
        addMember,
        isCreating,
    }
}
