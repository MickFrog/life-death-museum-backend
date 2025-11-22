/**
 * Storage interface for file uploads
 * Abstracts file storage operations (S3, local, etc.)
 * Storage layer only handles uploading Buffer data - conversion from URL/base64
 * should be done in the business logic layer using ImageConverter
 */
export interface StorageInterface {
  /**
   * Upload a file from Buffer
   * @param buffer - File buffer (binary data)
   * @param path - Storage path/key for the file
   * @param mimeType - MIME type of the file (e.g., 'image/png')
   * @returns Promise resolving to the public URL of the uploaded file
   */
  uploadFromBuffer(
    buffer: Buffer,
    path: string,
    mimeType: string
  ): Promise<string>;
}
