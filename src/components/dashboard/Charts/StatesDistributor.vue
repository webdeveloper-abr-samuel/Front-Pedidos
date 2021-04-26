<template>
  <div>
    <figure class="highcharts-figure">
      <div id="graficabarras"></div>
    </figure>
  </div>
</template>

<script>
import axios from 'axios'
const URL = 'http://10.1.0.184:3000/abrageo'
var Highcharts = require("highcharts");
export default {
  name: "StatesDistributor",
  created() {
    this.LoadData();
  },
  methods: {
    async LoadData() {
      const token = localStorage.getItem('Token')
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      try {
        const result = await axios.get(`${URL}/statistic/distributor/States`, config);
        await this.grafica(result.data.data)
      } catch (error) {
        console.log(error)
      }
    },
    grafica(data) {
        const Cantidad = []
        const Departamento = []
        data.forEach((element) => {
            Cantidad.push(element.cantidad);
            Departamento.push(element.departamento);
        });
      const graficabar = document.getElementById('graficabarras')
      Highcharts.chart(graficabar, {
        chart: {
          type: "column",
        },
        title: {
          text: "Cantidad de clientes por departamento",
        },
        xAxis: {
          categories: Departamento,
        },
        yAxis: {
          title: {
            text: "Cantidad",
          },
        },
        series: [
          {
            name: Departamento,
            data: Cantidad,
          }
        ],
      });
    },
  },
};
</script>
