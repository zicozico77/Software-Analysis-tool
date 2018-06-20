<template>
  <div>
      <h1>Programming Assesment Tool</h1>
      <h2>Select your class</h2>
      <b-dropdown text="Select a Class" v-model="classes">
        <b-dropdown-item to="/studentDashboard">CSSE2002</b-dropdown-item>
        <b-dropdown-item>CSSE1001</b-dropdown-item>
        <b-dropdown-item>CSSE2310</b-dropdown-item>
      </b-dropdown>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

.md-select {
  width: 40%;
  margin: auto;
}
</style>

<script lang="ts">
export default {
  name: "Main",
  data () {
    return {
      classes: "classes"
    }
  },
  computed: {

  },
    created() {
        this.$router.push({name: 'studentDashboard'});
    }
}
</script>
