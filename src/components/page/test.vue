<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 测试页面
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="handleAdd"
        >新增论文</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-select v-model="query.address" placeholder="学校" class="handle-select mr10">
          <el-option key="1" label="福州大学" value="福州大学"></el-option>
          <el-option key="2" label="福建师范大学" value="福建师范大学"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="paperId" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="paperName" label="论文名称"></el-table-column>
        <el-table-column prop="paperNum" label="论文数量"></el-table-column>
        <el-table-column prop="paperDetail" label="论文详情"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
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
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page"
          :page-size="query.pageSize"
          :total="selectTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="论文Id">
          <el-input v-model="form.paperId" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="论文名称">
          <el-input v-model="form.paperName"></el-input>
        </el-form-item>
        <el-form-item label="论文数量">
          <el-input v-model.number="form.paperNum"></el-input>
        </el-form-item>
        <el-form-item label="论文详情">
          <el-input v-model="form.paperDetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增弹出框 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form ref="addform" :model="addform" label-width="70px">
        <el-form-item label="论文名称">
          <el-input v-model="addform.paperName"></el-input>
        </el-form-item>
        <el-form-item label="论文数量">
          <el-input v-model.number="addform.paperNum"></el-input>
        </el-form-item>
        <el-form-item label="论文详情">
          <el-input v-model="addform.paperDetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchData } from "../../api/index";
import axios from "axios";
export default {
  name: "basetable",
  data() {
    return {
      query: {
        page: 1,
        pageSize: 10
      },
      tableData: [],
      selectTotal: 0,
      multipleSelection: [],
      delList: [],
      editVisible: false,
      addVisible: false,
      form: {
        paperId:0,
        paperName:"",
        paperNum:0,
        paperDetail:""
      },
      addform: {
        paperName:"",
        paperNum:0,
        paperDetail:""
      },
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
    this.getDataCount();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() { //TODO 待加入搜索限定参数
      // axios
      //   .get("http://localhost:8080/daoyunWeb/testExample/getAllPaper")
      //   .then(
      //     res => {
      //       console.log(res);
      //       this.tableData=res.data.data;
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/getPaperByPage",
          { page: this.query.page, pageSize: this.query.pageSize },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if(res.status == 200){
              this.tableData=res.data.data
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    getDataCount() { //TODO 待加入搜索限定参数
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/getPaperCount",
        ).then(
          res => {
            console.log(res);
            if(res.status == 200){
              this.selectTotal=res.data.data
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    updatePaper() { 
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/updatePaperJson",
          { paperId: this.form.paperId, paperName: this.form.paperName,paperNum: this.form.paperNum,paperDetail: this.form.paperDetail },
          { headers: { "Content-Type": "application/json" } }
        ).then(
          res => {
            console.log(res);
            if(res.status == 200){
              
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    addPaper() { 
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/addPaperJson",
          { paperName: this.addform.paperName,paperNum: this.addform.paperNum,paperDetail: this.addform.paperDetail },
          { headers: { "Content-Type": "application/json" } }
        ).then(
          res => {
            console.log(res);
            if(res.status == 200){
              
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    deletePaper() { 
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/deletePaperJson/"+this.form.paperId
        ).then(
          res => {
            console.log(res);
            if(res.status == 200){
              
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, "pageIndex", 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.deletePaper();
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.updatePaper();
      this.$set(this.tableData, this.idx, this.form);
    },
    // 新增操作
    handleAdd() {
      this.addVisible = true;
    },
    // 保存新增
    saveAdd() {
      this.addPaper();
      this.addVisible = false;
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "page", val);
      this.getData();
    }
  }
};
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
