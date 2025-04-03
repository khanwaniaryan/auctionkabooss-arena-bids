
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/layout/AuthLayout";
import { User, Lock, Loader2 } from "lucide-react";

const TeamLogin = () => {
  const [teamId, setTeamId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - in a real app, this would be a proper auth check
    setTimeout(() => {
      // For demo purposes, accept any teamId and password with min length 4
      if (teamId.length >= 4 && password.length >= 4) {
        login("team");
        navigate("/team/dashboard");
        toast({
          title: "Login successful",
          description: "Welcome to the auction dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid team ID or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout title="Team Login" subtitle="Sign in to participate in auctions" type="team">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamId">Team ID</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-auction-steel h-4 w-4" />
            <Input
              id="teamId"
              placeholder="Your team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a 
              href="#" 
              className="text-sm text-auction-blue hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Password Reset",
                  description: "Password reset functionality would be implemented here",
                });
              }}
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-auction-steel h-4 w-4" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-auction-gradient hover:bg-auction-gradient-hover"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default TeamLogin;
