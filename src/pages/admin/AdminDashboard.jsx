
import AdminLayout from "@/components/layout/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-auction-charcoal mb-4">
            Welcome to the Admin Dashboard
          </h2>
          <p className="text-auction-steel">
            Use the navigation menu to manage teams, players, and auction setup.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
