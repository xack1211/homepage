import React, { useEffect, useState } from 'react'
import { getProviders, list, downloadUrl } from './api'

function ProviderList({ providers, onSelect }) {
  return (
    <div className="providers">
      {providers.map(p => (
        <button key={p.id} onClick={() => onSelect(p)} className="provider-btn">
          {p.name}
        </button>
      ))}
    </div>
  )
}

function FileItem({ item, onOpen, onDownload }) {
  return (
    <div className="file-item">
      <div className="file-name" onClick={() => item.isDir ? onOpen(item) : null}>
        {item.isDir ? '📁' : '📄'} {item.name}
      </div>
      <div>
        {!item.isDir && (
          <a className="download" href={onDownload(item)} target="_blank" rel="noreferrer">Download</a>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [providers, setProviders] = useState([])
  const [active, setActive] = useState(null)
  const [path, setPath] = useState('/')
  const [items, setItems] = useState([])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    getProviders().then(setProviders).catch(console.error)
  }, [])

  useEffect(() => {
    if (!active) return;
    list(active.id, path).then(setItems).catch(err => { console.error(err); setItems([]) })
  }, [active, path])

  function openDir(item) {
    setPath(prev => (prev === '/' ? `/${item.name}` : `${prev}/${item.name}`))
  }

  function up() {
    if (path === '/') return;
    const parts = path.split('/').filter(Boolean)
    parts.pop()
    setPath(parts.length ? `/${parts.join('/')}` : '/')
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <h1>fullstack-alist</h1>
        <div>
          <button onClick={() => setDark(d => !d)} className="btn">Toggle Dark</button>
        </div>
      </header>

      <main>
        <aside>
          <h3>Providers</h3>
          <ProviderList providers={providers} onSelect={p => { setActive(p); setPath('/') }} />
        </aside>

        <section>
          <div className="toolbar">
            <div>Active: {active ? active.name : '—'}</div>
            <div className="path-controls">
              <button onClick={up} className="btn">Up</button>
              <div className="current-path">{path}</div>
            </div>
          </div>

          <div className="files">
            {items.map(it => (
              <FileItem key={it.path} item={it} onOpen={openDir} onDownload={i => downloadUrl(active.id, i.path)} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <small>Server API: http://localhost:4000</small>
      </footer>
    </div>
  )
}
