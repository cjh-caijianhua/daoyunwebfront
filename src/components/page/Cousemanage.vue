<template>
  <div>
      <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 课程管理
                </el-breadcrumb-item>
            </el-breadcrumb>
      </div>
      <div class="container">
        <div class='handle-box'>
          <el-button type="primary" class="handle-del mr10" @click="AddCourse" round>+新增课程</el-button>

          <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection" round>删除所选课程</el-button> -->

          <el-input v-model="query.name" placeholder="课程名" class="handle-input mr10"></el-input>

          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> 
        </div>

      <el-table
                :data="T1"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="coursename" label="课程名"></el-table-column>
                <el-table-column prop="teacher" label="教师名"></el-table-column>
                <el-table-column prop="coursehourse" label="课程学时"></el-table-column>
                <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
                <el-table-column prop="Starttime" label="开课时间"></el-table-column>
                <el-table-column prop="classroom" label="教室"></el-table-column>

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
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
      </div>

       <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
          <el-form ref="form" :model="form" label-width="70px">
              <el-form-item label="课程名">
                  <el-input v-model="form.coursename"></el-input>
              </el-form-item>
              <el-form-item label="教师名">
                  <el-input v-model="form.teacher"></el-input>
              </el-form-item>
              <el-form-item label="课程学时">
                  <el-input v-model="form.coursehourse"></el-input>
              </el-form-item>
              <el-form-item label="开课时间">
                  <el-input v-model="form.Starttime"></el-input>
              </el-form-item>
              <el-form-item label="教室">
                  <el-input v-model="form.classroom"></el-input>
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
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            T1: [{
                  id:'1',
                  coursename: "软件工程",
                  teacher: '陈老师',
                  coursehourse:'54',
                  Starttime: '2019-2020 2',
                  classroom:'西1-303',
                }, {
                  id:'2',
                  coursename: "云计算",
                  teacher: '肖老师',
                  coursehourse:'54',
                  Starttime: '2019-2020 2',
                  classroom:'东1-303',
                }, {
                  id:'3',
                  coursename: "大数据处理",
                  teacher: '林老师',
                  coursehourse:'54',
                  Starttime: '2019-2020 2',
                  classroom:'文1-303',
                }, {
                  id:'4',
                  coursename: "智能图像分析",
                  teacher: '蔡老师',
                  coursehourse:'54',
                  Starttime: '2019-2020 2',
                  classroom:'文2-303',
                }, {
                  id:'5',
                  coursename: "工程实践",
                  teacher: '何老师',
                  coursehourse:'54',
                  Starttime: '2019-2020 2',
                  classroom:'文3-303',
                }],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 增加课程
        AddCourse(){

        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
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
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
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
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
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
