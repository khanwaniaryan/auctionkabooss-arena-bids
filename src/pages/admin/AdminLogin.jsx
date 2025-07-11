
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/layout/AuthLayout";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Function to handle auto-login
  const handleAutoLogin = () => {
    login("admin");
    navigate("/admin/dashboard");
    toast({
      title: "Login successful",
      description: "Welcome back to your admin dashboard",
    });
  };

  return (
    <AuthLayout title="Tournament Admin Login" type="admin">
      <div className="space-y-6">
        <p className="text-center text-auction-steel">
          Click the button below to access the admin dashboard
        </p>
        
        <Button 
          onClick={handleAutoLogin}
          className="w-full bg-auction-gradient hover:bg-auction-gradient-hover"
        >
          Sign In
        </Button>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;
