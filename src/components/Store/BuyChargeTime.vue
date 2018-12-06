<template>
  <div class="Purchase">
    <h4>Your current balance:</h4>
    <h4>{{ credits }}</h4>
    <div id="feedbackDiv"></div>
    <div style="text-align: left;">Select amount</div>
    <p v-for="possibleAmount in possibleAmounts"  @click="selectedAmount = possibleAmount">
        <input style="font-size: 16px;" class="with-gap" name="xgroup1" :id="'amountChoice' + possibleAmount" type="radio" v-model="selectedAmount" :value="possibleAmount"/>
        <span style="font-size: 16px;">{{possibleAmount}} Credits</span>
    </p>
    <div style="text-align: left;">Select payment method</div>
    <p>
      <label for="test5">
        <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test5" checked />
        <span style="font-size: 16px;">mPesa</span>
      </label>
    </p>
    <p>
      <label for="test6">
        <input style="font-size: 16px;" class="with-gap" name="group2" type="radio" id="test6" />
        <span style="font-size: 16px;">Paypal</span>
      </label>
    </p>
    <h5 style="text-align: left;">Payment: $</h5> <!--{{ value }}-->
    <div>
      <button class="button4" @click="confirmedPurchase()">Next</button>
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
      credits: 0,
      selectedAmount: 1,
      possibleAmounts: [1,5,10,25],
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
  computed: {},
  methods: {
    confirmedPurchase() {
      let user = firebase.auth().currentUser;
      const mySelectedAmount = this.selectedAmount;
      const newCredits = this.credits + this.selectedAmount;
      this.credits = newCredits; 
      db.collection("users")
        .doc(user.uid)
        .set(
          {
            credits: newCredits
          },
          {
            merge: true
          }
        )
        .then(function() {
          console.log("Credits successfully changed by: " + mySelectedAmount);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    buyCharge() {
      this.$router.push({
        name: "BuyCharge"
      });
    }
  }
};
</script>
<style scoped>
p {
  text-align: left;
}
span {
  font-size: 50px;
}
</style>
