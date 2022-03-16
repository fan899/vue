<template>
  <div style="height: 100%">
    <el-container style="min-height: 100vh;">
      <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246);">
        <el-menu :default-openeds="['1', '3']"
                 style="min-height: 100%; overflow-x: hidden"
                 background-color="rgb(48,65,86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >
          <div style="height: 60px; line-height: 60px; text-align: center">
            <img src="../assets/logo.png" alt="LOGO" title="LOGO图片" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
            <b style="color: #cccccc" v-show="logoTextShow">LOGO图片</b>
          </div>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px; display: flex">
          <div style="flex: 1; font-size: 18px">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>
          <el-dropdown>
            <span style="padding-right: 5px; cursor: pointer">王小虎</span><i class="el-icon-arrow-down" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>

        <div class="pd-10" style="padding-left: 25px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!--搜索框和搜索按钮-->
        <!--v-model:数据的双向绑定-->
        <div class="pd-10">
          <el-input
                  style="width: 200px;
                  margin-left: 25px"
                  suffix-icon="el-icon-search"
                  class="mr-5"
                  placeholder="请输入名称..."
                  v-model="username">
          </el-input>
          <el-input
                  style="width: 200px;"
                  suffix-icon="el-icon-message"
                  class="mr-5"
                  placeholder="请输入邮箱..."
                  v-model="email">
          </el-input>
          <el-input
                  style="width: 200px;"
                  suffix-icon="el-icon-position"
                  class="mr-5"
                  placeholder="请输入地址..."
                  v-model="address">
          </el-input>
          <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>

<!--        功能性按钮-->
        <div class="pd-10" style="padding-left: 25px">
          <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline" style="padding-left: 5px"></i></el-button>
          <!--添加一个二次确定弹窗-->
          <el-popconfirm
                  style="margin-left: 10px"
                  confirm-button-text='确定'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除吗？"
                  @confirm="delBatch"
          >
            <!--按钮需要添加slot="reference"属性，否则不显示-->
            <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline" style="padding-left: 5px"></i></el-button>
          </el-popconfirm>
          <el-button type="primary" style="margin-left: 10px">导入<i class="el-icon-bottom" style="padding-left: 5px"></i></el-button>
          <el-button type="primary">导出<i class="el-icon-top" style="padding-left: 5px"></i></el-button>
        </div>

        <el-main>
<!--          border属性添加边框 stripe属性添加斑马纹-->
          <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <!--表格内置按钮-->
                <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit" style="padding-left: 5px"></i></el-button>
                <!--添加一个二次确定弹窗-->
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='确定'
                        cancel-button-text='取消'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="del(scope.row.id)"
                >
                <el-button type="danger" slot="reference">删除<i class="el-icon-remove-outline" style="padding-left: 5px"></i></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

<!--          分页功能-->
          <div style="padding: 10px 0">
            <!--此处的@为vue的v-on的简写形式：用于绑定事件触发-->
            <!--此处的冒号为vue的v-bind的简写形式，一般用于动态绑定-->
            <!--current-page: 当前页数，将当前页数从前端返回给pageNum-->
            <!--page-size: 当前显示的条数，将当前显示的条数返回给pageSize-->
            <!--total: 总条数，后端发送总条数在前端展示-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
          </div>

          <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px" size="small">
              <el-form-item label="用户名">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>

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


import request from "@/utils/request";

export default {
  data() {
    return {
      tableData: [], // 前端表格数据数组
      total: 0, // 前端表格总条数，初始值为0
      pageNum: 1, // 前端表格页码，初始值为1
      pageSize: 5, // 前端表格分页数，初始值为5
      username: "", // 前端根据用户名搜索  这里有bug，当只输入一个值的时候其他值默认为空，导致模糊查询条件出错，预计需要使用动态sql
      email: "", // 前端根据邮箱搜索
      address: "", // 前端根据地址搜索
      dialogFormVisible: false, // 新增对话框是否弹出，默认为false
      form: {}, // 新增&修改对话框的表单数据
      multipleSelection: [], // 接收表格多选框传回的val值
      collapseBtnClass:'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      headerBg: 'headerBg' // 表头背景颜色
    }
  },
  created() {
    this.load() //初始化页面时，请求后端表格数据
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
    },
    //请求分页查询数据
    load() {
      request.get("/user/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          email: this.email,
          address: this.address
        }
      }).then(res => {
                 console.log(res)
                this.tableData = res.records
                this.total = res.total
      })
      //fetch:向该链接请求数据，返回一个promise对象
      // fetch("http://localhost:9090/user/page?" +
      //         "pageNum=" + this.pageNum +
      //         "&pageSize=" + this.pageSize +
      //         "&username=" + this.username)
      // .then(res =>
      //         res.json()
      // ) // 将返回的数据处理成json格式
      // .then(res => { // 再用then函数取出我们想要的数据
      //   console.log(res)
      //   this.tableData = res.records //读取后端data数据传入tableData数组
      //   this.total = res.total // 读取后端total数据传入total
      // })
    },
    reset() { // 重置按钮触发事件
      this.username = "" // 把用户输入的数据设置为空
      this.email = ""
      this.address = ""
      this.load() // 并且重新载入数据
    },
    handleAdd() { // 新增按钮触发事件
      this.dialogFormVisible = true // 把对话框显示出来
      this.form = {} // 把表单数据设为空值
    },
    save() { // 对话框确定按钮触发事件
      request.post("/user",this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.load();
        }else {
          this.$message.error("保存失败")
        }
      })
    },
    handleEdit(row) { // 编辑按钮显示事件
      this.form = JSON.parse(JSON.stringify(row)) // 防止修改时未确认就显示数据
      // this.form = row
      this.dialogFormVisible = true
    },
    del(id) { // 删除按钮触发事件
      request.delete("/user/"+id).then(res => { // 接收id并传入后端接口
        if (res) {
          this.$message.success("删除成功")
          this.dialogFormVisible = false
          this.load();
        }else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id) // 把multipleSelection中的对象格式中的id提取出来组成ids数组 [{}, {}] => [1,2]
      // console.log(ids)
      request.post("/user/del/batch", ids).then(res => { // 接收ids并传入后端接口
        if (res) {
          this.$message.success("批量删除成功")
          this.load();
        }else {
          this.$message.error("批量删除失败")
        }
      })
    },
    handleSelectionChange(val) { // 表格复选框默认触发事件，val表示返回被选中的数据数组
      console.log(val)
      this.multipleSelection = val
    },
    handleSizeChange(pageSize) { //选择显示条数时触发该函数，并返回显示条数
      console.log(pageSize)
      this.pageSize = pageSize //将前端的当前显示条数赋值给后端的查询参数
      this.load() // 向后台请求数据
    },
    handleCurrentChange(pageNum) { //点击页码按钮时会触发该函数，并返回当前页码
      console.log(pageNum)
      this.pageNum = pageNum //将前端的当前页码赋值给后端的查询参数
      this.load() // 向后台请求数据
    }
  }
}
</script>

<style>
  .headerBg {
    background-color: lightgray !important;
  }
</style>
