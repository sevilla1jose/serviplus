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
        primary: colors.blue.base,
        secondary: colors.blue.darken2,
        accent: colors.deepOrange.base,
        error: colors.red.base,
        info: colors.blueGrey.base,
        success: colors.green.base,
        warning: colors.yellow.base
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
