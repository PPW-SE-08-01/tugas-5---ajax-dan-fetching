import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/user"

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users"

export function App() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(USERS_API_URL, {
          signal: controller.signal,
        })
        setUsers(response.data)
        setError(null)
      } catch (err) {
        if (
          axios.isCancel(err) ||
          (axios.isAxiosError(err) && err.code === "ERR_CANCELED")
        ) {
          return
        }
        setError(
          "Gagal memuat data pengguna. Silakan periksa koneksi internet Anda."
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchUsers()

    return () => {
      controller.abort()
    }
  }, [])

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Daftar Pengguna
        </h1>
        <p className="text-sm text-muted-foreground">
          Data pengguna dari JSONPlaceholder API.
        </p>
      </div>

      <Input
        type="text"
        placeholder="Cari berdasarkan nama..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Website</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Memuat data pengguna...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-destructive"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Data pengguna dengan nama &quot;{search}&quot; tidak
                  ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.website}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default App
