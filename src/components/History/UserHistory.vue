<template>
  <div class="History">
    <div class="col s12 m6">
      <div class="card green">
        <div class="card-action">
          <a v-on:click="isHidden = false">Charging</a>
          <a v-on:click="isHidden = true">History</a>
        </div>
      </div>
    </div>
    <charging-card v-if="charges && !isHidden" v-bind:charges="charges" />
    <div v-if="isHidden">      
    <h5>History:</h5>
    <div v-for="item in charges" class="card blue-gray" style="text-align: left; border: 1px solid black;">
      <div class="card-content">
        <p>
          <b>Port:</b> {{ item.portNo }}
          <a style="float: right; color: green; font-weight: bold;">{{item.batteryLevel}}</a>
        </p>
        <p>
          <b>Device:</b>
          <a>{{ item.device }}</a>
        </p>
        <p>Started charging at
          <a>{{ item.chargeTime }}</a>
        </p>
        <p>Fully charged at
          <a>{{ item.fullyChargedAt }}</a>
        </p>
      </div></div>
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
  import ChargingCard from "@/components/History/ChargingCard";
  
  var currentdate = new Date();

  var datetime =
    ("0" + currentdate.getDate()).slice(-2) +
    "/" +
    ("0" + (currentdate.getMonth() + 1)).slice(-2) +
    " - " +
    ("0" + currentdate.getHours()).slice(-2) +
    ":" +
    ("0" + currentdate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentdate.getSeconds()).slice(-2);
  var datetime2 =
    ("0" + currentdate.getDate()).slice(-2) +
    "/" +
    ("0" + (currentdate.getMonth() + 1)).slice(-2) +
    " - " +
    ("0" + (currentdate.getHours() + 1)).slice(-2) +
    ":" +
    ("0" + currentdate.getMinutes()).slice(-2) +
    ":" +
    ("0" + currentdate.getSeconds()).slice(-2);

  export default {
    name: "History",
    data() {
      return {
        isHidden: false,
        credits: this.credits,
        charges: [],
        chargeObject: {
          portNo: 0,
          device: null,
          chargeTime: null,
          batteryLevel: null,
          fullyChargedAt: null
        },      
        charges: [{
            portNo: "portNo",
            batteryLevel: "100%",
            device: "This phone",
            chargeTime: datetime,
            fullyChargedAt: datetime2
          },
          {
            portNo: "portNo",
            batteryLevel: "100%",
            device: "This phone",
            chargeTime: datetime,
            fullyChargedAt: datetime2
          }
        ]
      };
    },
    methods: {
      home() {
        this.$router.push({
          name: "Home"
        });
      },
      chargingCard() {
        this.$router.push({
          name: "ChargingCard"
        });
      }
    },
    components: {
      ChargingCard
    }
  };

</script>
<style scoped>
p {
  font-size: 14px;
}
.card-content {
  padding: 20px 50px;
}
</style>