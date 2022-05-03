<template>
    <div class="wrapper">
        <div style="background-color: rgba(0, 0, 0, 0.1); width: 100%; height: 100px; backdrop-filter: blur(8px); border-radius: 0 0 10px 10px; box-shadow: 0 0 10px #333;">
            <p style="
            text-align: right;
            line-height: 100px;
            font-size: 30px;
            margin-right: 50px;
            color: white">
                注 册 页 面
            </p>
        </div>
        <div style="margin: 20px 1230px; background-color: #fff; width: 350px; height: 700px; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px #333;">
            <div style=" margin: 10px 0; text-align: center; font-size: 24px" prefix-icon="el-icon-refresh-right"><b>注&nbsp;&nbsp;&nbsp;册</b></div>
            <!--model属性负责绑定输入的值，进行校验-->
            <!--rule属性可以导入相关的表单校验规则-->
            <el-form :model="regForm" :rules="rules" ref="regForm">
                <!--将需要校验的表单元素使用el-form-item包裹起来，并且加上prop属性和规则进行绑定-->
                <el-form-item prop="username" label="用户名">
                    <el-input size="medium" style="margin: 6px 0" prefix-icon="el-icon-user" v-model="regForm.username"></el-input>
                </el-form-item>
                <!--<el-form-item prop="password" label="昵称">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="userForm.password"></el-input>
                </el-form-item>-->
                <el-form-item prop="password" label="密码">
                    <el-input size="medium" style="margin: 6px 0" prefix-icon="el-icon-lock" show-password v-model="regForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="请再次输入密码">
                    <el-input size="medium" style="margin: 6px 0" prefix-icon="el-icon-lock" show-password v-model="regForm.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item prop="cardId" label="身份证号码">
                    <el-input size="medium" style="margin: 6px 0" prefix-icon="el-icon-bank-card" v-model="regForm.cardId"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input size="medium" style="margin: 6px 0" prefix-icon="el-icon-mobile" v-model="regForm.phone"></el-input>
                </el-form-item>
                <!--<el-form-item prop="password" label="邮箱">
                    <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="userForm.password"></el-input>
                </el-form-item>-->
                <el-form-item prop="authentication" label="选择身份">
                        <el-select size="medium" v-model="regForm.authentication" style="margin: 6px 0; width: 100%" placeholder="请选择用户角色">
                            <el-option label="学生" value="学生"></el-option>
                            <el-option label="操作员" value="操作员"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item style="margin: 20px 0; text-align: center">
                    <el-button type="warning" @click="reset('regForm')">重置</el-button>
                    <el-button type="success" @click="register('regForm')">提交</el-button>
                    <el-button type="info" @click="returnLogin">返回登录</el-button>
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
            <p style="border-radius: 12px; text-align: center; line-height: 50px; color: black; backdrop-filter: blur(15px);">Graduation Project</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.regForm.confirmPassword !== '') {
                        this.$refs.regForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                regForm: {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    cardId: "",
                    phone: "",
                    authentication: ""
                }, // 接收输入框中用户名和密码，同时将数据返回给el-form的model进行规则校验
                rules: { // 表单校验规则
                    username: [ // 规则名称和el-form-item中的prop值对应，此处对应的是用户名输入框
                        { required: true, message: '请输入用户名', trigger: 'blur' }, // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [ // 规则名称和el-form-item中的prop值对应，此处对应的是密码输入框
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPassword: [ // 规则名称和el-form-item中的prop值对应，此处对应的是确认密码名输入框
                        { required: true, message: '请输入密码', trigger: 'blur' }, // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    cardId: [ // 规则名称和el-form-item中的prop值对应，此处对应的是身份证输入框
                        { required: true, message: '请输入身份证号', trigger: 'blur' }, // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                        { min: 18, max: 18, message: '请输入正确的身份证号', trigger: 'blur' }
                    ],
                    phone: [ // 规则名称和el-form-item中的prop值对应，此处对应的是手机号输入框
                        { required: true, message: '请输入手机号码', trigger: 'blur' }, // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                        { min: 11, max: 11, message: '长度需为11个字符', trigger: 'blur' },
                    ],
                    authentication: [ // 规则名称和el-form-item中的prop值对应，此处对应的是权限下拉框
                        { required: true, message: '请选择用户身份', trigger: 'change' } // required是必填项，trigger是指触发情况，blur表示输入框失去鼠标焦点时
                    ],
                }
            }
        },
        methods: {
            register(regForm) { // 点击登录按钮时触发事件
                this.$refs[regForm].validate((valid) => { // valid 当校验通过时返回true，否则返回false
                    if (valid) {
                        this.request.post("/user/register", this.regForm).then(res => {
                            // console.log(res)
                            // == 用于判断值是否相同，类型也不同也会被转换比较
                            // === 会连同类型也会判断是否一致
                            if (res.code === "200") { // 当后端返回的值中的code为200时，才算登录成功
                                this.$message.success("注册成功")
                                this.$router.push("/login")
                            } else {
                                this.$message.error(res.msg) // 如果判断不通过，则返回后端传来的msg
                            }
                        })
                    } else {
                        this.$message.error("请检查相关是否有误")
                        return false;
                    }
                });
            },
            returnLogin() {
                this.$router.push("/login")
            },
            reset(regForm) {
                this.$refs[regForm].resetFields();
            }

        }
    }
</script>

<style>
    .wrapper {
        /*设置100%窗口高度*/
        height: 100vh;
        background-image: linear-gradient(to bottom, #2C3333, #2666CF, #F5F2E7);
        overflow: hidden;
    }
</style>