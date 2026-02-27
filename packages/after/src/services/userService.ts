export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

const STORAGE_KEY = 'users_data';

const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [
    { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', status: 'active', createdAt: '2024-01-01', lastLogin: '2024-01-20' },
    { id: 2, username: 'john_doe', email: 'john@example.com', role: 'user', status: 'active', createdAt: '2024-01-05', lastLogin: '2024-01-19' },
    { id: 3, username: 'jane_smith', email: 'jane@example.com', role: 'moderator', status: 'active', createdAt: '2024-01-10' },
    { id: 4, username: 'bob', email: 'bob@example.com', role: 'user', status: 'suspended', createdAt: '2024-01-15' },
  ];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const userService = {
  async getAll(): Promise<User[]> {
    return getUsers();
  },

  async getById(id: number): Promise<User | null> {
    const users = getUsers();
    return users.find(u => u.id === id) || null;
  },

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {

    const users = getUsers();

    if (users.some(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }

    if (users.some(u => u.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      ...userData,
      createdAt: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  async update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    if (userData.username && users.some(u => u.username === userData.username && u.id !== id)) {
      throw new Error('Username already exists');
    }

    if (userData.email && users.some(u => u.email === userData.email && u.id !== id)) {
      throw new Error('Email already exists');
    }

    users[index] = { ...users[index], ...userData };
    saveUsers(users);
    return users[index];
  },

  async delete(id: number): Promise<void> {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== id);

    if (filtered.length === users.length) {
      throw new Error('User not found');
    }

    saveUsers(filtered);
  },

  async checkUsernameAvailable(username: string): Promise<boolean> {
    const users = getUsers();
    return !users.some(u => u.username.toLowerCase() === username.toLowerCase());
  },

  async checkEmailAvailable(email: string): Promise<boolean> {
    const users = getUsers();
    return !users.some(u => u.email.toLowerCase() === email.toLowerCase());
  },
};
