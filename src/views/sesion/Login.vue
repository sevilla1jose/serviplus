<template>
  <v-app :style="cssProps" class="intro">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mt-1" elevation="3" outlined>
              <v-card-text>
                <div class="mt-2 mb-4" align="center" justify="center">
                  <v-img src="@/assets/img/logo.png" max-width="250" />
                </div>
                <div class="p-0 m-0" align="center" justify="center">
                  <p><span class="title font-weight-black">Iniciar Sesi&oacute;n</span></p>
                </div>
                <div>
                  <v-form>
                    <v-text-field
                      label="Correo Electronico"
                      v-model="formulario.email"
                      :error-messages="erroresEmail"
                      @blur="$v.formulario.email.$touch()"
                      :append-icon="'mdi-email'"
                      color="primary"
                      outlined />

                    <v-text-field
                      label="Contraseña"
                      v-model="formulario.password"
                      :error-messages="erroresPassword"
                      @blur="$v.formulario.password.$touch()"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      color="primary"
                      outlined />

                  </v-form>
                </div>
                <div>
                  <router-link class="link" to="/sesion/forgot-password">
                    <p align="left" class="font-weight-black accent--text">
                      ¿Has olvidado la Contrase&ntilde;a?
                    </p>
                  </router-link>
                </div>
                <div align="end">
                  <v-btn
                    :disabled="$v.formulario.$invalid"
                    @click="ingresar()"
                    secondary
                    depressed
                    color="accent">
                      Ingresar
                  </v-btn>
                </div>
                <div align="center" class="mt-4 mb-2">
                  <v-row>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-btn 
                        depressed
                        block
                        color="#0062b3"
                        dark>
                        <v-icon dark left>mdi-facebook</v-icon>
                        Facebook
                      </v-btn>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-btn
                        depressed
                        block
                        color="#ea4335"
                        dark>
                        <v-icon dark left>mdi-google-plus</v-icon>
                        Google
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <div>
                  <v-row>
                    <v-col class="mt-0" cols="12" align="center">
                      <v-divider class="mt-0 mb-0"></v-divider>
                      <p class="font-weight-regular">
                        ¿No tienes una cuenta?
                        <router-link class="link" to="/sesion/sign-in">
                          <span class="font-weight-black accent--text"> Reg&iacute;strate</span>
                        </router-link>
                      </p>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<style>
  .link {
    text-decoration: none;
  }
  .intro {
    width: 100%;
  }
</style>

<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import { async } from 'q'

export default {
  data() {
    return {
      show: false,
      formulario: {
        password: '',
        email: '',
      },
      cssProps: {
        backgroundImage: `url(${require('@/assets/img/background1.jpg')})`,
        backgroundPosition: ("0px", "center"),
        backgroundRepeat: "no-repeat"
      }
    }
  },
  validations: {
    formulario: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    async ingresar() {
      if (this.$v.formulario.$invalid)
        { return }
        
      await this.login({ email: this.formulario.email, password: this.formulario.password })
    },
    async ingresarFacebook () {

    },
    async ingresarGmail () {

    }
  },
  computed: {
    ...mapGetters(['currentUser', 'processing', 'error']),
    erroresEmail() {
      let errores = []
      if (!this.$v.formulario.email.$dirty) { return errores }
      if (!this.$v.formulario.email.required) { errores.push('Ingrese su Correo Electrónico.') }
      if (!this.$v.formulario.email.email) { errores.push('Ingrese un Correo Electrónico Válido.') }
      return errores
    },
    erroresPassword() {
      let errores = []
      if (!this.$v.formulario.password.$dirty) { return errores }
      if (!this.$v.formulario.password.required) { errores.push('Ingrese su Contraseña.') }
      if (!this.$v.formulario.password.minLength) { errores.push('Ingrese al menos 6 caracteres.') }
      if (!this.$v.formulario.password.maxLength) { errores.push('Ingrese maximo 15 caracteres.') }
      return errores
    }
  },
  watch: {
    currentUser (val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push('/')
        }, 500)
      }
    },
    processing (val) {

    },
    error (val) {
      switch (val.code) {
        case 'auth/invalid-email':
          alert('Correo electronico es invalido.')
          break
        case 'auth/user-not-found':
          alert('Correo electronico no esta registrado.')
          break
        case 'auth/wrong-password':
          alert('Contrasena es incorrecta.')
          break
        default:
          alert('Ocurrio un error.')
          break
      }
    }
  },
}
</script>
