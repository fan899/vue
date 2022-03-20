<template>
  <div style="height: 100%">
    <el-container style="min-height: 100vh;">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246);">
<!--        插入侧边栏组件，并传入值-->
        <Aside :Collapse="isCollapse" :logoTextShow="logoTextShow"></Aside>
      </el-aside>

      <el-container>
        <el-header style="border-bottom: 1px solid #ccc; background-color: white">
          <Header :collapse="isCollapse" :collapseBtnClass="collapseBtnClass"></Header>
        </el-header>

        <el-main>
          <!--表示当前页面的子路由会在router-view处展示-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>


<script>

// 通过this.request调用，不再单独导入
// import request from "@/utils/request";
// 导入Aside组件
import Aside from "@/components/Aside";
// 导入header组件
import Header from "@/components/Header";
export default {
  data() {
    return {
      collapseBtnClass:'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      isHeaderCollapse: false,
      logoTextShow: true,

    }
  },
  components: { // 导入组件在页面上显示
    Aside,
    Header
  },
  methods: {
      collapse() {  //控制侧边导航栏收缩按钮
          this.isCollapse = !this.isCollapse
          if (this.isCollapse) { //菜单收缩时
              this.sideWidth = 64
              this.collapseBtnClass = 'el-icon-s-unfold'
              this.logoTextShow = false
          } else {               //菜单展开时
              this.sideWidth = 200
              this.collapseBtnClass = 'el-icon-s-fold'
              this.logoTextShow = true
          }
      }
  }
}
</script>


