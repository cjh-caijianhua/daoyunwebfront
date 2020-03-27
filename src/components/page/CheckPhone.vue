
    <template>
    <div class="check-wrap">
        <div class="ms-check">
            <div class="ms-title">验证手机</div>
        <el-form :model="Check" ref="checkform" label-width="0" class="checkform">
            <el-form-item prop="phone">
                <el-input v-model="Check.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="验证码" class="code"> 
                <el-col :span="15">
                <el-input v-model="Check.sendcode" placeholder="请输入验证码"></el-input>
                </el-col>
                <el-col :span="8" offset="1">
                <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==false">发送验证码
                </el-button>
                <el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==true">{{btntxt}}
                </el-button>
                </el-col>
            </el-form-item>
            <el-form-item>
                <div class="checksubmit-btn">
                <el-button type="primary" @click="submitForm">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Check",
        data() {
            return {
                Check: {
                    phone: '',
                    sendcode: '',
                },
                disabled: false,
                time: 0,
                btntxt: "重新发送",
            }
        },
        methods: {
            //手机验证发送验证码
            sendcode() {
                const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (this.Check.phone == '') {
                    this.$message({
                        message:'手机号不能为空',
                        center: true
                    })
                    return
                }
                if (!reg.test(this.Check.phone)) {
                    this.$message({
                        message:'请输入正确的手机号',
                        center:true
                    })
                    return
                } else {
                    console.log(this.Check.phone);
                    this.$message({
                        message: '发送成功',
                        type: 'success',
                        center:true
                    });
                    this.time = 60;
                    this.disabled = true;
                    this.timer();
                }
            },
            //60S倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btntxt = this.time + "s后重新获取";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.btntxt = "获取验证码";
                    this.disabled = false;
                }
            },
            submitForm(){
                this.$router.push({path:'/forgetpassword',query:{}});
            }
        }
    }
</script>

<style scoped>
.check-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-check {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.checkform {
    padding: 30px 30px;
}
.checksubmit-btn {
    text-align: center;
}
.checksubmit-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
