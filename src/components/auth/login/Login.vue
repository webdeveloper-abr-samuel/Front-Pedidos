<template>
  <form @submit.prevent="onsubmit">
    <va-input
      class="mb-4 mt-4"
      v-model="email"
      type="email"
      placeholder="Correo"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      class="mb-4"
      v-model="password"
      type="password"
      placeholder="Contreseña"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0" color="warning">{{ $t("Iniciar Sesión") }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
const URL = './abrageo'
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
    }
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  created () {
    localStorage.clear()
  },
  methods: {
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
        const result = await axios.post(`${URL}/login`, Login)
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
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        const msg = error.response.data.message
        this.$toast.error(`${msg}`, {
          position: 'top-right',
        })
      }
    },
  },
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>
