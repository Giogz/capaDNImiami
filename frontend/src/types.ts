// Tipos de dominio del Manual Operativo de DNI.
// El texto admite marcadores ligeros: **negrita** y `código`.

export interface Tarifa {
  grupo: 'Inscripción' | 'Duplicados' | 'Rectificaciones y otros';
  codigo: string;
  descripcion: string;
  gratis: boolean;
}

export interface Requisito {
  texto: string;
  sub?: string[];
  gratis?: string; // texto del recuadro verde "GRATIS", si aplica
}

export interface Tramite {
  codigo: string;
  categoria: 'Cambio de LE' | 'Primera vez' | 'Renovación' | 'Duplicado' | 'Rectificación';
  titulo: string;
  requisitos: Requisito[];
}

export interface Paso {
  titulo: string;
  detalle: string;
  tabla?: boolean; // muestra la tabla de ejemplo de Fichas Registrales
}

export type IconoRecordatorio = 'check' | 'sign' | 'clock' | 'photo' | 'home' | 'swap';
export type ColorRecordatorio = 'red' | 'ok' | 'amber';

export interface Recordatorio {
  color: ColorRecordatorio;
  icono: IconoRecordatorio;
  titulo: string;
  texto: string;
}

export type FilaRegistro = [string, string, string, string, string, string];

export interface ManualData {
  meta: {
    actualizado: string;
    presenta: string;
    dirigidoA: string;
  };
  tarifas: Tarifa[];
  tramites: Tramite[];
  flujoEnvio: Paso[];
  flujoRecepcion: Paso[];
  filasRegistro: FilaRegistro[];
  recordatorios: Recordatorio[];
}
