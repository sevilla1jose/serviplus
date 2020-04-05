<template>
  <v-app id="sandbox">
    <top-nav :primaryDrawer="primaryDrawer" />
    <navigator-nav :primaryDrawer="primaryDrawer" :items="items" />

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import TopNav from '@/container/TopNav'
import NavigatorNav from '@/container/NavigatorNav'

export default {
  data: () => ({
    primaryDrawer: {
      model: false,
      type: 'default (no property)',
      clipped: true,
      floating: false,
      mini: false
    },
    items: [
      { icon: 'mdi-home', link: '/', text: 'Inicio' },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-folder-open',
        text: 'Maestros',
        click: '',
        model: false,
        children: [
          { icon: 'mdi-home-map-marker', text: 'Ubicación' },
          { icon: 'mdi-server', text: 'Servicios' },
          { icon: 'mdi-dropbox', text: 'Productos' },
          { icon: 'mdi-radio-handheld', text: 'Equipos' },
          { icon: 'mdi-account-switch', text: 'Técnicos' },
          { icon: 'mdi-account-box-outline', text: 'Usuarios' },
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-call-split',
        text: 'Visitas',
        click: '',
        model: false,
        children: [
          { icon: 'mdi-home-assistant', text: 'Estaciones' },
          { icon: 'mdi-vector-polygon', text: 'Rotaciones' }
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-memory',
        text: 'Procesos',
        model: false,
        click: '',
        children: [
          { icon: 'mdi-clipboard-text', text: 'Solicitudes' },
          { icon: 'mdi-account-multiple-plus', text: 'Asignaciones' }
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-chart-bar',
        text: 'Reportes',
        click: '',
        model: false,
        children: [
          { icon: 'mdi-certificate', text: 'Certificados' },
          { icon: 'mdi-qrcode-scan', text: 'QR' },
          { icon: 'mdi-comment-check', text: 'Sugerencias' },
          { icon: 'mdi-alarm-light', text: 'Incidencia' },
        ],
      }
    ],
  }),
  components: {
    TopNav,
    NavigatorNav
  },
}
</script>
