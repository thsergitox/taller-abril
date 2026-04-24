import { useHttp } from '../../../shared/http'
import { mapMembers } from '../mappers'
import type { CreateMemberInput, Member } from '../types'

const { get, post } = useHttp()
const BASE_URL = '/api/members'

export const fetchMembers = async (): Promise<Member[]> => {
    try {
        const data = await get<any[]>(BASE_URL)

        return mapMembers(data)
    } catch (error) {
        console.error('Error in fetchMembers:', error)
        return []
    }
}

export const createMember = async (memberData: CreateMemberInput) => {
    return await post(BASE_URL, memberData)
}
