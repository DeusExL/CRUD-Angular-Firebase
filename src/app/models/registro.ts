export interface Registro {
  id?: string; // Es opcional porque Firebase lo genera al crear
  nombre: string;
  descripcion: string;
  fecha: number;
}