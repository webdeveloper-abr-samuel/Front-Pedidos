<template>
  <div class="auth-layout row align-content--center">

    <div class="d-flex pa-2 flex-center padding-0">
      <p class="title-light line">-BIENVENIDO-</p>
    </div>

    <div class="d-flex pa-2 flex-center padding-0">
      <p class="title-bold">DISTRIBUIDOR</p>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs hideSlider v-model="tabIndex" center>
            <va-tab>{{ $t('Iniciar Sesión') }}</va-tab>
          </va-tabs>

          <va-separator/>

          <div class="pa-3">
            <router-view/>
          </div>
        </va-card>

      </div>
    </div>
    <div class="d-flex pa-2 flex-center">
      <img class="img-fluid" src="../../assets/icons/logo-abracol.png" alt="">
      <!-- <va-icon-vuestic /> -->
    </div>
  </div>
</template>

<script>
/* import VaIconVuestic from '../../iconset/VaIconVuestic' */
const tabs = [
  'login',
  'signup',
]
export default {
  name: 'AuthLayout',
  /*   components: { VaIconVuestic }, */
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
}
</script>

<style lang="scss">
  @font-face {
    font-family: 'BebasNeue Book';
    src: url("~@/assets/fonts/BebasNeue-Book.otf") format("opentype");
  }

  @font-face {
    font-family: 'BebasNeue bold';
    src: url("~@/assets/fonts/BebasNeue-Bold.otf") format("opentype");
  }

  .padding-0 {
    padding: 1px !important;
    margin: -12px;
  }

  .title-light {
    font-family: 'BebasNeue Book';
    font-size: 3em;
    color: black;
  }

  .title-bold {
    font-family: 'BebasNeue bold';
    font-size: 3.5em;
    color: black;
  }

  .img-fluid {
    max-width: 38%;
  }

  .auth-layout {
    min-height: 100vh;
    background-image: linear-gradient(180deg, #e8b51b 58%, #d0a318 59%);

    &__card {
      width: 100%;
      max-width: 600px;
    }

    &__options {
      @include media-breakpoint-down(xs) {
        flex-direction: column;
      }
    }
  }
</style>
