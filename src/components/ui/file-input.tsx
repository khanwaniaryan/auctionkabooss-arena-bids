
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File | null) => void
  preview?: string
  onClear?: () => void
  label?: string
  className?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFileChange, preview, onClear, label = "Upload Image", ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null
      onFileChange(file)
    }

    const handleButtonClick = () => {
      fileInputRef.current?.click()
    }

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            onClick={handleButtonClick}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {label}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            {...props}
          />
          {preview && onClear && (
            <Button 
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClear}
              className="h-9 w-9 text-auction-danger"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {preview && (
          <div className="relative w-24 h-24 rounded-md overflow-hidden border border-input">
            <img 
              src={preview} 
              alt="Preview" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>
    )
  }
)

FileInput.displayName = "FileInput"

export { FileInput }
