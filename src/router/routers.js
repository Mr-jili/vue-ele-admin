import Main from '@/layout'
// import parentView from '@/components/parent-view'

/**
 * 参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * affix: tagNav中使用
 * }
 */

export default [
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          affix: true,
          icon: 'el-icon-user'
        },
        component: () => import('@/view/home/index.vue')
      }
    ]
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: 'el-icon-user',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },
  {
    path: '/component',
    name: 'component',
    meta: {
      icon: 'el-icon-s-grid',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'el-icon-s-data',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/tree-select/tree-select.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'el-icon-s-data',
          title: '数字渐变'
        },
        component: () => import('@/view/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'el-icon-s-data',
          title: '拖拽列表'
        },
        component: () => import('@/view/drag-list/drag-list.vue')
      },
      {
        path: 'drawer',
        name: 'drawer',
        meta: {
          icon: 'el-icon-s-data',
          title: '可拖动抽屉'
        },
        component: () => import('@/view/drawer')
      },
      {
        path: 'tree_table',
        name: 'tree_table',
        meta: {
          icon: 'el-icon-s-data',
          title: '树状表格'
        },
        component: () => import('@/view/tree-table')
      },
      {
        path: 'new_icon',
        name: 'new_icon',
        meta: {
          icon: 'el-icon-s-data',
          title: '自定义图标'
        },
        component: () => import('@/view/new-icon')
      },
      {
        path: 'markdown_edit',
        name: 'markdown_edit',
        meta: {
          icon: 'el-icon-s-data',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/markdown-edit')
      },
    ]
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      icon: 'el-icon-s-grid',
      title: '上传数据'
    },
    component: Main,
    children: [
      {
        path: 'upload_CSV',
        name: 'upload_CSV',
        meta: {
          icon: 'el-icon-s-data',
          title: '上传CSV文件'
        },
        component: () => import('@/view/upload-CSV')
      },
      {
        path: 'paste_table_data',
        name: 'paste_table_data',
        meta: {
          icon: 'el-icon-s-data',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/paste-table-data')
      },
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'el-icon-folder',
          title: 'i18n'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'el-icon-folder',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'el-icon-folder',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  }
]
