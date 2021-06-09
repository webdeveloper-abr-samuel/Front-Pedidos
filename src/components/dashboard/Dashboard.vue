<template>
  <div class="dashboard">
    <div class="row justify-content-center text-center">
      <label class="mt-3 form-label">Seleccione fecha para graficar</label>
      <div class="col-md-4 mb-4">
        <input
          type="month"
          v-model="fecha"
          v-on:change="LoadData()"
          name="fecha"
          id="fecha"
          class="form-control"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mt-4">
        <figure class="highcharts-figure">
          <div id="graficacircular"></div>
        </figure>
      </div>
      <div class="col-md-6 mt-4">
        <dashboard-contributors-chart/>
      </div>
      <div class="col-md-12 mt-4 mb-4">
        <figure class="highcharts-figure">
          <div id="graficalineal"></div>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardContributorsChart from './DashboardContributorsList'
// import axios from 'axios'
// const URL = './abrageo'
// const URL = 'https://portal.abracol.co/abrageo'

export default {
  name: 'dashboard',
  components: {
    DashboardContributorsChart,
  },
  data () {
    return {
      fecha: '',
    }
  },
  created () {
    var f = new Date()
    const mes = f.getMonth() + 1
    const mesActual = mes < 10 ? `0${mes}` : mes
    var date = f.getFullYear() + '-' + mesActual
    this.fecha = date
    // this.LoadData()
  },
  methods: {
  //   async LoadData () {
  //     const cryp = localStorage.getItem('ttid')
  //     const decryptedText = this.CryptoJS.AES.decrypt(cryp, '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9').toString(this.CryptoJS.enc.Utf8)
  //     const token = decryptedText
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //     const value = {
  //       fecha: this.fecha,
  //     }
  //     try {
  //       const resultPie = await axios.post(`${URL}/statistic/distributor/Pie`, value, config)
  //       const resultLineal = await axios.post(`${URL}/statistic/distributor/Lineal`, value, config)
  //       await this.graficaPie(resultPie.data.data)
  //       await this.graficaLineal(resultLineal.data.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  //   graficaPie (data) {
  //     const grafica = document.getElementById('graficacircular')
  //     let Proceso, Despachado, NoDespachado

    //     data.forEach((element) => {
    //       Proceso = element.Proceso
    //       Despachado = element.Despachado
    //       NoDespachado = element.NoDespachado
    //     })

    //     Highcharts.chart(grafica, {
    //       chart: {
    //         type: 'pie',
    //       },
    //       title: {
    //         text: 'Estados De Los Pedidos',
    //       },
    //       tooltip: {
    //         headerFormat: '',
    //         pointFormat:
    //           '<span style="color:{point.color}">\u25CF</span> <b> {point.name} : {point.y}</b><br/>',
    //       },
    //       credits: {
    //         enabled: false,
    //       },
    //       series: [
    //         {
    //           minPointSize: 10,
    //           innerSize: '20%',
    //           zMin: 0,
    //           name: 'Pedidos',
    //           data: [
    //             {
    //               name: 'Pedidos En Proceso',
    //               y: Proceso,
    //               z: Proceso,
    //             },
    //             {
    //               name: 'Pedidos Depachados',
    //               y: Despachado,
    //               z: Despachado,
    //             },
    //             {
    //               name: 'Pedidos No Despachados',
    //               y: NoDespachado,
    //               z: NoDespachado,
    //             },
    //           ],
    //         },
    //       ],
    //     })
    //   },
    //   graficaLineal (data) {
    //     const graf = document.getElementById('graficalineal')
    //     const valorPedido = []
    //     const ingresoFH = []
    //     const fecha = this.fecha
    //     data.forEach((element) => {
    //       valorPedido.push(parseInt(element.valorPedido))
    //       ingresoFH.push(element.ingresoFH)
    //     })

  //     Highcharts.chart(graf, {
  //       chart: {
  //         type: 'line',
  //       },
  //       title: {
  //         text: 'Valor Pedidos Por Fecha',
  //       },
  //       subtitle: {
  //         text: fecha,
  //       },
  //       xAxis: {
  //         categories: ingresoFH,
  //       },
  //       yAxis: {
  //         title: {
  //           text: 'Valor de Pedidos',
  //         },
  //       },
  //       credits: {
  //         enabled: false,
  //       },
  //       plotOptions: {
  //         line: {
  //           dataLabels: {
  //             enabled: true,
  //           },
  //           enableMouseTracking: false,
  //         },
  //       },
  //       series: [
  //         {
  //           name: 'dias',
  //           data: valorPedido,
  //         },
  //       ],
  //     })
  //   },
  },
}
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
    }
  }
</style>
