<template>
  <v-app :style="cssProps" class="intro">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" elevation="3" outlined>
              <v-card-text>
                <div align="center" justify="center">
                  <p><span class="headline font-weight-black">Restaurar Contrase&ntilde;a</span></p>
                  <v-divider class="mt-0 mb-3"></v-divider>
                </div>
                <div class="mt-5">
                  <v-form>
                    <v-text-field
                      label="Correo Electronico"
                      v-model="email"
                      :error-messages="erroresEmail"
                      @blur="$v.email.$touch()"
                      :append-icon="'mdi-email'"
                      color="accent"
                      outlined />
                  </v-form>
                </div>
                <div align="center" justify="center" class="mt-0 mb-0">
                  <p class="font-weight-regular">
                      Ingresa tu correo electrónico y
                      te enviaremos las instrucciones
                      para restaurar tu contraseña.
                    </p>
                </div>
                <div align="center" justify="center">
                  <v-btn
                    secondary
                    depressed
                    @click="enviarSolicitudPassword()"
                    color="accent"
                    align="center">
                    Reestablecer Contrase&ntilde;a
                  </v-btn>
                </div>
                <div>
                  <v-row>
                    <v-col class="mt-0" cols="12" align="center">
                      <v-divider class="mt-2 mb-3"></v-divider>
                      <p class="font-weight-regular">
                        ¿Ya tienes una cuenta?
                        <router-link class="link" to="/sesion/login">
                          <span class="font-weight-black accent--text"> Iniciar Sesi&oacute;n</span>
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
import { required, email, } from 'vuelidate/lib/validators'
import { auth } from '@/firebase'

export default {
  data() {
    return {
      show: false,
      password: '',
      email: '',
      cssProps: {
        backgroundImage: `url(${require('@/assets/img/background1.jpg')})`,
        backgroundPosition: ("0px", "center"),
        backgroundRepeat: "no-repeat"
      },
    }
  },
  validations: {
    email: {
      required,
      email
    },
  },
  methods: {
    async enviarSolicitudPassword() {
			try {
				await auth.sendPasswordResetEmail(this.email)

				alert('Se envio un Email a tu correo electronico.')
			} catch(error) {
				switch(error) {
					case 'auth/invalid-email':
						alert('Correo electronico es invalido.')
						break
					case 'auth/user-not-found':
						alert('Correo electronico no pertenece a ningun usuario.')
						break
					default:
            alert('Ocurrio un error.')
            break
				}
			}
    }
  },
  computed: {
    erroresEmail() {
      let errores = []
      if (!this.$v.email.$dirty) { return errores }
      if (!this.$v.email.required) { errores.push('Ingrese su Correo Electrónico.') }
      if (!this.$v.email.email) { errores.push('Ingrese un Correo Electrónico Válido.') }
      return errores
    },
  }
}
</script>