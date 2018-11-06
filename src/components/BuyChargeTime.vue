<template>
    <div class="Purchase">
      <h3>Your current balance:</h3>
      <h3>{{ credits }}</h3>
      <div id="feedbackDiv"></div>
    <div>
        <button class="smallButton" @click="confirmedPurchase(1)" value="1">1</button>
        <button class="smallButton" @click="confirmedPurchase(5)" value="5">5</button>
        <button class="smallButton" @click="confirmedPurchase(10)" value="10">10</button>
        <button class="smallButton" @click="confirmedPurchase(25)" value="25">25</button>
        </div>
    <div>
        <button class="button2" @click="buyCharge">Back</button>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "BuyChargeTime",
  firebase: {},
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
  },
  computed: {},
  methods: {
    confirmedPurchase(n) {
      let user = firebase.auth().currentUser;
      console.log("credits: " + this.credits);
      db.collection("users")
        .doc(user.uid)
        .set({ credits: this.credits += n }, { merge: true })
        .then(function() {
          console.log("Credits successfully changed by: " + n);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    buyCharge() {
      this.$router.push({ name: "BuyCharge" });
    }
  },

};
</script>