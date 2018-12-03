<template>
  <div class="component">
      <div v-for="item in charges" class="card blue-gray" style="text-align: left;">
        <div class="card-content">
          <h5>Port: {{ item.portNo }} <a style="float: right; color: green; font-weight: bold;">{{item.batteryLevel}}</a></h5>
          <h5>Device: <a>{{ item.device }}</a></h5>
          <h5>Started charging at <a>{{ item.chargeTime }}</a></h5>
          <h5>Fully charged at <a>{{ item.fullyChargedAt }}</a></h5>
        </div>
      </div>
      <div>
        <button class="button2" @click="history">Back</button>
      </div>
  </div>
</template>

<script>
var currentdate = new Date(); 

var datetime = ('0' + currentdate.getDate()).slice(-2) + "/"
                + ('0' + (currentdate.getMonth()+1)).slice(-2)  + " - " 
                + ('0' + (currentdate.getHours())).slice(-2) + ":"  
                + ('0' + (currentdate.getMinutes())).slice(-2) + ":" 
                + ('0' + (currentdate.getSeconds())).slice(-2);
var datetime2 = ('0' + currentdate.getDate()).slice(-2) + "/"
                + ('0' + (currentdate.getMonth()+1)).slice(-2)  + " - " 
                + ('0' + (currentdate.getHours()+1)).slice(-2) + ":"  
                + ('0' + (currentdate.getMinutes())).slice(-2) + ":" 
                + ('0' + (currentdate.getSeconds())).slice(-2);
             
export default {    
  data() {
    return {
        charges: [{            
            portNo: "portNo",
            batteryLevel: "25%",
            device: "This phone",
            chargeTime: datetime,
            fullyChargedAt: datetime2,
        }]
    };
  },
  methods: {    
    history() {
      this.$router.push({ name: "UserHistory" });
    }
  }
};
</script>
