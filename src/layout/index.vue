<template>
  <el-container>
    <el-aside :class="isCollapse ? 'min-side-bar' : 'max-side-bar'">
      <div class="side-bar">
        <div class="content-bar">
          <el-row class="tac">
            <el-col>
              <div class="logo-icon" @click="handelClick">
                <img :src="minLogo" alt="logo" v-show="isCollapse" />
                <img :src="maxLogo" alt="logo" v-show="!isCollapse" />
              </div>
              <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                  :default-active="$router.path"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse"
                  :collapse-transition="false"
                  background-color="#001529"
                  text-color="#fff"
                  :unique-opened="true"
                  active-text-color="#fff"
                  mode="vertical"
                  router
                >
                  <sidebar-item
                    v-for="item in routes"
                    :item="item"
                    :key="item.path"
                    :base-path="item.path"
                  ></sidebar-item>
                </el-menu>
              </el-scrollbar>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header height="102px">
        <header-bar :isCollapseChild="isCollapse" @handleCollapse="handleCollOpen"/>
        <ContentMenu />
      </el-header>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import maxLogo from "@/assets/maxLogo.png";
import minLogo from "@/assets/minLogo.png";
import sidebarItem from "./component/sidebar/sidebar-item";
import AppMain from "./component/AppMain";
import HeaderBar from "./component/headbar/header-bar";
import ContentMenu from "./component/headbar/content-menu";
export default {
  name: "Main",
  components: {
    sidebarItem,
    AppMain,
    HeaderBar,
    ContentMenu
  },
  data() {
    return {
      isCollapse: false,
      maxLogo: maxLogo,
      minLogo: minLogo
    };
  },
  methods: {
    // 点击logo
    handelClick() {
      this.$router.push({ path: "/" });
    },
    // isCollapse父子传递
    handleCollOpen(val) {
      this.isCollapse = val;
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  }
};
</script>
<style lang="less" scope>
.min-side-bar {
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  flex: 0 0 60px;
  overflow: hidden;
  i {
    font-size: 14px;
    color: #fff;
  }
  .el-menu--collapse {
    .el-submenu__title {
      span {
        visibility: hidden;
      }
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
}
.max-side-bar {
  width: 256px;
  min-width: 256px;
  max-width: 256px;
  flex: 0 0 256px;
  i {
    font-size: 14px;
    color: #fff;
  }
  .el-submenu__icon-arrow {
    right: 30px;
    font-weight: bold;
  }
}
.side-bar {
  position: relative;
  overflow-y: scroll;
  z-index: 999;
  height: 100%;
  margin-right: -20px;
  .content-bar {
    height: 100%;
    background: #001529;
    .logo-icon {
      padding: 10px;
      img {
        height: 44px;
        width: auto;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
<style lang="less">
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  background-color: #fff;
  z-index: 1;
}

.el-aside {
  background-color: #d3dce6;
  position: relative;
  overflow: hidden;
  line-height: 200px;
}

.el-main {
  position: relative;
  background-color: #f5f7f9;
}
.el-menu-vertical-demo {
  border: none;
}
.el-scrollbar__thumb {
  width: 0 !important;
}
</style>
