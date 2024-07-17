<template>
  <el-card class="box-card">
    <el-button type="primary" size="medium" icon="el-icon-plus" @click="transformation(null)">新增学生信息</el-button>
    <el-input v-model="filterKeyword" placeholder="Filter keyword" style="margin-bottom:30px;" @input="handleFilter" />
    <el-table v-loading="listLoading" :data="filteredList" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="StuID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Sex" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Class" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="School" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Rating" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="Number" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="transformation(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCategoryById(scope.row.categoryId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="pagination-container"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.listQuery.pageNum"
      :page-size="this.listQuery.pageSize"
      :total="count"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper" />

    <!-- 添加或修改分类对话框 -->
    <el-dialog :visible.sync="addOrupdateDialogVisible" width="30%">
      <div class="dialog-title-container" slot="title" ref="categoryTitle" />
      <el-form label-width="100px" size="medium" :model="categoryForm">
        <el-form-item label="StuID：">
          <el-input v-model="categoryForm.categoryId" style="width:220px" />
        </el-form-item>
        <el-form-item label="Name：">
          <el-input v-model="categoryForm.categoryName" style="width:220px" />
        </el-form-item>
        <el-form-item label="Sex：">
          <el-input v-model="categoryForm.categorySex" style="width:220px" />
        </el-form-item>
        <el-form-item label="Class：">
          <el-input v-model="categoryForm.categoryClass" style="width:220px" />
        </el-form-item>
        <el-form-item label="School：">
          <el-input v-model="categoryForm.categorySchool" style="width:220px" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addOrupdateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getList, categoryList, addCategory, updateCategory, deleteCategory } from '@/api/stuinf'

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
      // 用户输入的筛选文本
      filterKeyword: '',
      list: null,
      filteredList: null, // 过滤后的数据列表
      listLoading: true,
      count: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      addOrupdateDialogVisible: false,
      categoryForm: {
        categoryId: null,
        categoryName: '',
        categorySex: '',
        categoryClass: '',
        categorySchool: ''
      }
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
        this.filteredList = this.list
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      var body = this.listQuery
      categoryList({ body }).then(response => {
        this.list = response.data.result
        this.count = response.data.totalSize
        this.listLoading = false
      })
    },
    addCategory() {
      if (this.categoryForm.categoryName.trim() === '') {
        this.$message.error('分类名不能为空')
        return false
      }
      var body = this.categoryForm
      if (body.categoryId == null) {
        addCategory(body).then(response => {
          this.$message({
            type: 'success',
            message: '添加分类成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      } else {
        updateCategory(body).then(response => {
          this.$message({
            type: 'success',
            message: '修改分类成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }
      this.addOrupdateDialogVisible = false
    },
    transformation(category) {
      if (category != null) {
        this.categoryForm = JSON.parse(JSON.stringify(category))
        this.$refs.categoryTitle.innerHTML = '修改分类'
      } else {
        this.categoryForm.categoryId = null
        this.categoryForm.categoryName = ''
        this.$refs.categoryTitle.innerHTML = '添加分类'
      }
      this.addOrupdateDialogVisible = true
    },
    deleteCategoryById(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }).catch(() => {
          console.log('error')
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '你已经取消删除该分类！'
        })
      })
    },
    handleFilter() {
      const keyword = this.filterKeyword.toLowerCase()
      this.filteredList = this.list.filter(item => {
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
