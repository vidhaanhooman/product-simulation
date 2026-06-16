import { useEffect, useState } from 'react';
import { Pencil, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { GENERATED_IDEAS, type Idea } from './data';

type Step = 'thinking' | 'ideas' | 'finalizing';

interface Props {
  onClose: () => void;
  onComplete: (ideas: Idea[]) => void;
}

export default function GenerateDrawer({ onClose, onComplete }: Props) {
  const [step, setStep] = useState<Step>('thinking');
  const [ideas, setIdeas] = useState<Idea[]>(GENERATED_IDEAS);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(GENERATED_IDEAS.map((i) => i.id)),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [traceOpen, setTraceOpen] = useState(false);

  // Step machine: thinking (generating ideas) -> ideas
  useEffect(() => {
    if (step === 'thinking') {
      const t = setTimeout(() => setStep('ideas'), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const startEdit = (idea: Idea) => {
    setEditingId(idea.id);
    setDraft(idea.text);
  };

  const saveEdit = () => {
    setIdeas((prev) =>
      prev.map((i) => (i.id === editingId ? { ...i, text: draft.trim() || i.text } : i)),
    );
    setEditingId(null);
  };

  const removeIdea = (id: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleAdd = () => {
    let toAdd = ideas.filter((i) => selected.has(i.id));
    if (toAdd.length === 0 && editingId) {
      const edited = ideas.find((i) => i.id === editingId);
      if (edited) toAdd = [edited];
    }
    setStep('finalizing');
    setTimeout(() => onComplete(toAdd), 1700);
  };

  const isEditingFlow = editingId !== null;
  const primaryLabel = 'Generate Scenario';

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label="New conversation scenario">
        {/* Header */}
        <div className="drawer-header">
          <div>
            <div className="drawer-title">New conversation scenario</div>
            <div className="drawer-subtitle">
              {step === 'finalizing'
                ? 'Analyzing requirements and preparing scenario suggestions...'
                : "Define the user's situation and what the agent is expected to do"}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {step === 'finalizing' && (
            <div className="center-state">
              <img src="/SVG.svg" className="sparkle" width={48} height={48} alt="" />
              <span className="label">Generating scenario</span>
            </div>
          )}

          {step === 'thinking' && (
            <div className="thinking">
              <div className="thinking-head">
                <span className="thinking-dot" />
                Thinking
              </div>
              <div className="skeleton" style={{ width: '100%' }} />
              <div className="skeleton" style={{ width: '86%' }} />
              <div className="skeleton" style={{ width: '46%' }} />
            </div>
          )}

          {step === 'ideas' && (
            <div style={{ animation: 'fadeIn 0.25s ease' }}>
              <div
                className={`thought-trace ${traceOpen ? 'open' : ''}`}
                onClick={() => setTraceOpen((o) => !o)}
              >
                Thought for a couple of seconds
                <span className="chev">
                  <ChevronRight size={14} />
                </span>
              </div>
              {traceOpen && (
                <div className="thought-detail">
                  Reviewed the agent's purpose and recent conversation patterns, then drafted
                  three distinct customer-support situations that stress different parts of the
                  flow: plan cancellation, delayed delivery, and a damaged-item refund.
                </div>
              )}

              <div className="ideas-head">
                <span className="ideas-title">Generated Ideas</span>
                <span className="ideas-count">{ideas.length} ideas generated</span>
              </div>

              <div className="idea-list">
                {ideas.map((idea) =>
                  editingId === idea.id ? (
                    <div className="idea-card editing" key={idea.id}>
                      <div className="edit-row">
                        <input
                          className="cb"
                          type="checkbox"
                          checked={selected.has(idea.id)}
                          onChange={() => toggle(idea.id)}
                        />
                        <textarea
                          className="idea-textarea"
                          value={draft}
                          autoFocus
                          onChange={(e) => setDraft(e.target.value)}
                        />
                      </div>
                      <div className="edit-actions">
                        <button className="btn-sm btn-ghost" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                        <button className="btn-sm btn-white" onClick={saveEdit}>
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`idea-card ${selected.has(idea.id) ? 'selected' : ''}`}
                      key={idea.id}
                    >
                      <input
                        className="cb"
                        type="checkbox"
                        checked={selected.has(idea.id)}
                        onChange={() => toggle(idea.id)}
                      />
                      <div className="idea-text">{idea.text}</div>
                      <div className="idea-actions">
                        <button className="icon-btn" onClick={() => startEdit(idea)} aria-label="Edit">
                          <Pencil size={16} strokeWidth={1.75} />
                        </button>
                        <button
                          className="icon-btn danger"
                          onClick={() => removeIdea(idea.id)}
                          aria-label="Delete"
                        >
                          <Trash2 size={16} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'ideas' && (
          <div className="drawer-footer">
            <button className="back-link" onClick={onClose}>
              <ChevronLeft size={16} />
              Back
            </button>
            <div className="footer-right">
              <button
                className="btn-add"
                onClick={handleAdd}
                disabled={!isEditingFlow && selected.size === 0}
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
