import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import FileInput from "@/components/ui/file-input";

// Mock player data
const mockPlayers = [
  {
    id: 1,
    name: "Virat Kohli",
    position: "Batsman",
    team: "Royal Challengers Bangalore",
    basePrice: 15000000,
    currentPrice: 17000000,
    photo: "https://via.placeholder.com/150",
    age: 35,
    nationality: "India",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    status: "available",
  },
  {
    id: 2,
    name: "MS Dhoni",
    position: "Wicket-keeper/Batsman",
    team: "Chennai Super Kings",
    basePrice: 12000000,
    currentPrice: 14000000,
    photo: "https://via.placeholder.com/150",
    age: 42,
    nationality: "India",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    status: "available",
  },
  {
    id: 3,
    name: "Rohit Sharma",
    position: "Batsman",
    team: "Mumbai Indians",
    basePrice: 14000000,
    currentPrice: 16000000,
    photo: "https://via.placeholder.com/150",
    age: 36,
    nationality: "India",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off-break",
    status: "available",
  },
];

const PlayersManagement = () => {
  const [players, setPlayers] = useState(mockPlayers);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    team: "",
    basePrice: 500000,
    currentPrice: 0,
    photo: null,
    photoFile: null,
    age: 25,
    nationality: "India",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium"
  });
  const { toast } = useToast();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["basePrice", "currentPrice", "age"].includes(name)
        ? Number(value)
        : value
    });
  };

  const handleFileSelect = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          photo: e.target.result,
          photoFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClear = () => {
    setFormData({
      ...formData,
      photo: null,
      photoFile: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPlayer) {
      // Update existing player
      const updatedPlayers = players.map(player =>
        player.id === editingPlayer.id
          ? { ...player, ...formData, id: editingPlayer.id }
          : player
      );
      setPlayers(updatedPlayers);
      setEditingPlayer(null);
    } else {
      // Add new player
      const newPlayer = {
        id: players.length + 1,
        ...formData,
        status: "available"
      };
      setPlayers([...players, newPlayer]);
    }

    // Reset form
    setFormData({
      name: "",
      position: "",
      team: "",
      basePrice: 500000,
      currentPrice: 0,
      photo: null,
      photoFile: null,
      age: 25,
      nationality: "India",
      battingStyle: "Right-handed",
      bowlingStyle: "Right-arm medium"
    });

    toast({
      title: editingPlayer ? "Player updated successfully!" : "Player created successfully!",
      description: `Player ${formData.name} has been ${editingPlayer ? 'updated' : 'added'} to the system.`,
    });

    setIsSheetOpen(false);
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      position: player.position,
      team: player.team,
      basePrice: player.basePrice,
      currentPrice: player.currentPrice,
      photo: player.photo,
      photoFile: null,
      age: player.age,
      nationality: player.nationality,
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle
    });
    setIsSheetOpen(true);
  };

  const handleDelete = (player) => {
    // Implement delete logic here
    const updatedPlayers = players.filter(p => p.id !== player.id);
    setPlayers(updatedPlayers);
    toast({
      title: "Player deleted successfully!",
      description: `Player ${player.name} has been removed from the system.`,
    });
  };

  const clearForm = () => {
    setEditingPlayer(null);
    setFormData({
      name: "",
      position: "",
      team: "",
      basePrice: 500000,
      currentPrice: 0,
      photo: null,
      photoFile: null,
      age: 25,
      nationality: "India",
      battingStyle: "Right-handed",
      bowlingStyle: "Right-arm medium"
    });
  };

  return (
    <AdminLayout title="Players Management">
      <div className="md:flex items-center justify-between">
        <p className="text-auction-steel">
          Manage and organize players participating in the tournament.
        </p>
        <Button onClick={() => { setIsSheetOpen(true); clearForm(); }} className="bg-auction-gradient hover:bg-auction-gradient-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Player
        </Button>
      </div>

      <Separator className="my-4" />

      <ScrollArea>
        <Table>
          <TableCaption>A list of all registered players.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={player.photo} alt={player.name} />
                      <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <Badge variant="outline">{player.status}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.team}</TableCell>
                <TableCell>{player.basePrice}</TableCell>
                <TableCell>{player.currentPrice}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(player)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(player)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Total {players.length} Players
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingPlayer ? "Edit Player" : "Add Player"}</SheetTitle>
            <SheetDescription>
              {editingPlayer
                ? "Update player details in the system."
                : "Add a new player to the system."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="team">Team</Label>
              <Input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                type="number"
                id="basePrice"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="currentPrice">Current Price</Label>
              <Input
                type="number"
                id="currentPrice"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  required
                />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
                <Input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleFormChange}
                  required
                />
            </div>
            <div>
              <Label htmlFor="battingStyle">Batting Style</Label>
                <Input
                  type="text"
                  id="battingStyle"
                  name="battingStyle"
                  value={formData.battingStyle}
                  onChange={handleFormChange}
                  required
                />
            </div>
            <div>
              <Label htmlFor="bowlingStyle">Bowling Style</Label>
                <Input
                  type="text"
                  id="bowlingStyle"
                  name="bowlingStyle"
                  value={formData.bowlingStyle}
                  onChange={handleFormChange}
                  required
                />
            </div>
            <div>
              <Label>Player Photo</Label>
              <FileInput
                onFileSelect={handleFileSelect}
                onFileClear={handleFileClear}
                selectedFile={formData.photoFile}
                preview={formData.photo}
                placeholder="Upload player photo"
              />
            </div>
            <SheetFooter>
              <Button type="submit" className="bg-auction-gradient hover:bg-auction-gradient-hover">
                {editingPlayer ? "Update Player" : "Add Player"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default PlayersManagement;
