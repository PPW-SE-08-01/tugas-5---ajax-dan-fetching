import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SearchBar from "@/components/SearchBar";
import UserTable from "@/components/UserTable";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      setError(
        err.message || "Gagal mengambil data pengguna. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    axios
      .get(API_URL)
      .then((response) => {
        if (!ignore) setUsers(response.data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err.message || "Gagal mengambil data pengguna. Silakan coba lagi.",
          );
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <div className="app-shell min-h-screen bg-slate-50 py-10 px-4">
      <div className="app-container mx-auto max-w-6xl">
        <Card className="app-card">
          <CardHeader>
            <CardTitle className="app-title text-2xl">Daftar Pengguna</CardTitle>
            <CardDescription className="app-description">
              Data diambil dari JSONPlaceholder API dengan filter pencarian
              langsung di sisi klien (berdasarkan nama).
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onReset={() => setSearchQuery("")}
              disabled={loading || Boolean(error)}
              filteredCount={filteredUsers.length}
              totalCount={users.length}
              showCount={!loading && !error}
            />

            {loading && (
              <div className="rounded-md border border-dashed py-12 text-center text-sm text-slate-500">
                Memuat data pengguna...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 space-y-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={fetchUsers}
                >
                  Coba Lagi
                </Button>
              </div>
            )}

            {!loading && !error && (
              <UserTable users={filteredUsers} searchQuery={searchQuery} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
