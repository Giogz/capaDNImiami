import { useMemo } from 'react';
import { useManualStore } from '../../store/useManualStore';
import type { Tarifa } from '../../types';
import { Search, Warn } from '../icons';
import { SlideShell } from './SlideShell';

export function CodesSlide() {
  const tarifas = useManualStore((s) => s.data?.tarifas ?? []);
  const query = useManualStore((s) => s.codeQuery);
  const setQuery = useManualStore((s) => s.setCodeQuery);

  const { groups, shown } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = tarifas.filter((t) =>
      !q || `${t.codigo} ${t.descripcion} ${t.grupo}`.toLowerCase().includes(q),
    );
    const map = new Map<string, Tarifa[]>();
    for (const t of filtered) {
      if (!map.has(t.grupo)) map.set(t.grupo, []);
      map.get(t.grupo)!.push(t);
    }
    return { groups: [...map.entries()], shown: filtered.length };
  }, [tarifas, query]);

  return (
    <SlideShell eyebrow="SECCIÓN 01" title="Códigos de trámite"
      lead="Cada gestión de DNI tiene una tarifa. Busca por código o por descripción para ubicar la que necesitas.">
      <div className="sticky top-0 z-[5] my-4 flex flex-wrap items-center gap-2.5 bg-gradient-to-b from-surface to-transparent py-2.5">
        <label className="flex h-11 flex-1 min-w-[220px] items-center gap-2.5 rounded-xl border border-line bg-paper px-3 focus-within:border-peru focus-within:ring-2 focus-within:ring-peru-tint">
          <Search width={18} height={18} className="text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar código o trámite… (ej. 69A, duplicado)"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink-3"
          />
        </label>
        <span className="ml-auto font-mono text-[12.5px] text-ink-3">{shown} de {tarifas.length} códigos</span>
      </div>

      {shown === 0 ? (
        <div className="py-10 text-center font-mono text-sm text-ink-3">Sin resultados para “{query}”</div>
      ) : (
        groups.map(([grupo, filas]) => (
          <div key={grupo} className="mb-5">
            <div className="mb-2.5 flex items-center gap-2.5 text-[13px] font-bold tracking-[.4px] text-ink-2">
              <span className="h-2 w-2 rounded-full bg-peru" /> {grupo}
            </div>
            {filas.map((t) => (
              <div key={t.codigo + t.descripcion}
                className="mb-2 grid grid-cols-[88px_1fr] items-center gap-3.5 rounded-xl border border-line bg-paper px-4 py-3 transition hover:border-line-2 hover:shadow-soft sm:grid-cols-[88px_1fr]">
                <div className={`rounded-md py-1.5 text-center font-mono text-[15px] font-bold tracking-[.5px] ${t.gratis ? 'bg-ok-tint text-ok' : 'bg-peru-tint text-peru'}`}>
                  {t.codigo}
                </div>
                <div className="text-[14.5px] leading-snug">
                  {t.descripcion}
                  {t.gratis && (
                    <span className="ml-2 inline-block rounded-full border badge-ok bg-ok-tint px-2.5 py-0.5 text-[10.5px] font-bold tracking-[.4px] text-ok">
                      GRATIS
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      <div className="mt-2.5 flex items-start gap-3 rounded-xl border note-amber bg-amber-tint px-4 py-3.5">
        <Warn width={20} height={20} className="mt-0.5 flex-none text-amber" />
        <p className="text-sm leading-relaxed text-ink">
          Si el connacional <b className="text-amber">no puede firmar</b>, colocar el <b className="text-amber">código 300</b> en el ítem 11 de la Ficha Registral manual.
        </p>
      </div>
    </SlideShell>
  );
}
