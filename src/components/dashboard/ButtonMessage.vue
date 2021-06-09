<template>
  <div class="dropdown position-option">
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <div class="mb-3 text-center">
          <h1>
            Comunicate con nosotros
            <a href="#collapseExample" data-bs-toggle="collapse" class="ml-5 btn-close" aria-expanded="false" aria-label="Close"></a>
          </h1>
          <input type="email" v-model="email" class="form-control mt-3 mb-3" placeholder="name@example.com">
          <input type="text" v-model="subject" class="form-control mb-3" placeholder="Asunto">
          <input type="text" v-model="text" class="form-control mb-3" placeholder="Descripción">
          <va-button v-on:click="SavedMessage()" class="my-0" color="warning">{{ $t("Enviar") }}</va-button>
        </div>
      </div>
    </div>
    <a title="Conéctate" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="fa-stack fa-2x" style="font-size: 25px; color: InfoText;">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="far fa-comments fa-stack-1x fa-inverse"></i>
      </span>
    </a>
    <ul class="dropdown-menu styleRefactor">
      <li>
        <a data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false">
          <span class="fa-stack fa-2x mb-1" style="font-size: 25px; color: grey;">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="far fa-envelope fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
      <li>
        <a href="https://api.whatsapp.com/send?phone=573206162075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n." class="fa-stack fa-2x mb-1" style="font-size: 25px; color: green;">
          <i class="fas fa-circle fa-stack-2x"></i>
          <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
// const URL = './abrageo'
const URL = 'https://portal.abracol.co/abrageo'
export default {
  name: 'buttonmessage',
  data () {
    return {
      email: '',
      subject: '',
      text: '',
      key: '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9',
    }
  },
  methods: {
    async SavedMessage () {
      console.log('Entrando')
      const valueEmail = {
        email: this.email,
        subject: this.subject,
        text: this.text,
      }
      const cryp = localStorage.getItem('ttid')
      const decryptedText = this.CryptoJS.AES.decrypt(cryp, this.key).toString(this.CryptoJS.enc.Utf8)
      const token = decryptedText
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      try {
        await axios.post(`${URL}/messages/emailMessage`, valueEmail, config)
        alert('se ha enviado su mensaje correctamente.')
        // $('#collapseExample').collapse('hide')
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
.position-option {
  z-index: 999999;
  position: fixed;
  justify-content: end;
  justify-items: end;
  margin-left: 94%;
  top: 90%;
  cursor: pointer;
  padding: 0.1%;
}

.styleRefactor {
  min-width: 0.1rem;
  background-color: transparent;
  border: none;
}

.collapse {
  margin-top: -591%;
  margin-right: 5%;
  margin-left: -236px;
  padding-bottom: 20%;
}

.card {
  border-radius: 20px 20px 20px 20px;
  -moz-border-radius: 20px 20px 20px 20px;
  -webkit-border-radius: 20px 20px 20px 20px;
  border: 0.1px solid #000000;
}

@include media-breakpoint-down(sm) {
  .position-option {
    position: fixed;
    height: fit-content;
    margin-left: 84%;
    top: 86%;
  }
}
</style>
