<template>
  <el-container class="main">
    <el-main class="left">
      <!-- codeforces比赛列表 -->
      <el-container class="item">
        <el-main><CfList></CfList></el-main>
      </el-container>
        <!-- atcoder比赛列表 -->
      <el-container class="item">
        <el-main><AcList></AcList></el-main>
      </el-container>
    </el-main>
    <el-main class="right">
      <!-- Codeforces账户排名 -->
      <el-container class="item">
        <el-main><CfRank></CfRank></el-main>
      </el-container >
      <!-- Atcoder账户排名 -->
      <el-container class="item">
        <el-main><AcRank></AcRank></el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>

import AcRank from '@/views/sheet/AcRank.vue'
import CfRank from '@/views/sheet/CfRank.vue'
import CfList from '@/views/sheet/CfList.vue'
import AcList from '@/views/sheet/AcList.vue'


export default {
  name: 'Dashboard',
  components:{
    CfRank,
    AcRank,
    CfList
  },
}

</script>

<style scoped>
.main {
  margin: 0px 10%;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
  margin: 0;
}

.left {
  text-align: center;
  width: 50%;
  margin: 0px 5px;
}

.right {
  text-align: center;
  width: 50%;
  margin: 0px 5px;
}

.item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

</style>