import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUsuarioFirestoreService {
  private collectionName = 'usuarios';

  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  // Método para agregar un nuevo usuario
  addUsuario(usuario: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(usuario);
  }

  // Método para actualizar un usuario existente
  updateUsuario(id: string, usuario: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(usuario);
  }

  // Método para eliminar un usuario
  deleteUsuario(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}