<template>
  <v-app id="sandbox">
    <top-nav />

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import TopNav from '@/container/TopNav'

export default {
  data: () => ({
    primaryDrawer: {
      model: false,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false
    }
  }),
  components: {
    TopNav
  },
}
</script>
