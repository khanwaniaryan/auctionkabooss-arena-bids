
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
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Plus,
  Pencil,
  Trash2,
  UserPlus,
  Mail,
  User,
  Lock,
  DollarSign
} from "lucide-react";

// Mock data
const mockTeams = [
  {
    id: 1,
    name: "Mumbai Indians",
    username: "mumbai_indians",
    email: "mi@ipl.com",
    totalBudget: 100000000,
    remainingAmount: 65000000,
    spentAmount: 35000000,
    reservedAmount: 10000000,
    players: 5,
    logo: "https://placehold.co/100x100/007BFF/FFFFFF?text=MI"
  },
  {
    id: 2,
    name: "Chennai Super Kings",
    username: "csk_official",
    email: "csk@ipl.com",
    totalBudget: 100000000,
    remainingAmount: 40000000,
    spentAmount: 60000000,
    reservedAmount: 5000000,
    players: 7,
    logo: "https://placehold.co/100x100/FD7E14/FFFFFF?text=CSK"
  },
  {
    id: 3,
    name: "Royal Challengers Bangalore",
    username: "rcb_official",
    email: "rcb@ipl.com",
    totalBudget: 100000000,
    remainingAmount: 55000000,
    spentAmount: 45000000,
    reservedAmount: 8000000,
    players: 6,
    logo: "https://placehold.co/100x100/DC3545/FFFFFF?text=RCB"
  },
  {
    id: 4,
    name: "Kolkata Knight Riders",
    username: "kkr_knights",
    email: "kkr@ipl.com",
    totalBudget: 100000000,
    remainingAmount: 70000000,
    spentAmount: 30000000,
    reservedAmount: 12000000,
    players: 4,
    logo: "https://placehold.co/100x100/6F42C1/FFFFFF?text=KKR"
  }
];

interface TeamFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  totalBudget: number;
  remainingAmount: number;
  spentAmount: number;
  reservedAmount: number;
}

const TeamsManagement = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    totalBudget: 100000000,
    remainingAmount: 100000000,
    spentAmount: 0,
    reservedAmount: 0
  });
  const { toast } = useToast();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["totalBudget", "remainingAmount", "spentAmount", "reservedAmount"].includes(name)
        ? Number(value)
        : value
    });
  };

  const handleCreateTeam = () => {
    const newTeam = {
      id: teams.length + 1,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      totalBudget: formData.totalBudget,
      remainingAmount: formData.remainingAmount,
      spentAmount: formData.spentAmount,
      reservedAmount: formData.reservedAmount,
      players: 0,
      logo: `https://placehold.co/100x100/007BFF/FFFFFF?text=${formData.name.substring(0, 2).toUpperCase()}`
    };

    setTeams([...teams, newTeam]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      totalBudget: 100000000,
      remainingAmount: 100000000,
      spentAmount: 0,
      reservedAmount: 0
    });

    toast({
      title: "Team Created",
      description: `${formData.name} has been successfully created.`,
    });
  };

  const handleDeleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
    toast({
      title: "Team Deleted",
      description: "The team has been successfully deleted.",
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
    <AdminLayout title="Team Management">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-auction-blue" />
          <h2 className="text-xl font-bold text-auction-charcoal">Team List</h2>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-auction-gradient hover:bg-auction-gradient-hover">
              <UserPlus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Add a new team to participate in auctions.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-auction-steel mb-2">Team Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Team Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Mumbai Indians"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleFormChange}
                      placeholder="mumbai_indians"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="mi@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-auction-steel mb-2">Budget Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalBudget">Total Budget (₹)</Label>
                    <Input
                      id="totalBudget"
                      name="totalBudget"
                      type="number"
                      value={formData.totalBudget}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remainingAmount">Remaining Amount (₹)</Label>
                    <Input
                      id="remainingAmount"
                      name="remainingAmount"
                      type="number"
                      value={formData.remainingAmount}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spentAmount">Spent Amount (₹)</Label>
                    <Input
                      id="spentAmount"
                      name="spentAmount"
                      type="number"
                      value={formData.spentAmount}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reservedAmount">Reserved Amount (₹)</Label>
                    <Input
                      id="reservedAmount"
                      name="reservedAmount"
                      type="number"
                      value={formData.reservedAmount}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button 
                className="bg-auction-gradient hover:bg-auction-gradient-hover"
                onClick={handleCreateTeam}
              >
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="auction-card overflow-hidden">
            <div className="h-1 bg-auction-gradient"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={team.logo} 
                    alt={team.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-auction-charcoal">{team.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm">
                        <div className="flex items-center text-auction-steel">
                          <User className="h-4 w-4 mr-1" />
                          <span>{team.username}</span>
                        </div>
                        <div className="flex items-center text-auction-steel">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{team.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-auction-steel">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-auction-danger"
                        onClick={() => handleDeleteTeam(team.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="space-y-1">
                      <p className="text-xs text-auction-steel">Total Budget</p>
                      <p className="font-medium">{formatCurrency(team.totalBudget)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-auction-steel">Remaining Amount</p>
                      <p className="font-medium text-auction-success">{formatCurrency(team.remainingAmount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-auction-steel">Spent Amount</p>
                      <p className="font-medium text-auction-danger">{formatCurrency(team.spentAmount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-auction-steel">Reserved Amount</p>
                      <p className="font-medium text-auction-blue">{formatCurrency(team.reservedAmount)}</p>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-auction-steel">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{team.players} Players</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-auction-blue"
                    >
                      View Players
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {teams.length === 0 && (
          <Card className="auction-card p-8 text-center col-span-2">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-auction-gray mb-4" />
              <h3 className="text-xl font-bold text-auction-charcoal mb-2">No Teams Yet</h3>
              <p className="text-auction-steel mb-4">
                Create your first team to get started.
              </p>
              <Button 
                className="bg-auction-gradient hover:bg-auction-gradient-hover"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default TeamsManagement;
