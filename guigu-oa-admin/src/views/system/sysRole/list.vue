<template>
<div class="app-container">
    <!--查询表单-->
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input style="width: 100%" v-model="searchObj.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini" :loading="loading" @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
          <!-- 工具条 -->
          <div class="tools-div">
            <el-button type="success" icon="el-icon-plus" size="mini" @click="add" 
                  :disabled="$hasBP('bnt.sysRole.add')  === false">添 加</el-button>
            <el-button class="btn-add" size="mini" @click="batchRemove()" 
            :disabled="$hasBP('bnt.sysRole.remove')  === false"
            >批量删除</el-button>
          </div>
        </el-row>
      </el-form>
    </div>

    <!-- :disabled="$hasBP('bnt.sysRole.remove')  === false" -->
    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange">

      <el-table-column type="selection"/>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="$hasBP('bnt.sysRole.update')  === false"
          @click="edit(scope.row.id)" title="修改"/>
          <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="$hasBP('bnt.sysRole.remove')  === false"
           @click="removeDataById(scope.row.id)" title="删除"/>
          <el-button type="warning" icon="el-icon-baseball" size="mini" :disabled="$hasBP('bnt.sysRole.assignAuth')  === false"
          @click="showAssignAuth(scope.row)" title="分配权限"/>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <!-- 分页组件 -->
    <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="fetchData"
    />

    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%" >
      <el-form ref="dataForm" :model="sysRole" label-width="150px" size="small" style="padding-right: 40px;">
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName"/>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;this.sysRole = {};" size="small" icon="el-icon-refresh-right">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="saveOrUpdate()" size="small">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
//@就是src
import api from '@/api/system/sysRole'
import apiMenu from '@/api/system/sysMenu'
export default {
  // 定义数据模型
  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询条件
      multipleSelection: [],// 批量删除选中的记录列表
      dialogVisible: false,//添加角色是否弹框
      sysRole:{},//添加角色时的填入的对象
      saveBtnDisabled: false,//用于添加用户时，点击添加之后让添加按钮失效，添加完毕之后再让按钮生效这个变量没有用在页面中。
      
    }
  },
  // 页面渲染成功后获取数据
  created() {
    this.fetchData()
  },
  // 定义方法
  methods: {
    //获取分页的数据，当没有条件查询时直接返回页数为1的数据。有条件搜索时，
    fetchData(current=1) {
      this.page = current
      // 调用api
      api.getPageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    //根据id删除角色
    removeDataById(id){
      // debugger
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => { // promise
          // 点击确定，远程调用ajax
          return api.removeById(id)
      }).then((response) => {
          this.fetchData(this.page)//重新获取数据，刷新页面
          this.$message.success(response.message || '删除成功')
      })
    },
    //点击添加之后添加角色
    add(){
      this.sysRole = {};
      this.dialogVisible = true;

    },
    //点击添加或者修改角色
    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      //没有id的话就是新增，有id的话就是修改
      if (!this.sysRole.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 新增角色
    saveData() {
      api.save(this.sysRole).then(response => {
        //提示
        this.$message.success(response.message || '操作成功')
        //关闭弹框
        this.dialogVisible = false
        //刷新页面
        this.fetchData(this.page)
      })
    },
    //点击右边的编辑调用的方法
    edit(id){
      this.dialogVisible = true
      this.fetchDataById(id)
    },
    //根据id查询数据
    fetchDataById(id) {
      api.getById(id).then(response => {
        this.sysRole = response.data
      })
    },
    //有id，更新角色信息
    updateData(){
      api.updateById(this.sysRole).then(response => {
        this.$message.success(response.message || '操作成功')
        this.dialogVisible = false
        
        this.fetchData(this.page)
        
      })
      this.sysRole = {};
    },
    //批量删除
    batchRemove(){
      if(this.multipleSelection.length == 0){
        this.$message.warning('请选择要删除的记录！')
        return
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        let idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return api.batchRemove(idList)
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.message)
      })
    },
    //把复选框的数据传递 
    handleSelectionChange(selection){
      this.multipleSelection = selection;
    },
    //点击分配权限后跳转到以下页面
    showAssignAuth(row) {
      apiMenu.toAssign(row.id).then(result => {
          console.log("可以进入权限分配页面")
          this.$router.push('/system/assignAuth?id='+row.id+'&roleName='+row.roleName);
        })
    }
  }
}
</script>