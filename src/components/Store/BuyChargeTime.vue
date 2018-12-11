<template>
  <div class="Purchase">
    <h4 class="alignmentLeft">Your current balance:</h4>
    <h4 class="alignmentLeft">{{ credits }}</h4>
    <div id="feedbackDiv"></div>
    <div class="alignmentLeft">Select amount</div>
    <p class="inputDiv" v-for="possibleAmount in possibleAmounts"  @click="selectedAmount = possibleAmount">
        <input class="with-gap" name="xgroup1" :id="'amountChoice' + possibleAmount" type="radio" v-model="selectedAmount" :value="possibleAmount"/>
        <span>{{possibleAmount}} Credits</span>
    </p>
    <div class="alignmentLeft">Select payment method</div>
    <p class="inputDiv">
      <label for="test5">
        <input class="with-gap" name="group2" type="radio" id="test5" checked />
        <span>mPesa</span>
      </label>
    </p>
    <p class="inputDiv">
      <label for="test6">
        <input class="with-gap" name="group2" type="radio" id="test6" />
        <span>Paypal</span>
      </label>
    </p>
    <h5 class="alignmentLeft">Payment: ${{ selectedAmount * 0.99 }}</h5> 
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
.inputDiv {
  font-size: 16px;
}
.alignmentLeft {
  text-align: left;
}
</style>
