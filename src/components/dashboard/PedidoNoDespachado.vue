<template>
  <div class="dashboard">
    <div class="row">
      <NoDespachadoTable></NoDespachadoTable>
    </div>
  </div>
</template>

<script>
import NoDespachadoTable from '../data-tables/tables-admin/noDespachadoTable.vue';

export default {
  name: 'proceso',
  components: {
    NoDespachadoTable
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
