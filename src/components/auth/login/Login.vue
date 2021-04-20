<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      type="email"
      placeholder="Correo"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      placeholder="Contreseña"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0" color="warning">{{ $t("Iniciar Sesion") }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
const URL = "http://localhost:3000/abrageo";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    };
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    },
  },
  created(){
    localStorage.clear();
  },
  methods: {
    async onsubmit() {
      this.emailErrors = this.email ? [] : ["Email is required"];
      this.passwordErrors = this.password ? [] : ["Password is required"];
      if (!this.formReady) {
        return;
      }
      let Login = {
        email: this.email,
        password: this.password,
      };
      try {
        const result = await axios.post(`${URL}/login`, Login);
        localStorage.setItem('Token', result.data.token);
        localStorage.setItem('Asesor', result.data.asesor);     
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        const msg = error.response.data.message;
        this.$toast.error(`${msg}`, {
          position: 'top-right'
        })
      }

    },
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
</style>