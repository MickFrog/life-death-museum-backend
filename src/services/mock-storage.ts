import { StorageInterface } from "../types/storage";

/**
 * Mock storage implementation for development/testing
 * In production, replace with actual S3 or other storage implementation
 */
export class MockStorage implements StorageInterface {
  private baseUrl: string;

  constructor(baseUrl: string = "https://mock-storage.example.com") {
    this.baseUrl = baseUrl;
  }

  async uploadFromBuffer(
    buffer: Buffer,
    path: string,
    mimeType: string
  ): Promise<string> {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // In real implementation, upload buffer to storage (S3, local filesystem, etc.)
    // For mock, just return a mock URL
    // Buffer size can be checked: buffer.length (in bytes)
    return `${this.baseUrl}/${path}`;
  }
}
