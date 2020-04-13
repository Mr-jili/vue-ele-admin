<template>
  <div>
    <home-head />
    <el-row :gutter="20" class="echart-example" style="margin-top:10px;">
      <el-col>
        <div ref="chartTool" :style="{ width: '100%', height: '300px' }"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="echart-example">
      <el-col>
        <div ref="myChart" :style="{ width: '100%', height: '300px' }"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="echart-example" style="margin-left:0;">
      <el-col>
        <home-example style="height: 300px;" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HomeHead from "./home-head";
import HomeExample from "./home-example";
import echarts from "echarts";
import { on, off } from "@/utils";
import { mapGetters } from "vuex";
export default {
  name: "home",
  components: {
    HomeHead,
    HomeExample,
  },
  data() {
    return {
      echartsDom: null, // 柱状
      CakeDom: null, // 饼状
      pieData: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324,
      },
    };
  },
  methods: {
    resize() {
      this.echartsDom.resize();
      this.CakeDom.resize();
    },
    // 饼状图
    cake() {
      let cakeData = [];
      this.pieData.forEach((item) => {
        cakeData.push(item.name);
      });
      const option = {
        title: {
          text: "用户访问来源",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: cakeData,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.$nextTick(() => {
        this.CakeDom = echarts.init(this.$refs.chartTool);
        this.CakeDom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
    // 柱状图
    columnar() {
      let resultData = null;
      let resultValue = null;
      resultData = Object.keys(this.barData);
      resultValue = Object.values(this.barData);
      const options = {
        title: { text: "每周用户活跃量", left: "center" },
        tooltip: {},
        xAxis: {
          data: resultData,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: resultValue,
            itemStyle: {
              color: "rgb(45, 140, 240)",
            },
          },
        ],
      };
      this.$nextTick(() => {
        this.echartsDom = echarts.init(this.$refs.myChart);
        this.echartsDom.setOption(options);
        on(window, "resize", this.resize);
      });
    },
  },
  mounted() {
    this.columnar();
    this.cake();
  },
  computed: {
    ...mapGetters(["GetCollapse"]),
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
  watch: {
    "GetCollapse": {
      handler() {
        this.resize()
      }
    },
  },
};
</script>
<style lang="less" scope>
.echart-example {
  margin-top: 20px;
  width: 100%;
  height: auto;
  background: #fff;
  margin-left: 0 !important;
  padding: 10px;
}
</style>
