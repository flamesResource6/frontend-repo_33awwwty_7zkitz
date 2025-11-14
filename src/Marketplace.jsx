import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Marketplace() {
  const [form, setForm] = useState({ title: '', description: '', price: 10, category: 'General' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const list = async () => {
    try {
      const r = await fetch(`${BASE}/api/products`)
      const d = await r.json()
      setItems(d)
    } catch (e) {}
  }

  const create = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await fetch(`${BASE}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, price: Number(form.price) }) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.detail || 'Failed to create')
      setForm({ title: '', description: '', price: 10, category: 'General' })
      await list()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { list() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Marketplace</h1>
        <p className="text-gray-600 mb-6">List items for sale. This is a demo catalog (no payments).</p>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">Create a Listing</h2>
            <input value={form.title} onChange={e=>setForm(f=>({ ...f, title: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Title" required />
            <textarea value={form.description} onChange={e=>setForm(f=>({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Description" rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min={0} step={0.01} value={form.price} onChange={e=>setForm(f=>({ ...f, price: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Price" />
              <input value={form.category} onChange={e=>setForm(f=>({ ...f, category: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Category" />
            </div>
            <button disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
          </form>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Listings</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item._id} className="border rounded-md p-3">
                  <div className="font-semibold text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.category}</div>
                  <div className="text-sm text-gray-700 mt-1">${Number(item.price).toFixed(2)}</div>
                  {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-gray-500">No items yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
