<template>
  <div>
    <div class="row align--center">

      <div class="flex xs12 md3 offset--md3">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
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
    </va-data-table>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  data () {
    return {
      term: null,
      perPage: '10',
      perPageOptions: ['2', '4', '6', '10', '20'],
    }
  },
  computed: {
    fields () {
      return [
        {
          name: 'code',
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'referencia',
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'cantidad',
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
        {
          name: 'valor',
          width: '30px',
          height: '45px',
          dataClass: 'text-center',
        },
      ]
    },
    filteredData () {
      return this.DetallesOrden
    },
  },
  props: {
    DetallesOrden: Array,
  },
  methods: {
    search: debounce(function (term) {
      this.term = term
    }, 400),
    getTrendIcon (user) {
      if (user.trend === 'up') {
        return 'entypo entypo-up-open-mini'
      }

      if (user.trend === 'down') {
        return 'entypo entypo-down-open-mini'
      }

      return 'entypo entypo-minus'
    },
    getTrendColor (user) {
      if (user.trend === 'up') {
        return 'primary'
      }

      if (user.trend === 'down') {
        return 'danger'
      }

      return 'grey'
    },
  },
}
</script>
