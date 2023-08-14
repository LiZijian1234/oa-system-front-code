import request from '@/utils/request'
//角色管理页面
const api_name = '/admin/system/sysRole'

export default {
  /*
  获取角色分页列表(带搜索)
  */
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      //后端没用json格式传递，而是普通对象传递，所以是params:参数对象名称.
      //json的话是data:对象参数名称
      params: searchObj
    })
  },
  //删除角色
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  //添加角色api
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      //json的话是data:对象参数名称
      data: role
    })
  },

  //根据id查询
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  //根据角色对象更新数据
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  },

  //批量删除,传入多个id值的数据
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: `delete`,
      data: idList
    })
  },
  //获取所有角色以及用户对应的角色
  getRoles(adminId) {
    return request({
      url: `${api_name}/toAssign/${adminId}`,
      method: 'get'
    })
  },
  //给用户分配角色
  assignRoles(assginRoleVo) {
    return request({
      url: `${api_name}/doAssign`,
      method: 'post',
      data: assginRoleVo
    })
  }

}