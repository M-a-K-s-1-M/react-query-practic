const BASE_URL = 'http://localhost:3000'

export type PaginateResult<T> = {
    pages: number | null,
    prev: number | null,
    items: number | null,
    last: number | null,
    first: number | null,
    data: T[]
}

export type TodoDto = {
    id: string,
    text: string,
    done: boolean,
}
export const todoListApi = {
    getLogoList: (
        { page }: { page: number },
        { signal }: { signal: AbortSignal }
    ) => {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
            signal
        }).then(
            res => res.json() as Promise<PaginateResult<TodoDto[]>>
        )
    }
};