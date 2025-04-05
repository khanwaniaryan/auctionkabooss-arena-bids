import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  User2,
  Clock,
  DollarSign,
  Play,
  Pause,
  Gavel,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock player data
const availablePlayers = [
  {
    id: 1,
    name: "Virat Kohli",
    age: 35,
    type: "Batsman",
    roleType: "Right-handed batsman",
    basePrice: 20000000,
    role: "Batsman",
    playerState: "Regular",
    image: "https://placehold.co/100x100/007BFF/FFFFFF?text=VK"
  },
  {
    id: 2,
    name: "Rohit Sharma",
    age: 36,
    type: "Batsman",
    roleType: "Right-handed batsman",
    basePrice: 20000000,
    role: "Batsman",
    playerState: "Captain",
    image: "https://placehold.co/100x100/FD7E14/FFFFFF?text=RS"
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    age: 30,
    type: "Bowler",
    roleType: "Right-arm fast",
    basePrice: 15000000,
    role: "Bowler",
    playerState: "Regular",
    image: "https://placehold.co/100x100/28A745/FFFFFF?text=JB"
  },
  {
    id: 4,
    name: "Ravindra Jadeja",
    age: 35,
    type: "All-rounder",
    roleType: "Left-handed batsman, Left-arm orthodox",
    basePrice: 15000000,
    role: "All-rounder",
    playerState: "Regular",
    image: "https://placehold.co/100x100/DC3545/FFFFFF?text=RJ"
  }
];

// Mock team data
const teams = [
  {
    id: 1,
    name: "Mumbai Indians",
    budget: 100000000,
    remaining: 65000000,
    spent: 35000000,
    logo: "https://placehold.co/100x100/007BFF/FFFFFF?text=MI",
    players: []
  },
  {
    id: 2,
    name: "Chennai Super Kings",
    budget: 100000000,
    remaining: 40000000,
    spent: 60000000,
    logo: "https://placehold.co/100x100/FD7E14/FFFFFF?text=CSK",
    players: []
  },
  {
    id: 3,
    name: "Royal Challengers Bangalore",
    budget: 100000000,
    remaining: 55000000,
    spent: 45000000,
    logo: "https://placehold.co/100x100/DC3545/FFFFFF?text=RCB",
    players: []
  },
  {
    id: 4,
    name: "Kolkata Knight Riders",
    budget: 100000000,
    remaining: 70000000,
    spent: 30000000,
    logo: "https://placehold.co/100x100/6F42C1/FFFFFF?text=KKR",
    players: []
  }
];

// Mock bid history
const initialBidHistory = [
  {
    id: 1,
    playerId: 5,
    playerName: "MS Dhoni",
    playerImage: "https://placehold.co/100x100/6F42C1/FFFFFF?text=MSD",
    teamId: 2,
    teamName: "Chennai Super Kings",
    amount: 150000000,
    timestamp: new Date(2024, 3, 1, 14, 30, 0)
  },
  {
    id: 2,
    playerId: 6,
    playerName: "Hardik Pandya",
    playerImage: "https://placehold.co/100x100/28A745/FFFFFF?text=HP",
    teamId: 1,
    teamName: "Mumbai Indians",
    amount: 180000000,
    timestamp: new Date(2024, 3, 1, 14, 15, 0)
  }
];

const AuctionSetup = () => {
  const [currentPlayer, setCurrentPlayer] = useState<any | null>(null);
  const [players, setPlayers] = useState(availablePlayers);
  const [teamData, setTeamData] = useState(teams);
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bidHistory, setBidHistory] = useState(initialBidHistory);
  const [currentBid, setCurrentBid] = useState({
    amount: 0,
    teamId: 0
  });
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (isAuctionActive && currentPlayer && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isAuctionActive && timeLeft === 0 && currentPlayer) {
      // When timer ends
      handlePlayerSold();
    }
  }, [isAuctionActive, timeLeft, currentPlayer]);

  const handleStartAuction = () => {
    setIsAuctionActive(true);
    toast({
      title: "Auction Started",
      description: "The auction is now live!",
    });
  };

  const handleStopAuction = () => {
    setIsAuctionActive(false);
    toast({
      title: "Auction Paused",
      description: "The auction has been paused.",
    });
  };

  const handleSelectPlayer = (player: any) => {
    setCurrentPlayer(player);
    setCurrentBid({
      amount: player.basePrice,
      teamId: 0
    });
    setTimeLeft(30);
    setIsAuctionActive(true);
    
    // Remove player from available list
    setPlayers(players.filter(p => p.id !== player.id));
    
    toast({
      title: "Player Selected",
      description: `${player.name} is now up for bidding.`,
    });
  };

  const handlePlayerSold = () => {
    if (!currentPlayer || currentBid.teamId === 0) {
      toast({
        title: "Player Unsold",
        description: `${currentPlayer?.name} remains unsold.`,
        variant: "destructive"
      });
      setCurrentPlayer(null);
      setIsAuctionActive(false);
      return;
    }

    // Find the team
    const team = teamData.find(t => t.id === currentBid.teamId);
    if (!team) return;

    // Update team data
    const updatedTeams = teamData.map(t => {
      if (t.id === currentBid.teamId) {
        return {
          ...t,
          players: [...t.players, { ...currentPlayer, boughtFor: currentBid.amount }],
          remaining: t.remaining - currentBid.amount,
          spent: t.spent + currentBid.amount
        };
      }
      return t;
    });
    setTeamData(updatedTeams);

    // Add to bid history
    setBidHistory([
      {
        id: bidHistory.length + 1,
        playerId: currentPlayer.id,
        playerName: currentPlayer.name,
        playerImage: currentPlayer.image,
        teamId: currentBid.teamId,
        teamName: team.name,
        amount: currentBid.amount,
        timestamp: new Date()
      },
      ...bidHistory
    ]);

    toast({
      title: "Player Sold!",
      description: `${currentPlayer.name} has been sold to ${team.name} for ${formatCurrency(currentBid.amount)}.`,
    });

    // Reset current player
    setCurrentPlayer(null);
    setIsAuctionActive(false);
  };

  const simulateTeamBid = (teamId: number, amount: number) => {
    if (!isAuctionActive || !currentPlayer) return;

    // Check if team has enough money
    const team = teamData.find(t => t.id === teamId);
    if (!team || team.remaining < amount) {
      toast({
        title: "Bid Failed",
        description: `${team?.name} doesn't have enough budget for this bid.`,
        variant: "destructive"
      });
      return;
    }

    // Update current bid
    setCurrentBid({
      amount,
      teamId
    });

    // Reset timer
    setTimeLeft(30);

    toast({
      title: "New Bid",
      description: `${team.name} bid ${formatCurrency(amount)} for ${currentPlayer.name}.`,
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

  // Group players by role
  const getPlayerCountByRole = (players: any[]) => {
    const roleCount: Record<string, number> = {
      "Batsman": 0,
      "Bowler": 0,
      "All-rounder": 0,
      "Wicket-keeper": 0
    };
    
    players.forEach(player => {
      const role = player.role || "";
      if (role.toLowerCase().includes("batsman")) {
        roleCount["Batsman"]++;
      } else if (role.toLowerCase().includes("bowler")) {
        roleCount["Bowler"]++;
      } else if (role.toLowerCase().includes("all-rounder") || role.toLowerCase().includes("all rounder")) {
        roleCount["All-rounder"]++;
      } else if (role.toLowerCase().includes("wicket") || role.toLowerCase().includes("keeper")) {
        roleCount["Wicket-keeper"]++;
      } else {
        // Default to batsman if role is not recognized
        roleCount["Batsman"]++;
      }
    });
    
    return roleCount;
  };

  return (
    <AdminLayout title="Auction Setup">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Available Players */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User2 className="h-5 w-5 text-auction-blue" />
                Available Players
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {players.length > 0 ? (
                  <div className="divide-y divide-auction-gray/30">
                    {players.map((player) => (
                      <div 
                        key={player.id} 
                        className="p-4 hover:bg-auction-gray/10 transition-colors cursor-pointer"
                        onClick={() => !isAuctionActive && handleSelectPlayer(player)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={player.image} 
                              alt={player.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-auction-charcoal">{player.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-auction-steel">{player.role}</span>
                              <span className="text-sm font-medium text-auction-blue">
                                {formatCurrency(player.basePrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-auction-steel">No more players available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Gavel className="h-5 w-5 text-auction-blue" />
                Bid History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[300px] overflow-y-auto">
                {bidHistory.length > 0 ? (
                  <div className="divide-y divide-auction-gray/30">
                    {bidHistory.map((bid) => (
                      <div key={bid.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={bid.playerImage} 
                              alt={bid.playerName}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-auction-charcoal">{bid.playerName}</h3>
                              <span className="text-sm font-medium text-auction-success">
                                {formatCurrency(bid.amount)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-auction-steel">Sold to {bid.teamName}</span>
                              <span className="text-xs text-auction-steel">
                                {bid.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-auction-steel">No bid history yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Current Auction */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Gavel className="h-5 w-5 text-auction-blue" />
                Current Auction
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPlayer ? (
                <div className="flex flex-col items-center">
                  <div className="h-36 w-36 rounded-xl overflow-hidden mb-6">
                    <img 
                      src={currentPlayer.image} 
                      alt={currentPlayer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-auction-charcoal mb-1">{currentPlayer.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-blue/10 text-auction-blue">
                      {currentPlayer.role}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-teal/10 text-auction-teal">
                      {currentPlayer.age} years
                    </span>
                  </div>
                  
                  <div className="timer-circle w-16 h-16 text-lg mb-4">
                    {timeLeft}
                  </div>
                  
                  <div className="bg-auction-gray/20 rounded-lg p-4 w-full mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-auction-steel">Current Bid</div>
                      {currentBid.teamId > 0 && (
                        <div className="text-sm font-medium text-auction-blue">
                          {teamData.find(t => t.id === currentBid.teamId)?.name}
                        </div>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-auction-charcoal">
                      {formatCurrency(currentBid.amount)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between w-full">
                    {isAuctionActive ? (
                      <>
                        <Button 
                          onClick={handleStopAuction}
                          className="bg-auction-danger hover:bg-auction-danger/90"
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Auction
                        </Button>
                        <Button 
                          onClick={handlePlayerSold}
                          className="bg-auction-success hover:bg-auction-success/90"
                        >
                          <Gavel className="mr-2 h-4 w-4" />
                          Sold!
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          onClick={handleStartAuction}
                          className="bg-auction-gradient hover:bg-auction-gradient-hover w-full"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Resume Auction
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <Gavel className="h-16 w-16 text-auction-gray/30 mb-4" />
                  <h3 className="text-xl font-bold text-auction-charcoal mb-2">No Active Auction</h3>
                  <p className="text-auction-steel text-center mb-6">
                    Select a player from the list to start the auction.
                  </p>
                  <Button 
                    disabled={players.length === 0}
                    onClick={() => players.length > 0 && handleSelectPlayer(players[0])}
                    className="bg-auction-gradient hover:bg-auction-gradient-hover"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Select Next Player
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simulate team bidding panel */}
          {currentPlayer && (
            <Card className="auction-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-auction-steel">
                  Simulate Team Bids
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamData.map(team => (
                    <div key={team.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img 
                            src={team.logo} 
                            alt={team.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{team.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-auction-blue"
                          disabled={!isAuctionActive || currentBid.amount + 500000 > team.remaining}
                          onClick={() => simulateTeamBid(team.id, currentBid.amount + 500000)}
                        >
                          +5L
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-auction-blue"
                          disabled={!isAuctionActive || currentBid.amount + 1000000 > team.remaining}
                          onClick={() => simulateTeamBid(team.id, currentBid.amount + 1000000)}
                        >
                          +10L
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-auction-blue"
                          disabled={!isAuctionActive || currentBid.amount + 5000000 > team.remaining}
                          onClick={() => simulateTeamBid(team.id, currentBid.amount + 5000000)}
                        >
                          +50L
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Team Status (Combined View) */}
        <div className="lg:col-span-1">
          <Card className="auction-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-auction-blue" />
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-auction-gray/30">
                {teamData.map((team) => {
                  const playerRoleCounts = getPlayerCountByRole(team.players);
                  
                  return (
                    <div key={team.id} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={team.logo} alt={team.name} />
                          <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-auction-charcoal">{team.name}</h3>
                          <div className="flex justify-between">
                            <span className="text-xs text-auction-steel">Players: {team.players.length}</span>
                            <span className="text-sm font-medium text-auction-success">
                              {formatCurrency(team.remaining)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-auction-gray/20 rounded-full h-2.5 mb-3">
                        <div 
                          className="bg-auction-gradient h-2.5 rounded-full" 
                          style={{ width: `${(team.spent / team.budget) * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between mb-4 text-xs">
                        <span className="text-auction-steel">Used: {formatCurrency(team.spent)}</span>
                        <span className="text-auction-steel">Total: {formatCurrency(team.budget)}</span>
                      </div>
                      
                      <div className="bg-auction-gray/10 p-3 rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Acquired Players</h4>
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(playerRoleCounts).map(([role, count]) => (
                            count > 0 && (
                              <Badge 
                                key={role} 
                                variant="outline" 
                                className="px-3 py-1 bg-auction-blue/5 text-auction-blue border-auction-blue/20"
                              >
                                {role}: {count}
                              </Badge>
                            )
                          ))}
                        </div>
                      </div>
                      
                      {team.players.length > 0 && (
                        <div className="mt-3">
                          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-thin">
                            {team.players.map((player: any) => (
                              <Avatar key={player.id} className="h-8 w-8 rounded-full border-2 border-white">
                                <AvatarImage src={player.image} alt={player.name} />
                                <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuctionSetup;
