<template>
    <div class="Map">
        <img src="../../src/assets/Yu b her.jpg" width="50%">
      <div>
        <button class="button2" @click="home">Back</button>
        </div>
    </div>
</template>

<script>
export default {
  name: "History",
  data() {
    return {};
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>