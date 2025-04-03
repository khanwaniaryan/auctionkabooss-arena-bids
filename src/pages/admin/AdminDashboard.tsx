
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Users, 
  User2, 
  Calendar, 
  Timer, 
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  Play,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Activity
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data
const mockTournaments = [
  {
    id: 1,
    name: "IPL Mega Auction 2025",
    startDate: new Date(2025, 0, 15),
    endDate: new Date(2025, 0, 17),
    basePrice: 2000000,
    threshold: 10000000,
    timeLimit: 30,
    status: "upcoming",
    image: "https://placehold.co/100x100/007BFF/FFFFFF?text=IPL",
    totalPlayers: 120,
    soldPlayers: 0,
    teams: 10
  },
  {
    id: 2,
    name: "Pro Kabaddi League 2024",
    startDate: new Date(2024, 5, 10),
    endDate: new Date(2024, 5, 12),
    basePrice: 1000000,
    threshold: 5000000,
    timeLimit: 30,
    status: "active",
    image: "https://placehold.co/100x100/20C997/FFFFFF?text=PKL",
    totalPlayers: 80,
    soldPlayers: 32,
    teams: 8
  },
  {
    id: 3,
    name: "Cricket World Cup 2024",
    startDate: new Date(2024, 8, 5),
    endDate: new Date(2024, 8, 7),
    basePrice: 3000000,
    threshold: 15000000,
    timeLimit: 45,
    status: "completed",
    image: "https://placehold.co/100x100/FD7E14/FFFFFF?text=CWC",
    totalPlayers: 60,
    soldPlayers: 60,
    teams: 6
  }
];

const mockTeams = 8;
const mockPlayers = 120;
const mockCompletedAuctions = 2;

interface TournamentFormData {
  name: string;
  startDate: string;
  endDate: string;
  basePrice: number;
  threshold: number;
  timeLimit: number;
}

const AdminDashboard = () => {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TournamentFormData>({
    name: "",
    startDate: "",
    endDate: "",
    basePrice: 1000000,
    threshold: 5000000,
    timeLimit: 30
  });
  const [statsProgress, setStatsProgress] = useState({
    tournaments: 0,
    teams: 0,
    players: 0,
    auctions: 0
  });
  const { toast } = useToast();

  // Animation effect for stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsProgress({
        tournaments: 100,
        teams: 100,
        players: 100,
        auctions: 100
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "basePrice" || name === "threshold" || name === "timeLimit" 
        ? Number(value) 
        : value
    });
  };

  const handleCreateTournament = () => {
    const newTournament = {
      id: tournaments.length + 1,
      name: formData.name,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      basePrice: formData.basePrice,
      threshold: formData.threshold,
      timeLimit: formData.timeLimit,
      status: "upcoming",
      image: `https://placehold.co/100x100/007BFF/FFFFFF?text=${formData.name.substring(0, 3)}`,
      totalPlayers: 0,
      soldPlayers: 0,
      teams: 0
    };

    setTournaments([...tournaments, newTournament]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      basePrice: 1000000,
      threshold: 5000000,
      timeLimit: 30
    });

    toast({
      title: "Tournament Created",
      description: `${formData.name} has been successfully created.`,
    });
  };

  const handleDeleteTournament = (id: number) => {
    setTournaments(tournaments.filter(tournament => tournament.id !== id));
    toast({
      title: "Tournament Deleted",
      description: "The tournament has been successfully deleted.",
    });
  };

  const handleStartAuction = (id: number) => {
    toast({
      title: "Auction Started",
      description: "You can now proceed to the auction setup page.",
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

  return (
    <AdminLayout title="Tournament Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-auction-blue"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Tournaments</CardTitle>
            <CardDescription>Total managed tournaments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-auction-blue/10 rounded-full">
                  <Trophy className="h-7 w-7 text-auction-blue" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{tournaments.length}</p>
                  <Progress className="h-1.5 w-24 mt-2" value={statsProgress.tournaments} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-blue/10 text-auction-blue">
                  {tournaments.filter(t => t.status === "active").length} Active
                </div>
                <div className="text-sm mt-2 text-auction-steel flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+1 this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-auction-teal"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Teams</CardTitle>
            <CardDescription>Registered teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-auction-teal/10 rounded-full">
                  <Users className="h-7 w-7 text-auction-teal" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockTeams}</p>
                  <Progress className="h-1.5 w-24 mt-2" value={statsProgress.teams} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-teal/10 text-auction-teal">
                  All Active
                </div>
                <div className="text-sm mt-2 text-auction-steel flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+2 this week</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-auction-live"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Players</CardTitle>
            <CardDescription>Registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-auction-live/10 rounded-full">
                  <User2 className="h-7 w-7 text-auction-live" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockPlayers}</p>
                  <Progress className="h-1.5 w-24 mt-2" value={statsProgress.players} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-live/10 text-auction-live">
                  Database
                </div>
                <div className="text-sm mt-2 text-auction-steel flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+15 this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-auction-success"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Auctions</CardTitle>
            <CardDescription>Completed auctions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-auction-success/10 rounded-full">
                  <DollarSign className="h-7 w-7 text-auction-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockCompletedAuctions}</p>
                  <Progress className="h-1.5 w-24 mt-2" value={statsProgress.auctions} />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-success/10 text-auction-success">
                  Completed
                </div>
                <div className="text-sm mt-2 text-auction-steel flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  <span>₹140M volume</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-auction-charcoal">Tournament List</h2>
          <p className="text-sm text-auction-steel mt-1">Manage all your tournament details</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-auction-gradient hover:bg-auction-gradient-hover">
              <Plus className="mr-2 h-4 w-4" />
              Create Tournament
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Tournament</DialogTitle>
              <DialogDescription>
                Add a new tournament to your dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tournament Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="basePrice" className="text-right">
                  Base Price (₹)
                </Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  value={formData.basePrice}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="threshold" className="text-right">
                  Threshold (₹)
                </Label>
                <Input
                  id="threshold"
                  name="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="timeLimit" className="text-right">
                  Time Limit (sec)
                </Label>
                <Input
                  id="timeLimit"
                  name="timeLimit"
                  type="number"
                  value={formData.timeLimit}
                  onChange={handleFormChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button 
                className="bg-auction-gradient hover:bg-auction-gradient-hover"
                onClick={handleCreateTournament}
              >
                Create Tournament
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {tournaments.map((tournament) => (
          <Card 
            key={tournament.id} 
            className="auction-card overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className={`h-1.5 ${
              tournament.status === 'active' 
                ? 'bg-auction-success' 
                : tournament.status === 'upcoming' 
                  ? 'bg-auction-blue' 
                  : 'bg-auction-steel'
            }`}></div>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                {/* Left side - Image and basic info */}
                <div className="md:col-span-3 lg:col-span-3 p-6 flex">
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden flex-shrink-0 mr-5 bg-gradient-to-br from-auction-blue to-auction-teal p-0.5">
                    <div className="h-full w-full rounded-[calc(0.75rem-1px)] overflow-hidden">
                      <img 
                        src={tournament.image} 
                        alt={tournament.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-xl text-auction-charcoal">{tournament.name}</h3>
                      <Badge className={`
                        ${tournament.status === 'active' 
                          ? 'bg-auction-success/10 text-auction-success border-auction-success/20' 
                          : tournament.status === 'upcoming' 
                            ? 'bg-auction-blue/10 text-auction-blue border-auction-blue/20' 
                            : 'bg-auction-steel/10 text-auction-steel border-auction-steel/20'
                        }
                      `}>
                        {tournament.status === 'active' 
                          ? 'Active' 
                          : tournament.status === 'upcoming' 
                            ? 'Upcoming' 
                            : 'Completed'
                        }
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                      <div className="flex items-center text-auction-steel">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(tournament.startDate, "MMM d, yyyy")} - {format(tournament.endDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center text-auction-steel">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>Base: {formatCurrency(tournament.basePrice)}</span>
                      </div>
                      <div className="flex items-center text-auction-steel">
                        <Timer className="h-4 w-4 mr-1" />
                        <span>{tournament.timeLimit}s</span>
                      </div>
                    </div>
                    
                    {/* Progress section */}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-auction-steel mb-1">Players</div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            className="h-2 flex-1" 
                            value={(tournament.soldPlayers / tournament.totalPlayers) * 100} 
                          />
                          <span className="text-xs font-medium">
                            {tournament.soldPlayers}/{tournament.totalPlayers}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-auction-steel mb-1">Teams</div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-auction-steel" />
                          <span className="text-sm font-medium">{tournament.teams}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-auction-steel mb-1">Max Bid</div>
                        <div className="text-sm font-medium">
                          {formatCurrency(tournament.threshold)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Actions */}
                <div className="md:col-span-1 lg:col-span-2 p-6 flex flex-col md:justify-center md:border-l border-auction-gray/20">
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 justify-end">
                    <Button variant="outline" size="sm" className="text-auction-steel">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-auction-danger"
                      onClick={() => handleDeleteTournament(tournament.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                    <Button 
                      size="sm" 
                      className={`${
                        tournament.status === 'active' 
                          ? 'bg-auction-success hover:bg-auction-success/90' 
                          : tournament.status === 'upcoming' 
                            ? 'bg-auction-gradient hover:bg-auction-gradient-hover' 
                            : 'bg-auction-steel hover:bg-auction-steel/90'
                      }`}
                      onClick={() => handleStartAuction(tournament.id)}
                      disabled={tournament.status === 'completed'}
                    >
                      {tournament.status === 'active' ? (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Continue Auction
                        </>
                      ) : tournament.status === 'upcoming' ? (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          Start Auction
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Completed
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {tournament.status === 'active' && (
                    <div className="mt-4 p-2 rounded-lg bg-auction-success/5 border border-auction-success/10 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-auction-success animate-pulse mr-2"></div>
                      <span className="text-xs text-auction-success">Auction in progress</span>
                    </div>
                  )}
                  
                  {tournament.status === 'upcoming' && (
                    <div className="mt-4 p-2 rounded-lg bg-auction-blue/5 border border-auction-blue/10 flex items-center">
                      <Calendar className="w-3 h-3 text-auction-blue mr-2" />
                      <span className="text-xs text-auction-blue">Starts in {Math.floor(Math.random() * 10) + 1} days</span>
                    </div>
                  )}
                  
                  {tournament.status === 'completed' && (
                    <div className="mt-4 p-2 rounded-lg bg-auction-steel/5 border border-auction-steel/10 flex items-center">
                      <DollarSign className="w-3 h-3 text-auction-steel mr-2" />
                      <span className="text-xs text-auction-steel">Total value: {formatCurrency(Math.floor(Math.random() * 500000000) + 100000000)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {tournaments.length === 0 && (
          <Card className="auction-card p-8 text-center">
            <div className="flex flex-col items-center">
              <Trophy className="h-12 w-12 text-auction-gray mb-4" />
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">No Tournaments Yet</h3>
              <p className="text-auction-steel mb-4">
                Create your first tournament to get started.
              </p>
              <Button 
                className="bg-auction-gradient hover:bg-auction-gradient-hover"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Tournament
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
