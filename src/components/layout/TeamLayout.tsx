
import React, { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trophy,
  Home,
  Clock,
  Users,
  LogOut,
  Menu,
  X,
  CircleDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamLayoutProps {
  children: ReactNode;
  teamName: string;
  balance: number;
  isLiveAuction?: boolean;
}

const TeamLayout: React.FC<TeamLayoutProps> = ({ 
  children, 
  teamName,
  balance,
  isLiveAuction = false 
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Format currency in Indian Rupees (₹)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLogout = () => {
    // In a real app, this would call an auth logout function
    navigate("/team/login");
  };

  return (
    <div className="min-h-screen bg-auction-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-auction-gray/30 shadow-sm py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Link to="/team/dashboard" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-auction-blue" />
              <span className="font-bold text-xl hidden md:inline">AUCTIONKABOSS</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 md:ml-6 md:mr-auto">
            <Users className="h-5 w-5 text-auction-teal" />
            <div className="font-bold text-base text-auction-teal px-2 py-1 rounded-md bg-auction-teal/10">
              Team View
              <span className="text-auction-charcoal ml-1.5">- {teamName}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isLiveAuction && (
              <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-auction-live/10 text-auction-live rounded-full text-xs font-medium">
                <Clock className="h-3 w-3 animate-pulse" />
                <span>Live Auction</span>
              </div>
            )}
            
            <div className="hidden md:flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4 text-auction-success" />
              <span className="font-medium text-auction-success">{formatCurrency(balance)}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-auction-steel hover:text-auction-danger"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline ml-1">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "w-64 bg-white border-r border-auction-gray/30 fixed left-0 top-[65px] bottom-0 z-30 md:relative overflow-y-auto transition-all duration-300 transform",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <nav className="p-4 space-y-1">
            <Link
              to="/team/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-auction-gradient text-white shadow-md"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </nav>
          
          <div className="p-4 mt-4">
            <div className="p-4 bg-auction-gray/10 rounded-lg">
              <div className="text-sm text-auction-steel mb-1">Your Budget</div>
              <div className="font-bold text-xl text-auction-success mb-2">{formatCurrency(balance)}</div>
              <div className="flex justify-between text-xs">
                <span className="text-auction-steel">Tournament:</span>
                <span className="font-medium">IPL Mega Auction 2025</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TeamLayout;
