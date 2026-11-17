import { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, RefreshCw } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function App() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(API_URL)
      setUsers(response.data)
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter data pengguna berdasarkan nama secara client-side
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Data Pengguna
          </h1>
          <p className="text-sm text-slate-500">
            Aplikasi React untuk menampilkan data pengguna dari JSONPlaceholder menggunakan Axios dan shadcn/ui.
          </p>
        </div>

        {/* Baris Pencarian dan Tombol Muat Ulang */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Cari berdasarkan nama pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={fetchUsers}
            disabled={isLoading}
            className="gap-2 shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Muat Ulang
          </Button>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between gap-3">
            <span>Gagal mengambil data: {error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              className="border-red-300 text-red-700 hover:bg-red-100 shrink-0"
            >
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Tabel Data Pengguna */}
        <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                      <span>Memuat data pengguna...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                    Tidak ada pengguna yang cocok dengan kata kunci "{searchTerm}".
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-slate-50/80">
                    <TableCell className="font-medium text-slate-600">{user.id}</TableCell>
                    <TableCell className="font-semibold text-slate-900">{user.name}</TableCell>
                    <TableCell className="text-slate-600">@{user.username}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${user.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {user.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-slate-600">{user.phone}</TableCell>
                    <TableCell>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {user.website}
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Keterangan Jumlah Data */}
        {!isLoading && !error && (
          <div className="mt-3 text-xs text-slate-500">
            Menampilkan {filteredUsers.length} dari total {users.length} pengguna
          </div>
        )}

      </div>
    </div>
  )
}
