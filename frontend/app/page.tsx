import AuctionStatus from './components/AuctionStatus';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-2">Auction Status</h2>
        <p className="text-gray-600 mb-6">
          Overview of the current shotgun auction state
        </p>
        <AuctionStatus />
      </section>

      <section className="pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/initiate" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Initiate Auction</h3>
            <p className="text-sm text-gray-600">
              Start a new shotgun auction
            </p>
          </Link>
          <Link href="/counter" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Counter Offer</h3>
            <p className="text-sm text-gray-600">
              Make a counter offer in the auction
            </p>
          </Link>
          <Link href="/finish" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Finish Auction</h3>
            <p className="text-sm text-gray-600">
              Complete the auction and transfer assets
            </p>
          </Link>
          <Link href="/withdraw" className="card hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Withdraw</h3>
            <p className="text-sm text-gray-600">
              Withdraw funds from the auction
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
