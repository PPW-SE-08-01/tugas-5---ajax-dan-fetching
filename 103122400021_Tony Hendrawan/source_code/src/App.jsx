import { useEffect, useState } from 'react'
import axios from 'axios'
import { Search, RefreshCw } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(API_URL)
      setUsers(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchUsers()
  }, [])

  // Pencarian client-side (tanpa request ulang ke server)
  const keyword = search.trim().toLowerCase()
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword) ||
      u.username.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword) ||
      u.phone.toLowerCase().includes(keyword) ||
      u.company.name.toLowerCase().includes(keyword) ||
      u.address.city.toLowerCase().includes(keyword)
  )

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Data Pengguna</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama, username, email, telepon, perusahaan, kota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Muat Ulang
            </Button>
          </div>

          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Gagal mengambil data: {error}
            </p>
          )}

          <div className="rounded-md border">
            <Table>
              <TableCaption>
                Menampilkan {filteredUsers.length} dari {users.length} pengguna
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Kota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Tidak ada data yang cocok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>@{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company.name}</TableCell>
                      <TableCell>{user.address.city}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
