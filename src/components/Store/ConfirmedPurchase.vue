<template>
    <div class="ConfirmedPurchase">
      <h3>Yeah, (1/5/10/25) more charges</h3>
      <img src="../../assets/like.svg" alt="../../assets/like.svg" width="10%" height="10%">
    <div>
        <button class="button1" @click="purchase">Back</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "ConfirmedPurchase",
  data() {
    return {};
  },
  methods: {
    purchase() {
      this.$router.push({ name: "BuyChargeTime" });
    }
  }
};
</script>