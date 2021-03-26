<template>
  <div id="tabs">
    <el-tabs
      v-model="tab"
      type="border-card"
      @tab-remove="removeTab"
      @tab-click="selectTab"
    >
      <el-tab-pane
        :closable="tablist.length !== 1"
        v-for="item in tablist"
        :key="item.name"
        :label="item.displayName"
        :name="item.name"
      >
        <router-view v-if="isRouterAlive"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "tabs",
  data() {
    return {
      tab: "",
      isRouterAlive: true,
    };
  },
  computed: {
    tablist() {
      return this.$store.state.tablist;
    },
    activetab() {
      return this.$store.state.activetab;
    },
  },
  methods: {
    removeTab(targetName) {
      let activeName = this.tab;
      if (activeName === targetName) {
        this.tablist.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = this.tablist[index + 1] || this.tablist[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.tab = activeName;
      let tab = this.$store.state.tablist.filter(
        (item) => item.name === targetName
      );
      this.$store.commit("delTab", tab[0]);
      if (this.tablist.length === 0) {
        this.$router.push({
          path: "/",
        });
      } else {
        this.$router.push({
          name: this.tab,
        });
      }
      this.$store.commit("activeTab", this.tab);
    },
    selectTab(tab) {
      this.$store.commit("activeTab", tab.name);
      this.$router.push({
        name: tab.name,
      });
    },
  },
  watch: {
    activeTab: {
      deep: true,
      immediate: true,
      handler(val) {
        this.tab = val;
        this.$store.commit("activeTab", val);
      },
      
    },
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        this.tab = val.name;
        this.$store.commit("activeTab", val.name);
      },
    },
  },
};
</script>
<style lang="less">
#tabs {
  width: calc(100% - 220px);
  height: 100%;
}
.el-tabs {
  height: 100%;
  .el-tabs__content{
    height: calc(100% - 40px);
    box-sizing: border-box;
    overflow-y: auto;
    .el-tab-pane{
      height: 100%;
    }
  }
  .el-tabs__content::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>