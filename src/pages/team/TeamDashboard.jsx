
import TeamLayout from "@/components/layout/TeamLayout";

const TeamDashboard = () => {
  return (
    <TeamLayout 
      teamName="Mumbai Indians" 
      balance={5000000}
      isLiveAuction={true}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-auction-charcoal mb-4">
            Welcome to your Team Dashboard
          </h2>
          <p className="text-auction-steel">
            Monitor your team's performance and participate in live auctions.
          </p>
        </div>
      </div>
    </TeamLayout>
  );
};

export default TeamDashboard;
