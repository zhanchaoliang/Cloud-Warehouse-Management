<template>
  <a-layout class="custom-layout">
    <!-- 渐变色导航栏 -->
    <a-layout-header class="gradient-header">
      <div class="logo-container">
        <a-icon type="cloud" class="logo-icon" />
        <span class="logo-text">云仓库系统</span>
      </div>
      <div class="header-right">
        <a-button icon="upload" class="upload-btn">上传文件</a-button>
        <a-button icon="plus" class="new-btn">新建</a-button>
        <a-dropdown>
          <a class="ant-dropdown-link user-menu" href="#">
            <a-avatar size="small" icon="user" />
            <span class="ml-2">管理员</span>
          </a>
          <template #overlay>
            <a-menu class="user-dropdown">
              <a-menu-item key="1">
                <a-icon type="user" class="mr-2" />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="setting" class="mr-2" />
                <span>设置</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <a-icon type="logout" class="mr-2" />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    
    <!-- 主体内容区 -->
    <a-layout>
      <!-- 美化的侧边栏 -->
      <a-layout-sider
        width="240"
        class="custom-sider"
        :collapsed="collapsed"
        @collapse="handleCollapse"
      >
        <div class="sider-header">
          <div class="sider-logo">
            <a-icon type="cloud" class="sider-logo-icon" />
            <span class="sider-logo-text">云仓库</span>
          </div>
          <a-icon
            type="menu-unfold"
            class="toggle-icon"
            @click="toggleCollapsed"
          />
        </div>
        
        <a-menu
          mode="inline"
          default-selected-keys="1"
          default-open-keys="sub1"
          class="custom-menu"
        >
          <a-menu-item key="1" class="menu-item">
            <a-icon type="home" class="menu-icon" />
            <span>首页</span>
          </a-menu-item>
          <a-menu-item key="2" class="menu-item">
            <a-icon type="folder" class="menu-icon" />
            <span>我的文件</span>
          </a-menu-item>
          <a-menu-item key="3" class="menu-item">
            <a-icon type="share-alt" class="menu-icon" />
            <span>共享文件</span>
          </a-menu-item>
          <a-menu-item key="4" class="menu-item">
            <a-icon type="star" class="menu-icon" />
            <span>收藏文件</span>
          </a-menu-item>
          <a-menu-item key="5" class="menu-item">
            <a-icon type="delete" class="menu-icon" />
            <span>回收站</span>
          </a-menu-item>
          <a-sub-menu key="sub1" class="menu-item">
            <template #title>
              <a-icon type="pie-chart" class="menu-icon" />
              <span>存储空间</span>
            </template>
            <a-menu-item key="6">个人空间</a-menu-item>
            <a-menu-item key="7">团队空间</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2" class="menu-item">
            <template #title>
              <a-icon type="setting" class="menu-icon" />
              <span>设置</span>
            </template>
            <a-menu-item key="8">个人设置</a-menu-item>
            <a-menu-item key="9">隐私设置</a-menu-item>
          </a-sub-menu>
        </a-menu>
        
        <!-- 存储空间指示器 -->
        <div class="storage-indicator">
          <div class="storage-title">存储空间</div>
          <a-progress
            percent="65"
            stroke-color="#409eff"
            trail-color="#283447"
            class="storage-progress"
          />
          <div class="storage-info">
            <span>6.5GB / 10GB</span>
            <a-button type="link" size="small" class="upgrade-btn">升级</a-button>
          </div>
        </div>
      </a-layout-sider>
      
      <!-- 主内容区 -->
      <a-layout-content class="custom-content">
        <!-- 面包屑导航 -->
        <a-breadcrumb class="breadcrumb">
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>我的文件</a-breadcrumb-item>
          <a-breadcrumb-item>文档</a-breadcrumb-item>
        </a-breadcrumb>
        
        <!-- 文件列表 -->
        <div class="file-list-container">
          <!-- 工具栏 -->
          <div class="toolbar">
            <a-input-search
              placeholder="搜索文件或文件夹"
              style="width: 300px"
              class="search-input"
            />
            <div class="view-toggle">
              <a-button-group>
                <a-button
                  icon="appstore"
                  :class="{ 'active': viewMode === 'list' }"
                  @click="viewMode = 'list'"
                >
                  列表视图
                </a-button>
                <a-button
                  icon="table"
                  :class="{ 'active': viewMode === 'grid' }"
                  @click="viewMode = 'grid'"
                >
                  网格视图
                </a-button>
              </a-button-group>
            </div>
            <a-button type="primary" class="new-folder-btn">
              <a-icon type="plus" /> 新建文件夹
            </a-button>
          </div>
          
          <!-- 文件列表 -->
          <div class="file-list">
            <!-- 列表视图 -->
            <a-table
              :columns="columns"
              :data-source="data"
              bordered
              class="file-table"
              v-if="viewMode === 'list'"
            >
              <template #title>
                <span class="table-title">我的文档</span>
                <a-button type="dashed" size="small" class="import-btn">
                  <a-icon type="upload" /> 导入文件
                </a-button>
              </template>
              <template #name="{ text, record }">
                <div class="file-item">
                  <a-icon
                    :type="record.type === 'folder' ? 'folder' : 'file'"
                    :class="record.type === 'folder' ? 'folder-icon' : 'file-icon'"
                    class="mr-2"
                  />
                  <span>{{ text }}</span>
                </div>
              </template>
              <template #action="{ record }">
                <div class="action-buttons">
                  <a-button type="link" size="small" class="action-btn">
                    <a-icon type="download" />
                  </a-button>
                  <a-button type="link" size="small" class="action-btn">
                    <a-icon type="share-alt" />
                  </a-button>
                  <a-button type="link" size="small" class="action-btn">
                    <a-icon type="edit" />
                  </a-button>
                  <a-popconfirm
                    title="确定要删除吗?"
                    ok-text="确定"
                    cancel-text="取消"
                  >
                    <a-button type="link" size="small" class="action-btn delete-btn">
                      <a-icon type="delete" />
                    </a-button>
                  </a-popconfirm>
                </div>
              </template>
            </a-table>
            
            <!-- 网格视图 -->
            <div class="grid-view" v-else>
              <div
                class="grid-item"
                v-for="file in data"
                :key="file.key"
                :class="file.type === 'folder' ? 'folder-item' : 'file-item'"
              >
                <div class="item-icon">
                  <a-icon
                    :type="file.type === 'folder' ? 'folder' : 'file'"
                    :class="file.type === 'folder' ? 'folder-icon' : 'file-icon'"
                  />
                </div>
                <div class="item-name">{{ file.name }}</div>
                <div class="item-info">
                  <span>{{ file.size }}</span>
                  <span>{{ file.modified }}</span>
                </div>
                <div class="item-actions">
                  <a-button type="link" size="small" class="action-btn">
                    <a-icon type="download" />
                  </a-button>
                  <a-button type="link" size="small" class="action-btn">
                    <a-icon type="share-alt" />
                  </a-button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 最近活动 -->
          <a-card class="recent-activity">
            <template #title>
              <span class="card-title">最近活动</span>
              <a-button type="link" size="small" class="view-all-btn">查看全部</a-button>
            </template>
            <a-timeline class="activity-timeline">
              <a-timeline-item color="green">
                <span class="activity-user">张三</span> 上传了文件 <span class="activity-file">项目报告.docx</span>
                <span class="activity-time">10分钟前</span>
              </a-timeline-item>
              <a-timeline-item color="blue">
                <span class="activity-user">李四</span> 共享了文件夹 <span class="activity-file">设计资源</span>
                <span class="activity-time">1小时前</span>
              </a-timeline-item>
              <a-timeline-item color="orange">
                <span class="activity-user">王五</span> 下载了文件 <span class="activity-file">需求规格.pdf</span>
                <span class="activity-time">3小时前</span>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
    
    <!-- 页脚 -->
    <a-layout-footer class="custom-footer">
      <div class="footer-content">
        <div class="footer-left">
          <span>云仓库系统 ©2023</span>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">使用条款</a>
          <a href="#" class="footer-link">帮助中心</a>
        </div>
        <div class="footer-right">
          <span>版本: 1.0.0</span>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, computed } from 'vue';

// 侧边栏折叠状态
const collapsed = ref(false);
const viewMode = ref('list');

// 切换侧边栏折叠状态
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const handleCollapse = (value) => {
  collapsed.value = value;
};

// 表格列定义
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '40%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    width: '15%',
  },
  {
    title: '修改日期',
    dataIndex: 'modified',
    key: 'modified',
    width: '20%',
  },
  {
    title: '所有者',
    dataIndex: 'owner',
    key: 'owner',
    width: '15%',
  },
  {
    title: '操作',
    key: 'action',
    width: '10%',
    scopedSlots: { customRender: 'action' },
  },
];

// 表格数据
const data = [
  {
    key: '1',
    name: '项目文档',
    type: 'folder',
    size: '-',
    modified: '2023-06-15 14:30',
    owner: '张三',
  },
  {
    key: '2',
    name: '设计图.png',
    type: 'file',
    size: '2.4MB',
    modified: '2023-06-10 09:45',
    owner: '李四',
  },
  {
    key: '3',
    name: '需求规格说明书.docx',
    type: 'file',
    size: '1.2MB',
    modified: '2023-06-08 16:20',
    owner: '王五',
  },
  {
    key: '4',
    name: '会议记录',
    type: 'folder',
    size: '-',
    modified: '2023-06-05 11:15',
    owner: '赵六',
  },
  {
    key: '5',
    name: '产品原型.mpd',
    type: 'file',
    size: '5.8MB',
    modified: '2023-06-01 15:30',
    owner: '钱七',
  },
];
</script>

<style scoped>
/* 全局样式 */
.custom-layout {
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 渐变色导航栏 */
.gradient-header {
  background: linear-gradient(90deg, #409eff, #66b1ff);
  color: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo-icon {
  font-size: 24px;
  margin-right: 8px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
}

.upload-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  margin-right: 16px;
}

.upload-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.new-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  margin-right: 24px;
}

.new-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.user-menu {
  color: white;
  display: flex;
  align-items: center;
}

.user-dropdown {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 美化的侧边栏 */
.custom-sider {
  background-color: #1d2129;
  color: #fff;
  border-right: none;
}

.sider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sider-logo {
  display: flex;
  align-items: center;
}

.sider-logo-icon {
  font-size: 20px;
  margin-right: 8px;
  color: #409eff;
}

.sider-logo-text {
  font-size: 16px;
  font-weight: bold;
}

.toggle-icon {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.toggle-icon:hover {
  color: #fff;
}

.custom-menu {
  background-color: transparent;
  border-right: none;
}

.menu-item {
  margin: 8px 0;
}

.menu-item a {
  color: rgba(255, 255, 255, 0.7);
}

.menu-item a:hover {
  color: #fff;
}

.ant-menu-item-selected,
.ant-menu-submenu-selected {
  background-color: rgba(64, 158, 255, 0.1);
  border-right: 3px solid #409eff;
}

.ant-menu-item-selected a,
.ant-menu-item-selected a:hover {
  color: #409eff;
}

.menu-icon {
  margin-right: 12px;
  font-size: 16px;
}

.storage-indicator {
  padding: 16px 24px;
  margin-top: 24px;
}

.storage-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.7);
}

.storage-progress {
  margin-bottom: 8px;
}

.storage-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.upgrade-btn {
  color: #409eff;
}

/* 主内容区 */
.custom-content {
  padding: 24px;
  background-color: #f5f7fa;
}

.breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
}

.file-list-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-input {
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.view-toggle {
  margin: 0 16px;
}

.view-toggle .active {
  background-color: #409eff;
  color: white;
}

.new-folder-btn {
  background-color: #409eff;
  border-color: #409eff;
}

.new-folder-btn:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.file-list {
  margin-top: 24px;
}

.table-title {
  font-size: 18px;
  font-weight: 500;
  color: #1d2129;
}

.import-btn {
  color: #409eff;
}

.file-item {
  display: flex;
  align-items: center;
}

.folder-icon {
  color: #ffb74d;
  font-size: 18px;
}

.file-icon {
  color: #90a4ae;
  font-size: 18px;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.action-btn {
  padding: 0 4px;
}

.delete-btn {
  color: #f5222d;
}

/* 网格视图 */
.grid-view {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.grid-item {
  width: 180px;
  height: 160px;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
}

.grid-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.folder-item {
  background-color: rgba(255, 183, 77, 0.05);
  border-color: rgba(255, 183, 77, 0.2);
}

.item-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.item-info {
  font-size: 12px;
  color: #86909c;
  text-align: center;
  margin-bottom: 8px;
}

.item-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

/* 最近活动卡片 */
.recent-activity {
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
}

.view-all-btn {
  color: #409eff;
}

.activity-timeline {
  padding: 16px 0;
}

.activity-user {
  font-weight: 500;
  color: #1d2129;
}

.activity-file {
  font-weight: 500;
  color: #409eff;
}

.activity-time {
  color: #86909c;
  margin-left: 16px;
}

/* 页脚 */
.custom-footer {
  background-color: #fff;
  border-top: 1px solid #e5e6eb;
  padding: 16px 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #86909c;
  font-size: 14px;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-link {
  margin-left: 24px;
  color: #86909c;
  text-decoration: none;
}

.footer-link:hover {
  color: #409eff;
}
</style>
