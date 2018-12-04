<template>
  <div class="Index">
    <form>
      <h3 class="companyName">mPower</h3>
        <div class="carouselDiv">
        <!--<template v-if="carouselId==0">
          <h5 class="informationHeader infodump1" >Charge your devices</h5>
          <p class="information infodump1" >Find a charging station nearby and charge any device, in the sun</p>
        </template>
        <template v-if="carouselId==1">
          <h5 class="informationHeader infodump2" >Pay with your phone</h5>
          <p class="information infodump2">Sign up and upload credits or ask a friend to generate you a code</p>
        </template>
        <template v-if="carouselId==2">
          <h5 class="informationHeader infodump3" >Plug in any device</h5>
          <p class="information infodump3" >Plug your device in the avalable plug. Yuo charge whatever you want, as long as you have the right plug</p>
        </template>
        <template v-if="carouselId==3">
          <h5 class="informationHeader infodump4" >Yeah, you're charging!</h5>
        </template>
        </div>
      <div id="infoFootnoteGrid">
        <div v-if="carouselId==0" class="informationFootnote footnoteSelected" v-on:click="carouselId=0"></div>
        <div v-else class="informationFootnote" v-on:click="carouselId=0"></div>
        <div v-if="carouselId==1" class="informationFootnote footnoteSelected" v-on:click="carouselId=1"></div>
        <div v-else class="informationFootnote" v-on:click="carouselId=1"></div>
        <div v-if="carouselId==2" class="informationFootnote footnoteSelected" v-on:click="carouselId=2 "></div>
        <div v-else class="informationFootnote" v-on:click="carouselId=2"></div>
        <div v-if="carouselId==3" class="informationFootnote footnoteSelected" v-on:click="carouselId=3"></div>
        <div v-else class="informationFootnote" v-on:click="carouselId=3"></div>-->
      </div>
    <button class="button4" @click="login">Log In</button>
    <button class="button4" @click="signup">Sign Up</button>
    <p id="noLoginButton">Or enter without log in</p>  
    </form>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      carouselId: 0
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    signup() {
      this.$router.push({ name: "Signup" });
    }
  }
};
</script>
<style scoped>
.companyName {
  margin: 15% 0;
  font-weight: bold;
}
.informationHeader {
  margin: 3% 0;
  font-weight: bold;
}
.carouselDiv {
  min-width: 100%;
  max-width: 100%;
  min-height: 140px;
  max-height: 140px;
  height: auto !important;
  height: 140px;
}
.information {
  margin: 0 7%;
  height: 7.5ex;
  line-height: 2.5ex;
  font-size: 18px;
}
#infoFootnoteGrid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 3%;
  margin: 25% 30%;
  margin-bottom: 5%;
}
.informationFootnote {
  padding: 45%;
  margin: 0 5%;
  border: 1px solid #000000;
  border-radius: 50px;
}
.footnoteSelected {
  background-color: #000000;
  border-radius: 50px;
}
#footNote1 {
  background-color: #000000;
}
#noLoginButton {
  margin: 5%;
  font-weight: bold;
}
</style>
