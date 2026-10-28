import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import {
  IonButton, IonContent, IonHeader, IonInput, IonItem, IonNote, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-driven',
  standalone: true,
  templateUrl: './driven.page.html',
  styleUrls: ['./driven.page.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonButton, IonContent, IonHeader, IonInput, IonItem, IonNote, IonTitle, IonToolbar]
})
export class DrivenPage {
  readonly hoy = this.obtenerFechaLocal();
  nombre = '';
  email = '';
  password = '';
  fechaNacimiento = '';
  fechaFuturaError = false;
  enviado = false;

  constructor(private alertController: AlertController) {}

  private obtenerFechaLocal(): string {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  async onSubmit(form: NgForm): Promise<void> {
    this.fechaFuturaError = Boolean(this.fechaNacimiento && this.fechaNacimiento > this.hoy);
    if (form.invalid || this.fechaFuturaError) {
      form.control.markAllAsTouched();
      return;
    }

    // La contraseña no se registra ni se incluye en la confirmación.
    this.enviado = true;
    const alert = await this.alertController.create({
      header: 'Registro correcto',
      message: 'El formulario Template-Driven se ha enviado correctamente.',
      buttons: ['Aceptar']
    });
    await alert.present();
    form.resetForm();
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.fechaNacimiento = '';
  }
}
