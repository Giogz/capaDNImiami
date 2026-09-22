import type { ManualData } from '../types';

const FOTO =
  'Fotografía tamaño pasaporte, fondo blanco, sin sonrisa, boca cerrada, sin prendas en la cabeza (salvo motivo religioso) y sin lentes.';
const ACTA =
  'Copia certificada del Acta de Nacimiento expedida por la Oficina Consular, la Municipalidad o la Oficina del RENIEC donde está registrado el nacimiento.';

export const MANUAL: ManualData = {
  meta: {
    actualizado: '21/09/2026',
    presenta: 'Consulado General del Perú en Miami',
    dirigidoA: 'Oficina Regional de Tampa',
  },

  tarifas: [
    { grupo: 'Inscripción', codigo: '69A', descripcion: 'Inscripción de mayores', gratis: false },
    { grupo: 'Inscripción', codigo: '69C', descripcion: 'Inscripción de menores', gratis: false },
    { grupo: 'Inscripción', codigo: '69E', descripcion: 'Inscripción de personas con discapacidad — solo cuando es por primera vez', gratis: true },
    { grupo: 'Duplicados', codigo: '71A', descripcion: 'Duplicado de mayores', gratis: false },
    { grupo: 'Duplicados', codigo: '71C', descripcion: 'Duplicado de menores', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '69B', descripcion: 'Renovación de DNI de mayores y de menor a mayor cuando ya tienen el DNI', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '69B2', descripcion: 'Renovación de DNI de menores (en el SAMI es 69F)', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '71B', descripcion: 'Cambio de Libreta Electoral (LE) a DNI', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '72A.1', descripcion: 'Rectificación de datos', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '72A.2', descripcion: 'Actualización de imagen y/o cambio de firma en DNI de mayores', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '72B', descripcion: 'Rectificación y actualización de imagen en DNI de menores', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '72C', descripcion: 'Actualización de datos o cambio de “declarante” para menores', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '73', descripcion: 'Habilitaciones y cancelaciones de inscripciones', gratis: false },
    { grupo: 'Rectificaciones y otros', codigo: '84', descripcion: 'MC558 — Reintegro RENIEC por diferencia de USD 1.00', gratis: false },
  ],

  tramites: [
    {
      codigo: '69A',
      categoria: 'Cambio de LE',
      titulo: 'Libreta Electoral de 7 dígitos por DNI (inscripción extemporánea)',
      requisitos: [
        { texto: '**No procede como cambio.** La Libreta Electoral de 7 dígitos no puede cambiarse directamente por DNI: el trámite debe realizarse como **inscripción extemporánea** (tarifa 69A).' },
        { texto: ACTA + ' También sirve la copia certificada del Título Peruano Nacido en el Exterior (Migraciones).' },
        { texto: FOTO },
        {
          texto: '**Documentos de sustento adicionales**, si los tuviera:',
          sub: ['Copias de pasaportes anteriores', 'Certificados de estudios', 'Libreta militar', 'Cualquier documento peruano que ayude a validar su identidad'],
        },
      ],
    },
    {
      codigo: '71B',
      categoria: 'Cambio de LE',
      titulo: 'Cambio de Libreta Electoral de 8 dígitos por DNI',
      requisitos: [
        { texto: ACTA },
        { texto: FOTO },
        { texto: 'Documentos de sustento adicionales que ayuden a validar la identidad, si los tuviera.' },
        { texto: 'Se tramita con la **tarifa 71B** (cambio de LE a DNI).' },
      ],
    },
    {
      codigo: '69C',
      categoria: 'Primera vez',
      titulo: 'DNI por primera vez — menores hasta antes de cumplir 17 años',
      requisitos: [
        { texto: ACTA },
        { texto: FOTO },
        { texto: 'La persona que acompaña al menor debe identificarse con su **DNI**; si es extranjera, con documento de identidad válido en el exterior.' },
        { texto: 'Discapacidad (sensorial, física, intelectual o mental):', gratis: 'El trámite es **GRATUITO** con la tarifa 69E.' },
      ],
    },
    {
      codigo: '69A',
      categoria: 'Primera vez',
      titulo: 'DNI por primera vez — de 17 hasta antes de cumplir 20 años',
      requisitos: [
        { texto: ACTA },
        { texto: FOTO },
        { texto: 'Si fue inscrito en un Consulado, adjuntar el **Acta de Nacimiento primigenia**.' },
        {
          texto: 'Nota legal:',
          sub: ['Entre 17 y antes de 18 años pueden obtener el DNI de mayor de edad.', 'Esto no los convierte en mayores ante la ley: no pueden realizar actos civiles ni notariales.'],
        },
      ],
    },
    {
      codigo: '69A',
      categoria: 'Primera vez',
      titulo: 'DNI por primera vez — 20 años o más (inscripción extemporánea)',
      requisitos: [
        { texto: ACTA },
        { texto: FOTO },
        { texto: '**Declaración Jurada de familiares directos** (abuelos, tíos, primos que tengan DNI) — la entrega el Consulado.' },
        { texto: '**Declaración Jurada de no renuncia** a la nacionalidad.' },
        { texto: '**Declaración Jurada de inscripción tardía.**' },
        { texto: 'Declaración jurada escrita del padre o la madre, con **firma y huella**.' },
        { texto: 'Si los padres han fallecido: **acta de defunción**.' },
        { texto: 'Documentos que comprueben el **estado civil** (casado, divorciado o viudo), si es necesario. Las actas deben ser **peruanas**. Para **viudo(a)**: **Acta de Defunción** — peruana si el fallecimiento se registró en el Perú; si el Acta de Defunción es extranjera, debe estar **apostillada**.' },
        { texto: 'Copia del Acta primigenia si fue inscrita en algún consulado.' },
        {
          texto: 'Copia del documento con que se identifica en EE. UU. (Driver License y pasaporte):',
          sub: ['Si nació en el Perú: copia del pasaporte con el que ingresó a EE. UU. Si no lo tiene, declaración jurada de pérdida.', 'Cualquier otro documento peruano que ayude a validar su identidad.'],
        },
      ],
    },
    {
      codigo: '69B2',
      categoria: 'Renovación',
      titulo: 'Renovación de DNI — menores de edad',
      requisitos: [
        { texto: FOTO },
        { texto: 'Documento de identidad **original** del padre, madre o tutor que acompaña (peruanos: DNI; extranjeros: documento de su país o pasaporte).' },
        { texto: 'Para registrar la dirección en el Perú: **recibo de servicios** (luz, agua o teléfono) con antigüedad no mayor a 6 meses.' },
        { texto: 'La dirección en el extranjero es **declarativa**.' },
        { texto: 'Discapacidad: “declaración jurada de asistencia y discapacidad” (la entrega el Consulado). **No se requiere certificado médico.**' },
      ],
    },
    {
      codigo: '69B',
      categoria: 'Renovación',
      titulo: 'Renovación de DNI — mayores de edad',
      requisitos: [
        { texto: FOTO },
        { texto: 'Actualizar el **estado civil** si es necesario: casado, divorciado en el Perú o viudo. Las actas que lo sustentan deben ser **peruanas**. Para **viudo(a)**: **Acta de Defunción** — peruana si el fallecimiento se registró en el Perú; si el Acta de Defunción es extranjera, debe estar **apostillada**.' },
      ],
    },
    {
      codigo: '69B',
      categoria: 'Renovación',
      titulo: 'Cambio de DNI de menor a mayor de edad',
      requisitos: [
        { texto: '**DNI peruano de menor.**' },
        { texto: FOTO },
      ],
    },
    {
      codigo: '71C',
      categoria: 'Duplicado',
      titulo: 'Duplicado de DNI — menores de edad',
      requisitos: [
        { texto: 'El duplicado **solo procede si el DNI está vigente**.' },
        { texto: 'Contiene los **mismos datos** del DNI anterior: no se modifica ningún dato.' },
      ],
    },
    {
      codigo: '71A',
      categoria: 'Duplicado',
      titulo: 'Duplicado de DNI — mayores de edad',
      requisitos: [
        { texto: 'El duplicado **solo procede si el DNI está vigente**.' },
        { texto: 'Contiene los **mismos datos** del DNI anterior: no se modifica ningún dato.' },
      ],
    },
    {
      codigo: '72A.1',
      categoria: 'Rectificación',
      titulo: 'Rectificación de datos en el DNI (domicilio, estado civil, etc.)',
      requisitos: [
        {
          texto: '**Cambio de domicilio:**',
          sub: ['De Perú a EE. UU.: es declarativo, no requiere documentos de sustento.', 'De EE. UU. a Perú: recibo de servicios (luz, agua o teléfono) con antigüedad no mayor a 6 meses.'],
        },
        { texto: '**Cambio de estado civil — Soltero a Casado:** Acta de Matrimonio peruana o, si ya está registrado ante el Estado peruano, una Declaración Jurada con fecha, municipalidad y nombre del cónyuge. El Consulado la expide gratis.' },
        { texto: '**Casado a Divorciado:** Acta de matrimonio peruana con la anotación marginal de disolución del vínculo.' },
        { texto: '**Casado a Viudo:** **Acta de Matrimonio peruana** y **Acta de Defunción** — peruana si el fallecimiento se registró en el Perú; si el Acta de Defunción es extranjera, debe estar **apostillada**.' },
      ],
    },
  ],

  flujoEnvio: [
    { titulo: 'Recepción con oficio', detalle: 'Tampa envía con oficio las **Fichas Registrales** para trámites de DNI y las **rechazadas**.' },
    { titulo: 'Verificación en el SIO', detalle: 'Se verifica cada Ficha Registral en la base de datos del **SIO** por si tiene información adicional en el RENIEC (estado civil, renovación por rectificación, etc.).' },
    { titulo: 'Chequeo de duplicados', detalle: 'Si es **duplicado**, los datos deben coincidir **exactamente** con el último DNI que emitió el RENIEC.' },
    { titulo: 'Registro en base de datos', detalle: 'Cada Ficha Registral se registra en la base de datos con formulario, apellidos, nombres, LE/DNI y fecha.', tabla: true },
    { titulo: 'Acuse de recibo por correo', detalle: 'Se envía un correo al **Cónsul ad honórem de Tampa** (Sr. Juan Carlos Ibarra) acusando recibo de las Fichas y se informa cualquier irregularidad.' },
    { titulo: 'Envío al RENIEC', detalle: 'Las Fichas Registrales se envían al RENIEC con el **“Formato de Envío”**, consignando un número para Tampa.' },
  ],

  filasRegistro: [
    ['98411386', 'GAMARRA', 'LOPEZ', 'GISELLA ELENA', '40485407', '23/03/2022'],
    ['98411444', 'GASCO', 'TAFUR', 'ARON', '09632776', '09/05/2022'],
    ['98411445', 'VALDIVIESO', 'CAMACHO', 'BELEN ALEJANDRA', '77582593', '09/05/2022'],
    ['98411446', 'GUZMAN', 'ROSAS', 'PATRICIA AURA', '06729747', '09/05/2022'],
    ['98411447', 'SANDOVAL', 'MEZA', 'MARIA YOLANDA', '09272694', '09/05/2022'],
    ['98411448', 'AGUILAR', 'NIÑO', 'ABDON ANTONIO', '41052856', '11/05/2022'],
  ],

  flujoRecepcion: [
    { titulo: 'Verificar la HR', detalle: 'Comprobar que en la **Hoja de Remisión** estén los DNIe.' },
    { titulo: 'Firmar la Guía de Despacho', detalle: 'Firmar la Guía de Despacho y separarla para el envío al RENIEC.' },
    { titulo: 'Ordenar alfabéticamente', detalle: 'Los DNIs se ordenan de forma **alfabética**.' },
    { titulo: 'Escanear para archivo digital', detalle: 'Escanear la Hoja de Remisión junto con la Guía de Despacho.' },
    { titulo: 'Enviar a Tampa por correo', detalle: 'Enviar a Tampa por correo electrónico la **HR** y las **Guías de Despacho**.' },
    { titulo: 'Archivar la HR', detalle: 'Archivar la HR con sus anexos en la carpeta **“TAMPA” — Guías de Despacho, Listados de DNIs y DNIe**.' },
    { titulo: 'Registrar “LLEGÓ EL DNI”', detalle: 'Ingresar a la carpeta **“2026 TRÁMITES DNI” / “Tampa”**, libro **“Manuales”**, y registrar **“LLEGÓ EL DNI”**.' },
    { titulo: 'Enviar los DNI a Tampa', detalle: 'Miami remite a la **Oficina de Tampa** los **DNI recepcionados** para su entrega a los connacionales.' },
    { titulo: 'Tampa recepciona y acusa recibo', detalle: 'Tampa **recepciona** los DNI y envía **copia del acuse** de recibo.' },
    { titulo: 'Entrega al connacional', detalle: 'Según lo que decida el connacional: **(a) por correo** — se escanea el DNI con el **sobre** y se envía por correo; **(b) recojo en la oficina de Tampa** — el connacional lo recoge en persona y se conserva **copia del acuse** de los DNI.' },
  ],

  recordatorios: [
    { color: 'ok', icono: 'check', titulo: '69E es gratuito', texto: 'La inscripción de personas con discapacidad es **GRATIS**, pero solo cuando es por primera vez.' },
    { color: 'red', icono: 'sign', titulo: 'No puede firmar', texto: 'Colocar `código 300` en el ítem 11 de la Ficha Registral manual.' },
    { color: 'amber', icono: 'clock', titulo: 'Duplicados', texto: 'Solo proceden si el DNI está **vigente** y no modifican ningún dato del documento anterior.' },
    { color: 'red', icono: 'photo', titulo: 'Foto correcta', texto: 'Fondo blanco, sin sonrisa, boca cerrada, sin lentes y sin prendas en la cabeza (salvo motivo religioso).' },
    { color: 'amber', icono: 'home', titulo: 'Dirección en Perú', texto: 'Requiere **recibo de servicios** (luz, agua o teléfono) con antigüedad no mayor a **6 meses**.' },
    { color: 'red', icono: 'swap', titulo: '69B2 = 69F', texto: 'La renovación de DNI de menores es `69B2`; en el **SAMI** figura como `69F`.' },
  ],
};
