<template>
    <div class="wrapper">
        <div style="background-color: rgba(0, 0, 0, 0.1); width: 100%; height: 100px; backdrop-filter: blur(8px); border-radius: 0 0 10px 10px; box-shadow: 0 0 10px #333;">
            <p style="
            text-align: left;
            line-height: 100px;
            font-size: 30px;
            margin-left: 50px;
            color: white">
                缴费管理子系统
            </p>
        </div>
        <div style="margin: 240px auto; background-color: #fff; width: 350px; height: 300px; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #333;">
            <div style=" margin: 20px 0; text-align: center; font-size: 24px"><b>登&nbsp;&nbsp;&nbsp;录</b></div>
            <!--model属性负责绑定输入的值，进行校验-->
            <!--rule属性可以导入相关的表单校验规则-->
            <el-form :model="userForm" :rules="rules" ref="userForm">
                <!--将需要校验的表单元素使用el-form-item包裹起来，并且加上prop属性和规则进行绑定-->
                <el-form-item prop="username">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item style="margin: 20px 0; text-align: center">
                    <el-button type="success" @click="login('userForm')">登录</el-button>
                    <el-button type="info" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="
        margin: 0 auto;
        text-align: center;
        height: 50px;
        width: 200px;
        background-color: rgba(255,255,255,0.15);
        box-shadow: 0 0 10px #607D8B;
        font-size: 15px;
        border-radius: 12px;">
            <p style="border-radius: 12px; text-align: center; line-height: 50px; color: white; backdrop-filter: blur(15px);">Graduation Project</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                userForm: {
                    username: "",
                    password: ""
                }, // 接收输入框中用户名和密码，同时将数据返回给el-form的model进行规则校验
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
            login(userForm) { // 点击登录按钮时触发事件
                this.$refs[userForm].validate((valid) => { // valid 当校验通过时返回true，否则返回false
                    if (valid) {
                        this.request.post("/user/login", this.userForm).then(res => {
                            // console.log(res)
                            // == 用于判断值是否相同，类型也不同也会被转换比较
                            // === 会连同类型也会判断是否一致
                            if (res.code === "200") { // 当后端返回的值中的code为200时，才算登录成功
                                localStorage.setItem("user", JSON.stringify(res.data)) // 把用户信息存入浏览器
                                this.$router.push("/")
                                this.$message.success("登录成功")
                            } else {
                                this.$message.error(res.msg) // 如果判断不通过，则返回后端传来的msg
                            }
                        })
                    } else {
                        this.$message.error("请检查用户名和密码是否有误")
                        return false;
                    }
                });
            },
            register() {
                this.$router.push("/register")
            }

        }
    }
</script>

<style>
    .wrapper {
        /*设置100%窗口高度*/
        height: 100vh;
        background-image: linear-gradient(to bottom, #f5f1ed, #70798c, #252323);
        overflow: hidden;
    }
</style>