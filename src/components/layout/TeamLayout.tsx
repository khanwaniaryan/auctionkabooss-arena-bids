
import React, { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, LogOut, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/App";

interface TeamLayoutProps {
  children: ReactNode;
  teamName?: string;
  balance?: number;
  isLiveAuction?: boolean;
}

const TeamLayout: React.FC<TeamLayoutProps> = ({ 
  children, 
  teamName = "Mumbai Mavericks", 
  balance = 50000000,
  isLiveAuction = true 
}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/team/login");
  };

  // Format currency in Indian Rupees (₹)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-auction-white flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-auction-gray/30 shadow-sm py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-auction-blue" />
            <span className="font-bold text-xl">AUCTIONKABOSS</span>
          </div>
          
          <div className="flex items-center gap-4">
            {isLiveAuction && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-auction-live/10 rounded-full text-auction-live">
                <Clock className="h-4 w-4 animate-pulse" />
                <span className="font-medium text-sm">Auction Live</span>
              </div>
            )}
            
            <div className="text-right">
              <h2 className="font-bold text-auction-charcoal">{teamName}</h2>
              <p className="text-sm text-auction-success font-medium">
                Balance: {formatCurrency(balance)}
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-auction-steel hover:text-auction-danger flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default TeamLayout;
