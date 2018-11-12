<template>
  <div id="app">
    <Navbar />
  <div class="container">
    <router-view/>
  </div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
 
<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}

form {
  margin: 0 10%;
}

.card-panel {
  min-width: 100%;
  max-width: 100%;
  min-height: 140px;
  max-height: 140px;
  height: auto !important;
  height: 140px;
}

#app {
  font-family: Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.hugeButton {
  margin: auto;
  width: 100%;
  margin: 0.5%;
  padding: 4%;
  padding-bottom: 4.5%;
  font-size: 125%;
  background-color: rgb(150, 150, 150);
  color: #ffffff;
  border: none;
  border-radius: 5px;
}

.hugeButton:active {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
}

.hugeButton:focus {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
}

.button1 {
  margin: auto;
  width: 60%;
  margin: 0.5%;
  padding: 2%;
  padding-bottom: 2.25%;
  font-size: 200%;
  background-color: rgb(150, 150, 150);
  color: #ffffff;
  border: none;
  border-radius: 5px;
}

.button1:active {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.button1:focus {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.button2 {
  margin: auto;
  width: 40%;
  margin: 0.5%;
  padding: 2%;
  padding-bottom: 2.25%;
  font-size: 200%;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 5px;
}

.button2:active {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
}

.button2:focus {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
}

.button3 {
  margin: auto;
  width: 40%;
  margin: 0.5%;
  padding: 4% 2%;
  padding-bottom: 5%;
  font-size: 150%;
  background-color: rgb(150, 150, 150);
  color: rgb(240, 240, 240);
  border: none;
  border-radius: 5px;
}

.button3:active {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.button3:focus {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.button4 {
  margin: auto;
  width: 80%;
  margin: 0.5%;
  padding: 4% 2%;
  padding-bottom: 5%;
  font-size: 150%;
  background-color: rgb(0, 150, 50);
  color: rgb(240, 240, 240);
  border: none;
  border-radius: 5px;
}

.button4:active {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.button4:focus {
  background-color: #ffffff;
  color: rgb(150, 150, 150);
  border: 1px solid rgb(150, 150, 150);
}

.smallButton {
  margin: auto;
  width: 60px;
  height: 60px;
  margin: 2px;
  text-align: center;
  font-size: 100%;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  color: #000000;
  border: 2px solid #000000;
  border-radius: 50px;
}

.smallButton:active {
  background-color: rgb(0, 150, 50);
  color: #ffffff;
}

.smallButton:focus {
  background-color: rgb(0, 150, 50);
  color: #ffffff;
}

.textButton {
  font-weight: bold;
}

input {
  padding: 1%;
  padding-left: 2%;
  border-radius: 5px;
  outline: none;
}

.containmentDiv {
  margin: 2% 5%;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  min-height: 40px;
}
.containmentDivEx {
  margin: 1% 10%;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 5px;
  min-height: 40px;
}
</style>
