<template>
<div>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-2 mt-2"
      v-model="email"
      type="email"
      placeholder="Correo"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      class="mb-1"
      v-model="password"
      type="password"
      placeholder="Contreseña"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />


    <div class="d-flex justify--center mt-3">
      <va-button :disabled="!verifity" type="submit" class="my-0" color="warning">{{ $t("Iniciar Sesión") }}</va-button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="terminos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content text-justify container lh-1">
          <div class="modal-header">
            <img src="../../../assets/icons/logo-abracol.png" class="img-fluid">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>
              Estimado Cliente
                Con el fin de cumplir con nuestro proceso de venta, comercialización de productos y/o servicios y garantizar el cumplimiento de los requisitos legales aplicables a la fecha en lo referente a la LEY DEL HABEAS DATA; en ABRASIVOS DE COLOMBIA S.A deseamos continuar con la opción de comunicarnos directamente con usted en forma efectiva, mediante el uso de correo físico, electrónico, dispositivos móviles, mensajes de texto o a través de cualquier medio análogo y/o digital de comunicación conocido y por conocer.
            </p>
            <p>
              Con este firme propósito y de forma paralela dando cumplimiento a la reglamentación de protección de datos personales (Ley 1581 del año 2.012 y Decreto 1377 del 2.013), le manifestamos que sus datos personales, de identificación, de ubicación, socioeconómicos, sensibles y financieros, previamente brindados por usted a nuestra compañía se encuentran en nuestras bases de datos de Clientes de manera física y digital.  Así mismo, le informamos que contamos con una Política de tratamiento y protección de datos personales con la que garantizamos la confidencialidad y buen manejo de su información, igualmente le informamos que tenemos a disposición herramientas tecnológicas adecuadas para un correcto almacenamiento de datos minimizando la vulnerabilidad a tener un acceso no deseado por terceros.
            </p>
            <p>
              Si usted desea que sus datos sean suprimidos de nuestras bases de datos, le solicitamos informarlo de manera expresa, enviando un correo electrónico a esta dirección:            <span class="fw-bold">d.algarin@abracol.com</span> informando el motivo por el cual desea ejercer este derecho. Los datos recolectados son utilizados con el propósito de lograr una comunicación eficiente relacionada con nuestras ventas y comercializaciones de productos o servicios.
            </p>
            <p>
              Le recordamos que usted tiene la posibilidad de acceder en cualquier momento a sus datos personales y el derecho a solicitar expresamente en cualquier momento, su corrección actualización o supresión, en los términos establecidos por la ley 1581 del 2.012    dirigiendo una comunicación escrita al correo : <span class="fw-bold">d.algarin@abracol.com</span> o comunicándose al teléfono: 2895150.
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" v-on:click="ValidateTerminos()" data-bs-dismiss="modal" class="btn btn-success">Aceptar Terminos</button>
          </div>
        </div>
      </div>
    </div>

  </form>
  <div class="container d-flex justify--center mt-2">
    <vue-recaptcha
        ref="recaptcha"
        @verify="onVerify"
        sitekey="6Ld32NoUAAAAAATUqmh_-WaT3pd9uzbep0j0y5mx"
        data-size="compact"
      >
    </vue-recaptcha>
  </div>
</div>
</template>

<script>
import axios from 'axios'
 import VueRecaptcha from 'vue-recaptcha';
/* const URL = './abrageo' */
const URL = 'http://localhost:3000/abrageo'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      clave: '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9',
      terminos: "",
      verifity: false
    }
  },
  components: { VueRecaptcha },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  created () {
    localStorage.clear()
  },
  methods: {
    onVerify(){
      this.verifity = true;
    },
    encrypt: function (data) {
      return this.CryptoJS.AES.encrypt(data, this.clave).toString()
    },
    async onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      const Login = {
        email: this.email,
        password: this.password,
      }      
      try {
        const validate = await axios.post(`${URL}/login/validateTerminos`, Login);
        if (!validate.data.data) {
          var myModal = new bootstrap.Modal(document.getElementById('terminos'));
          myModal.toggle()
        }else {
          const result = await axios.post(`${URL}/login`, Login);
          const profile = result.data.profile
          const profileString = profile.toString()
          const encryptedAsesor = this.encrypt(result.data.asesor)
          const encryptedToken = this.encrypt(result.data.token)
          const encryptedProfile = this.encrypt(profileString)
          const despiste1 = this.encrypt('sdfsdfkhk')
          const despiste2 = this.encrypt('shadfklhxcluv')
          const despiste3 = this.encrypt('wetiscvbkjls')
  
          localStorage.setItem('ppid', encryptedAsesor)
          localStorage.setItem('pid', encryptedProfile)
          localStorage.setItem('ttid', encryptedToken)
          localStorage.setItem('tid', despiste1)
          localStorage.setItem('ssid', despiste2)
          localStorage.setItem('sid', despiste3)
          this.$router.push({ name: 'dashboard' });
           if (result.status == 200) {
            const alert = 'Bienvenido Al Portal De Tranferencias De Abracol!!'
            const Speech = new SpeechSynthesisUtterance(alert);
            Speech.volume = 1
            Speech.rate=1
            Speech.pitch=1
            Speech.lang = 'es-Es'
            window.speechSynthesis.speak(Speech);
          }
        }
      } catch (error) {
        const msg = error.response.data.error == "" ? error.response.data.message : error.response.data.error
        this.$toast.error(`${msg}`, {
          position: 'top-right',
        })
      }
    },
    async ValidateTerminos(){
      const value = {
        email : this.email
      }
      try {
        const msg = 'Politicas aceptadas correctamente!'
        const result = await axios.put(`${URL}/login`, value);
        if (result.status == 200) {
          this.$toast.success(`${msg}`, {
            position: 'top-right',
          })
          await this.onsubmit();
        }else{
          this.$toast.error('Ocurrio un error intente de nuevo', {
            position: 'top-right',
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
