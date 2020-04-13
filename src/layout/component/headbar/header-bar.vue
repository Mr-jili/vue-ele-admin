<template>
  <el-row :gutter="20" class="headerTop">
    <el-col :span="1">
      <div class="header-left" @click="handleHeadClose">
        <span v-show="collapse"><i class="el-icon-s-unfold"></i></span>
        <span v-show="!collapse"><i class="el-icon-s-fold"></i></span>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="header-center">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path">
            <i :class="item.meta.icon" style="font-size:12px;paddingRight:5px;"></i>
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="header-right">你好，管理员</div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "header-bar",
  props: {
    isCollapseChild: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      collapse: false,
      breadcrumb: [],
    };
  },
  created() {
    this.collapse = this.isCollapseChild;
    this.getBreadcrumb();
  },
  methods: {
    handleHeadClose() {
      this.collapse = !this.collapse;
      this.$store.commit('COLLAPSED', this.collapse)
      this.$emit("handleCollapse", this.collapse);
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      this.breadcrumb = matched.filter(item => item.meta && item.meta.title && item.meta.icon && item.name !== 'home')
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>
<style lang="less" scope>
.headerTop {
  height: 64px;
  padding: 0 20px;
}
.header-left {
  font-size: 26px;
  cursor: pointer;
  color: #5c6b77;
  line-height: 64px;
}
.el-breadcrumb {
  line-height: 64px;
}
.header-right {
  line-height: 64px;
  color: #606266;
}
</style>
