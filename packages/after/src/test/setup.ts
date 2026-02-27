import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window.confirm for delete operations
global.confirm = vi.fn(() => true);
