
import { Link } from "react-router-dom";
import { Trophy, Users, Gavel, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-auction-gradient">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy size={48} className="text-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AUCTIONKABOSS
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            The Ultimate Auction Platform for Cricket Tournaments
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
            <Users className="h-12 w-12 mb-4 text-auction-teal" />
            <h3 className="text-2xl font-bold mb-4">Team Management</h3>
            <p className="text-white/80 mb-6">
              Manage multiple teams, track budgets, and monitor player acquisitions in real-time.
            </p>
            <Link to="/team/login">
              <Button className="bg-white text-auction-blue hover:bg-white/90">
                Team Login
              </Button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
            <Shield className="h-12 w-12 mb-4 text-auction-blue" />
            <h3 className="text-2xl font-bold mb-4">Admin Control</h3>
            <p className="text-white/80 mb-6">
              Complete tournament administration with player management and auction control.
            </p>
            <Link to="/admin/login">
              <Button className="bg-white text-auction-blue hover:bg-white/90">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features List */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose AuctionKaBoss?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-white">
              <Gavel className="h-8 w-8 mx-auto mb-4 text-auction-teal" />
              <h4 className="font-semibold mb-2">Live Auctions</h4>
              <p className="text-white/80 text-sm">Real-time bidding with instant updates</p>
            </div>
            <div className="text-white">
              <Trophy className="h-8 w-8 mx-auto mb-4 text-auction-teal" />
              <h4 className="font-semibold mb-2">Tournament Ready</h4>
              <p className="text-white/80 text-sm">Built for professional cricket tournaments</p>
            </div>
            <div className="text-white">
              <Users className="h-8 w-8 mx-auto mb-4 text-auction-teal" />
              <h4 className="font-semibold mb-2">Multi-Team Support</h4>
              <p className="text-white/80 text-sm">Handle multiple teams simultaneously</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
