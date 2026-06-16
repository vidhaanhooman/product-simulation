import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Search,
  Copy,
  MoreVertical,
  UserSquare,
  Zap,
  Database,
  Mic,
  HardDrive,
  RadioTower,
  PhoneCall,
  BarChart3,
  FileText,
  CreditCard,
  Settings,
  Upload,
  Plus,
  Sparkles,
  Wand2,
  Check,
} from 'lucide-react';
import './App.css';
import { SCENARIOS, BADGE_STYLES, type Scenario, type Idea } from './data';
import GenerateDrawer from './GenerateDrawer';

function Badge({ kind, label }: { kind: keyof typeof BADGE_STYLES; label: string }) {
  if (kind === 'completed') {
    return <span className="cell-completed">{label}</span>;
  }
  const s = BADGE_STYLES[kind];
  return (
    <span className="badge" style={{ background: s.bg, color: s.color }}>
      {label}
    </span>
  );
}

const SIDEBAR_TOP = [UserSquare, Zap, Database, Mic, HardDrive];
const SIDEBAR_MID = [PhoneCall, BarChart3, FileText];

export default function App() {
  const [rows, setRows] = useState<Scenario[]>(SCENARIOS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastCount, setToastCount] = useState(1);
  const [newRowIds, setNewRowIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const handleComplete = (ideas: Idea[]) => {
    const added = ideas.length ? ideas : [];
    const newRows: Scenario[] = added.map((idea, i) => ({
      id: `gen-${Date.now()}-${i}`,
      name: idea.title,
      type: { label: 'Conversation', kind: 'conversation' },
      description: idea.text,
      expected: { label: 'agent-message', kind: 'agent-message' },
      updated: '16 Jun 2026, 14:08',
    }));
    setRows((prev) => [...newRows, ...prev]);
    setNewRowIds(new Set(newRows.map((r) => r.id)));
    setToastCount(newRows.length);
    setDrawerOpen(false);
    setToast(true);
    setTimeout(() => setNewRowIds(new Set()), 2200);
  };

  const filtered = rows.filter(
    (r) =>
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sb-icon sb-top">
          <ChevronRight size={16} />
        </div>
        {SIDEBAR_TOP.map((Icon, i) => (
          <div className="sb-icon" key={i}>
            <Icon size={18} strokeWidth={1.6} />
          </div>
        ))}
        <div className="sb-divider" />
        <div className="sb-icon active">
          <RadioTower size={18} strokeWidth={1.6} />
        </div>
        <div className="sb-divider" />
        {SIDEBAR_MID.map((Icon, i) => (
          <div className="sb-icon" key={i}>
            <Icon size={18} strokeWidth={1.6} />
          </div>
        ))}
        <div className="sb-spacer" />
        <div className="sb-icon">
          <CreditCard size={18} strokeWidth={1.6} />
        </div>
        <div className="sb-icon">
          <Settings size={18} strokeWidth={1.6} />
        </div>
      </nav>

      {/* Main */}
      <div className="main">
        <div className="panel">
          {/* Top bar */}
          <header className="topbar">
            <div className="breadcrumb">
              <button className="back">
                <ChevronLeft size={18} />
              </button>
              <span className="crumb">Vidhan Test</span>
              <span className="sep">/</span>
              <span className="crumb dim">main</span>
              <span className="live-badge">Live</span>
              <span className="chev">
                <ChevronDown size={14} />
              </span>
            </div>
            <div className="topbar-right">
              <span className="session-id">
                <Copy size={13} />
                1CHtaL47dkM5fb2lklpN
              </span>
              <button className="btn btn-dark">Test</button>
              <button className="btn btn-dark">Replay</button>
              <button className="btn btn-dark">Configuration</button>
              <button className="btn btn-dark disabled">Save</button>
              <button className="btn-icon">
                <MoreVertical size={20} />
              </button>
            </div>
          </header>

          {/* Tabs + actions */}
          <div className="tabs">
            <div className="tabs-left">
              <div className="tab active">Scenarios</div>
              <div className="tab">Run history</div>
            </div>
            <div className="controls-actions">
              <button className="btn-primary" onClick={() => setDrawerOpen(true)}>
                <Wand2 size={16} />
                Generate scenario
              </button>
              <button className="btn-import">
                <Upload size={16} />
                Import CSV
              </button>
              <button className="btn-dark btn">
                <Plus size={16} />
                New scenario
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <div className="search">
              <Search size={16} />
              <input
                placeholder="Search by name, description, or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="filter">
              All types
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-check">
                    <input className="cb" type="checkbox" />
                  </th>
                  <th className="col-name">Name</th>
                  <th className="col-type">Type</th>
                  <th className="col-desc">Description</th>
                  <th className="col-exp">Expected</th>
                  <th className="col-upd">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className={newRowIds.has(r.id) ? 'new-row' : ''}>
                    <td className="col-check">
                      <input className="cb" type="checkbox" />
                    </td>
                    <td className="col-name">{r.name}</td>
                    <td className="col-type">
                      <Badge kind={r.type.kind} label={r.type.label} />
                    </td>
                    <td className="col-desc">
                      <div className="cell-desc">{r.description}</div>
                    </td>
                    <td className="col-exp">
                      {r.expected ? (
                        <Badge kind={r.expected.kind} label={r.expected.label} />
                      ) : null}
                    </td>
                    <td className="col-upd">
                      <span className="cell-upd">{r.updated}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <GenerateDrawer onClose={() => setDrawerOpen(false)} onComplete={handleComplete} />
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <Check className="check" size={20} />
          <div>
            <div className="toast-title">
              <Sparkles className="spark" size={15} />
              {toastCount > 1
                ? `${toastCount} scenarios generated successfully`
                : 'Scenario generated successfully'}
            </div>
            <div className="toast-sub">
              The table is now updated with the new {toastCount > 1 ? 'scenarios' : 'scenario'}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
