<template>
  <div class="error-page">
      <div class="error-code">{{errorinfo.code[0]}}<span>{{errorinfo.code[1]}}</span>{{errorinfo.code[2]}}</div>
      <div class="error-desc">{{errorinfo.info}}</div>
      <div class="error-handle">
          <router-link to="/">
            <el-button type="primary" size="large">返回首页</el-button>
          </router-link>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            errorinfo: {
                code:[6,6,6],
                info:"自定义异常页面"
            },
        }
    },
    created(){//页面加载前加载数据
        getErrorInfo();
    },
    /*
    mounted:function () {//页面加载后加载数据
        getErrorInfo();
    },
    */
    methods: {
      goBack(){
          this.$router.go(-1);
      },
      getErrorInfo(){
      }
  }
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #f02d2d;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>
