<template>
  <div>
    <va-card :title="$t('Pedidos No Despachados')">
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
                    <va-button title="Detalles del pedido" v-on:click="ShowDetails(props.rowData.id)" outline small  color="info" icon="entypo entypo-eye" />
                    <va-button title="Descargar Pdf" v-on:click="DownloadPdf(props.rowData.id)"  outline small  color="info" icon="entypo entypo-docs" />
                    <va-button title="Ver Observaciones" v-on:click="ShowReasons(props.rowData.id)"  outline small  color="info" icon="entypo entypo-info" />
                </va-button-group>
            </div>
        </template>
      </va-data-table>
    </va-card>

    <!-- -------------------------Ver Observaciones --------------------------- -->
    <va-modal
      v-model="showObs"
      :title="$t('Observaciones')"
      :hide-default-actions="true"
    >
      <div class="container">
        <p class="mb-2">
          Razon de Rechazo : {{dataReasons.razonRechazo}}
        </p>
        <p class="mb-2">
          Observacion : {{dataReasons.obsDistribuidor}}
        </p>
        <div class="d-flex justify-content-center btn-group mb-2">
          <va-button @click="showObs = false" color="danger">Cerrar</va-button>
        </div>
      </div>
    </va-modal>

    <!-- -------------------------Ver Detalles Order --------------------------- -->
    <va-modal v-model="showDetailsOrder" :title="$t('Detalles de la Orden')" :hide-default-actions="true">
        <div style="width: 600px;">
          <detailsOrderTable v-bind:DetallesOrden="DetallesOrden"></detailsOrderTable>
        </div>
        <div class="d-flex justify-content-center btn-group mb-3">
          <va-button @click="showDetailsOrder = false" color="danger">Cerrar</va-button>
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
        cancelados: [], 
        dataReasons: [],
        DetallesOrden: [],
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
        return this.cancelados
      }
      return this.cancelados.filter(item => {
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
        const result = await axios.get(`${URL}/pedidos/cancelado/despacho`,config);
        this.cancelados = result.data.data;
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
    async DownloadPdf(id){
      const token = localStorage.getItem("Token");
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };
       var columns = [
        { title: "Cliente", dataKey: "nombreNegocio" },
        { title: "Nit", dataKey: "nit" },
        { title: "Asesor", dataKey: "savedBy" },
        { title: "Fecha de Ingreso", dataKey: "ingresoFH" },
        { title: "Distribuidor", dataKey: "distribuidor" },
        { title: "Agente", dataKey: "asesordistribuidor" },
        { title: "Estado del Pedido", dataKey: "estado" },
        { title: "Total", dataKey: "valorPedido" },
      ];  
      var det = [
        { title: "Referencia", dataKey: "referencia" },
        { title: "Cantidad", dataKey: "cantidad" },
        { title: "Valor", dataKey: "valor" }
      ];   
      try {
        const result = await axios.get(`${URL}/pedidos/pdf/${id}`,config);
        const res = await axios.get(`${URL}/pedidos/detalle/orden/${id}`,config);
        const pedido = result.data.data;
        const details = res.data.data;
        var doc = new jsPDF({orientation: 'p', unit: 'pt',  format: [700, 800]});
        var imgData = 'data:image/png;base64,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';
        doc.text("Pedido y Detalles", 280, 40);
        doc.addImage(imgData,'PNG',20,5,160,50);
        doc.autoTable(columns, pedido, {
          styles: {
            halign: 'center',
            overflow: 'linebreak',
            tableWidth: 'auto',
            lineWidth: 1,
          },
          headStyles: {
            fillColor: [241, 196, 15],
            cellPadding: 2,
            lineWidth: 1,
            valign:'middle',
            fontStyle: 'bold',
            halign: 'center',
            rowHeight:20
          },
          bodyStyles: {
            margin: 20
        },
          margin: { top: 60}
        });
        
        doc.autoTable(det, details,{
          styles: {
            halign: 'center',
            overflow: 'linebreak',
            tableWidth: 'auto',
            lineWidth: 1,
          },
          headStyles: {
            fillColor: [241, 196, 15],
            cellPadding: 2,
            lineWidth: 1,
            valign:'middle',
            fontStyle: 'bold',
            halign: 'center',
            rowHeight:20
          },
          bodyStyles: {
            margin: 20
        },
          margin: { top: 60}
        });

        doc.save("pedido.pdf");
      } catch (error) {
        console.log(error);
      }      
    }
  },
};
</script>