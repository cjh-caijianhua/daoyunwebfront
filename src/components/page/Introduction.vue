<template>
  <div class="about">
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 用户详情查看
                </el-breadcrumb-item>
            </el-breadcrumb>
      </div>

      <el-table :data="tableData" style="width: 100%;height:50%" class="table-info" border>
        <el-table-column prop="name" label="用户姓名" width="180"></el-table-column>
        <el-table-column prop="role" label="用户角色" width="180"></el-table-column>
        <el-table-column prop="university" label="学校" width="180"></el-table-column>
        <el-table-column prop="college" label="学院" width="180"></el-table-column>
        <el-table-column prop="major" label="专业" width="180"></el-table-column>
        <el-table-column prop="class" label="班级" width="180"></el-table-column>
        <el-table-column prop="eduction" label="学历"></el-table-column>
      </el-table>

      <div>
          <el-row class="button-info">
            <el-button type="primary" class="button" @click="editVisible = true">编辑信息</el-button>
          </el-row>
            
      </div>
      <el-dialog title="提示" :visible.sync="editVisible" width="30%" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="tableData.name"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-input v-model="tableData.role"></el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="tableData.university"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="tableData.college"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="tableData.major"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="tableData.class"></el-input>
                </el-form-item>
                <el-form-item label="学历">
                    <el-input v-model="tableData.eduction"></el-input>
                </el-form-item>
            </el-form>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
      data() {
        return {
            editVisible: false,
            tableData: [{
                name: '陈同学',
                role: '超级管理员',
                university: '福州大学',
                college:'数学与计算机科学学院',
                major:'计算机应用技术',
                class:'计算机技术一班',
                eduction:'硕士研究生',
            }]
        }
      },
      methods:{
            handleEdit:function(){
                console.log("你好");
                // this.editVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            saveEdit:function(){

            }
      }
    }

</script>


<style scoped>
.table-info{
    font-size: 20px;
}
.button-info{
    text-align: center;
}
.button{
    margin-top: 150px;
    height: 50px;
    width: 120px;
}
</style>
