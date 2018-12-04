<template>
    <div class="login">
      <!--<form class="card-panel">--> <!--@submit.prevent="login"-->
        <div style="margin-top: 5%;">
          <input style="border: 1px solid grey; border-radius: 10px; padding-left: 15px; margin: 10px 0;" class="accountInput" id="email" type="email" v-model="email" placeholder="Email">
        </div>
        <div>
          <input style="border: 1px solid grey; border-radius: 10px; padding-left: 15px; margin: 10px 0;" class="accountInput" id="password" type="password" v-model="password" placeholder="Password">
        </div>
        <p class="textButton">Forgot password?</p>
        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        <div class="center" style="margin-top: 20%;">
          <button class="button4" @click="login">Log in</button>
        </div>
        <p class="textButton" style="margin-top: 10%;" @click="signup">Create New Account</p>
      <!--</form>-->
    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user.uid);
            this.$router.push({ name: "Home", params: { id: cred.user.uid } });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please fill in both fields";
      }
    },
    signup() {
      this.$router.push({ name: "Signup" });
    }
  }
};
</script>

<style scoped>
.login {
  margin: auto;
  max-width: 400px;
  margin-top: 60px;
  border: 0px;
}
.login .field {
  text-align: left;
  margin-bottom: 16px;
}
.login button {
  width: 100%;
}
</style>