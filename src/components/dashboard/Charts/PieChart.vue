<template>
  <div>
    <figure class="highcharts-figure">
      <div id="graficacircular"></div>
    </figure>
  </div>
</template>

<script>
import axios from "axios";
var Highcharts = require('highcharts');
const URL = "http://localhost:3000/abrageo";
export default {
  name: "PieChart",
  data() {
    return {};
  },
  created() {
    this.LoadData();
  },
  methods: {
    async LoadData() {
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const result = await axios.get(`${URL}/statistic/distributor/Pie`, config);
        console.log(result.data.data);
        await this.grafica(result.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    grafica(data) {
      const grafica = document.getElementById("graficacircular");
      let Proceso,Despachado,NoDespachado;

      data.forEach((element) => {
        Proceso = element.Proceso;
        Despachado = element.Despachado;
        NoDespachado = element.NoDespachado;
      });

      Highcharts.chart(grafica, {
        chart: {
          type: "variablepie",
        },
        title: {
          text: "Estados De Los Pedidos",
        },
        tooltip: {
          headerFormat: "",
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> <b> {point.name} : {point.y}</b><br/>',
        },
        series: [
          {
            minPointSize: 10,
            innerSize: "20%",
            zMin: 0,
            name: "Pedidos",
            data: [
              {
                name: "Pedidos En Proceso",
                y: Proceso,
                z: Proceso,
              },
              {
                name: "Pedidos Depachados",
                y: Despachado,
                z: Despachado,
              },
              {
                name: "Pedidos No Despachados",
                y: NoDespachado,
                z: NoDespachado,
              }
            ],
          },
        ],
      });
    },
  },
};
</script>
