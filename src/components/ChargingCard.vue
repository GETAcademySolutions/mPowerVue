<template>
  <div class="component">
      <div v-for="item in charges" class="card">
          <h5>Port: <p>{{ item.portNo }}</p> <p style="float: right;">{{item.batteryLevel}}</p></h5>
          <h5>Device: <p>{{ item.device }}</p></h5>
          <h2>{{ item.chargeTime }}</h2>
          <h5>Fully charged at {{ fullyChargedAt }}</h5>
      </div>
  </div>
</template>

<script>
export default {
    props: ["charges"],
  data() {
    return {
    };
  }
};
</script>

<style>
</style>
