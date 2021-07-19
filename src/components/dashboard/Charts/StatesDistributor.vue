<template>
  <div>
    <figure class="highcharts-figure">
      <div id="graficabarras"></div>
    </figure>
  </div>
</template>

<script>
import axios from 'axios'
const URL = './abrageo'
// const URL = 'https://portal.abracol.co/abrageo'
var Highcharts = require('highcharts')
export default {
  name: 'StatesDistributor',
  created () {
    this.LoadData()
  },
  methods: {
    async LoadData () {
      const cryp = localStorage.getItem('ttid')
      const decryptedText = this.CryptoJS.AES.decrypt(cryp, '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9').toString(this.CryptoJS.enc.Utf8)
      const token = decryptedText
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      try {
        const result = await axios.get(`${URL}/statistic/distributor/States`, config)
        await this.grafica(result.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    grafica (data) {
      const Cantidad = []
      const Departamento = []
      data.forEach((element) => {
        Cantidad.push(element.cantidad)
        Departamento.push(element.departamento)
      })
      const graficabar = document.getElementById('graficabarras')
      Highcharts.chart(graficabar, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Cantidad de clientes por departamento',
        },
        xAxis: {
          categories: Departamento,
        },
        yAxis: {
          title: {
            text: 'Cantidad',
          },
        },
        series: [
          {
            name: Departamento,
            data: Cantidad,
          },
        ],
      })
    },
  },
}
</script>
