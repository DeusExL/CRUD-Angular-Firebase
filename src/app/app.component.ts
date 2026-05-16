import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { Registro } from './models/registro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private firebaseService = inject(FirebaseService);
  private fb = inject(FormBuilder);

  registros$: Observable<Registro[]> | undefined;
  form: FormGroup;
  modoEdicion = false;
  idActual: string | undefined;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registros$ = this.firebaseService.getRegistros();
  }

  guardarRegistro() {
    if (this.form.invalid) return;

    const registro: Registro = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      fecha: Date.now()
    };

    if (this.modoEdicion) {
      registro.id = this.idActual;
      this.firebaseService.updateRegistro(registro);
      this.modoEdicion = false;
    } else {
      this.firebaseService.addRegistro(registro);
    }
    
    this.form.reset();
  }

  editarRegistro(registro: Registro) {
    this.modoEdicion = true;
    this.idActual = registro.id;
    this.form.patchValue({
      nombre: registro.nombre,
      descripcion: registro.descripcion
    });
  }

  eliminarRegistro(id: string | undefined) {
    if (id) {
      this.firebaseService.deleteRegistro(id);
    }
  }
}