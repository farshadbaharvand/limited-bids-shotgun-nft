import AuctionStatus from './components/AuctionStatus';

export default function Home() {
  return (
    <main className="space-y-6">
      <section>
        <h2 className="text-xl font-medium">Auction Status</h2>
        <p className="text-sm text-gray-600">Overview of current shotgun auction</p>
      </section>

      <AuctionStatus />

      <section className="pt-4 border-t">
        <div className="flex gap-3">
          <a href="/initiate" className="btn">Initiate</a>
          <a href="/counter" className="btn ghost">Counter</a>
          <a href="/finish" className="btn ghost">Finish</a>
          <a href="/withdraw" className="btn ghost">Withdraw</a>
        </div>
      </section>
    </main>
  );
}