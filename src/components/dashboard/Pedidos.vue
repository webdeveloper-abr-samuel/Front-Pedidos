<template>
  <div class="dashboard">
    <div class="row">
      <PedidosTable></PedidosTable>
    </div>
  </div>
</template>

<script>
import PedidosTable from '../data-tables/tables-admin/pedidosTable.vue';

export default {
  name: 'pedidos',
  components: {
    PedidosTable
  }
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
