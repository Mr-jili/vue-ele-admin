<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive exclude="home">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.app-main {
  width: 100%;
  height: 100%;
  z-index: 1;
}

</style>