<template>
  <div>
    <label class="mt-3 form-label">Seleccione fecha para mostrar los estados de los pedidos</label>
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
    <figure class="highcharts-figure">
      <div id="graficacircular"></div>
    </figure>
  </div>
</template>

<script>
import axios from 'axios'
const URL = './abrageo'
var Highcharts = require('highcharts')
export default {
  name: 'PieChart',
  data() {
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
    this.LoadData();
  },
  methods: {
    async LoadData () {
      const cryp = localStorage.getItem('ttid')
      const decryptedText = this.CryptoJS.AES.decrypt(cryp, '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9').toString(this.CryptoJS.enc.Utf8)
      const token = decryptedText
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      const value = {
        fecha: this.fecha
      }
      try {
        const result = await axios.post(`${URL}/statistic/distributor/Pie`,value,config)
        await this.grafica(result.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    grafica (data) {
      const grafica = document.getElementById('graficacircular')
      let Proceso, Despachado, NoDespachado

      data.forEach((element) => {
        Proceso = element.Proceso
        Despachado = element.Despachado
        NoDespachado = element.NoDespachado
      })

      Highcharts.chart(grafica, {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Estados De Los Pedidos',
        },
        tooltip: {
          headerFormat: '',
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b> {point.name} : {point.y}</b><br/>',
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'Pedidos',
            data: [
              {
                name: 'Pedidos En Proceso',
                y: Proceso,
                z: Proceso,
              },
              {
                name: 'Pedidos Depachados',
                y: Despachado,
                z: Despachado,
              },
              {
                name: 'Pedidos No Despachados',
                y: NoDespachado,
                z: NoDespachado,
              },
            ],
          },
        ],
      })
    },
  },
}
</script>
