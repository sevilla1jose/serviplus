import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: colors.lightGreen.base,
        secondary: colors.lightGreen.darken2,
        accent: colors.orange.base,
        error: colors.red.base,
        info: colors.cyan.base,
        success: colors.teal.base,
        warning: colors.yellow.accent2
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
