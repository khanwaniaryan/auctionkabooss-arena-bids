
import { Link } from "react-router-dom";
import { Trophy, Users, User2, Gavel, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-auction-white to-auction-gray/20">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-auction-blue" />
              <span className="ml-2 text-xl font-bold">AUCTIONKABOSS</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin/login">
                <Button variant="ghost" className="text-auction-charcoal font-medium">
                  Admin Login
                </Button>
              </Link>
              <Link to="/team/login">
                <Button className="bg-auction-gradient hover:bg-auction-gradient-hover">
                  Team Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-auction-charcoal leading-tight">
                Revolutionize Your Tournament Auctions
              </h1>
              <p className="mt-6 text-lg text-auction-steel max-w-lg">
                AUCTIONKABOSS provides a seamless platform for managing tournament auctions, 
                teams, and players with real-time bidding.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/admin/login">
                  <Button size="lg" className="bg-auction-gradient hover:bg-auction-gradient-hover w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/team/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Team Access
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-auction-gradient rounded-full opacity-10 blur-xl transform -translate-x-4 translate-y-4"></div>
                <div className="relative bg-white rounded-xl shadow-auction overflow-hidden border border-auction-gray/20">
                  <div className="p-1 bg-auction-gradient"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-auction-gradient flex items-center justify-center">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-auction-charcoal">IPL Auction 2024</h3>
                          <p className="text-xs text-auction-steel">Live Now</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-auction-live/10 rounded-full text-auction-live text-sm">
                        <span className="h-2 w-2 rounded-full bg-auction-live"></span>
                        Live
                      </div>
                    </div>
                    
                    <div className="mb-4 p-4 bg-auction-gray/30 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-auction-steel">Current Bid</span>
                        <span className="text-sm font-medium text-auction-success">Mumbai Indians</span>
                      </div>
                      <div className="text-2xl font-bold text-auction-charcoal">₹8,50,00,000</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-auction-success/10 rounded-lg border border-auction-success/20">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-auction-white flex items-center justify-center border border-auction-gray/40">
                            <User2 className="h-4 w-4 text-auction-steel" />
                          </div>
                          <div>
                            <p className="font-medium text-auction-charcoal">Virat Kohli</p>
                            <p className="text-xs text-auction-steel">Batsman • 35 years</p>
                          </div>
                        </div>
                        <div className="text-auction-success font-semibold">Winning</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="text-auction-blue font-medium">+1 Cr</Button>
                        <Button variant="outline" className="text-auction-blue font-medium">+5 Cr</Button>
                        <Button variant="outline" className="text-auction-blue font-medium">+10 Cr</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-auction-charcoal">Powerful Auction Features</h2>
            <p className="mt-4 text-lg text-auction-steel max-w-2xl mx-auto">
              Everything you need to run successful tournament auctions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-auction-white rounded-xl p-6 shadow-auction hover:shadow-auction-hover transition-all border border-auction-gray/10">
              <div className="h-12 w-12 rounded-lg bg-auction-gradient flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">Tournament Management</h3>
              <p className="text-auction-steel">
                Create and manage multiple tournaments with customizable settings.
              </p>
            </div>
            
            <div className="bg-auction-white rounded-xl p-6 shadow-auction hover:shadow-auction-hover transition-all border border-auction-gray/10">
              <div className="h-12 w-12 rounded-lg bg-auction-gradient flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">Team Controls</h3>
              <p className="text-auction-steel">
                Manage team details, budgets, and participation in auctions.
              </p>
            </div>
            
            <div className="bg-auction-white rounded-xl p-6 shadow-auction hover:shadow-auction-hover transition-all border border-auction-gray/10">
              <div className="h-12 w-12 rounded-lg bg-auction-gradient flex items-center justify-center mb-4">
                <User2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">Player Database</h3>
              <p className="text-auction-steel">
                Comprehensive player profiles with stats and base prices.
              </p>
            </div>
            
            <div className="bg-auction-white rounded-xl p-6 shadow-auction hover:shadow-auction-hover transition-all border border-auction-gray/10">
              <div className="h-12 w-12 rounded-lg bg-auction-gradient flex items-center justify-center mb-4">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">Live Bidding</h3>
              <p className="text-auction-steel">
                Real-time auction system with bid tracking and timer functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-auction-gradient rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Auctions?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of tournament organizers who have streamlined their auction process with AUCTIONKABOSS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/admin/login">
                <Button size="lg" className="bg-white text-auction-blue hover:bg-auction-gray w-full sm:w-auto">
                  Admin Login
                </Button>
              </Link>
              <Link to="/team/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Team Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-auction-charcoal text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Trophy className="h-8 w-8 text-auction-blue" />
            <span className="ml-2 text-xl font-bold">AUCTIONKABOSS</span>
          </div>
          
          <div className="text-center text-auction-steel text-sm">
            <p>© 2025 AUCTIONKABOSS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
