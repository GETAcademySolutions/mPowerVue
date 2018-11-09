<template>
  <div ref="myNavBar" class="navbar">
    <nav class="green">
      <div class="nav-wrapper">
        <img src="../../assets/logo.png" class="" style="height:100%;"/>
        <a href="#" class="sidenav-trigger right"><i class="material-icons" style="visibility: hidden;">menu</i></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger left"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Index' }">Index</router-link></li>
          <li class="sidenav-close" v-if="user"><a>{{ user.email }}</a></li>
          <li class="sidenav-close" v-if="user"><a>{{ credits }}</a></li>
          <li class="sidenav-close" v-if="user"><a @click="home">Home</a></li>
          <li class="sidenav-close" v-if="user"><a @click="startChargePage">Charge</a></li>
          <li class="sidenav-close" v-if="user"><a @click="buyChargeTime">Store</a></li>
          <li class="sidenav-close" v-if="user"><a @click="userHistory">History</a></li>
          <li class="sidenav-close" v-if="user"><a @click="mPowerMap">Map</a></li>
          <li class="sidenav-close" v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav>

      <div class="nav-wrapper">
        <ul class="sidenav" id="mobile-demo">
          <li id="liNr1" class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li id="liNr2" class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li id="liNr3" class="sidenav-close" v-if="!user"><router-link :to="{ name: 'Index' }">Index</router-link></li>
          <li id="liNr4" class="sidenav-close" v-if="user"><a>{{ user.email }}</a></li>
          <li id="liNr5" class="sidenav-close" v-if="user"><a>{{ credits }}</a></li>
          <li id="liNr6" class="sidenav-close" v-if="user"><a @click="home">Home</a></li>
          <li id="liNr7" class="sidenav-close" v-if="user"><a @click="startChargePage">Charge</a></li>
          <li id="liNr8" class="sidenav-close" v-if="user"><a @click="buyChargeTime">Store</a></li>
          <li id="liNr9" class="sidenav-close" v-if="user"><a @click="userHistory">History</a></li>
          <li id="liNr10" class="sidenav-close" v-if="user"><a @click="mPowerMap">Map</a></li>
          <li id="liNr11" class="sidenav-close" v-if="user"><a @click="logout">Logout</a></li>
        </ul>
      </div>
  </div>
</template>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/materialize.min.js"></script>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
import "materialize-css";
import Login from "@/components/Login";

export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      credits: this.credits
    };
  },
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      let docRef = db.collection("users").doc(user.uid);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("got credits: ", doc.data().credits);
            this.credits = doc.data().credits;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.credits = credits;
      } else {
        this.user = null;
        this.credits = null;
      }
    })
  },
  computed: {},
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Index" });
        });
    },
    home() {
      this.$router.push({ name: "Home" });
      for (let i = 6; i <= 10; i++) {
        document.getElementById("liNr" + i).style.textDecoration = "none";
      }
      document.getElementById("liNr6").style.textDecoration = "underline";
    },
    startChargePage() {
      this.$router.push({ name: "StartCharge" });
      for (let i = 6; i <= 10; i++) {
        document.getElementById("liNr" + i).style.textDecoration = "none";
      }
      document.getElementById("liNr7").style.textDecoration = "underline";
    },
    buyChargeTime() {
      this.$router.push({ name: "BuyChargeTime" });
      for (let i = 6; i <= 10; i++) {
        document.getElementById("liNr" + i).style.textDecoration = "none";
      }
      document.getElementById("liNr8").style.textDecoration = "underline";
    },
    userHistory() {
      this.$router.push({ name: "UserHistory" });
      for (let i = 6; i <= 10; i++) {
        document.getElementById("liNr" + i).style.textDecoration = "none";
      }
      document.getElementById("liNr9").style.textDecoration = "underline";
    },
    mPowerMap() {
      this.$router.push({ name: "MPowerMap" });
      for (let i = 6; i <= 10; i++) {
        document.getElementById("liNr" + i).style.textDecoration = "none";
      }
      document.getElementById("liNr10").style.textDecoration = "underline";
    }
  },
  mounted() {
    console.log("mounted");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.credits = credits;
      } else {
        this.user = null;
        this.credits = null;
      }
    })
    // let elems = document.querySelectorAll('.sidenav');
    // let instances = M.Sidenav.init(elems, options);
    M.AutoInit(); // That way, it is only initialized when the component is mounted
  }
};
</script>

<style scoped>
.sidenav {
  width: 50%;
  text-align: left;
}
</style>
