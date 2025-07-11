
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const FileInput = ({ 
  onFileSelect, 
  onFileClear, 
  selectedFile,
  preview,
  accept = "image/*",
  placeholder = "Upload file",
  className 
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileClear) {
      onFileClear();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {placeholder}
        </Button>
        
        {selectedFile && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {preview && (
        <div className="mt-2">
          <img 
            src={preview} 
            alt="Preview" 
            className="h-20 w-20 object-cover rounded-lg border"
          />
        </div>
      )}
      
      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
};

export default FileInput;
