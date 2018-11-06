<template>
    <div class="signup">
      <!--<form class="card-panel" @submit.prevent="signup">-->
      <div class="field">
        <input id="firstName" type="text" v-model="firstName" placeholder="First name">
      </div>
      <div class="field">
        <input id="lastName" type="text" v-model="lastName" placeholder="Last name">
      </div>
      <div>
        <input class="accountInput" id="email" type="email" v-model="email" placeholder="Email"> <!--style="border: 1px solid grey; border-radius: 10px; padding-left: 15px;" -->
      </div>
      <div>
        <input class="accountInput" id="password" type="password" v-model="password" placeholder="Password">
      </div>
      <div class="field">
        <input id="name" type="text" v-model="alias" placeholder="User name">
      </div> -
      <p v-if="feedback != null" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="button4">Sign up</button>
        <p class="textButton" style="text-align: center; margin-top: 2%;">Terms and conditions</p>
        </div>
        <!--</form>-->
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  name: "Signup",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null,
      credits: 0
      }
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
    signup(){
      if((this.email != null) && (this.password !== null)) {
        this.feedback = null
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
            db.collection('users').doc(cred.user.uid).set({
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                alias: this.alias,
                geolocation: null,
                credits: this.credits,
                user_id: cred.user.uid
            })
        }).then(() => {
            this.$router.push({ name: 'HomeScreen' })
        })
        .catch(err => {
            this.feedback = err.message
        })
      } else {
        this.feedback = 'Please fill in all fields'
      }
    }
  }
};
</script>

<style <style scoped>
.signup{
  margin: auto;
  max-width: 400px;
}
.signup .field{
  text-align: left;
  margin-bottom: 5px;
}
.signup button {
  width: 100%;
}
</style>