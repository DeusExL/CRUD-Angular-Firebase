import { Injectable, inject } from '@angular/core';
// 1. Agregamos 'query' a la lista de importaciones
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore);

  private registrosRef = collection(this.firestore, 'registros');

  // 2. Envolvemos this.registrosRef en la función query()
  public registros$: Observable<Registro[]> = collectionData(query(this.registrosRef), { idField: 'id' }) as Observable<Registro[]>;

  // Leer (Read)
  getRegistros(): Observable<Registro[]> {
    return this.registros$;
  }

  // Crear (Create)
  addRegistro(registro: Registro) {
    return addDoc(this.registrosRef, registro);
  }

  // Actualizar (Update)
  updateRegistro(registro: Registro) {
    const docRef = doc(this.firestore, `registros/${registro.id}`);
    return updateDoc(docRef, { ...registro });
  }

  // Eliminar (Delete)
  deleteRegistro(id: string) {
    const docRef = doc(this.firestore, `registros/${id}`);
    return deleteDoc(docRef);
  }
}