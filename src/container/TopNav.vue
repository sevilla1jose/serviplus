<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      fixed
      color="grey lighten-4"
      app >

      <v-list dense>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4" />
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.link">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :to="item.link" :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
      
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      color="primary"
      dark
      app>

      <v-btn icon large @click.stop="primaryDrawer.model = !primaryDrawer.model">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-btn to="/" text="true">
        <v-toolbar-title>
          <span class="title">CPICSA</span>
        </v-toolbar-title>
      </v-btn>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon to="/">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn to="/app/account/profile"
        class="mr-1 ml-1"
        icon
        large >
        <v-avatar size="40px" item>
          <v-img
            src="https://photos.bandsintown.com/thumb/8843198.jpeg"
            alt="Vuetify" />
        </v-avatar>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<style>
  .toolbar-title {
    color: inherit;
    text-decoration: inherit;
  }
</style>

<script>
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
        model: false,
        children: [
          { icon: 'mdi-home-map-marker', text: 'Ubicación' },
          { icon: 'mdi-server', text: 'Tipos de Servicios' },
          { icon: 'mdi-ornament-variant', text: 'Productos' },
          { icon: 'mdi-radio-handheld', text: 'Equipos' },
          { icon: 'mdi-account-switch', text: 'Técnicos' },
          { icon: 'mdi-account-box-outline', text: 'Usuarios' },
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-call-split',
        text: 'Visitas',
        model: false,
        children: [
          { icon: 'mdi-home-assistant', text: 'Estaciones' },
          { icon: 'mdi-vector-polygon', text: 'Rotaciones' }
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-memory',
        text: 'Procesos',
        model: false,
        children: [
          { icon: 'mdi-book-variant', text: 'Orden de Servicio' },
          { icon: 'mdi-gas-cylinder', text: 'Asignación de Productos' },
          { icon: 'mdi-ornament-variant', text: 'Asignación de Equipos' },
          { icon: 'mdi-account-switch', text: 'Asignación de Técnicos' },
        ],
      },
      { icon: 'mdi-chevron-up', 'icon-alt': 'mdi-chart-bar',
        text: 'Reportes',
        model: false,
        children: [
          { icon: 'mdi-certificate', text: 'Certificados' },
          { icon: 'mdi-qrcode-scan', text: 'QR' },
          { icon: 'mdi-comment-check', text: 'Recomendaciones' },
          { icon: 'mdi-alarm-light', text: 'Incidencia' },
        ],
      },
      { divider: true },
      { icon: 'mdi-information-variant', link: '/', text: 'Ayuda' },
      { icon: 'mdi-account-settings', link: '/app/account/setting', text: 'Configuración' },
      { icon: 'mdi-exit-to-app', link: '', text: 'Cerrar Sesión' }
    ],
  }),
}
</script>
