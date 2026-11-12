import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data pengguna. Silakan periksa koneksi internet.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8 space-y-6 max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Data Pengguna
        </h1>
        <p className="text-gray-500">
          Daftar pengguna yang diambil dari API JSONPlaceholder.
        </p>
      </div>

      <div className="flex items-center w-full max-w-md">
        <Input
          type="text"
          placeholder="Cari berdasarkan nama..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-sm"
        />
      </div>

      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-[60px] text-center">ID</TableHead>
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
                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                  <p className="mt-2">Memuat data...</p>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-red-600 font-medium">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                  Tidak ada pengguna dengan nama <span className="font-semibold">"{searchQuery}"</span>.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="font-medium text-center">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.phone}</TableCell>
                  <TableCell className="text-blue-600 hover:underline">
                    {user.website}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}