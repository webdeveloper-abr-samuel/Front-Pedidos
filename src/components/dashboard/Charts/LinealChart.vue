<template>
  <div>
    <div class="row justify-content-center text-center">
      <label class="mt-3 form-label">Seleccione fecha para graficar y mostrar los valores de pedidos</label>
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
    <figure class="highcharts-figure">
      <div id="graficalineal"></div>
    </figure>
  </div>
</template>

<script>
import axios from 'axios'
const URL = 'http://10.1.0.184:3000/abrageo'
var Highcharts = require('highcharts')
export default {
  name: 'LinealChart',
  data () {
    return {
      fecha: '',
    }
  },

  created () {
    var f = new Date()
    var date = f.getFullYear() + '-' + (f.getMonth() + 1)
    if (this.fecha !== '') {
      this.fecha = date
    }
    this.LoadData()
  },
  methods: {
    async LoadData () {
      const token = localStorage.getItem('Token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const value = {
        fecha: this.fecha,
      }
      try {
        const result = await axios.post(`${URL}/statistic/distributor/Lineal`, value, config)
        await this.grafica(result.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    grafica (data) {
      const graf = document.getElementById('graficalineal')
      const valorPedido = []
      const ingresoFH = []
      const fecha = this.fecha
      data.forEach((element) => {
        valorPedido.push(element.valorPedido)
        const dias = element.ingresoFH.split('-')
        ingresoFH.push(dias[2])
      })

      Highcharts.chart(graf, {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Valor Pedidos Por Fecha',
        },
        subtitle: {
          text: fecha,
        },
        xAxis: {
          categories: ingresoFH,
        },
        yAxis: {
          title: {
            text: 'Valor de Pedidos',
          },
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: [
          {
            name: 'dias',
            data: valorPedido,
          },
        ],
      })
    },
  },
}
</script>

<style lang="scss">

</style>
