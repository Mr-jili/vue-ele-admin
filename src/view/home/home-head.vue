<template>
  <el-row :gutter="10">
    <el-col v-for="(item, index) in inforCardData" :key="index" :xs="12" :sm="8" :md="8" :lg="4">
      <div class="head-icon clearfix">
        <div class="content-left fl" :style="{ background: item.color}">
          <i :class="item.icon"></i>
        </div>
        <div class="content-right">
          <p style="paddingTop:10px;">
            <count-to :startVal="initNum" :endVal="item.count" :duration='3000'>
            </count-to>
          </p>
          <p>{{item.title}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import countTo from 'vue-count-to';
export default {
  name: "home-header",
  components: {
    countTo
  },
  data() {
    return {
      initNum: 0,
      inforCardData: [
        {
          title: "新增用户",
          icon: "el-icon-user-solid",
          count: 803,
          color: "#2d8cf0",
        },
        { title: "累计点击", icon: "el-icon-user-solid", count: 232, color: "#19be6b" },
        {
          title: "新增问答",
          icon: "el-icon-user-solid",
          count: 142,
          color: "#ff9900",
        },
        { title: "分享统计", icon: "el-icon-user-solid", count: 657, color: "#ed3f14" },
        {
          title: "新增互动",
          icon: "el-icon-user-solid",
          count: 12,
          color: "#E46CBB",
        },
        { title: "新增页面", icon: "el-icon-user-solid", count: 14, color: "#9A66E4" },
      ],
    };
  },
};
</script>
<style lang="less" scope>
.head-icon {
  width: 100%;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  .content-left {
    width: 36%;
    height: 100%;
    line-height: 120px;
    text-align: center;
    i {
      font-size: 36px;
      color: #fff;
    }
  }
  .content-right {
    height: 100%;
    text-align: center;
    background: #fff;
    p {
        font-size: 14px;
        span {
        font-size: 50px;
        }
    }
    
  }
}
</style>
