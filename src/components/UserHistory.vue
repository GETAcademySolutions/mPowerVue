<template>
    <div class="History">
        <div class="containmentDivEx">
            <button class="button2">charges</button>        
            <button class="button2">code</button>            
        </div>
        <div class="containmentDiv">
          Info1           
        </div>
        <div class="containmentDiv"> 
          Info2                     
        </div>
        <div class="containmentDiv">  
          Info3                   
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
    }
  }
};
</script>
<style scoped>
.button1 {
  margin: 0;
  width: 49.83%;
}
</style>
