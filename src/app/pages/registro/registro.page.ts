import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonNote,
  IonTitle, IonToolbar, IonButtons
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';

function noFutureDate(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const today = new Date();
  const max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return String(control.value) > max ? { fechaFutura: true } : null;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IonButton, IonContent, IonHeader, IonInput, IonItem, IonNote, IonTitle, IonToolbar, IonButtons]
})
export class RegistroPage {
  isSubmitting = signal(false);
  modoOscuro = signal(false);
  readonly hoy = this.obtenerFechaLocal();
  datosEnviados: { nombre: string; email: string; fechaNacimiento: string } | null = null;

  registroForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    fechaNacimiento: ['', [Validators.required, noFutureDate]]
  });

  constructor(private fb: FormBuilder, private alertController: AlertController) {}

  get f() { return this.registroForm.controls; }

  private obtenerFechaLocal(): string {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  async onSubmit(): Promise<void> {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    try {
      const valores = this.registroForm.getRawValue();
      this.datosEnviados = {
        nombre: valores.nombre ?? '',
        email: valores.email ?? '',
        fechaNacimiento: valores.fechaNacimiento ?? ''
      };

      const alert = await this.alertController.create({
        header: 'Registro correcto',
        message: 'El formulario se ha enviado correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.registroForm.reset();
    } catch {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se ha podido completar el envío.',
        buttons: ['Aceptar']
      });
      await alert.present();
    } finally {
      this.isSubmitting.set(false);
    }
  }


alternarModoOscuro(): void {
  this.modoOscuro.update(value => !value);

  document.body.classList.toggle(
    'ion-palette-dark',
    this.modoOscuro()
  );
}


  descargarPDF(): void {
    if (!this.datosEnviados) return;
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text('Datos del registro', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Nombre: ${this.datosEnviados.nombre}`, 20, 40);
    pdf.text(`Email: ${this.datosEnviados.email}`, 20, 50);
    pdf.text(`Fecha de nacimiento: ${this.datosEnviados.fechaNacimiento}`, 20, 60);
    pdf.save('registro.pdf');
  }
}
