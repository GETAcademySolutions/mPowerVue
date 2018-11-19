<template>
    <div class="ChargeStore">
      <h4>Charges: {{ credits }}</h4>
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
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      let docRef = db.collection("users").doc(user.uid);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
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