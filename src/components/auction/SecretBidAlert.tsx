
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-2">
            <EyeOff className="h-6 w-6 text-auction-teal" />
          </div>
          <AlertDialogTitle className="text-center">High Bid Detected!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            The current bid has exceeded ₹50,00,000. Would you like to submit a secret bid instead?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-3">
          <AlertDialogAction 
            onClick={onClose}
            className="bg-auction-gray/20 text-auction-steel hover:bg-auction-gray/30"
          >
            Continue Regular Bid
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={onSubmitSecretBid}
            className="bg-auction-gradient hover:bg-auction-gradient-hover"
          >
            Submit Secret Bid
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SecretBidAlert;
