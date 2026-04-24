export const useHttp = () => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
        const url = `${baseUrl}${path}`
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    const get = <T>(path: string) => request<T>(path, { method: 'GET' })

    const post = <T>(path: string, data: any) =>
        request<T>(path, {
            method: 'POST',
            body: JSON.stringify(data),
        })

    return {
        get,
        post,
        request,
    }
}
