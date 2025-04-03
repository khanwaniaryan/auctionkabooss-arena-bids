import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  User2, 
  Plus,
  Pencil,
  Trash2,
  UserPlus,
  Mail,
  DollarSign,
  Calendar,
  Trophy,
  Search
} from "lucide-react";

const mockPlayers = [
  {
    id: 1,
    name: "Virat Kohli",
    age: 35,
    type: "Batsman",
    roleType: "Right-handed batsman",
    basePrice: 20000000,
    email: "virat@example.com",
    gameType: "CRICKET",
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
    email: "rohit@example.com",
    gameType: "CRICKET",
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
    email: "bumrah@example.com",
    gameType: "CRICKET",
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
    email: "jadeja@example.com",
    gameType: "CRICKET",
    role: "All-rounder",
    playerState: "Regular",
    image: "https://placehold.co/100x100/DC3545/FFFFFF?text=RJ"
  },
  {
    id: 5,
    name: "KL Rahul",
    age: 32,
    type: "Batsman",
    roleType: "Right-handed batsman, Wicket-keeper",
    basePrice: 18000000,
    email: "klrahul@example.com",
    gameType: "CRICKET",
    role: "Wicket-keeper batsman",
    playerState: "Regular",
    image: "https://placehold.co/100x100/6F42C1/FFFFFF?text=KL"
  },
  {
    id: 6,
    name: "Rishabh Pant",
    age: 26,
    type: "Batsman",
    roleType: "Left-handed batsman, Wicket-keeper",
    basePrice: 18000000,
    email: "pant@example.com",
    gameType: "CRICKET",
    role: "Wicket-keeper batsman",
    playerState: "Regular",
    image: "https://placehold.co/100x100/20C997/FFFFFF?text=RP"
  }
];

interface PlayerFormData {
  name: string;
  age: number;
  type: string;
  roleType: string;
  basePrice: number;
  email: string;
  gameType: string;
  role: string;
  playerState: string;
}

const PlayersManagement = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<PlayerFormData>({
    name: "",
    age: 25,
    type: "Batsman",
    roleType: "Right-handed batsman",
    basePrice: 10000000,
    email: "",
    gameType: "CRICKET",
    role: "Batsman",
    playerState: "Regular"
  });
  const { toast } = useToast();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["age", "basePrice"].includes(name) ? Number(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreatePlayer = () => {
    const nameInitials = formData.name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();

    const newPlayer = {
      id: players.length + 1,
      name: formData.name,
      age: formData.age,
      type: formData.type,
      roleType: formData.roleType,
      basePrice: formData.basePrice,
      email: formData.email,
      gameType: formData.gameType,
      role: formData.role,
      playerState: formData.playerState,
      image: `https://placehold.co/100x100/007BFF/FFFFFF?text=${nameInitials}`
    };

    setPlayers([...players, newPlayer]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      age: 25,
      type: "Batsman",
      roleType: "Right-handed batsman",
      basePrice: 10000000,
      email: "",
      gameType: "CRICKET",
      role: "Batsman",
      playerState: "Regular"
    });

    toast({
      title: "Player Created",
      description: `${formData.name} has been successfully added.`,
    });
  };

  const handleDeletePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id));
    toast({
      title: "Player Deleted",
      description: "The player has been successfully deleted.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Player Management">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <User2 className="h-5 w-5 text-auction-blue" />
          <h2 className="text-xl font-bold text-auction-charcoal">Player List</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-auction-steel h-4 w-4" />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 min-w-[200px]"
            />
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-auction-gradient hover:bg-auction-gradient-hover sm:ml-auto">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Player
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
                <DialogDescription>
                  Add a new player to the database.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-auction-steel mb-2">Basic Information</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Player Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Virat Kohli"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleFormChange}
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
                        placeholder="player@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basePrice">Base Price (₹)</Label>
                      <Input
                        id="basePrice"
                        name="basePrice"
                        type="number"
                        value={formData.basePrice}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-auction-steel mb-2">Player Details</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Player Type</Label>
                      <Select 
                        defaultValue={formData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Batsman">Batsman</SelectItem>
                          <SelectItem value="Bowler">Bowler</SelectItem>
                          <SelectItem value="All-rounder">All-rounder</SelectItem>
                          <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roleType">Role Type</Label>
                      <Input
                        id="roleType"
                        name="roleType"
                        value={formData.roleType}
                        onChange={handleFormChange}
                        placeholder="Right-handed batsman"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gameType">Game Type</Label>
                      <Select 
                        defaultValue={formData.gameType}
                        onValueChange={(value) => handleSelectChange("gameType", value)}
                      >
                        <SelectTrigger id="gameType">
                          <SelectValue placeholder="Select game type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CRICKET">CRICKET</SelectItem>
                          <SelectItem value="FOOTBALL">FOOTBALL</SelectItem>
                          <SelectItem value="HOCKEY">HOCKEY</SelectItem>
                          <SelectItem value="KABADDI">KABADDI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select 
                        defaultValue={formData.role}
                        onValueChange={(value) => handleSelectChange("role", value)}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Batsman">Batsman</SelectItem>
                          <SelectItem value="Bowler">Bowler</SelectItem>
                          <SelectItem value="All-rounder">All-rounder</SelectItem>
                          <SelectItem value="Wicket-keeper batsman">Wicket-keeper batsman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="playerState">Player State</Label>
                      <Select 
                        defaultValue={formData.playerState}
                        onValueChange={(value) => handleSelectChange("playerState", value)}
                      >
                        <SelectTrigger id="playerState">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Regular">Regular</SelectItem>
                          <SelectItem value="Captain">Captain</SelectItem>
                          <SelectItem value="Vice Captain">Vice Captain</SelectItem>
                          <SelectItem value="Overseas">Overseas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button 
                  className="bg-auction-gradient hover:bg-auction-gradient-hover"
                  onClick={handleCreatePlayer}
                >
                  Add Player
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="auction-card overflow-hidden">
            <div className="h-1 bg-auction-gradient"></div>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={player.image} 
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-auction-charcoal">{player.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-blue/10 text-auction-blue">
                            {player.role}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-auction-teal/10 text-auction-teal">
                            {player.playerState}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4 text-auction-steel" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeletePlayer(player.id)}
                        >
                          <Trash2 className="h-4 w-4 text-auction-danger" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-auction-steel" />
                    <span className="text-auction-steel">Age:</span>
                    <span className="font-medium text-auction-charcoal">{player.age} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-auction-steel" />
                    <span className="text-auction-steel">Base:</span>
                    <span className="font-medium text-auction-charcoal">{formatCurrency(player.basePrice)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-auction-steel" />
                    <span className="text-auction-steel">Game:</span>
                    <span className="font-medium text-auction-charcoal">{player.gameType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-auction-steel" />
                    <span className="text-auction-steel truncate max-w-[120px]">{player.email}</span>
                  </div>
                </div>

                <div className="bg-auction-gray/30 rounded-lg p-3">
                  <p className="text-xs text-auction-steel">Role Type</p>
                  <p className="text-sm font-medium text-auction-charcoal">{player.roleType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPlayers.length === 0 && (
          <Card className="auction-card p-8 text-center col-span-full">
            <div className="flex flex-col items-center">
              <User2 className="h-12 w-12 text-auction-gray mb-4" />
              {searchQuery ? (
                <>
                  <h3 className="text-xl font-bold text-auction-charcoal mb-2">No Players Found</h3>
                  <p className="text-auction-steel mb-4">
                    No players match your search criteria.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-auction-charcoal mb-2">No Players Yet</h3>
                  <p className="text-auction-steel mb-4">
                    Add your first player to get started.
                  </p>
                </>
              )}
              <Button 
                className="bg-auction-gradient hover:bg-auction-gradient-hover"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Player
              </Button>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default PlayersManagement;
