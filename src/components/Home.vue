<template>
    <div class="ChargePage">
      <div id="feedbackDiv"></div>
    <div>
        <button class="hugeButton" @click="startCharge">Start charging
      <!--<img src="../../src/assets/battery-charge-status-icon.svg" alt="../../src/assets/battery-charge-status-icon.svg">-->
      </button>
        </div>
    <div>
        <button class="hugeButton" @click="buyCharge">Purchase charges
      <!--<img src="../../src/assets/repeat-arrow.svg" alt="../../src/assets/repeat-arrow.svg" id="flipSVG">-->
      </button>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Charge",
  data() {
    return {
      credits: this.credits
      };
  },
  methods: {
    startCharge() {
      this.$router.push({ name: "StartCharge" });
    },
    buyCharge() {
      this.$router.push({ name: "BuyCharge" });
    },
    home() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style scoped>
  #flipSVG {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";   
  }
  img {
 width: 20%;
 float: right;
  }
  .hugeButton {
    background-color: rgb(0, 125, 0)
  }
</style>
