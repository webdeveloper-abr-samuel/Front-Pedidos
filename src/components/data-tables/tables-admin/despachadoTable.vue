<template>
  <div>
    <va-card :title="$t('Pedidos Despachados')">
      <div class="row align--center">
        <div class="flex xs12 md6">
          <va-input
            :value="term"
            :placeholder="$t('Busqueda Por Fecha')"
            @input="search"
            removable
          >
            <va-icon name="fa fa-search" slot="prepend" />
          </va-input>
        </div>

        <div class="flex xs12 md3 offset--md3">
          <va-select
            v-model="perPage"
            :label="$t('Por Pagina')"
            :options="perPageOptions"
            noClear
          />
        </div>
      </div>

      <va-data-table
        class="text-center"
        :fields="fields"
        :data="filteredData"
        :per-page="parseInt(perPage)"
        clickable
      >
        <template slot="trend" slot-scope="props">
          <va-icon
            :name="getTrendIcon(props.rowData)"
            :color="getTrendColor(props.rowData)"
          />
        </template>

        <template slot="estados.name" slot-scope="props">
          <div v-if="props.rowData.estados.name == 'Proceso'">
            <va-badge color="blue">
              {{ props.rowData.estados.name }}
            </va-badge>
          </div>
          <div v-if="props.rowData.estados.name == 'Despachado'">
            <va-badge color="green">
              {{ props.rowData.estados.name }}
            </va-badge>
          </div>
          <div v-if="props.rowData.estados.name == 'NoDespachado'">
            <va-badge color="red">
              {{ props.rowData.estados.name }}
            </va-badge>
          </div>
        </template>

          <template slot="actions" slot-scope="props">
            <div class="flex xs12 xl6">
                <va-button-group>
                    <va-button title="Detalles del pedido" v-on:click="ShowDetails(props.rowData.id)" outline small  color="info" icon="fa fa-eye" />
                    <va-button title="Descargar Pdf" v-on:click="DownloadPdf(props.rowData.id)"  outline small  color="info" icon="fa fa-file-pdf-o" />
                    <va-button title="Ver Observaciones" v-on:click="ShowReasons(props.rowData.id)"  outline small  color="info" icon="fa fa-info-circle" />
                </va-button-group>
            </div>
        </template>
      </va-data-table>
    </va-card>

    <!-- -------------------------Ver Detalles Order --------------------------- -->
    <va-modal v-model="showDetailsOrder" :title="$t('Detalles de la Orden')" :hide-default-actions="true">
        <div style="width: 600px;">
          <detailsOrderTable v-bind:DetallesOrden="DetallesOrden"></detailsOrderTable>
        </div>
        <div class="d-flex justify-content-center btn-group mb-3">
          <va-button @click="showDetailsOrder = false" color="danger">Cerrar</va-button>
        </div>
    </va-modal>

    <!-- -------------------------Ver Observaciones --------------------------- -->
    <va-modal
      v-model="showObs"
      :title="$t('Observaciones')"
      :hide-default-actions="true"
    >
      <div class="container">
        <p class="mb-2 text-center">
          {{dataReasons.razonRechazo}}
        </p>
        <p class="mb-2 text-justify">
          {{dataReasons.obsDistribuidor}}
        </p>
        <div class="d-flex justify-content-center btn-group mb-2">
          <va-button @click="showObs = false" color="danger">Cerrar</va-button>
        </div>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { debounce } from "lodash";
import axios from "axios";
const URL = "http://localhost:3000/abrageo";
import detailsOrderTable from './detailsOrderTable.vue';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
export default {
  components:{
    detailsOrderTable
  },
  data() {
    return {
        term: null,
        perPage: "2",
        perPageOptions: ["2","4", "6", "10", "20"],
        despachados: [], 
        DetallesOrden: [],
        dataReasons: [],
        showDetailsOrder: false,
        showObs: false,
        status: "",
        reasons: "",
        comments: "",
        id_pedido: ""
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "fichacliente.nombreNegocio",
          title: "Cliente",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "nit",
          title:"Identificacion/Nit",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "savedBy",
          title: "AsesorAbracol",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "ingresoFH",
          title: "FechaRegistro",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "distribuidor",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "asesordistribuidor",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          title: "estado",
          name: "__slot:estados.name",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "valorPedido",
          title: "Total",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
        {
          name: "__slot:actions",
          width: "30px",
          height: "45px",
          dataClass: "text-center",
        },
      ];
    },
    filteredData() {
      if (!this.term || this.term.length < 1) {
        return this.despachados
      }
      return this.despachados.filter(item => {
        return item.ingresoFH.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  created() {
    this.loadTable();
  },
  methods: {
    search: debounce(function (term) {
      this.term = term;
    }, 400),
    getTrendIcon(user) {
      if (user.trend === "up") {
        return "fa fa-caret-up";
      }

      if (user.trend === "down") {
        return "fa fa-caret-down";
      }

      return "fa fa-minus";
    },
    getTrendColor(user) {
      if (user.trend === "up") {
        return "primary";
      }

      if (user.trend === "down") {
        return "danger";
      }

      return "grey";
    },
    async loadTable() {
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const result = await axios.get(`${URL}/pedidos/en/despacho`,config);
        this.despachados = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async ShowDetails(id){
      this.showDetailsOrder=true;
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const result = await axios.get(`${URL}/pedidos/detalle/orden/${id}`,config);
        this.DetallesOrden=result.data.data;       

      } catch (error) {
        console.log(error);
      }
    },
    async ShowReasons(id){
      this.showObs = true;
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const result = await axios.get(`${URL}/pedidos/${id}`,config);
        this.dataReasons = result.data.data;
      } catch (error) {
        console.log(error);
      }

    },
    async DownloadPdf(id){
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
       var columns = [
        { title: "Cliente", dataKey: "nombreNegocio" },
        { title: "Nit", dataKey: "nit" },
        { title: "Asesor Abracol", dataKey: "savedBy" },
        { title: "Fecha de Ingreso", dataKey: "ingresoFH" },
        { title: "Distribuidor", dataKey: "distribuidor" },
        { title: "Asesor Distribuidor", dataKey: "asesordistribuidor" },
        { title: "Estado del Pedido", dataKey: "estado" },
        { title: "Total", dataKey: "valorPedido" },
      ];  
      var det = [
        { title: "Codigo", dataKey: "code" },
        { title: "Referencia", dataKey: "referencia" },
        { title: "Cantidad", dataKey: "cantidad" },
        { title: "Valor", dataKey: "valor" }
      ];   
      try {
        const result = await axios.get(`${URL}/pedidos/pdf/${id}`,config);
        const res = await axios.get(`${URL}/pedidos/detalle/orden/${id}`,config);
        const pedido = result.data.data;
        const details = res.data.data;
        var doc = new jsPDF("p", "pt");

        doc.text("Pedido y Detalles", 250, 40);
        doc.autoTable(columns, pedido, {
          margin: { top: 60},
        });
        
        doc.autoTable(det, details);

        doc.save("pedido.pdf");
      } catch (error) {
        console.log(error);
      }      
    }
  },
};
</script>

