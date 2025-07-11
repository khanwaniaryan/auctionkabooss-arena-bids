
import AdminLayout from "@/components/layout/AdminLayout";

const AuctionSetup = () => {
  return (
    <AdminLayout title="Auction Setup">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-auction-charcoal mb-4">
            Auction Setup
          </h2>
          <p className="text-auction-steel">
            Configure auction settings and manage live auctions.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuctionSetup;
