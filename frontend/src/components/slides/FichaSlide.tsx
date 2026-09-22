import { useState } from 'react';
import { SlideShell } from './SlideShell';
import fichaImg from '../../assets/ficha-registral.png';

// Campo de texto: posición en % sobre la ficha (l=left, t=top, w=width, h=height).
// ex = valor de ejemplo. Ajustar estas cifras mueve el campo sobre la imagen.
type Campo = { id: string; l: number; t: number; w: number; h?: number; ex?: string };
// Casilla para marcar (checkbox / opción). s = tamaño en %.
type Casilla = { id: string; l: number; t: number; s?: number; ex?: boolean };

const H = 1.5; // alto por defecto de una línea de texto

const CAMPOS: Campo[] = [
  // -- Cabecera --
  { id: 'fe_dia', l: 60.0, t: 4.7, w: 4.5, h: 1.4, ex: '23' },
  { id: 'fe_mes', l: 65.0, t: 4.7, w: 4.5, h: 1.4, ex: '03' },
  { id: 'fe_anio', l: 70.0, t: 4.7, w: 6.0, h: 1.4, ex: '2022' },
  { id: 'h_dni', l: 56.5, t: 7.3, w: 18.0, ex: '40485407' },
  { id: 'h_apellidos', l: 58.0, t: 9.6, w: 33.0, h: 1.6, ex: 'GAMARRA LOPEZ' },
  { id: 'h_prenombres', l: 59.0, t: 11.0, w: 32.0, h: 1.6, ex: 'GISELLA ELENA' },

  // -- Columna izquierda --
  { id: 'cod_local', l: 25.0, t: 13.9, w: 17.0, h: 1.4, ex: 'TAMPA' },
  { id: 'n1_dni', l: 25.0, t: 15.35, w: 17.0, h: 1.4, ex: '40485407' },
  { id: 'fr_dia', l: 25.5, t: 16.9, w: 6.5, h: 1.3, ex: '23' },
  { id: 'fr_mes', l: 32.5, t: 16.9, w: 6.5, h: 1.3, ex: '03' },
  { id: 'fr_anio', l: 39.5, t: 16.9, w: 6.5, h: 1.3, ex: '2022' },

  // -- 3. Nombre del titular --
  { id: 't_primer', l: 8.0, t: 20.9, w: 82.0, h: 1.6, ex: 'GAMARRA' },
  { id: 't_segundo', l: 8.0, t: 23.4, w: 82.0, h: 1.6, ex: 'LOPEZ' },
  { id: 't_casada', l: 8.0, t: 25.9, w: 82.0, h: 1.6, ex: '' },
  { id: 't_prenombres', l: 8.0, t: 28.3, w: 82.0, h: 1.6, ex: 'GISELLA ELENA' },

  // -- 4. Lugar de domicilio --
  { id: 'd_depto', l: 28.0, t: 31.4, w: 58.0, h: 1.35, ex: 'AMERICA' },
  { id: 'd_prov', l: 28.0, t: 32.95, w: 58.0, h: 1.35, ex: 'ESTADOS UNIDOS' },
  { id: 'd_dist', l: 28.0, t: 34.5, w: 58.0, h: 1.35, ex: 'FLORIDA' },
  { id: 'd_centro', l: 28.0, t: 36.0, w: 58.0, h: 1.35, ex: 'TAMPA' },

  // -- 5. Dirección --
  { id: 'dir_cp', l: 86.0, t: 39.3, w: 8.0, h: 1.3, ex: '33602' },
  { id: 'dir_l1', l: 8.0, t: 41.3, w: 45.0, h: 1.4, ex: 'AV. KENNEDY' },
  { id: 'dir_num', l: 86.0, t: 41.3, w: 8.0, h: 1.3, ex: '1401' },
  { id: 'dir_block', l: 8.0, t: 43.0, w: 9.0, h: 1.3, ex: '' },
  { id: 'dir_dpto', l: 18.0, t: 43.0, w: 11.0, h: 1.3, ex: '' },
  { id: 'dir_urb', l: 30.0, t: 43.0, w: 38.0, h: 1.3, ex: '' },
  { id: 'dir_etapa', l: 70.0, t: 43.0, w: 6.0, h: 1.3, ex: '' },
  { id: 'dir_mz', l: 77.0, t: 43.0, w: 6.0, h: 1.3, ex: '' },
  { id: 'dir_lote', l: 84.0, t: 43.0, w: 6.0, h: 1.3, ex: '' },

  // -- 7. Grado de instrucción (año) / 8. Estatura --
  { id: 'gi_anio', l: 30.0, t: 51.0, w: 8.0, h: 1.2, ex: '' },
  { id: 'est_m', l: 53.0, t: 47.6, w: 4.0, h: 1.3, ex: '1' },
  { id: 'est_cm', l: 61.0, t: 47.6, w: 4.0, h: 1.3, ex: '65' },

  // -- 10. Documentos adjuntos (N.º) --
  { id: 'da_num2', l: 14.0, t: 57.4, w: 10.0, h: 1.2, ex: '' },

  // -- 11. Observaciones --
  { id: 'obs_cod', l: 86.0, t: 55.6, w: 7.0, h: 1.3, ex: '' },
  { id: 'obs_txt', l: 50.0, t: 57.2, w: 42.0, h: 1.4, ex: '' },

  // -- 14. Fecha de nacimiento --
  { id: 'fn_dia', l: 28.0, t: 65.5, w: 6.0, h: 1.3, ex: '15' },
  { id: 'fn_mes', l: 35.0, t: 65.5, w: 6.0, h: 1.3, ex: '06' },
  { id: 'fn_anio', l: 42.0, t: 65.5, w: 6.0, h: 1.3, ex: '1990' },

  // -- 16. Lugar de nacimiento --
  { id: 'ln_depto', l: 28.0, t: 70.0, w: 58.0, h: 1.35, ex: 'LIMA' },
  { id: 'ln_prov', l: 28.0, t: 71.6, w: 58.0, h: 1.35, ex: 'LIMA' },
  { id: 'ln_dist', l: 28.0, t: 73.2, w: 58.0, h: 1.35, ex: 'MIRAFLORES' },
  { id: 'ln_centro', l: 28.0, t: 74.8, w: 58.0, h: 1.35, ex: '' },

  // -- 17. Nombres de padres --
  { id: 'pa_primer', l: 14.0, t: 78.3, w: 72.0, h: 1.4, ex: 'GAMARRA' },
  { id: 'pa_segundo', l: 14.0, t: 80.0, w: 72.0, h: 1.4, ex: 'RIOS' },
  { id: 'pa_prenombres', l: 14.0, t: 81.6, w: 72.0, h: 1.4, ex: 'JUAN CARLOS' },
  { id: 'ma_primer', l: 14.0, t: 83.6, w: 72.0, h: 1.4, ex: 'LOPEZ' },
  { id: 'ma_segundo', l: 14.0, t: 85.2, w: 72.0, h: 1.4, ex: 'DIAZ' },
  { id: 'ma_prenombres', l: 14.0, t: 86.8, w: 72.0, h: 1.4, ex: 'MARIA ELENA' },

  // -- 18. Cónyuge --
  { id: 'co_primer', l: 14.0, t: 90.0, w: 72.0, h: 1.4, ex: '' },
  { id: 'co_segundo', l: 14.0, t: 91.6, w: 72.0, h: 1.4, ex: '' },
  { id: 'co_prenombres', l: 14.0, t: 93.2, w: 72.0, h: 1.4, ex: '' },

  // -- 19. Transferencia entrega DNI --
  { id: 'tr_cod', l: 58.0, t: 95.3, w: 14.0, h: 1.3, ex: 'TAMPA' },
  { id: 'tr_tel', l: 17.0, t: 96.6, w: 18.0, h: 1.3, ex: '8135551234' },
  { id: 'tr_email', l: 45.0, t: 96.6, w: 42.0, h: 1.3, ex: 'gisella@example.com' },
];

const CASILLAS: Casilla[] = [
  // -- Tipo de trámite --
  { id: 'tt_s1', l: 50.3, t: 14.2, ex: true }, // Inscripción
  { id: 'tt_s2', l: 50.3, t: 15.3 },
  { id: 'tt_s3', l: 50.3, t: 16.4 },
  { id: 'tt_s4', l: 50.3, t: 17.5 },
  { id: 'tt_s5', l: 67.3, t: 14.2 },
  { id: 'tt_s8', l: 67.3, t: 15.3 },
  { id: 'tt_s9', l: 67.3, t: 16.4 },

  // -- 6. Estado civil --
  { id: 'ec_sol', l: 5.5, t: 47.6, ex: true },
  { id: 'ec_cas', l: 5.5, t: 48.8 },
  { id: 'ec_viu', l: 5.5, t: 50.0 },
  { id: 'ec_div', l: 5.5, t: 51.2 },

  // -- 7. Grado de instrucción --
  { id: 'gi_pri', l: 25.7, t: 47.6 },
  { id: 'gi_sec', l: 25.7, t: 48.8 },
  { id: 'gi_sup', l: 25.7, t: 50.0, ex: true },
  { id: 'gi_ile', l: 38.7, t: 47.6 },
  { id: 'gi_tec', l: 38.7, t: 48.8 },
  { id: 'gi_esp', l: 38.7, t: 50.0 },

  // -- 9. Género --
  { id: 'ge_m', l: 72.8, t: 47.6 },
  { id: 'ge_f', l: 79.8, t: 47.6, ex: true },

  // -- Discapacidad / Interdicción --
  { id: 'disc_no', l: 91.0, t: 49.3, ex: true },
  { id: 'inter_no', l: 91.0, t: 52.2, ex: true },

  // -- 10. Documentos adjuntos --
  { id: 'da1', l: 5.0, t: 55.0 },
  { id: 'da2', l: 5.0, t: 56.9, ex: true }, // Acta de Nacimiento
  { id: 'da3', l: 5.0, t: 59.2 },
  { id: 'da4', l: 5.0, t: 60.3 },
  { id: 'da5', l: 5.0, t: 61.4 },
  { id: 'da6', l: 5.0, t: 62.5 },
  { id: 'da7', l: 34.0, t: 55.0 },
  { id: 'da8', l: 34.0, t: 56.1 },
  { id: 'da9', l: 40.0, t: 57.8 },
  { id: 'da10', l: 40.0, t: 58.9 },
  { id: 'da11', l: 40.0, t: 60.0 },
  { id: 'da12', l: 40.0, t: 61.1 },
  { id: 'da13', l: 40.0, t: 62.7 },

  // -- 13. Acepta donar órganos --
  { id: 'don_si', l: 57.5, t: 64.3, ex: true },
  { id: 'don_no', l: 68.0, t: 64.3 },

  // -- 15. Grupo sanguíneo / Factor RH --
  { id: 'gs_a', l: 52.8, t: 66.9 },
  { id: 'gs_b', l: 57.8, t: 66.9 },
  { id: 'gs_o', l: 62.8, t: 66.9, ex: true },
  { id: 'gs_ab', l: 67.8, t: 66.9 },
  { id: 'rh_pos', l: 83.0, t: 66.9, ex: true },
  { id: 'rh_neg', l: 89.0, t: 66.9 },
];

export function FichaSlide() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [highlight, setHighlight] = useState(true);

  const set = (id: string, v: string) => setValues((s) => ({ ...s, [id]: v }));
  const toggle = (id: string) => setChecks((s) => ({ ...s, [id]: !s[id] }));

  const llenarEjemplo = () => {
    const v: Record<string, string> = {};
    CAMPOS.forEach((c) => { if (c.ex) v[c.id] = c.ex; });
    const k: Record<string, boolean> = {};
    CASILLAS.forEach((c) => { if (c.ex) k[c.id] = true; });
    setValues(v);
    setChecks(k);
  };
  const limpiar = () => { setValues({}); setChecks({}); };

  // Evita que el gesto de deslizar del deck se dispare al usar la ficha.
  const stop = (e: React.TouchEvent) => e.stopPropagation();

  return (
    <SlideShell
      eyebrow="SECCIÓN 03"
      title="Ficha Registral (ejemplo interactivo)"
      lead="Así se ve y se llena la Ficha Registral del RENIEC. Escribe directamente sobre el formulario para ver qué va en cada campo. Usa «Llenar ejemplo» para ver un caso completo o «Limpiar» para practicar."
    >
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <button
          onClick={llenarEjemplo}
          className="rounded-full bg-peru px-4 py-2 text-sm font-semibold text-white transition hover:bg-peru-deep"
        >
          Llenar ejemplo
        </button>
        <button
          onClick={limpiar}
          className="rounded-full border border-line-2 px-4 py-2 text-sm font-semibold text-ink-2 transition hover:border-peru hover:text-peru"
        >
          Limpiar
        </button>
        <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={highlight}
            onChange={(e) => setHighlight(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--red)]"
          />
          Resaltar campos
        </label>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
        Ejemplo cargado: inscripción de <b className="text-ink-2">GAMARRA LOPEZ, Gisella Elena</b> (DNI 40485407).
        En pantallas pequeñas, desliza la ficha horizontalmente para ver todo el ancho.
      </p>

      <div
        className="mt-4 overflow-x-auto pb-3"
        onTouchStart={stop}
        onTouchMove={stop}
        onTouchEnd={stop}
      >
        <div className="ficha-sheet">
          <img src={fichaImg} alt="Ficha Registral del RENIEC" />
          <div className="ficha-overlay">
            {CAMPOS.map((c) => (
              <input
                key={c.id}
                value={values[c.id] ?? ''}
                onChange={(e) => set(c.id, e.target.value)}
                className={highlight ? 'ff hl' : 'ff'}
                style={{
                  left: `${c.l}%`,
                  top: `${c.t}%`,
                  width: `${c.w}%`,
                  height: `${c.h ?? H}%`,
                }}
                spellCheck={false}
                autoComplete="off"
              />
            ))}
            {CASILLAS.map((c) => {
              const s = c.s ?? 1.7;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  className={highlight ? 'fc hl' : 'fc'}
                  style={{
                    left: `${c.l}%`,
                    top: `${c.t}%`,
                    width: `${s}%`,
                    height: `${s}%`,
                    fontSize: `${s * 0.95}cqw`,
                  }}
                  aria-pressed={!!checks[c.id]}
                >
                  {checks[c.id] ? '✕' : ''}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-[62ch] text-[13px] leading-relaxed text-ink-3">
        Nota: es una recreación de la cara frontal (datos) de la Ficha Registral, para capacitación.
        La segunda cara (fórmula dactiloscópica y huellas) no es de llenado de datos, por eso no se incluye.
      </p>
    </SlideShell>
  );
}
