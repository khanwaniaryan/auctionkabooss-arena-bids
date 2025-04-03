
import React, { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Trophy, 
  LayoutDashboard, 
  Users, 
  User2, 
  Gavel, 
  LogOut,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/App";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: location.pathname === "/admin/dashboard",
    },
    {
      title: "Teams",
      icon: Users,
      href: "/admin/teams",
      active: location.pathname === "/admin/teams",
    },
    {
      title: "Players",
      icon: User2,
      href: "/admin/players",
      active: location.pathname === "/admin/players",
    },
    {
      title: "Auction Setup",
      icon: Gavel,
      href: "/admin/auction",
      active: location.pathname === "/admin/auction",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-auction-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-auction-gray/30 shadow-sm py-3 px-4 md:py-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-auction-blue" />
              <span className="font-bold text-xl hidden md:inline">AUCTIONKABOSS</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-auction-gradient flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="font-medium hidden md:inline">Admin</span>
              <ChevronDown className="h-4 w-4 text-auction-steel" />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-auction-steel hover:text-auction-danger flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "w-64 bg-white border-r border-auction-gray/30 fixed left-0 top-[61px] bottom-0 z-30 md:relative overflow-y-auto transition-all duration-300 transform",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-auction-gradient text-white shadow-md"
                    : "text-auction-steel hover:bg-auction-gray/20"
                )}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-auction-charcoal">{title}</h1>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
