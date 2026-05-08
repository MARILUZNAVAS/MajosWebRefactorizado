import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class FolderPage implements OnInit {
  public folder!: string;
  public contacto = { nombre: '', mensaje: '' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // FUNCIÓN PARA LOS BOTONES DE EXPERIENCIA
  async mostrarInfo(habilidad: string) {
    let mensaje = '';
    if (habilidad === 'Estrategia Digital') {
      mensaje = 'Planificación de campañas 360° y crecimiento de marca digital.';
    } else if (habilidad === 'Diseño UI/UX') {
      mensaje = 'Creación de interfaces modernas, limpias y centradas en el usuario.';
    } else if (habilidad === 'Gestión Multimedia') {
      mensaje = 'Edición de video profesional y contenido audiovisual de alto impacto.';
    }

    const alert = await this.alertController.create({
      header: habilidad,
      message: mensaje,
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  // FUNCIÓN PARA EL FORMULARIO
  async enviarFormulario() {
    if (this.contacto.nombre && this.contacto.mensaje) {
      const alert = await this.alertController.create({
        header: '¡Éxito!',
        message: `Gracias ${this.contacto.nombre}, mensaje enviado a Majos Web.`,
        buttons: ['OK']
      });
      await alert.present();
      this.contacto = { nombre: '', mensaje: '' };
    } else {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Por favor, rellena los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}