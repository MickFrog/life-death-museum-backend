import { StorageInterface } from "../types/storage";
import { MockStorage } from "./mock-storage";

/**
 * Storage service instance
 *
 * To replace with actual implementation (e.g., S3):
 * 1. Create a new class implementing StorageInterface
 * 2. Replace storage below with the actual implementation instance
 */
export const storage: StorageInterface = new MockStorage(
  process.env.STORAGE_BASE_URL || "https://mock-storage.example.com"
);
