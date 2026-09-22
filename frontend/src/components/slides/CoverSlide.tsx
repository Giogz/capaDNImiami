import { useManualStore } from '../../store/useManualStore';
import { ArrowRight } from '../icons';

export function CoverSlide() {
  const goTo = useManualStore((s) => s.goTo);
  const meta = useManualStore((s) => s.data?.meta);

  return (
    <div className="min-h-full grid lg:grid-cols-[1.15fr_.85fr]">
      {/* Columna izquierda */}
      <div className="relative flex flex-col justify-center bg-paper px-6 py-10 sm:px-12 sm:py-16">
        <span className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-peru to-peru-deep" />
        <p className="font-mono text-[12.5px] font-bold tracking-[1.4px] text-peru">MANUAL OPERATIVO</p>
        <p className="mt-1.5 text-[14.5px] font-semibold text-ink-2">{meta?.presenta ?? 'Consulado General del Perú en Miami'}</p>

        <h1 className="font-display font-semibold leading-none tracking-[-1px] text-[clamp(34px,6vw,62px)] mt-6 mb-1">
          Trámites de<br />
          <em className="not-italic text-peru italic">DNI</em>
        </h1>
        <p className="text-[clamp(16px,2.4vw,20px)] font-semibold text-ink mt-3">
          Guía de referencia para la {meta?.dirigidoA ?? 'Oficina Regional de Tampa'}
        </p>
        <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-2">
          Códigos de trámite, requisitos por tipo de gestión y el flujo operativo completo entre Tampa, el Consulado, la
          Cancillería y el RENIEC — en un solo lugar, fácil de consultar.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-[12.5px] text-ink-3">
          <span><b className="text-ink-2 font-semibold">Presenta:</b> Consulado de Miami</span>
          <span><b className="text-ink-2 font-semibold">Dirigido a:</b> Oficina de Tampa</span>
          <span><b className="text-ink-2 font-semibold">Actualizado:</b> {meta?.actualizado ?? '—'}</span>
        </div>

        <button
          onClick={() => goTo(1)}
          className="mt-8 self-start inline-flex items-center gap-2.5 rounded-xl bg-peru px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_22px_rgba(200,16,46,.4)] transition hover:-translate-y-0.5"
        >
          Comenzar <ArrowRight width={18} height={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Columna derecha: tarjeta DNI estilizada */}
      <div className="relative hidden lg:grid place-items-center overflow-hidden border-l border-line px-8 py-10 bg-surface [background-image:repeating-linear-gradient(135deg,var(--surface-2)_0_2px,transparent_2px_22px)]">
        <div className="w-[min(340px,82%)] aspect-[1.586/1] overflow-hidden rounded-2xl border border-line bg-paper shadow-lg2 -rotate-6 animate-floaty">
          <div className="flex h-[34%] items-center justify-between bg-gradient-to-br from-peru to-peru-deep px-4 text-white">
            <div className="text-[9px] font-semibold leading-tight opacity-90">REPÚBLICA<br />DEL PERÚ</div>
            <div className="font-display text-lg font-bold tracking-[1px]">DNI</div>
          </div>
          <div className="flex gap-3 px-4 py-3.5">
            <div className="h-[70px] w-[58px] flex-none rounded-md border border-line [background:repeating-linear-gradient(135deg,var(--surface-2)_0_6px,var(--surface)_6px_12px)]" />
            <div className="flex flex-1 flex-col gap-2.5 pt-1">
              <i className="block h-[7px] w-[78%] rounded bg-surface-2" />
              <i className="block h-[7px] w-[56%] rounded bg-surface-2" />
              <i className="block h-[7px] w-[66%] rounded bg-surface-2" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex h-5 items-center overflow-hidden whitespace-nowrap border-t border-dashed border-line-2 bg-surface px-3 font-mono text-[8px] tracking-[1px] text-ink-3">
            IDPER&lt;&lt;CONSULADO&lt;MIAMI&lt;&lt;TAMPA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          </div>
        </div>
        <div className="absolute bottom-6 font-mono text-[11px] tracking-[.5px] text-ink-3">Documento Nacional de Identidad</div>
      </div>
    </div>
  );
}
