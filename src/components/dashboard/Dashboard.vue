<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-6 mt-4">
        <PieChart></PieChart>
      </div>
      <div class="col-md-6 mt-4">
        <dashboard-contributors-chart/>
      </div>
      <div class="col-md-12 mt-4 mb-4">
        <LinealChart></LinealChart>
      </div>
    </div>
  </div>
</template>

<script>
import LinealChart from './Charts/LinealChart';
import PieChart from './Charts/PieChart';
import DashboardContributorsChart from './DashboardContributorsList'

export default {
  name: 'dashboard',
  components: {
    LinealChart,
    PieChart,
    DashboardContributorsChart
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
