<template>
  <v-app :style="cssProps" class="intro">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="mx-auto" elevation="3" outlined>
              <v-card-text>
                <div align="center" justify="center">
                  <p><span class="headline font-weight-black">Crea una Cuenta</span></p>
                  <v-divider class="mt-0 mb-3"></v-divider>
                </div>
                <div>
                  <v-form>
                    <v-text-field
                      label="Nombre"
                      v-model="fR.nombres"
                      :error-messages="erroresNombres"
                      @blur="$v.fR.nombres.$touch()"
                      :type="text"
                      :append-icon="'mdi-account'"
                      color="accent"
                      outlined/>

                    <v-text-field
                      label="Correo Electronico"
                      v-model="fR.email"
                      :error-messages="erroresEmail"
                      @blur="$v.fR.email.$touch()"
                      :type='email'
                      :append-icon="'mdi-email'"
                      color="accent"
                      outlined />

                    <v-text-field
                      label="Contraseña"
                      v-model="fR.password"
                      :error-messages="erroresPassword"
                      @blur="$v.fR.password.$touch()"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      color="accent"
                      outlined />

                      <v-switch
                        v-model="fR.terminos"
                        :error-messages="erroresTerminos"
                        required
                        @change="$v.fR.terminos.$touch()"
                        @blur="$v.fR.terminos.$touch()"
                        color="accent"
                        class="mx-2 mt-0 mb-0 pt-0"
                        label="Acepto Terminos y Condiciones" />
                        
                  </v-form>
                </div>
                <div>
                <v-col cols="12" align="center" >
                  <v-btn
                    :disabled="$v.fR.$invalid"
                    @click="registrar()"
                    secondary
                    depressed
                    color="accent"
                    align="center">
                    Registrarse
                  </v-btn>
                </v-col>
                </div>
                
                <div>
                  <v-row>
                    <v-col class="mt-0" cols="12" align="center">
                      <v-divider class="mt-0 mb-0"></v-divider>
                      <p class="font-weight-regular">
                        ¿Ya tienes una cuenta?
                        <router-link class="link" to="/sesion/login">
                          <span class="font-weight-black accent--text"> Inicia Sesi&oacute;n</span>
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
import { required, email, minLength, maxLength, } from 'vuelidate/lib/validators'
import { nombreCompleto } from '@/utils/validate'
import { auth } from '@/firebase'

export default {
  data() {
    return {
      show: false,
      fR: {
        email: '',
        password: '',
        nombres: '',
        terminos: false
      },
      cssProps: {
        backgroundImage: `url(${require('@/assets/img/background1.jpg')})`,
        backgroundPosition: ("0px", "center"),
        backgroundRepeat: "no-repeat"
      }
    }
  },
  methods: {
    async registrar() {
      if (this.$v.fR.$invalid) { return }

      try {
				let cred = await auth.createUserWithEmailAndPassword(this.fR.email, this.fR.password)
				
				await auth.currentUser.sendEmailVerification()

        alert('Usuario Creado')

        this.$router.push({ name: 'Home' })
      }
      catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Correo Electronico ya esta siendo usado.')
            break
          case 'auth/invalid-email':
            alert('Correo electronico es invalido.')
            break
          case 'auth/weak-password':
            alert('Contrasena es muy debil.')
            break
          default:
            alert('Ocurrio un error.')
            break
        }
      }
    }
  },
  validations: {
    fR: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(15)
      },
      nombres: {
        required,
        nombreCompleto,
        minLength: minLength(6)
      },
      terminos: {
        checked (val) {
          return val
        }
      }
    }
  },
  computed: {
    erroresEmail() {
      let errores = []
      if (!this.$v.fR.email.$dirty) { return errores }
      if (!this.$v.fR.email.required) { errores.push('Ingrese su Correo Electrónico.') }
      if (!this.$v.fR.email.email) { errores.push('Ingrese un Correo Electrónico Válido.') }
      return errores
    },
    erroresPassword() {
      let errores = []
      if (!this.$v.fR.password.$dirty) { return errores }
      if (!this.$v.fR.password.required) { errores.push('Ingrese su Contraseña.') }
      if (!this.$v.fR.password.minLength) { errores.push('Ingrese al menos 6 caracteres.') }
      if (!this.$v.fR.password.maxLength) { errores.push('Ingrese maximo 15 caracteres.') }
      return errores
    },
    erroresNombres() {
      let errores = []
      if (!this.$v.fR.nombres.$dirty) { return errores }
      if (!this.$v.fR.nombres.required) { errores.push('Ingrese su Nombre Completo.') }
      if (!this.$v.fR.nombres.minLength) { errores.push('Ingrese al menos 6 caracteres.') }
      if (!this.$v.fR.nombres.nombreCompleto) { errores.push('Ingrese un nombre válido.') }
      return errores
    },
    erroresTerminos() {
      let errores = []
      if (!this.$v.fR.nombres.$dirty) { return errores }
      if (!this.$v.fR.nombres.required) { errores.push('Lee y Acepta los Terminos y Condiciones.') }
      return errores
    }
  }
}
</script>
