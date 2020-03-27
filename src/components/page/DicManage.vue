<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 字典明细
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <div class="head">  <el-button type="primary" round @click="addStudent">新增字典</el-button></div>
      </div>
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="明细id"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dic_id"
          label="字典编号"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dic_name"
          label="字典名称"
          align="center">
        </el-table-column>
        <el-table-column label="是否固定" width="110"  align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='固定'?'success':(scope.row.state==='不固定'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="cre_date"
          label="创建时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cre_name"
          label="创建者"
          align="center">
        </el-table-column>
        <el-table-column
          prop="last_date"
          label="最后一次修改时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="last_name"
          label="最后一次修改者"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
            <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog title="新增字典信息" :visible="addstudentForm" v-if='addstudentForm' size="tiny" :modal-append-to-body='false' @close='closeDialog'>
      <el-form id="#addsForm" ref="addsForm" :model="addsForm" label-width="80px">
        <el-form-item label="明细id" prop="id">
          <el-input  v-model="addsForm.id" max-length="10"></el-input>
        </el-form-item>
        <el-form-item label="字典编号" prop="dic_id">
          <el-input v-model="addsForm.dic_id"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" prop="dic_name">
          <el-input v-model="addsForm.dic_name"></el-input>
        </el-form-item>
        <el-form-item label="是否固定" prop="state">
          <el-input v-model="addsForm.state"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="cre_date">
          <el-input v-model="addsForm.cre_date"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="cre_name">
          <el-input v-model="addsForm.cre_name"></el-input>
        </el-form-item>
        <el-form-item label="最后一次修改时间" prop="last_date">
          <el-input v-model="addsForm.last_date"></el-input>
        </el-form-item>
        <el-form-item label="最后一次修改者" prop="last_name">
          <el-input v-model="addsForm.last_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser()">确定</el-button>
          <el-button @click="addstudentForm = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="字典编号">
          <el-input v-model="form.dic_id"></el-input>
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="form.dic_name"></el-input>
        </el-form-item>
        <el-form-item label="是否固定">
          <el-input v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.cre_date"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="form.cre_name"></el-input>
        </el-form-item>
        <el-form-item label="最后一次修改时间">
          <el-input v-model="form.last_date"></el-input>
        </el-form-item>
        <el-form-item label="最后一次修改者">
          <el-input v-model="form.last_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addsForm: {
        id: '',
        dic_id: '',
        dic_name: '',
        cre_name: '',
        last_name: '',
        state: '',
        cre_date: '',
        last_date: ''
      },
      editVisible: false,
      addstudentForm: false,
      form: {},
      idx: -1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      list: [{
        id: '1',
        dic_id: '101',
        dic_name: '职务',
        cre_name: '陈泽狂林',
        last_name: '陈泽林',
        state: '固定',
        cre_date: '2019-11-1',
        last_date: '2020-1-1'
      },
      {
        id: '2',
        dic_id: '200',
        dic_name: '证件',
        cre_name: '陈泽魔林',
        last_name: '陈泽林',
        state: '固定',
        cre_date: '2019-10-11',
        last_date: '2020-2-29'
      },
      {
        id: '3',
        dic_id: '503',
        dic_name: '签到',
        cre_name: '陈泽怪林',
        last_name: '陈泽林',
        state: '不固定',
        cre_date: '2019-11-11',
        last_date: '2020-3-7'
      },
      {
        id: '4',
        dic_id: '708',
        dic_name: '状态',
        cre_name: '陈泽猛林',
        last_name: '陈泽林',
        state: '固定',
        cre_date: '2019-10-20',
        last_date: '2020-3-20'
      }]
    }
  },
  methods: {
    // 删除操作
    handleDelete (index) {
      // 二次确认删除
      console.log(index)
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功')
          this.list.splice(index, 1)
        })
        .catch(() => {})
    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index
      console.log(this.idx)
      this.form = row
      console.log(this.form)
      this.editVisible = true
    },
    // 保存编辑
    saveEdit () {
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      this.$set(this.tableData, this.idx, this.form)
    },
    addStudent () {
      this.addstudentForm = true
    },
    closeDialog () {
      this.addstudentForm = false
    },
    addUser () {
      this.list.push(this.addsForm)
      this.addstudentForm = false
    }
  }
}
</script>
<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
