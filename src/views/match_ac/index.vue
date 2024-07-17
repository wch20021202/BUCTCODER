<template>
  <div class="app-container">
    <el-input v-model="filterKeyword" placeholder="Filter keyword" style="margin-bottom:30px;" @input="handleFilter" />
    <el-table v-loading="listLoading" :data="filteredlist" element-loading-text="Loading" border fit highlight-current-row >
      <el-table-column align="center" label="比赛ID" >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="比赛类型">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持续时间"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="参加人数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="enterUrl(scope.row.url)">参加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      filterKeyword: '',
      list: null,
      filteredlist: null,
      listLoading: true,
      order: 'dsc'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.filteredlist = this.list
        this.listLoading = false
      })
    },
    enterUrl(url) {
      window.open(url, '_blank');
    },
    handleFilter() {
      const keyword = this.filterKeyword.toLowerCase()
      this.filteredlist = this.list.filter(item => {
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.author.toLowerCase().includes(keyword) ||
          item.pageviews.toString().includes(keyword)
        )
      })
    }
  }
}
</script>
