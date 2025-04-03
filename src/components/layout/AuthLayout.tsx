
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  type: "admin" | "team";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle = "Sign in to access your account",
  type 
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-auction-gradient flex flex-col justify-center items-center p-8 text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Trophy size={40} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold">AUCTIONKABOSS</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">The Ultimate Auction Platform</h2>
          <p className="text-lg opacity-90">
            Manage tournaments, teams, and players with our innovative auction system.
          </p>
          <div className="mt-10 p-6 glassmorphism bg-white/10 rounded-xl">
            <p className="text-lg font-medium">
              "AUCTIONKABOSS has revolutionized how we conduct our player auctions. The platform is intuitive and powerful!"
            </p>
            <p className="mt-4 font-medium">- Premier Cricket League</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-auction-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-auction-charcoal">{title}</h1>
            <p className="text-auction-steel mt-2">{subtitle}</p>
          </div>

          {children}

          <div className="text-center mt-6">
            <p className="text-auction-steel">
              {type === "admin" ? "Team login? " : "Tournament admin? "}
              <Link 
                to={type === "admin" ? "/team/login" : "/admin/login"} 
                className="text-auction-blue hover:underline font-medium"
              >
                {type === "admin" ? "Sign in as team" : "Sign in as admin"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
