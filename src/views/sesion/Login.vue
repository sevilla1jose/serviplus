<template>
  <v-app :style="cssProps" class="intro">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" elevation="3" outlined>
              <v-card-text>
                <div align="center" justify="center">
                  <p><span class="headline font-weight-black">Iniciar Sesi&oacute;n</span></p>
                  <v-divider class="mt-0 mb-3"></v-divider>
                </div>
                <div>
                  <v-form>
                    <v-text-field
                      label="Correo Electronico"
                      v-model="formulario.email"
                      :error-messages="erroresEmail"
                      @blur="$v.formulario.email.$touch()"
                      :append-icon="'mdi-email'"
                      color="accent"
                      outlined />

                    <v-text-field
                      label="Contraseña"
                      v-model="formulario.password"
                      :error-messages="erroresPassword"
                      @blur="$v.formulario.password.$touch()"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      color="accent"
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
                <div align="end">
                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-btn 
                        depressed
                        width="140px"
                        class="mt-3 mb-2 me-2"
                        color="#0062b3"
                        dark>
                        <v-icon dark left>mdi-facebook</v-icon>
                        Facebook
                      </v-btn>
                    </v-col>
                    <v-col cols="6" sm="6">
                      <v-btn
                        depressed
                        width="140px"
                        class="ma-3 ml-2 mr-12"
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
import { firebase, auth } from '@/firebase'
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
    async ingresar() {
      if (this.$v.formulario.$invalid) { return }
      
      try {
        let cred = await auth.signInWithEmailAndPassword(
          this.$v.formulario.email,
          this.$v.formulario.password
        )

        alert('Usuario logeado')

        this.$router.push({ name: 'home' })

      } catch (error) {
        alert(error)
        switch (error.code) {
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
    async ingresarFacebook () {

    },
    async ingresarGmail () {

    }
  },
  computed: {
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
}
</script>
