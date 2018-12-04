<template>
    <div class="History">
        <div class="containmentDiv">
          <h6>ChargingCard1</h6>           
        </div>
        <div class="containmentDiv"> 
          <h6>ChargingCard2</h6>                   
        </div>
        <div class="containmentDiv">  
          <h6>ChargingCard3</h6>          
        </div>
    <div>
        <button class="button4" @click="chargingCard">ChargingCard</button>
        </div>
    <div>
        <button class="button2" @click="home">Back</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {};
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
    chargingCard() {
      this.$router.push({ name: "ChargingCard" });
    }
  }
};
</script>
