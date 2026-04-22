import type { User } from '@repo/types';

// ─── Seed data ────────────────────────────────────────────────────────────────

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
  { id: '3', name: 'Carol White', email: 'carol@example.com' },
];

// ─── Mock handlers ────────────────────────────────────────────────────────────

export const userMock = {
  getUser: async (id: string): Promise<User> => {
    await delay();
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    return structuredClone(user);
  },

  getUsers: async (): Promise<User[]> => {
    await delay();
    return structuredClone(mockUsers);
  },

  createUser: async (payload: Omit<User, 'id'>): Promise<User> => {
    await delay();
    const newUser: User = { id: String(Date.now()), ...payload };
    mockUsers.push(newUser);
    return structuredClone(newUser);
  },

  updateUser: async (id: string, payload: Partial<Omit<User, 'id'>>): Promise<User> => {
    await delay();
    const idx = mockUsers.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error(`User ${id} not found`);
    mockUsers[idx] = { ...mockUsers[idx], ...payload };
    return structuredClone(mockUsers[idx]);
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay();
    mockUsers = mockUsers.filter((u) => u.id !== id);
  },
};
