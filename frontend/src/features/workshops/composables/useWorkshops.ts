import { useQuery } from '@tanstack/vue-query'

import { fetchWorkshops } from '../services'

export const useWorkshops = () => {
    const {
        data: workshops,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['workshops'],
        queryFn: fetchWorkshops,
    })

    return {
        workshops,
        isLoading,
        isError,
        error,
    }
}
