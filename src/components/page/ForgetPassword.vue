<template>
<div class="forget-wrap">
        <div class="ms-forget">
            <div class="ms-title">设置您的密码</div>
    <el-form :model="Check" ref="forgetform" class="forgetform">
    
        
        <el-form-item label="旧密码" prop="oldPsd">
            <el-input type="password" v-model="ruleForm.oldPsd" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        

        <el-form-item label="新密码" prop="newPsd">
            <el-input type="password" v-model="ruleForm.newPsd" placeholder="请输入新密码"></el-input>
        </el-form-item>


        <el-form-item label="确认新密码" prop="checkNewPsd">
            <el-input type="password" v-model="ruleForm.checkNewPsd" placeholder="请再次输入新密码"></el-input>
        </el-form-item>

        <el-form-item>
            <div class="passwordreset-btn">
            <el-button type="primary" @click="changeConfirm">确定修改</el-button>
            </div>
        </el-form-item>
    </el-form>
        </div>
</div>

</template>

<script>
export default {
  // components: {
  // },
    data() {
    var validatePass = (rule, value, callback) => {
        if (value === "") {
        callback(new Error("请输入密码"));
        } else {
        if (this.ruleForm.checkNewPsd !== "") {
            this.$refs.ruleForm.validateField("checkNewPsd");
        }
        callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === "") {
        callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
        } else {
        callback();
        }
    };
    return {
        loading: false,
        ruleForm: {},
        userData: {},
        rules: {
        oldPsd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPsd: [{ validator: validatePass, trigger: "blur" }],
        checkNewPsd: [{ validator: validatePass2, trigger: "blur" }]
        }
    };
    },
    methods: {
            changeConfirm(){
                this.$router.push({path:'/login',query:{}});
            }
        }

};
</script>
<style scoped>
.forget-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-forget {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.forgetform {
    padding: 30px 30px;
}
.passwordreset-btn {
    text-align: center;
}
.passwordreset-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>