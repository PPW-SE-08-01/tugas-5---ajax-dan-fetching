import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./components/ui/table";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (err) {
      setError("Gagal memuat data pengguna dari JSONPlaceholder. Silakan periksa koneksi internet.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = user.name?.toLowerCase().includes(term);
    const usernameMatch = user.username?.toLowerCase().includes(term);
    const emailMatch = user.email?.toLowerCase().includes(term);
    const phoneMatch = user.phone?.toLowerCase().includes(term);
    const websiteMatch = user.website?.toLowerCase().includes(term);

    return nameMatch || usernameMatch || emailMatch || phoneMatch || websiteMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              NIM: 103122400022 | Muhammad Restu Aditya
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Tugas 5 React Data Fetching & Search
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Menampilkan Data Pengguna JSONPlaceholder Menggunakan Axios, useEffect, useState, dan Tabel shadcn/ui
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md font-mono">
              SE-08-01
            </span>
            <span className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-md font-medium">
              Telkom University
            </span>
          </div>
        </header>

        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:max-w-md">
              <label htmlFor="search" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Cari Pengguna (Client-Side)
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Cari berdasarkan nama, username, email, website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 self-end sm:self-center">
              <span>Menampilkan:</span>
              <span className="font-semibold text-slate-800">
                {filteredUsers.length} dari {users.length} pengguna
              </span>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-xs text-blue-600 hover:underline ml-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {loading && (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
              <p className="text-sm">Sedang mengambil data pengguna dari JSONPlaceholder...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                type="button"
                onClick={fetchUsers}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 transition"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16 text-center">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Website</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-center font-mono font-medium text-slate-500">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {user.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">@{user.username}</Badge>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${user.email}`}
                            className="text-blue-600 hover:underline text-xs"
                          >
                            {user.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-xs text-slate-600 font-mono">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            {user.website}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                        Tidak ada data pengguna yang cocok dengan kata kunci "<strong>{searchTerm}</strong>".
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </section>

        <footer className="text-center text-xs text-slate-400 py-4">
          <p>Tugas Pemrograman Web &copy; 2026 - Muhammad Restu Aditya (103122400022)</p>
        </footer>
      </div>
    </div>
  );
}
