import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ArrowRight, Upload, X, Loader2 } from "lucide-react";
import { Header } from "../../components/Layout/Header";
import { uploadImage } from "../../utils/upload"; // Ajuste o caminho conforme necessário

export const OnboardingStep2 = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{
    id: string;
    fileUrl: string;
    fileName: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const result = await uploadImage(file);

      if (!result.success) {
        throw new Error(result.error || "Erro ao fazer upload");
      }

      if (!result.data) {
        throw new Error("Dados do upload não encontrados");
      }

      setUploadedImage({
        id: result.data.id,
        fileUrl: result.data.fileUrl,
        fileName: result.data.fileName,
      });

      // Salvar no localStorage para usar no onboarding final
      localStorage.setItem("onboarding_profile_picture", result.data.fileUrl);
    } catch (error) {
      console.error("Erro no upload:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Erro ao fazer upload da imagem"
      );
    } finally {
      setIsUploading(false);
      // Limpar o input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setError(null);
    localStorage.removeItem("onboarding_profile_picture");
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleNext = () => {
    // Pode prosseguir mesmo sem imagem (opcional)
    navigate("/onboarding/step3");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        showLogo
        logoSrc="/uploads/68b3e0c8-9c1f-4db4-9eeb-6f8daba716d4.png"
        showBack
      />

      <div className="px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Vamos capturar seu momento atual
          </h1>
          <p className="text-muted-foreground body-text">
            Adicione uma foto para que possamos criar sugestões personalizadas
            para você.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <div className="glass-card rounded-xl p-8 text-center">
            {uploadedImage ? (
              <>
                <div className="relative inline-block mb-4">
                  <img
                    src={uploadedImage.fileUrl}
                    alt="Foto enviada"
                    className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
                  />
                  <button
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Foto enviada com sucesso!
                </h3>
                <p className="text-sm text-muted-foreground">
                  {uploadedImage.fileName}
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isUploading ? (
                    <Loader2 size={32} className="text-primary animate-spin" />
                  ) : (
                    <Camera size={32} className="text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isUploading ? "Enviando foto..." : "Adicionar foto"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {isUploading
                    ? "Aguarde enquanto processamos sua imagem"
                    : "Para melhores resultados, use uma foto em ambiente bem iluminado"}
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <button
                  onClick={handleCameraClick}
                  disabled={isUploading}
                  className="bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="mr-2" />
                      Selecionar da Galeria
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground mt-4">
                  Máximo 10MB • JPG, PNG, GIF
                </p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={isUploading}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center"
        >
          {uploadedImage ? "Continuar" : "Pular por agora"}
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>

      <div className="px-4 pb-8">
        <div className="w-full bg-secondary/30 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-2/6 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};
