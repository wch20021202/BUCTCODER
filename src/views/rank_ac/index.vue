<template>
    <div class="app-container">
      <el-input v-model="filterKeyword" placeholder="Filter keyword" style="margin-bottom:30px;" @input="handleFilter" />
      <el-table v-loading="listLoading" :data="filteredlist" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="排名" >
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="学号"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="CodeForce分数"  align="center" >
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="解题数"  align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
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
        list: null,
        filteredlist: null,
        listLoading: true
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
  