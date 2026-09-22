import { useEffect, useRef } from 'react';
import { useManualStore } from './store/useManualStore';
import { TopBar } from './components/TopBar';
import { Controls } from './components/Controls';
import { Send, Inbox } from './components/icons';
import { CoverSlide } from './components/slides/CoverSlide';
import { IndexSlide } from './components/slides/IndexSlide';
import { CodesSlide } from './components/slides/CodesSlide';
import { TramitesSlide } from './components/slides/TramitesSlide';
import { FichaSlide } from './components/slides/FichaSlide';
import { FlowSlide } from './components/slides/FlowSlide';
import { RemindersSlide } from './components/slides/RemindersSlide';

function DeckBody() {
  const current = useManualStore((s) => s.current);
  const data = useManualStore((s) => s.data);

  switch (current) {
    case 0:
      return <CoverSlide />;
    case 1:
      return <IndexSlide />;
    case 2:
      return <CodesSlide />;
    case 3:
      return <TramitesSlide />;
    case 4:
      return <FichaSlide />;
    case 5:
      return (
        <FlowSlide
          eyebrow="SECCIÓN 04"
          title="Flujo operativo · Envío de Fichas Registrales"
          lead="Cómo se procesan las Fichas Registrales que Tampa remite, hasta su envío al RENIEC."
          introIcon={<Send width={22} height={22} />}
          intro={
            <>
              <b className="text-ink">Tampa</b> envía con oficio las Fichas Registrales para trámites de DNIs y las{' '}
              <b className="text-ink">rechazadas</b>. El Consulado las verifica, registra y remite al RENIEC.
            </>
          }
          steps={data?.flujoEnvio ?? []}
          rows={data?.filasRegistro ?? []}
        />
      );
    case 6:
      return (
        <FlowSlide
          eyebrow="SECCIÓN 05"
          title="Flujo operativo · Recepción y despacho de DNIs"
          lead="Qué hacer cuando la Cancillería envía los DNIs de Tampa con Hoja de Remisión (HR), hasta su entrega."
          introIcon={<Inbox width={22} height={22} />}
          intro={
            <>
              La <b className="text-ink">Cancillería</b> envía los DNIs para Tampa con{' '}
              <b className="text-ink">Hoja de Remisión (HR)</b>. Sigue estos pasos para recibir, ordenar, archivar y despachar.
            </>
          }
          steps={data?.flujoRecepcion ?? []}
          rows={data?.filasRegistro ?? []}
        />
      );
    case 7:
      return <RemindersSlide />;
    default:
      return null;
  }
}

export default function App() {
  const current = useManualStore((s) => s.current);
  const loading = useManualStore((s) => s.loading);
  const theme = useManualStore((s) => s.theme);
  const loadManual = useManualStore((s) => s.loadManual);
  const next = useManualStore((s) => s.next);
  const prev = useManualStore((s) => s.prev);
  const goTo = useManualStore((s) => s.goTo);
  const total = useManualStore((s) => s.total);

  const deckRef = useRef<HTMLDivElement>(null);

  // Cargar datos del manual (API con respaldo local).
  useEffect(() => {
    loadManual();
  }, [loadManual]);

  // Aplicar tema al <html>.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Reiniciar el scroll al cambiar de diapositiva.
  useEffect(() => {
    deckRef.current?.scrollTo({ top: 0 });
  }, [current]);

  // Navegación por teclado (ignora inputs).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  // Deslizar en pantallas táctiles.
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    let x = 0, y = 0, tracking = false;
    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      x = e.touches[0].clientX; y = e.touches[0].clientY; tracking = true;
    };
    const end = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - x;
      const dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.6) dx < 0 ? next() : prev();
    };
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', end, { passive: true });
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchend', end);
    };
  }, [next, prev]);

  return (
    <>
      <TopBar />
      <main
        ref={deckRef}
        className="slide-scroll fixed inset-x-0 overflow-y-auto overflow-x-hidden"
        style={{ top: 'var(--top)', bottom: 'var(--bottom)' }}
      >
        {loading ? (
          <div className="grid h-full place-items-center font-mono text-sm text-ink-3">Cargando manual…</div>
        ) : (
          <div key={current} className="min-h-full animate-fadeup">
            <DeckBody />
          </div>
        )}
      </main>
      <Controls />
    </>
  );
}
