import type { ApiResponse, User } from '@repo/types';
import cors from 'cors';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Mock Data
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

app.get('/api/users', (_req: Request, res: Response) => {
  const response: ApiResponse<User[]> = {
    data: users,
    message: 'Users fetched successfully',
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Mock API is running on http://localhost:${PORT}`);
});
