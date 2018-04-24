<template lang="html">

</template>

<script>
export default {
  created: function () {
    this.$store.dispatch('signOut')
    this.$router.push('/')
  }
}
</script>

<style lang="css">
</style>
