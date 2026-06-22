import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';

interface Proyecto {
  id: number;
  titulo: string;
  categoria: 'web' | 'diseño';
  descripcion: string;
  icono: string;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule]
})
export class FolderPage implements OnInit {
  public folder!: string;
  public contactoForm!: FormGroup;
  public darkMode: boolean = true;
  
  // Datos del portafolio interactivo
  public filtroSeleccionado: string = 'todos';
  public proyectos: Proyecto[] = [
    { id: 1, titulo: 'SIGEAN', categoria: 'web', descripcion: 'Sistema modular para la gestión integral de centros educativos en tiempo real utilizando Laravel y TypeScript.', icono: 'code-working-outline' },
    { id: 2, titulo: 'Mis Primeros 50 Animales', categoria: 'diseño', descripcion: 'Diseño editorial completo, maquetación artística e ilustraciones vectoriales para publicación infantil en Amazon KDP.', icono: 'book-outline' },
    { id: 3, titulo: 'Campaña Panamericano FISU Chess', categoria: 'diseño', descripcion: 'Identidad corporativa 360°, diseño de indumentaria deportiva y gestión multimedia para eventos universitarios internacionales.', icono: 'trophy-outline' }
  ];
  public proyectosFiltrados: Proyecto[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
    this.proyectosFiltrados = this.proyectos;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // INTERRUPTOR DE MODO OSCURO Y CLARO NATIVO
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('light-theme', !this.darkMode);
  }

  // FILTRADO DINÁMICO DE PROYECTOS
  cambiarFiltro(event: any) {
    this.filtroSeleccionado = event.detail.value;
    if (this.filtroSeleccionado === 'todos') {
      this.proyectosFiltrados = this.proyectos;
    } else {
      this.proyectosFiltrados = this.proyectos.filter(p => p.categoria === this.filtroSeleccionado);
    }
  }

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

  // ENVIAR FORMULARIO + REDIRECCIÓN INTELIGENTE A WHATSAPP
  async enviarFormulario() {
    if (this.contactoForm.valid) {
      const datos = this.contactoForm.value;
      
      // Construir el texto codificado para la API de WhatsApp
      const mensajeWhatsApp = `¡Hola Mariluz! Mi nombre es *${datos.nombre}* (${datos.email}). Me pongo en contacto desde la app Majos Web para coordinar un proyecto. Mi idea es: ${datos.mensaje}`;
      const urlUrlEncoded = encodeURIComponent(mensajeWhatsApp);
      const enlaceWhatsAppFinal = `https://wa.me/584241878038?text=${urlUrlEncoded}`;

      const toast = await this.toastController.create({
        message: `¡Todo listo ${datos.nombre}! Conectando con tu WhatsApp...`,
        duration: 3000,
        color: 'success',
        position: 'bottom',
        animated: true
      });
      await toast.present();
      
      // Abrir WhatsApp en pestaña nueva de inmediato
      window.open(enlaceWhatsAppFinal, '_blank');
      
      this.contactoForm.reset();
    }
  }
}