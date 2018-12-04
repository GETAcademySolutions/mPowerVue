<template>
  <div class="component">
      <div v-for="item in charges" class="card blue-gray" style="text-align: left; border: 1px solid black;">
        <div class="card-content">
          <h5>Port: {{ item.portNo }} <a style="float: right; color: green; font-weight: bold;">{{item.batteryLevel}}</a></h5>
          <h5>Device: <a>{{ item.device }}</a></h5>
          <h5>Started charging at <a>{{ item.chargeTime }}</a></h5>
          <h5>Fully charged at <a>{{ item.fullyChargedAt }}</a></h5>
        </div>
      </div>
  </div>
</template>

<script>
  var currentdate = new Date();

  var datetime = ('0' + currentdate.getDate()).slice(-2) + "/" +
    ('0' + (currentdate.getMonth() + 1)).slice(-2) + " - " +
    ('0' + (currentdate.getHours())).slice(-2) + ":" +
    ('0' + (currentdate.getMinutes())).slice(-2) + ":" +
    ('0' + (currentdate.getSeconds())).slice(-2);
  var datetime2 = ('0' + currentdate.getDate()).slice(-2) + "/" +
    ('0' + (currentdate.getMonth() + 1)).slice(-2) + " - " +
    ('0' + (currentdate.getHours() + 1)).slice(-2) + ":" +
    ('0' + (currentdate.getMinutes())).slice(-2) + ":" +
    ('0' + (currentdate.getSeconds())).slice(-2);

  export default {
    data() {
      return {
        charges: [{
          portNo: "portNo",
          batteryLevel: "25%",
          device: "This phone",
          chargeTime: datetime,
          fullyChargedAt: datetime2
        },{
          portNo: "portNo",
          batteryLevel: "25%",
          device: "This phone",
          chargeTime: datetime,
          fullyChargedAt: datetime2
        }]
      };
    },
    methods: {
      history() {
        this.$router.push({ name: "UserHistory" });
      },
      makenew() {
        let charge = null;
        charge.user_id = this.user_id;
        charge.timestamp = Date.now();
        charge.ticks = 60 * 60;
        charge.portNo = xxx;
        charge.progress = 0;
        charge.id = this.charges.length;
        charges.push(charge);
        setInterval(() => {
          charge.ticks--;
          if (charge.ticks <= 0) {
            clearInterval();
            let ix = this.charges.findIndex(e => e.ticks <= 0);
            if (~ix) {
              this.charges.splice(ix, 1);
            }
          }
        }, 1000);
      }
    }
  };

</script>
