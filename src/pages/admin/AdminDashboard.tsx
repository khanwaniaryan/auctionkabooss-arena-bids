
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";

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
    image: "https://placehold.co/100x100/007BFF/FFFFFF?text=IPL"
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
    image: "https://placehold.co/100x100/20C997/FFFFFF?text=PKL"
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
    image: "https://placehold.co/100x100/FD7E14/FFFFFF?text=CWC"
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
  const { toast } = useToast();

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
      image: `https://placehold.co/100x100/007BFF/FFFFFF?text=${formData.name.substring(0, 3)}`
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
        <Card className="auction-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Tournaments</CardTitle>
            <CardDescription>Total managed tournaments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-auction-blue/10 rounded-full">
                  <Trophy className="h-6 w-6 text-auction-blue" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{tournaments.length}</p>
                </div>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-blue/10 text-auction-blue">
                {tournaments.filter(t => t.status === "active").length} Active
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="auction-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Teams</CardTitle>
            <CardDescription>Registered teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-auction-teal/10 rounded-full">
                  <Users className="h-6 w-6 text-auction-teal" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockTeams}</p>
                </div>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-teal/10 text-auction-teal">
                All Active
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="auction-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Players</CardTitle>
            <CardDescription>Registered players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-auction-live/10 rounded-full">
                  <User2 className="h-6 w-6 text-auction-live" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockPlayers}</p>
                </div>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-live/10 text-auction-live">
                Database
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="auction-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-auction-charcoal">Auctions</CardTitle>
            <CardDescription>Completed auctions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 p-2 bg-auction-success/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-auction-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockCompletedAuctions}</p>
                </div>
              </div>
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-auction-success/10 text-auction-success">
                Completed
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-auction-charcoal">Tournament List</h2>
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

      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="auction-card overflow-hidden">
            <div className={`h-1 ${
              tournament.status === 'active' 
                ? 'bg-auction-success' 
                : tournament.status === 'upcoming' 
                  ? 'bg-auction-blue' 
                  : 'bg-auction-steel'
            }`}></div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="h-16 w-16 mr-4 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={tournament.image} 
                      alt={tournament.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-auction-charcoal">{tournament.name}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm">
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
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 ml-auto">
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
