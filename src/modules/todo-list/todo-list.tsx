import { useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useState } from "react"


export function TodoList() {
    const [page, setPage] = useState(1);


    const { data: todoItems, isPending, error, } = useQuery({
        queryKey: ['tasks', 'list'],
        queryFn: (meta) => todoListApi.getLogoList({ page }, meta)
    })

    if (isPending) {
        return <div>loading</div>
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>
    }

    return (
        <section className="p-5 mx-auto max-w-[1200px] mt-10">
            <h1 className="text-3xl font-bold underline mb-5">Todo list</h1>

            <div className="flex flex-col gap-4">
                {todoItems.data.map((todo) => <div key={todo.id} className="border border-slate-300 rounded p-3">{todo.text}</div>)}
            </div>
            <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(p - 1, 0))} className="p-3 rounded border border-teal-500">prev</button>
                <button onClick={() => setPage(p => p + 1)} className="p-3 rounded border border-teal-500">next</button>
            </div>
        </section>
    )
}