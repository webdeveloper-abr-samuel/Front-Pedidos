<template>
  <va-card
    :title="$t('Clientes por departamento')"
    class="d-flex dashboard-contributors-list"
  >
    <va-button
      flat
      small
      slot="actions"
      class="mr-0"
      :disabled="contributors.length <= step"
      @click="showNext"
    >
    </va-button>

    <va-inner-loading :loading="loading">
      <div class="mb-3" v-for="(contributor, idx) in visibleList" :key="idx">
        <va-progress-bar
          :value="getPercent(contributor.cantidad)"
          :color="getRandomColor()"
        >
          {{ contributor.cantidad }} {{ $t("clientes") }}
        </va-progress-bar>
        <p class="mt-2">{{ contributor.departamento }}</p>
      </div>
    </va-inner-loading>
  </va-card>
</template>

<script>
export default {
  name: 'DashboardContributorsList',
  data () {
    return {
      contributors: [],
      distributors: [],
      loading: false,
      progressMax: 392,
      visibleList: [],
      step: 5,
      clave: '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9',
    }
  },
  mounted () {
    this.LoadData()
  },
  methods: {
    async LoadData () {
      this.loading = true
      const cryp = localStorage.getItem('ttid')
      const decryptedText = this.CryptoJS.AES.decrypt(cryp, this.clave).toString(this.CryptoJS.enc.Utf8)
      const token = decryptedText
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      try {
        const result = await this.axios.get(
          `${URL}/statistic/distributor/States`,
          config,
        )
        this.distributors = result.data.data
        this.contributors = result.data.data
        this.progressMax = Math.max(
          ...this.contributors.map(({ cantidad }) => cantidad),
        )
        this.showNext()
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    getPercent (val) {
      return (val / this.progressMax) * 100
    },
    showNext () {
      this.visibleList = this.distributors
    },
    getRandomColor () {
      const keys = Object.keys(this.$themes)
      return this.$themes[keys[(keys.length * Math.random()) << 0]]
    },
  },
}
</script>

<style scoped lang="scss">
.dashboard-contributors-list {
  flex-direction: column;
  overflow-y: auto;
  max-height: 400px;

  .inner-loading {
    height: 100%;
  }
}
</style>
