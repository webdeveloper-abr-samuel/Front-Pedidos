<template>
  <div class="dashboard">
    <div class="row">
      <ProcesoTable></ProcesoTable>
    </div>
  </div>
</template>

<script>
import ProcesoTable from '../data-tables/tables-admin/procesoTable.vue';

export default {
  name: 'proceso',
  components: {
    ProcesoTable
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
