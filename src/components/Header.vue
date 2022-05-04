<template>
    <!--    封装头部组件，并传入相应的变量-->
    <div style="font-size: 12px; line-height: 60px; display: flex">
        <div style="flex: 1; font-size: 18px">
      <span
              :class="collapseBtnClass"
              style="cursor: pointer"
              @click="collapse"
      ></span>
            <el-breadcrumb
                    separator-class="el-icon-arrow-right"
                    style="display: inline-block; margin-left: 10px; color: #333333;"
            >
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-dropdown>
        <!--利用{{}}把右上角的数据写活-->
      <span style="padding-right: 5px; cursor: pointer">{{user.nickname}}</span
      ><i class="el-icon-arrow-down" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <span style="text-decoration: none" @click="personInfo">个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                    <span style="text-decoration: none" @click="logout">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
          return {
              // 定义user，从localStorage中取出user的值，然后利用三目表达式对其进行判断，如果不为空就转换为json字符串输出，为空就返回空值
              user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
          }
        },
        props: {
            collapseBtnClass: String,
            collapse: Function,
        },
        computed: {
            currentPathName() {
                return this.$store.state.currentPathName; // 返回需要监听的数据
            },
        },
        watch: {
            // 监听器，当$route的值发生变化时截取监听的值
            currentPathName(newVal, oldVal) {
                console.log(newVal);
            },
        },
        methods: {
            logout() { // 点击退出登录触发事件
                // 转跳到登录页面
                this.$router.push("/login")
                localStorage.removeItem("user")
                this.$message.success("退出成功")
            },
            personInfo() {
                this.$router.push("/person")
            }
        },
    };
</script>
