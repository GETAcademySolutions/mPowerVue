<template>
    <div class="ChargeStore">
      <h3>Purchase Charges</h3>
      <div id="feedbackDiv"></div>
    <div>
        <button class="button4" @click="purchase">Buy charge</button>
        <button class="button2" @click="home">Back</button>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "BuyCharge",
  data() {
    return {
      credits: this.credits
    };
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
    purchase() {
      this.$router.push({ name: "BuyChargeTime" });
    }
  }
};
</script>