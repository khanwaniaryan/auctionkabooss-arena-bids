
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trophy,
  Home,
  Clock,
  Users,
  LogOut,
  Menu,
  X,
  CircleDollarSign,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TeamLayout = ({ 
  children, 
  teamName,
  balance,
  isLiveAuction = false 
}) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secretBidOpen, setSecretBidOpen] = useState(false);
  const [secretBidAmount, setSecretBidAmount] = useState("");

  // Format currency in Indian Rupees (₹)
  const formatCurrency = (amount) => {
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

  const submitSecretBid = () => {
    // In a real app, this would send the bid to a server
    console.log(`Secret bid submitted: ${secretBidAmount}`);
    // Close the dialog
    setSecretBidOpen(false);
    // Reset the input
    setSecretBidAmount("");
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
              <>
                <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-auction-live/10 text-auction-live rounded-full text-xs font-medium">
                  <Clock className="h-3 w-3 animate-pulse" />
                  <span>Live Auction</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-auction-success border-auction-success hover:bg-auction-success/10"
                  onClick={() => setSecretBidOpen(true)}
                >
                  <EyeOff className="h-4 w-4 mr-1" />
                  <span>Secret Bid</span>
                </Button>
              </>
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

      {/* Secret Bid Dialog */}
      <Dialog open={secretBidOpen} onOpenChange={setSecretBidOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Submit Secret Bid</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-4 text-center text-auction-steel">
              Your secret bid will only be revealed when all teams have submitted their bids.
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CircleDollarSign className="h-5 w-5 text-auction-success" />
                <Input 
                  type="number"
                  placeholder="Enter bid amount"
                  value={secretBidAmount}
                  onChange={(e) => setSecretBidAmount(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="text-sm text-auction-steel text-right">
                Available Budget: {formatCurrency(balance)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSecretBidOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              className="bg-auction-gradient hover:bg-auction-gradient-hover"
              onClick={submitSecretBid}
              disabled={!secretBidAmount || Number(secretBidAmount) <= 0 || Number(secretBidAmount) > balance}
            >
              Submit Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLayout;
