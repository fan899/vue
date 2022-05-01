<template>
<!--    封装侧边栏组件，并且需要把isCollapse和logoTextShow的值传入-->
<!--    router属性会把侧边栏的项目用index和页面关联起来，需要把index属性和index.js的路由配置好-->
<!--    @select是激活菜单时候回调事件，会返回被激活的菜单选项的index-->
    <el-menu :default-openeds="['1', '3']"
             style="min-height: 100%; overflow-x: hidden; border-right: 1px solid #546E7A"

             background-color="#546E7A"
             text-color="#ECEFF1"
             active-text-color="#ffd04b"
             :collapse-transition="false"
             :collapse="isCollapse"
             router
             @select="handleSelect"
    >
    <div style="height: 60px; line-height: 60px; text-align: center">
        <img src="../assets/logo.png" alt="LOGO" title="LOGO图片" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
        <b style="color: #90A4AE" v-show="logoTextShow">LOGO图片</b>
    </div>
<!--        这里的index是 / ，所以点击时会重定向至主页-->
        <el-submenu index="/">
            <template slot="title"><i class="el-icon-house"></i>
                <span slot="title">主页</span>
            </template>
            <el-menu-item-group>
                <template slot="title">转跳</template>
                <el-menu-item index="/">回到主页</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-order"></i>
                <span slot="title">缴费订单管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">学生缴费情况</template>
                <el-menu-item index="1-1">订单详情</el-menu-item>
                <el-menu-item index="1-2">缴费管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>
                <span slot="title">专业班级管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">专业班级编辑</template>
                <el-menu-item index="college">院校信息</el-menu-item>
                <el-menu-item index="major">专业信息</el-menu-item>
                <el-menu-item index="class">班级信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-user-solid"></i>
                <span slot="title">用户数据管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">后台用户管理</template>
<!--                这里的index是user，点击时会重定向到user页面-->
                <el-menu-item index="student">学生信息</el-menu-item>
                <el-menu-item index="user">用户信息</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Aside.vue",
        props:{ // 定义这两个传入值
            isCollapse: Boolean,
            logoTextShow: Boolean
        },
        methods: {
            handleSelect() {
               this.$route.fullPath.split("/")
            }
        }
    }
</script>

<style scoped>

</style>