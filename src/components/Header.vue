<template>
<!--    封装头部组件，并传入相应的变量-->
    <div style="font-size: 12px; line-height: 60px; display: flex;">
        <div style="flex: 1; font-size: 18px;">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
            <el-breadcrumb separator=">" style="display: inline-block; margin-left: 10px;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <el-dropdown>
            <span style="padding-right: 5px; cursor: pointer">王小虎</span><i class="el-icon-arrow-down" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>


<script>
    export default {
        name: "Header",
        props: {
            collapseBtnClass: String,
            collapse: Boolean,
        },
        computed: {
            currentPathName() {
                return this.$store.state.currentPathName // 返回需要监听的数据
            }
        },
        watch: { // 监听器，当$route的值发生变化时截取监听的值
            currentPathName (newVal, oldVal) {
                console.log(newVal)
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>