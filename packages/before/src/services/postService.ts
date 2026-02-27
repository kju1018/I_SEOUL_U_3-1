export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'posts_data';

const getPosts = (): Post[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [
    { id: 1, title: '디자인 시스템 구축 가이드', content: '디자인 시스템은...', author: '김철수', category: 'development', status: 'published', views: 1234, createdAt: '2024-01-15' },
    { id: 2, title: 'React 19 새로운 기능', content: 'React 19에서는...', author: '이영희', category: 'development', status: 'published', views: 856, createdAt: '2024-01-18' },
    { id: 3, title: 'TailwindCSS vs CSS-in-JS', content: '두 방식을 비교하면...', author: '박민수', category: 'design', status: 'draft', views: 432, createdAt: '2024-01-20' },
    { id: 4, title: '웹 접근성 체크리스트', content: '접근성을 위해서는...', author: '김철수', category: 'accessibility', status: 'published', views: 2341, createdAt: '2024-01-22' },
    { id: 5, title: 'TypeScript 고급 타입', content: 'TypeScript의 고급 타입 시스템...', author: '정수진', category: 'development', status: 'archived', views: 567, createdAt: '2024-01-10' },
  ];
};

const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const postService = {
  async getAll(): Promise<Post[]> {
    return getPosts();
  },

  async getById(id: number): Promise<Post | null> {
    const posts = getPosts();
    return posts.find(p => p.id === id) || null;
  },

  async create(postData: Omit<Post, 'id' | 'createdAt' | 'views'>): Promise<Post> {

    const posts = getPosts();

    if (postData.title.length < 5) {
      throw new Error('Title must be at least 5 characters');
    }

    const newPost: Post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      ...postData,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    posts.push(newPost);
    savePosts(posts);
    return newPost;
  },

  async update(id: number, postData: Partial<Omit<Post, 'id' | 'createdAt' | 'views'>>): Promise<Post> {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error('Post not found');
    }

    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    savePosts(posts);
    return posts[index];
  },

  async delete(id: number): Promise<void> {
    const posts = getPosts();
    const filtered = posts.filter(p => p.id !== id);

    if (filtered.length === posts.length) {
      throw new Error('Post not found');
    }

    savePosts(filtered);
  },

  async publish(id: number): Promise<Post> {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error('Post not found');
    }

    if (posts[index].status === 'published') {
      throw new Error('Post is already published');
    }

    posts[index].status = 'published';
    savePosts(posts);
    return posts[index];
  },

  async archive(id: number): Promise<Post> {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error('Post not found');
    }

    posts[index].status = 'archived';
    savePosts(posts);
    return posts[index];
  },

  async restore(id: number): Promise<Post> {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new Error('Post not found');
    }

    if (posts[index].status !== 'archived') {
      throw new Error('Only archived posts can be restored');
    }

    posts[index].status = 'published';
    savePosts(posts);
    return posts[index];
  },
};
