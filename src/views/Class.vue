<template>
    <div>

        <!--搜索框和搜索按钮-->
        <!--v-model:数据的双向绑定-->
        <div class="pd-10">
            <el-input
                    style="width: 200px;
                  margin-left: 25px"
                    suffix-icon="el-icon-search"
                    class="mr-5"
                    placeholder="请输入班级名称..."
                    v-model="classesName">
            </el-input>
            <!--<el-input
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
            </el-input>-->
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
                <el-button type="danger" slot="reference">批量删除<i class="el-icon-delete" style="padding-left: 5px"></i></el-button>
            </el-popconfirm>
            <el-popover
                    placement="top-start"
                    title="注意"
                    width="200"
                    trigger="hover"
                    content="仅能导入xlsx文件，请按模板文件导入">
                <el-upload
                        id="uploadController"
                        class="upload-demo"
                        action="http://localhost:9090/classes/import"
                        style="display: inline-block"
                        slot="reference"
                        :show-file-list="false"
                        accept="xlsx"
                        :on-success="handleExcelImportSuccess"
                >
                    <el-button type="primary" style="margin-left: 10px">导入<i class="el-icon-bottom" style="padding-left: 5px"></i></el-button>
                </el-upload>
            </el-popover>


            <el-button type="primary" style="margin-left: 10px" @click="exp">导出<i class="el-icon-top" style="padding-left: 5px"></i></el-button>
        </div>
        <!--border属性添加边框 stripe属性添加斑马纹-->
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="班级ID" width="80">
            </el-table-column>
            <el-table-column prop="className" label="班级名称" >
            </el-table-column>
            <el-table-column prop="majorId" label="所属专业id" width="140">
            </el-table-column>
            <el-table-column prop="collegeId" label="所属院校id" width="140">
            </el-table-column>
            <el-table-column prop="celling" label="人数上限" width="140">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!--表格内置按钮-->
                    <el-button type="success" @click="handleEdit(scope.row)" round>编辑<i class="el-icon-edit" style="padding-left: 5px"></i></el-button>
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
                        <el-button type="danger" slot="reference" round>删除<i class="el-icon-delete" style="padding-left: 5px"></i></el-button>
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
                <el-form-item label="班级id">
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级名称">
                    <el-input v-model="form.className" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业id">
                    <el-input v-model="form.majorId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="院校id">
                    <el-input v-model="form.collegeId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="人数上限">
                    <el-input v-model="form.celling" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Class",
        data() {
            // const item = {
            //     username: "范超泳",
            //     nickname: "F",
            //     email:"fffff@fan.com",
            //     phone: "123214123124",
            //     address: "guang"
            // };
            return {
                // tableData: Array(10).fill(item), // 前端表格数据数组
                tableData: [],
                total: 0, // 前端表格总条数，初始值为0
                pageNum: 1, // 前端表格页码，初始值为1
                pageSize: 5, // 前端表格分页数，初始值为5
                classesName: "", // 前端根据班级名搜索
                // email: "", // 前端根据邮箱搜索
                // address: "", // 前端根据地址搜索
                dialogFormVisible: false, // 新增对话框是否弹出，默认为false
                form: {}, // 新增&修改对话框的表单数据
                multipleSelection: [], // 接收表格多选框传回的val值
                headerBg: 'headerBg' // 表头背景颜色
            }
        },
        created() {
            this.load() //初始化页面时，请求后端表格数据
        },
        methods: {
            //请求分页查询数据
            load() {
                this.request.get("/classes/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                        classesName: this.classesName
                        // email: this.email,
                        // address: this.address
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
                this.classesName = "" // 把用户输入的数据设置为空
                // this.email = ""
                // this.address = ""
                this.load() // 并且重新载入数据
            },
            handleAdd() { // 新增按钮触发事件
                this.dialogFormVisible = true // 把对话框显示出来
                this.form = {} // 把表单数据设为空值
            },
            save() { // 对话框确定按钮触发事件
                this.request.post("/classes",this.form).then(res => {
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
                this.request.delete("/classes/"+id).then(res => { // 接收id并传入后端接口
                    if (res) {
                        this.$message.success("删除成功")
                        this.dialogFormVisible = false
                        this.load();
                    }else {
                        this.$message.error("删除失败")
                    }
                })
            },
            delBatch() { // 批量删除按钮触发事件
                let ids = this.multipleSelection.map(v => v.id) // 把multipleSelection中的对象格式中的id提取出来组成ids数组 [{}, {}] => [1,2]
                // console.log(ids)
                this.request.post("/classes/del/batch", ids).then(res => { // 接收ids并传入后端接口
                    if (res) {
                        this.$message.success("批量删除成功")
                        this.load();
                    }else {
                        this.$message.error("批量删除失败")
                    }
                })
            },
            exp() { // 导出按钮触发事件
                window.open("http://localhost:9090/classes/export") // 打开下载数据页面
            },
            handleExcelImportSuccess() { // 导入文件成功触发事件
                this.$message.success("导入成功")
                this.load()
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