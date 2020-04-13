<template>
  <div class="tags-nav">
    <div class="left">
      <Button class="header-button" @click="handleScroll(240)">
        <i class="el-icon-arrow-left"></i>
      </Button>
    </div>
    <div class="right">
      <Button
        class="header-button"
        @click="handleScroll(-240)"
        style="border-right: 1px solid #f0f0f0;"
      >
        <i class="el-icon-arrow-right"></i>
      </Button>
      <el-dropdown class="el-dropdown-link" trigger="click">
        <Button class="header-button head-width">
          <i class="el-icon-circle-close"></i>
        </Button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeOthersTags(1)">
            关闭其他
          </el-dropdown-item>
          <el-dropdown-item @click.native="closeAllTags(selectedTag)">
            关闭所有
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="middle">
      <div
        class="scroll-outer tags-view-wrapper"
        ref="scrollOuter"
        @DOMMouseScroll="handlescroll"
        @mousewheel="handlescroll"
      >
        <div
          ref="scrollBody"
          class="scroll-body"
          :style="{ left: left + 'px' }"
        >
          <transition-group name="taglist-moving-animation">
            <router-link
              v-for="tag in visitedViews"
              ref="tag"
              :key="tag.path"
              :class="isActive(tag) ? 'active' : ''"
              :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
              tag="span"
              class="tags-view-item"
              @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
              @contextmenu.prevent.native="openMenu(tag, $event)"
            >
              {{ tag.title }}
              <span
                v-if="!isAffix(tag)"
                class="el-icon-close"
                @click.prevent.stop="closeSelectedTag(tag)"
              />
            </router-link>
          </transition-group>
        </div>
        <ul
          v-show="visible"
          :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
          class="contextmenu"
        >
          <li @click="closeOthersTags(2)">关闭其他</li>
          <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import path from "path";
export default {
  name: "content-menu",
  data() {
    return {
      visible: false,
      contextMenuTop: 0,
      left: 0,
      contextMenuLeft: 0,
      currentTag: {},
      selectedTag: {},
      affixTags: [],
      tagView: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.currentTag = this.$refs.tag[0].$route;
    });
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix;
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch("tagsView/delView", view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    toLastView(visitedViews) {
      this.left = 0;
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        this.$router.push("/");
      }
    },
    closeOthersTags(num) {
      if (num === 1) {
        this.$router.push(this.currentTag);
        this.$store
          .dispatch("tagsView/delOthersViews", this.currentTag)
          .then(() => {
            this.moveToCurrentTag();
            this.left = 0;
          });
      } else {
        this.$router.push(this.selectedTag);
        this.$store
          .dispatch("tagsView/delOthersViews", this.selectedTag)
          .then(() => {
            this.moveToCurrentTag();
            this.left = 0;
          });
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("tagsView/updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    closeAllTags(view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return;
        }
        this.toLastView(visitedViews, view);
        this.left = 0;
      });
    },
    openMenu(tag, e) {
      const menuMinWidth = 200;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 10;
      if (left > maxLeft) {
        this.contextMenuLeft = maxLeft;
      } else {
        this.contextMenuLeft = left;
      }
      this.contextMenuTop = e.clientY - 64;
      if (tag.name === "home") {
        this.visible = false;
      } else {
        this.visible = true;
      }
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth;
      const bodyWidth = this.$refs.scrollBody.offsetWidth;
      if (offset > 0) {
        this.left = Math.min(0, this.left + offset);
      } else {
        if (outerWidth < bodyWidth) {
          if (this.left < -(bodyWidth - outerWidth)) {
            // eslint-disable-next-line no-self-assign
            this.left = this.left;
          } else {
            this.left = Math.max(this.left + offset, outerWidth - bodyWidth);
          }
        } else {
          this.left = 0;
        }
      }
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$router.options.routes;
    }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
      this.currentTag = this.$refs.tag[0].$route;
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>
<style lang="less" scope>
.tags-nav {
  position: relative;
  height: 40px;
  line-height: 39px;
  box-shadow: inset 0 0 3px 2px hsla(0, 0%, 39.2%, 0.1);
  background: #f0f0f0;
  .left {
    position: absolute;
    width: 28px;
    height: 32px;
    left: 0;
    z-index: 999;
  }
  .right {
    position: absolute;
    right: 0;
    width: 62px;
    height: 38px;
    z-index: 999;
    margin-right: -2px;
    .head-width {
      width: 32px;
    }
    .el-dropdown {
      font-size: 100%;
    }
  }
  .middle {
    position: relative;
    margin: 0 62px 0 28px;
    word-break: break-word;
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e8eaec;
        background: #fff;
        padding: 0 10px;
        font-size: 12px;
        margin-left: 5px;
        border-radius: 2px;
        &:last-of-type {
          margin-right: 5px;
        }
        &::before {
          content: "";
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
          background-color: #eee;
          vertical-align: middle;
        }
        &.active {
          &::before {
            content: "";
            background-color: #2d8cf0;
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
            vertical-align: middle;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 0 28px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
}
.header-button {
  width: 28px;
  line-height: 36px;
  border: none;
  background: #fff;
  border-radius: 1px;
  i {
    font-size: 14px;
    font-weight: bold;
  }
}
.scroll-outer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
  .scroll-body {
    height: ~"calc(100% - 1px)";
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
    .ivu-tag-dot-inner {
      transition: background 0.2s ease;
    }
  }
}
</style>
<style lang="less">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      color: rgba(0, 0, 0, 0.3);
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
