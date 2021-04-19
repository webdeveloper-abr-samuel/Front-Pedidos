<template>
  <div class="dashboard">
    <div class="row">
      <DespachadoTable></DespachadoTable>
    </div>
  </div>
</template>

<script>
import DespachadoTable from '../data-tables/tables-admin/despachadoTable.vue';

export default {
  name: 'proceso',
  components: {
    DespachadoTable
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
