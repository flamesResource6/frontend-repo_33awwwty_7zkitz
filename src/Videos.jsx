import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Videos() {
  const [form, setForm] = useState({ title: '', description: '', video_url: '', thumbnail_url: '', creator: '' })
  const [items, setItems] = useState([])

  const list = async () => {
    try {
      const r = await fetch(`${BASE}/api/videos`)
      const d = await r.json()
      setItems(d)
    } catch (e) {}
  }

  const create = async (e) => {
    e.preventDefault()
    try {
      const r = await fetch(`${BASE}/api/videos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const d = await r.json()
      if (!r.ok) throw new Error(d.detail || 'Failed to add video')
      setForm({ title: '', description: '', video_url: '', thumbnail_url: '', creator: '' })
      await list()
    } catch (e) {
      alert(e.message)
    }
  }

  useEffect(() => { list() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create & Share Videos</h1>
        <p className="text-gray-600 mb-6">Add links to videos hosted elsewhere (YouTube, Vimeo, etc.).</p>

        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
            <input value={form.title} onChange={e=>setForm(f=>({ ...f, title: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Title" required />
            <textarea value={form.description} onChange={e=>setForm(f=>({ ...f, description: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Description" rows={3} />
            <input value={form.video_url} onChange={e=>setForm(f=>({ ...f, video_url: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Video URL (YouTube, etc.)" />
            <input value={form.thumbnail_url} onChange={e=>setForm(f=>({ ...f, thumbnail_url: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Thumbnail URL (optional)" />
            <input value={form.creator} onChange={e=>setForm(f=>({ ...f, creator: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="Creator name (optional)" />
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded">Add</button>
          </form>

          <div className="bg-white rounded-lg shadow p-4 grid sm:grid-cols-2 gap-4">
            {items.map(item => (
              <a key={item._id} href={item.video_url || '#'} target="_blank" rel="noreferrer" className="border rounded-md overflow-hidden hover:shadow">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-400">No thumbnail</div>
                )}
                <div className="p-3">
                  <div className="font-semibold text-gray-800">{item.title}</div>
                  {item.creator && <div className="text-xs text-gray-500">by {item.creator}</div>}
                </div>
              </a>
            ))}
            {items.length === 0 && <p className="text-sm text-gray-500">No videos yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
