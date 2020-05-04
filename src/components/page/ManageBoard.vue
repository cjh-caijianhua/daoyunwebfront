<template>
    <div class="Change">
        <el-row :gutter="20"  type="flex" justify="center">
            <el-col>
                <el-card shadow="hover" class="mgb20" style="height:500px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <router-link to="/Introduction" class="user-info-name" title="用户详情">{{name}}</router-link>
                            <!-- <div class="user-info-name" @click="changePaper">{{name}}</div> -->
                            <div class="user-info-role">{{role}}</div>
                        </div>
                        <div class = "user-info-det">
                            <h4>学校：福州大学</h4>
                            <h4>学院：数学与计算机科学学院</h4>
                            <h4>专业：计算机应用技术</h4>
                            <h4>...</h4>
                        </div>
                    </div>
                    <div class='info'>
                        <div class="info-time">
                            上次登录时间：
                            <span>2020-3-21</span>
                        </div>
                        <div class="info-address">
                            上次登录地点：
                            <span>福建福州</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default{
    data(){
        return {
            name:'陈同学',
            role:'超级管理员'
        }
    }
}
</script>


<style scoped>
.Change{
    /* border:5px solid green; */
    width: 100%;
    height: 1000px;
}
.el-row {
    /* margin-bottom: 10px; */
    /* border:5px solid #000000; */
    height: 50%;
}
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    /* border-bottom: 2px solid red; */
    margin-bottom: 30px;
}

.user-avator {
    /* width: 120px; */
    width: 200px;
    /* height: 120px; */
    height: 200px;
    border-radius: 50%;
    /* border: 5px solid blue; */
}
.mgb20 {
    /* margin-bottom: 20px; */
    height: 100%;
    /* border:5px solid orange; */
}
.user-info-cont {
    padding-left: 0px;
    /* flex: 1; */
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 60px;
    color: #222;
}
.user-info-name{

    font-size: 50px;
    color:#222;
    margin-left: 20px;
    
}
.user-info-name:hover{
    color: orange;
}
.user-info-role{
    font-size: 20px;
    color:#222;
    margin-left: 20px;
}

.info{
    /* border: 5px solid black; */
    float: left;
    width: 100%;
}
.info-time{
    width: 20%;
    float: left;
}
.info-address{
    width: 90%;
    /* border: 2px solid blue; */
}
.user-info-det{
    width: 60%;
    height: 200px;
    margin-left: 30px;
    margin-top: 10px;
    /* border: 5px solid  #000000; */
    font-size: 30px;
}
.user-info-det h4{
    margin-top: 20px;
    margin-left: 150px;
}

</style>
