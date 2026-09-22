import type { ReactNode } from 'react';
import type { FilaRegistro, Paso } from '../../types';
import { Rich } from '../Rich';
import { SlideShell } from './SlideShell';

const HEADERS = ['Formulario', '1.er Apellido', '2.º Apellido', 'Nombres', 'LE / DNI', 'Fecha'];

function RegistroTable({ rows }: { rows: FilaRegistro[] }) {
  return (
    <div className="mt-3 overflow-auto rounded-lg border border-line">
      <table className="w-full min-w-[520px] border-collapse text-xs">
        <thead>
          <tr>
            {HEADERS.map((h) => (
              <th key={h} className="whitespace-nowrap bg-surface-2 px-2.5 py-2 text-left text-[11px] font-bold tracking-[.3px] text-ink-2 first:font-mono">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={`whitespace-nowrap border-t border-line px-2.5 py-1.5 ${j === 0 ? 'font-mono text-peru' : 'text-ink'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-line bg-surface px-2.5 py-2 font-mono text-[11.5px] text-ink-3">
        Ejemplo de registro de Fichas Registrales
      </div>
    </div>
  );
}

export function FlowSlide({
  eyebrow,
  title,
  lead,
  introIcon,
  intro,
  steps,
  rows,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  introIcon: ReactNode;
  intro: ReactNode;
  steps: Paso[];
  rows: FilaRegistro[];
}) {
  return (
    <SlideShell eyebrow={eyebrow} title={title} lead={lead}>
      <div className="my-5 flex items-center gap-3.5 rounded-2xl border border-line bg-paper px-4 py-4">
        <div className="grid h-[42px] w-[42px] flex-none place-items-center rounded-xl bg-peru-tint text-peru">{introIcon}</div>
        <p className="text-[14.5px] leading-relaxed text-ink-2">{intro}</p>
      </div>

      <div className="relative ml-1.5">
        <span className="absolute left-[17px] top-3.5 bottom-3.5 w-0.5 bg-line" />
        {steps.map((s, i) => (
          <div key={i} className="relative flex gap-[18px] pb-4">
            <div className="z-[1] grid h-9 w-9 flex-none place-items-center rounded-full border-2 border-peru bg-peru font-mono text-sm font-bold text-white">
              {i + 1}
            </div>
            <div className="flex-1 rounded-xl border border-line bg-paper px-4 py-3.5 shadow-soft">
              <h4 className="mb-1 text-[15.5px] font-bold tracking-[-.1px]">{s.titulo}</h4>
              <p className="text-sm leading-relaxed text-ink-2"><Rich text={s.detalle} /></p>
              {s.tabla && <RegistroTable rows={rows} />}
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}
