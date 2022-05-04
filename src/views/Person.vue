<template>
    <el-card style=" margin: 70px auto; width: 500px; height: 650px; border: 1px solid rgba(64, 158, 255, 0.2); background-color: #f8f9fa">
        <div style="text-align: center; font-size: 24px;padding: 20px"><p>个人中心</p></div>
        <el-form label-width="80px" size="small" style="width: 90%">
            <el-form-item label="用户名" style="padding: 10px">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" style="padding: 10px">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="身份证号" style="padding: 10px">
                <el-input disabled v-model="form.cardId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="padding: 10px">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" style="padding: 10px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="缴费状态" style="padding: 10px">
                <el-input disabled v-model="form.status" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" style="padding: 10px">
                <el-select disabled v-model="form.authentication" placeholder="请选择用户角色"  style="width: 100%">
                    <el-option label="学生" value="学生"></el-option>
                    <el-option label="操作员" value="操作员"></el-option>
                </el-select>
            </el-form-item >
            <el-form-item style="text-align: center; padding: 10px">
                <el-button plain type="primary" @click="save">确 定</el-button>
                <el-button plain type="warning" @click="pay">缴 费</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    export default {
        name: "Person",
        data() {
            return {
                form:{},
                orderInfo:{
                    username: "",
                    no: "",
                    price: ""
                },
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        created() {
            this.request.get("/user/userInfo/" + this.user.cardId).then(res => {
                if (res.code === '200') {
                    this.form = res.data;
                    this.orderInfo.username = res.data.username;
                    this.orderInfo.no = res.data.no;
                    this.orderInfo.price = res.data.price;
                }else {
                    this.$message.error(res.msg)
                }
            })
        },
        methods: {
            save() { // 对话框确定按钮触发事件
                this.request.post("/user",this.form).then(res => {
                    if (res) {
                        this.$message.success("保存成功")
                        this.dialogFormVisible = false
                        this.load();
                    }else {
                        this.$message.error("保存失败")
                    }
                })
            },
            pay() {
                const url = `http://localhost:9090/alipay/pay?subject=${this.orderInfo.username}&traceNo=${this.orderInfo.no}&totalAmount=${this.orderInfo.price}`
                console.log(url)
                window.open(url);
            }
        }
    }
</script>

<style scoped>

</style>