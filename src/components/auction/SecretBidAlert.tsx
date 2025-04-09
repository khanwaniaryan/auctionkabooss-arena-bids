
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { EyeOff } from "lucide-react";

interface SecretBidAlertProps {
  open: boolean;
  onClose: () => void;
  onSubmitSecretBid: () => void;
}

const SecretBidAlert: React.FC<SecretBidAlertProps> = ({
  open,
  onClose,
  onSubmitSecretBid
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="border-auction-teal/20 shadow-lg">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-auction-gradient p-3 rounded-full">
              <EyeOff className="h-8 w-8 text-white" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-bold text-auction-charcoal">High Bid Detected!</AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-2 text-auction-steel text-base">
            The current bid has exceeded ₹50,00,000. Would you like to submit a secret bid instead?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4 mt-4">
          <AlertDialogAction 
            onClick={onClose}
            className="bg-auction-gray/20 text-auction-steel hover:bg-auction-gray/30 font-medium px-6 py-2"
          >
            Continue Regular Bid
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={onSubmitSecretBid}
            className="bg-auction-gradient hover:bg-auction-gradient-hover font-medium px-6 py-2 transition-all duration-200"
          >
            Submit Secret Bid
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SecretBidAlert;
