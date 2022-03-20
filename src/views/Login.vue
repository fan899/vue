<template>
    <div class="wrapper">
        <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px">
            <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登&nbsp;&nbsp;&nbsp;录</b></div>
            <!--model属性负责绑定输入的值，进行校验-->
            <!--rule属性可以导入相关的表单校验规则-->
            <el-form :model="user" :rules="rules" ref="userForm">
                <!--将需要校验的表单元素使用el-form-item包裹起来，并且加上prop属性和规则进行绑定-->
                <el-form-item prop="username">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 20px 0; text-align: center">
                    <el-button type="success" @click="login">登录</el-button>
                    <el-button type="info" @click="regsiter">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                user: {}, // 接收输入框中用户名和密码，同时将数据返回给el-form的model进行规则校验
                rules: { // 表单校验规则
                    username: [ // 规则名称和el-form-item中的prop值对应，此处对应的是用户名输入框
                        { required: true, message: '请输入用户名', trigger: 'blur' }, // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [ // 规则名称和el-form-item中的prop值对应，此处对应的是密码输入框
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login() { // 点击登录按钮时触发事件
                this.$refs['userFrom'].validate((valid) => { // valid 当校验通过时返回true，否则返回false
                    if (valid) {
                        this.request.post("/user/login", this.user).then(res => {
                            if (!res) {
                                this.$message.error("用户名或密码错误")
                            } else {
                                this.$router.push("/")
                            }
                        })
                    } else {
                        this.$message.error("请检查用户名和密码")
                        return false;
                    }
                });
            },
            }
        }
    }
</script>

<style>
    .wrapper {
        /*设置100%窗口高度*/
        height: 100vh;
        background-image: linear-gradient(to bottom, #CFD8DC, #B0BEC5, #607D8B, #263238, #212121);
        overflow: hidden;
    }
</style>