<template>
    <div class="auth-layout g-0 row align-content--center">
      <video src="../../assets/videos/video.mp4" autoplay loop></video>
      <div class="row mt-4 padding-0">
        <div class="col-md-6">
          <div class="d-flex pa-2 flex-center padding-0">
            <img class="content-logo img-fluid" src="../../assets/icons/logo-abracol.png" alt="">
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="content-title padding-0">
            <div class="d-flex pa-2 flex-center padding-0">
              <p class="title-light line">-BIENVENIDO-</p>
            </div>

            <div class="d-flex pa-2 flex-center padding-0">
              <p class="title-bold">DISTRIBUIDOR</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex xs12 pa-3">
        <div class="d-flex justify--center">
          <va-card  stripe="warning" class="content auth-layout__card">
            <va-tabs hideSlider v-model="tabIndex" center>
              <va-tab class="font-weight-bold mb-2"><h5>Ingresa una cuenta</h5></va-tab>
            </va-tabs>
            <div class="pa-3">
              <router-view/>
            </div>
          </va-card>
        </div>
        
          <!-- NavBar -->
        <div class="offcanvas offcanvas-end text-center" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Síguenos en facebook</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="container">
              <iframe 
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAbracol-SA-942594039090846&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                scrolling="no" 
                frameborder="0" 
                allowfullscreen="true" 
                allow="autoplay; 
                clipboard-write; 
                encrypted-media; 
                picture-in-picture; 
                web-share" 
                class="facebook-plugin">
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <div class="logo-mobile d-flex pa-2 flex-center">
        <img class="img-fluid" src="../../assets/icons/logo-abracol.png" alt="">
      </div>

      <div class="text-dashboard">
        <h1>Prepárate para vivir una nueva</h1>
        <h1>Experiencia en abrasivos</h1>
        <hr class="separator">
      </div>

      <button class="sidebar-button col-md-1 btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        Facebook
      </button>
    </div>
</template>

<script>
const tabs = [
  'login',
  'signup',
]
export default {
  name: 'AuthLayout',
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
    z-index: 1;
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
    max-width: 30%;
  }

  .auth-layout {
    min-height: 100vh;

    &__card {
      width: 100%;
      max-width: 600px;
      height: 308px;
    }

    &__options {
      @include media-breakpoint-down(xs) {
        flex-direction: column;
      }
    }
  }

  video {
    position: fixed;
    min-width: 100%;
    min-height: 100%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 0;
  }

  .text-dashboard {
    z-index: 1;
    margin-top: -21%;
    font-size: 52px;
    color: white;
    margin-left: 2%;
  }

  .separator {
    height: 1.5% !important;
    width: 875px;
  }

  .content {
    margin-left: 71%;
    margin-right: 5%;
  }

  .content-title {
    margin-left: 32.2%;
    margin-top: 4%;
  }

  .content-logo {
    margin-right: 67%;
    background-color: #ffff00;
    margin-top: 6%;
    border-radius: 0.1px 55px 55px 0.1px;
  }

  .logo-mobile {
    visibility: hidden;
  }

  .va-card__stripe {
    height: 1.5rem !important;
  }

  .sidebar-button {
    z-index: 1;
    position: fixed;
    margin-left: 94%;
    margin-top: 6%;
    width: 6%;
    border-radius: 55px 0.1px 0.1px 55px;
  }

  .facebook-plugin {
    border: none;
    overflow: hidden;
    width: 340px;
    height: 500px;
  }

  @include media-breakpoint-down(sm) {
    .content {
      margin-left: 7%;
    }

    video {
      visibility: hidden;
    }

    .content-logo {
      visibility: hidden;
    }

    .content-title {
      margin-left: 6.2%;
    }

    .auth-layout {
      background-image: linear-gradient(180deg, #e8b51b 58%, #d0a318 59%);
    }

    .logo-mobile {
      visibility: visible;
    }

    .text-dashboard {
      visibility: hidden;
      margin-top: -200px;
      margin-left: -20px;
    }

    .separator {
      visibility: hidden;
      width: 0.1px;
    }

    .sidebar-button {
      visibility: hidden;
    }
  }
</style>
