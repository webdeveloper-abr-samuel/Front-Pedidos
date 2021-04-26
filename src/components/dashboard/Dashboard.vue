<template>
  <div class="dashboard">
    <div class="row">
      <div class="col-md-6 mb-4">
        <LinealChart></LinealChart>
      </div>
      <div class="col-md-6 mt-5 py-5 mb-4">
        <PieChart></PieChart>
      </div>
      <div class="col-md-12 mb-4">
        <StatesDistributor></StatesDistributor>
      </div>
    </div>
  </div>
</template>

<script>
import LinealChart from './Charts/LinealChart';
import PieChart from './Charts/PieChart';
import StatesDistributor from './Charts/StatesDistributor';

export default {
  name: 'dashboard',
  components: {
    LinealChart,
    PieChart,
    StatesDistributor
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
