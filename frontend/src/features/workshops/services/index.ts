import { useHttp } from '../../../shared/http'
import { mapWorkshops } from '../mappers'
import type { Workshop } from '../types'

const { get } = useHttp()
const BASE_URL = '/api/workshops'

export const fetchWorkshops = async (): Promise<Workshop[]> => {
    try {
        const data = await get<any[]>(BASE_URL)
        return mapWorkshops(data)
    } catch (error) {
        console.error('Error in fetchWorkshops:', error)
        return []
    }
}
