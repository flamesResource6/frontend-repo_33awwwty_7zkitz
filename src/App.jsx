import { Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <header className="py-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creator Hub</Link>
          <nav className="flex gap-2">
            <Link to="/trading" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Trading</Link>
            <Link to="/videos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Create Videos</Link>
            <Link to="/marketplace" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sell Products</Link>
            <Link to="/test" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">System Check</Link>
          </nav>
        </header>

        <main className="py-10">
          <section className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Build. Trade. Sell. Free.</h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">A single place to practice trading with virtual cash, share your videos hosted anywhere, and post products for a no-fee demo storefront. All in one free experience.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/trading" className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">Start Trading</Link>
              <Link to="/videos" className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold">Create Videos</Link>
              <Link to="/marketplace" className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Open Marketplace</Link>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-6 mt-12">
            <Card title="Paper Trading" desc="Practice buying and selling with simulated funds. No risk." to="/trading" color="from-blue-500 to-indigo-500" />
            <Card title="Video Creator" desc="Post links to your content and build your audience." to="/videos" color="from-purple-500 to-pink-500" />
            <Card title="Marketplace" desc="List products for sale in a demo catalog (no payments)." to="/marketplace" color="from-emerald-500 to-teal-500" />
          </section>
        </main>

        <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} Creator Hub — free, demo-only tools</footer>
      </div>
    </div>
  )
}

function Card({ title, desc, to, color }) {
  return (
    <Link to={to} className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className={`h-24 bg-gradient-to-r ${color}`} />
      <div className="p-4">
        <div className="font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{desc}</div>
        <div className="mt-3 text-blue-600 text-sm font-medium">Explore →</div>
      </div>
    </Link>
  )
}
