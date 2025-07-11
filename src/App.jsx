import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import TeamsManagement from "@/pages/admin/TeamsManagement";
import PlayersManagement from "@/pages/admin/PlayersManagement";
import AuctionSetup from "@/pages/admin/AuctionSetup";

// Team Pages
import TeamLogin from "@/pages/team/TeamLogin";
import TeamDashboard from "@/pages/team/TeamDashboard";

// Other Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

export const AuthContext = createContext({
  userType: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const queryClient = new QueryClient();

const App = () => {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserType(null);
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ userType, isAuthenticated, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/team/login" element={<TeamLogin />} />
              
              {/* Admin protected routes */}
              <Route
                path="/admin/dashboard"
                element={
                  isAuthenticated && userType === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              <Route
                path="/admin/teams"
                element={
                  isAuthenticated && userType === "admin" ? (
                    <TeamsManagement />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              <Route
                path="/admin/players"
                element={
                  isAuthenticated && userType === "admin" ? (
                    <PlayersManagement />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              <Route
                path="/admin/auction"
                element={
                  isAuthenticated && userType === "admin" ? (
                    <AuctionSetup />
                  ) : (
                    <Navigate to="/admin/login" replace />
                  )
                }
              />
              
              {/* Team protected routes */}
              <Route
                path="/team/dashboard"
                element={
                  isAuthenticated && userType === "team" ? (
                    <TeamDashboard />
                  ) : (
                    <Navigate to="/team/login" replace />
                  )
                }
              />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
