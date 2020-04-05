<template>
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
    <v-menu
      bottom
      origin="bottom center"
      transition="slide-x-transition"
      offset-y >
      <template v-slot:activator="{ on }">
        <v-btn
          class="mr-1 ml-1"
          icon
          v-on="on"
          large >
          
          <v-avatar size="40px" item>
            <v-img
              src="https://photos.bandsintown.com/thumb/8843198.jpeg"
              alt="Vuetify" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/app/account/profile">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/app/account/help">
          <v-list-item-action>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ayuda</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/app/account/setting">
          <v-list-item-action>
            <v-icon>mdi-account-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Configuraciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    primaryDrawer: Object
  },
  methods: {
    ...mapActions(['signOut']),
    logout() {
      this.signOut().then(() => {
        this.$router.push('/sesion/login')
      })
    }
  },
}
</script>
