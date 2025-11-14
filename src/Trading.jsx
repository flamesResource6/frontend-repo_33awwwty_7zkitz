import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Trading() {
  const [userId, setUserId] = useState('demo-user')
  const [symbol, setSymbol] = useState('AAPL')
  const [qty, setQty] = useState(1)
  const [side, setSide] = useState('buy')
  const [quote, setQuote] = useState(null)
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const getQuote = async () => {
    try {
      const r = await fetch(`${BASE}/api/trading/quote?symbol=${encodeURIComponent(symbol)}`)
      const d = await r.json()
      setQuote(d)
    } catch (e) {
      console.error(e)
    }
  }

  const ensureAccount = async () => {
    try {
      await fetch(`${BASE}/api/trading/account`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId }) })
    } catch (e) {}
  }

  const loadPortfolio = async () => {
    try {
      const r = await fetch(`${BASE}/api/trading/portfolio?user_id=${encodeURIComponent(userId)}`)
      if (!r.ok) return
      const d = await r.json()
      setPortfolio(d)
    } catch (e) {}
  }

  useEffect(() => {
    ensureAccount().then(loadPortfolio)
    getQuote()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const placeOrder = async () => {
    setLoading(true)
    setMessage('')
    try {
      const r = await fetch(`${BASE}/api/trading/order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, symbol, side, quantity: Number(qty) }) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.detail || 'Order failed')
      setMessage(`Order filled @ $${d.price}. Cash: $${d.cash_balance.toFixed(2)}`)
      await loadPortfolio()
    } catch (e) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Paper Trading</h1>
        <p className="text-gray-600 mb-6">Practice buying and selling with virtual cash. No real money required.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Quote</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} className="flex-1 border rounded px-3 py-2" placeholder="Symbol (e.g., AAPL)" />
                <button onClick={getQuote} className="px-3 py-2 bg-blue-600 text-white rounded">Get</button>
              </div>
              {quote && (
                <div className="text-sm text-gray-700">{quote.symbol}: <span className="font-semibold">${quote.price}</span></div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Place Order</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">User</label>
                <input value={userId} onChange={e=>setUserId(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600">Quantity</label>
                  <input type="number" min={0} step={1} value={qty} onChange={e=>setQty(e.target.value)} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Side</label>
                  <select value={side} onChange={e=>setSide(e.target.value)} className="w-full border rounded px-3 py-2">
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
              </div>
              <button disabled={loading} onClick={placeOrder} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded">
                {loading ? 'Placing...' : 'Submit Order'}
              </button>
              {message && <p className="text-sm text-gray-700">{message}</p>}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Portfolio</h2>
            {portfolio ? (
              <div className="space-y-2 text-sm">
                <p>Cash: <span className="font-semibold">${Number(portfolio.cash_balance || 0).toFixed(2)}</span></p>
                <div>
                  <p className="font-medium">Positions:</p>
                  <ul className="list-disc ml-5 mt-1">
                    {Object.keys(portfolio.positions || {}).length === 0 && <li className="text-gray-500">No positions</li>}
                    {Object.entries(portfolio.positions || {}).map(([sym, q]) => (
                      <li key={sym}>{sym}: {q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No account yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
