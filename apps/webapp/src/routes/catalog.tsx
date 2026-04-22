import Header from '@/header';
import type { ApiResponse, User } from '@repo/types';

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/catalog')({
  component: Catalog,
});

function Catalog() {
  const { isPending, error, data } = useQuery<ApiResponse<User[]>, Error>({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:4000/api/users').then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      }),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Header />

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">catalog</h2>

        {isPending && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        {!isPending && !error && data?.data.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {data?.data && data.data.length > 0 && (
          <ul className="space-y-3">
            {data.data.map((user) => (
              <li key={user.id} className="p-3 bg-gray-100 rounded border border-gray-200">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
