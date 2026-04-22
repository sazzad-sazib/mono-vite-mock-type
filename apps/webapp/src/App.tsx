import Header from '@/Header';
import type { ApiResponse, User } from '@repo/types';

import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then((res) => res.json())
      .then((res: ApiResponse<User[]>) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Header />

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users from Mock API</h2>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="p-3 bg-gray-100 rounded border border-gray-200">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
