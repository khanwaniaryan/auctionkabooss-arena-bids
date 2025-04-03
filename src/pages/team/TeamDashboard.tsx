
import { useState, useEffect } from "react";
import TeamLayout from "@/components/layout/TeamLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User2,
  Clock,
  DollarSign,
  Gavel,
  AlertCircle,
  Users,
  TrendingUp
} from "lucide-react";

// Team and player data (in a real app, this would be fetched from API)
const teamData = {
  id: 2,
  name: "Chennai Super Kings",
  logo: "https://placehold.co/100x100/FD7E14/FFFFFF?text=CSK",
  totalBudget: 100000000,
  remainingAmount: 40000000,
  spentAmount: 60000000,
  reservedAmount: 5000000,
  players: [
    {
      id: 5,
      name: "MS Dhoni",
      role: "Wicket-keeper batsman",
      roleType: "Right-handed batsman, Wicket-keeper",
      boughtFor: 150000000,
      image: "https://placehold.co/100x100/6F42C1/FFFFFF?text=MSD",
    },
    {
      id: 7,
      name: "Ravichandran Ashwin",
      role: "All-rounder",
      roleType: "Right-handed batsman, Right-arm off break",
      boughtFor: 110000000,
      image: "https://placehold.co/100x100/20C997/FFFFFF?text=RA",
    },
    {
      id: 8,
      name: "Deepak Chahar",
      role: "Bowler",
      roleType: "Right-arm medium-fast",
      boughtFor: 80000000,
      image: "https://placehold.co/100x100/007BFF/FFFFFF?text=DC",
    },
    {
      id: 9,
      name: "Ambati Rayudu",
      role: "Batsman",
      roleType: "Right-handed batsman",
      boughtFor: 70000000,
      image: "https://placehold.co/100x100/28A745/FFFFFF?text=AR",
    }
  ]
};

// Current player in auction
const currentAuctionPlayer = {
  id: 3,
  name: "Jasprit Bumrah",
  age: 30,
  type: "Bowler",
  roleType: "Right-arm fast",
  basePrice: 15000000,
  role: "Bowler",
  playerState: "Regular",
  image: "https://placehold.co/100x100/28A745/FFFFFF?text=JB"
};

// Recent bids
const recentBids = [
  {
    id: 1,
    teamId: 1,
    teamName: "Mumbai Indians",
    amount: 20000000,
    timestamp: new Date(Date.now() - 15000)
  },
  {
    id: 2,
    teamId: 4,
    teamName: "Kolkata Knight Riders",
    amount: 18000000,
    timestamp: new Date(Date.now() - 25000)
  },
  {
    id: 3,
    teamId: 3,
    teamName: "Royal Challengers Bangalore",
    amount: 17000000,
    timestamp: new Date(Date.now() - 40000)
  }
];

const TeamDashboard = () => {
  const [team, setTeam] = useState(teamData);
  const [isAuctionLive, setIsAuctionLive] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(currentAuctionPlayer);
  const [bids, setBids] = useState(recentBids);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentBid, setCurrentBid] = useState({
    amount: 20000000,
    teamId: 1,
    teamName: "Mumbai Indians"
  });
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (isAuctionLive && currentPlayer && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAuctionLive && timeLeft === 0 && currentPlayer) {
      // When timer ends - player sold to highest bidder
      if (currentBid.teamId === team.id) {
        // Won by this team
        toast({
          title: "Bid Won!",
          description: `Congratulations! You've successfully acquired ${currentPlayer.name}.`,
        });
      } else {
        // Won by another team
        toast({
          title: "Sold!",
          description: `${currentPlayer.name} has been sold to ${currentBid.teamName}.`,
        });
      }
      setCurrentPlayer(null);
    }
  }, [isAuctionLive, timeLeft, currentPlayer]);

  const handlePlaceBid = () => {
    if (!isAuctionLive || !currentPlayer) return;
    
    const amount = Number(bidAmount);
    
    // Validate bid amount
    if (isNaN(amount) || amount <= currentBid.amount) {
      toast({
        title: "Invalid Bid",
        description: "Bid amount must be higher than the current highest bid.",
        variant: "destructive"
      });
      return;
    }

    // Check if team has enough money
    if (amount > team.remainingAmount) {
      toast({
        title: "Insufficient Funds",
        description: "Your team doesn't have enough remaining budget for this bid.",
        variant: "destructive"
      });
      return;
    }

    // Update current bid
    setCurrentBid({
      amount,
      teamId: team.id,
      teamName: team.name
    });

    // Add to bids list
    setBids([
      {
        id: bids.length + 1,
        teamId: team.id,
        teamName: team.name,
        amount,
        timestamp: new Date()
      },
      ...bids
    ]);

    // Reset timer
    setTimeLeft(30);

    // Reset bid amount input
    setBidAmount("");

    toast({
      title: "Bid Placed",
      description: `You've placed a bid of ${formatCurrency(amount)} for ${currentPlayer.name}.`,
    });
  };

  const placePredefinedBid = (increment: number) => {
    if (!isAuctionLive || !currentPlayer) return;
    
    const newAmount = currentBid.amount + increment;
    
    // Check if team has enough money
    if (newAmount > team.remainingAmount) {
      toast({
        title: "Insufficient Funds",
        description: "Your team doesn't have enough remaining budget for this bid.",
        variant: "destructive"
      });
      return;
    }

    // Update current bid
    setCurrentBid({
      amount: newAmount,
      teamId: team.id,
      teamName: team.name
    });

    // Add to bids list
    setBids([
      {
        id: bids.length + 1,
        teamId: team.id,
        teamName: team.name,
        amount: newAmount,
        timestamp: new Date()
      },
      ...bids
    ]);

    // Reset timer
    setTimeLeft(30);

    toast({
      title: "Bid Placed",
      description: `You've placed a bid of ${formatCurrency(newAmount)} for ${currentPlayer.name}.`,
    });
  };

  // Format currency in Indian Rupees (₹)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
  };

  return (
    <TeamLayout 
      teamName={team.name} 
      balance={team.remainingAmount} 
      isLiveAuction={isAuctionLive}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Team Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-auction-blue" />
                Team Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-lg overflow-hidden">
                  <img 
                    src={team.logo} 
                    alt={team.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-auction-charcoal">{team.name}</h2>
                  <p className="text-sm text-auction-steel">{team.players.length} Players Acquired</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-auction-steel">Budget Utilized</span>
                    <span className="text-sm font-medium">
                      {Math.round((team.spentAmount / team.totalBudget) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-auction-gray/20 rounded-full h-2.5">
                    <div 
                      className="bg-auction-gradient h-2.5 rounded-full" 
                      style={{ width: `${(team.spentAmount / team.totalBudget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-auction-gray/10 p-3 rounded-lg">
                    <div className="text-sm text-auction-steel mb-1">Total Budget</div>
                    <div className="text-lg font-bold">{formatCurrency(team.totalBudget)}</div>
                  </div>
                  <div className="bg-auction-success/10 p-3 rounded-lg">
                    <div className="text-sm text-auction-steel mb-1">Remaining</div>
                    <div className="text-lg font-bold text-auction-success">
                      {formatCurrency(team.remainingAmount)}
                    </div>
                  </div>
                  <div className="bg-auction-danger/10 p-3 rounded-lg">
                    <div className="text-sm text-auction-steel mb-1">Spent</div>
                    <div className="text-lg font-bold text-auction-danger">
                      {formatCurrency(team.spentAmount)}
                    </div>
                  </div>
                  <div className="bg-auction-blue/10 p-3 rounded-lg">
                    <div className="text-sm text-auction-steel mb-1">Reserved</div>
                    <div className="text-lg font-bold text-auction-blue">
                      {formatCurrency(team.reservedAmount)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User2 className="h-5 w-5 text-auction-blue" />
                Acquired Players
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] overflow-y-auto">
                {team.players.length > 0 ? (
                  <div className="divide-y divide-auction-gray/30">
                    {team.players.map((player) => (
                      <div key={player.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={player.image} 
                              alt={player.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-auction-charcoal">{player.name}</h3>
                                <p className="text-sm text-auction-steel">{player.role}</p>
                              </div>
                              <span className="text-sm font-medium text-auction-blue">
                                {formatCurrency(player.boughtFor)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-auction-steel">No players acquired yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          {isAuctionLive && currentPlayer ? (
            <>
              {/* Live Auction */}
              <Card className="auction-card">
                <div className="h-1 bg-auction-live animate-pulse"></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Gavel className="h-5 w-5 text-auction-live" />
                      Live Auction
                    </CardTitle>
                    <Badge variant="outline" className="bg-auction-live/10 text-auction-live border-auction-live/20">
                      <Clock className="h-3 w-3 mr-1 animate-pulse" />
                      Live
                    </Badge>
                  </div>
                  <CardDescription>
                    Place your bids within the time limit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Player Info and Timer */}
                    <div className="lg:w-1/2 flex flex-col items-center">
                      <div className="h-24 w-24 rounded-xl overflow-hidden mb-4">
                        <img 
                          src={currentPlayer.image} 
                          alt={currentPlayer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-auction-charcoal mb-1">{currentPlayer.name}</h2>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-blue/10 text-auction-blue">
                          {currentPlayer.role}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-teal/10 text-auction-teal">
                          {currentPlayer.age} years
                        </span>
                      </div>
                      
                      <div className="timer-circle mb-6">
                        {timeLeft}
                      </div>
                      
                      <div className="bg-auction-gray/20 rounded-lg p-4 w-full">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-auction-steel">Current Highest Bid</div>
                          <div className="text-sm font-medium text-auction-blue">
                            {currentBid.teamName}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-auction-charcoal">
                          {formatCurrency(currentBid.amount)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bidding Section */}
                    <div className="lg:w-1/2">
                      <div className="space-y-4">
                        <h3 className="font-medium text-auction-charcoal">Place Your Bid</h3>
                        
                        <div className="bg-auction-gray/10 p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-auction-steel">Your Remaining Budget</span>
                            <span className="font-medium text-auction-success">{formatCurrency(team.remainingAmount)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-auction-steel">Base Price</span>
                            <span className="font-medium">{formatCurrency(currentPlayer.basePrice)}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-auction-blue/30 text-auction-blue"
                            onClick={() => placePredefinedBid(500000)}
                          >
                            +5 Lakhs
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-auction-blue/30 text-auction-blue"
                            onClick={() => placePredefinedBid(1000000)}
                          >
                            +10 Lakhs
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 border-auction-blue/30 text-auction-blue"
                            onClick={() => placePredefinedBid(5000000)}
                          >
                            +50 Lakhs
                          </Button>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="Enter custom bid amount"
                              value={bidAmount}
                              onChange={(e) => setBidAmount(e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              className="bg-auction-gradient hover:bg-auction-gradient-hover"
                              onClick={handlePlaceBid}
                            >
                              <Gavel className="mr-2 h-4 w-4" />
                              Place Bid
                            </Button>
                          </div>
                          <p className="text-xs text-auction-steel">
                            Your bid must be higher than the current highest bid of {formatCurrency(currentBid.amount)}
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h4 className="text-sm font-medium text-auction-charcoal mb-2">Recent Bids</h4>
                          <div className="space-y-2 max-h-[140px] overflow-y-auto">
                            {bids.map((bid) => (
                              <div 
                                key={bid.id} 
                                className={`p-2 rounded-lg flex items-center justify-between text-sm ${
                                  bid.teamId === team.id 
                                    ? 'bg-auction-blue/10' 
                                    : 'bg-auction-gray/10'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    bid.teamId === team.id 
                                      ? 'bg-auction-blue' 
                                      : 'bg-auction-steel'
                                  }`}></div>
                                  <span className={bid.teamId === team.id ? 'font-medium' : ''}>
                                    {bid.teamName}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{formatCurrency(bid.amount)}</span>
                                  <span className="text-xs text-auction-steel">
                                    {formatTime(bid.timestamp)}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {/* No Live Auction */}
              <Card className="auction-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-auction-steel" />
                    No Active Auction
                  </CardTitle>
                  <CardDescription>
                    There is no active auction at the moment. Please wait for the admin to start the next auction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-10">
                    <Gavel className="h-16 w-16 text-auction-gray/30 mb-4" />
                    <h3 className="text-xl font-bold text-auction-charcoal mb-2">Waiting for Next Player</h3>
                    <p className="text-auction-steel text-center mb-6 max-w-md">
                      The tournament admin will select the next player for auction. 
                      You'll be notified when the bidding starts.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-auction-blue/30 text-auction-blue"
                      onClick={() => {
                        // In a real app, this would check for status updates
                        toast({
                          title: "No Active Auction",
                          description: "Still waiting for the next auction to begin.",
                        });
                      }}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Check Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Tournament Summary */}
          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-auction-blue" />
                Tournament Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-auction-gray/10 p-4 rounded-lg text-center">
                  <h4 className="text-sm text-auction-steel mb-1">Tournament</h4>
                  <p className="font-medium">IPL Mega Auction 2025</p>
                </div>
                <div className="bg-auction-gray/10 p-4 rounded-lg text-center">
                  <h4 className="text-sm text-auction-steel mb-1">Players Sold</h4>
                  <p className="font-medium">26 / 120</p>
                </div>
                <div className="bg-auction-gray/10 p-4 rounded-lg text-center">
                  <h4 className="text-sm text-auction-steel mb-1">Total Spend</h4>
                  <p className="font-medium">{formatCurrency(480000000)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeamLayout>
  );
};

export default TeamDashboard;
