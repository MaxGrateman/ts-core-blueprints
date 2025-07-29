import { useEffect, useState } from "react"


type User = {
    id: number,
    name: string,
    email: string
}

export function ApiResponseHandle() {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users/1")

                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }

                const data = (await res.json()) as User

                setUser(data)
            } catch(err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Unknown error')
                }
                console.log('Fetch error:', err)
            }
        }

        fetchUser()
    }, [])

    if (error) return <div style={{color: 'red'}}>Error: {error}</div>
    if (!user) return <div>Loading...</div>

    return(
        <div style={{padding: '2px', border: '1px solid gray'}}>
            <h2>User Info</h2>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
}