import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash2, Image } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import FileInput from "@/components/ui/file-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock data for teams
const mockTeams = [
  {
    id: 1,
    name: "Mumbai Indians",
    username: "mumbai_indians",
    email: "mumbai@example.com",
    totalBudget: 100000000,
    remainingAmount: 30000000,
    spentAmount: 70000000,
    reservedAmount: 10000000,
    logo: "https://via.placeholder.com/150",
    status: "active",
    tournamentId: 1
  },
  {
    id: 2,
    name: "Chennai Super Kings",
    username: "chennai_super_kings",
    email: "chennai@example.com",
    totalBudget: 90000000,
    remainingAmount: 40000000,
    spentAmount: 50000000,
    reservedAmount: 5000000,
    logo: "https://via.placeholder.com/150",
    status: "inactive",
    tournamentId: 1
  },
  {
    id: 3,
    name: "Royal Challengers Bangalore",
    username: "rcb_official",
    email: "rcb@example.com",
    totalBudget: 85000000,
    remainingAmount: 25000000,
    spentAmount: 60000000,
    reservedAmount: 8000000,
    logo: "https://via.placeholder.com/150",
    status: "active",
    tournamentId: 1
  },
];

// Mock tournaments data
const mockTournaments = [
  { id: 1, name: "IPL Mega Auction 2025" },
  { id: 2, name: "T20 World Cup Auction 2026" },
];

const TeamsManagement = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    totalBudget: 100000000,
    remainingAmount: 100000000,
    spentAmount: 0,
    reservedAmount: 0,
    logo: null,
    logoFile: null,
    tournamentId: 1 // Default to first tournament
  });
  const { toast } = useToast();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["totalBudget", "remainingAmount", "spentAmount", "reservedAmount", "tournamentId"].includes(name)
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
          logo: e.target.result,
          logoFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileClear = () => {
    setFormData({
      ...formData,
      logo: null,
      logoFile: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingTeam) {
      // Update existing team
      const updatedTeams = teams.map(team =>
        team.id === editingTeam.id
          ? { ...team, ...formData, id: editingTeam.id }
          : team
      );
      setTeams(updatedTeams);
      setEditingTeam(null);
    } else {
      // Add new team
      const newTeam = {
        id: teams.length + 1,
        ...formData,
        status: "active"
      };
      setTeams([...teams, newTeam]);
    }

    // Reset form
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      totalBudget: 100000000,
      remainingAmount: 100000000,
      spentAmount: 0,
      reservedAmount: 0,
      logo: null,
      logoFile: null,
      tournamentId: 1
    });

    toast({
      title: editingTeam ? "Team updated successfully!" : "Team created successfully!",
      description: `Team ${formData.name} has been ${editingTeam ? 'updated' : 'added'} to the system.`,
    });

    setIsSheetOpen(false);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      username: team.username,
      email: team.email,
      password: "", // Do not pre-fill password
      totalBudget: team.totalBudget,
      remainingAmount: team.remainingAmount,
      spentAmount: team.spentAmount,
      reservedAmount: team.reservedAmount,
      logo: team.logo,
      logoFile: null,
      tournamentId: team.tournamentId
    });
    setIsSheetOpen(true);
  };

  const handleDelete = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast({
      title: "Team deleted successfully!",
      description: "The team has been removed from the system.",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AdminLayout title="Teams Management">
      <div className="mb-4">
        <Button onClick={() => {
          setEditingTeam(null);
          setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            totalBudget: 100000000,
            remainingAmount: 100000000,
            spentAmount: 0,
            reservedAmount: 0,
            logo: null,
            logoFile: null,
            tournamentId: 1
          });
          setIsSheetOpen(true);
        }}>
          Add Team
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Total Budget</TableHead>
              <TableHead>Remaining Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>
                  <img src={team.logo} alt={team.name} className="h-8 w-8 rounded-full object-cover" />
                </TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.username}</TableCell>
                <TableCell>{formatCurrency(team.totalBudget)}</TableCell>
                <TableCell>{formatCurrency(team.remainingAmount)}</TableCell>
                <TableCell>
                  <Badge variant={team.status === "active" ? "default" : "secondary"}>
                    {team.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(team)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(team.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <a href={`mailto:${team.email}`} className="w-full block">
                          Contact Team
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Total teams: {teams.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingTeam ? "Edit Team" : "Add Team"}</SheetTitle>
            <SheetDescription>
              {editingTeam ? "Edit the team details." : "Add a new team to the tournament."}
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" value={formData.password} onChange={handleFormChange} required={!editingTeam} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalBudget">Total Budget</Label>
              <Input type="number" id="totalBudget" name="totalBudget" value={formData.totalBudget} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remainingAmount">Remaining Amount</Label>
              <Input type="number" id="remainingAmount" name="remainingAmount" value={formData.remainingAmount} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="spentAmount">Spent Amount</Label>
              <Input type="number" id="spentAmount" name="spentAmount" value={formData.spentAmount} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reservedAmount">Reserved Amount</Label>
              <Input type="number" id="reservedAmount" name="reservedAmount" value={formData.reservedAmount} onChange={handleFormChange} required />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tournamentId">Tournament</Label>
              <Select onValueChange={(value) => handleFormChange({ target: { name: 'tournamentId', value: value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tournament" />
                </SelectTrigger>
                <SelectContent>
                  {mockTournaments.map((tournament) => (
                    <SelectItem key={tournament.id} value={String(tournament.id)}>
                      {tournament.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Team Logo</Label>
              <FileInput
                onFileSelect={handleFileSelect}
                onFileClear={handleFileClear}
                selectedFile={formData.logoFile}
                preview={formData.logo}
                placeholder="Upload team logo"
              />
            </div>
            <SheetFooter>
              <Button type="submit">{editingTeam ? "Update Team" : "Add Team"}</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default TeamsManagement;
