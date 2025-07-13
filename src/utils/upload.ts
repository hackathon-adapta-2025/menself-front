interface UploadResponse {
  success: boolean;
  data?: {
    id: string;
    fileUrl: string;
    fileName: string;
    mimeType: string;
  };
  error?: string;
  details?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Erro ao fazer upload");
    }

    return result;
  } catch (error) {
    console.error("Erro no upload:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro desconhecido no upload",
    };
  }
};
