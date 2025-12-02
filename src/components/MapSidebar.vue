<template>
  <div class="map-sidebar">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="按关键字进行搜索"
        @keyup.enter="handleSearch"
      />
      <button class="search-button" @click="handleSearch">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>

    <!-- 列表内容 -->
    <div class="list-content">
      <div
        v-for="(category, index) in filteredCategories"
        :key="index"
        class="category-item"
        :class="{ expanded: category.expanded, active: category.expanded }"
      >
        <!-- 类别标题 -->
        <div
          class="category-header"
          @click="toggleCategory(index)"
        >
          <span class="arrow-icon" :class="{ expanded: category.expanded }">
             <SvgIcon name="arrow-right" />
          </span>
          <span class="folder-icon"> <SvgIcon name="folder" /></span>
          <span class="category-name">{{ category.name }}</span>
          <span class="more-icon" @click.stop="handleMore(category)">
             <SvgIcon name="more" />
          </span>
        </div>

        <!-- 子项列表 -->
        <div v-if="category.expanded" class="sub-items">
          <div
            v-for="(item, itemIndex) in category.items"
            :key="itemIndex"
            class="sub-item"
            @click="handleItemClick(item)"
          >
            <span class="item-icon">
                <SvgIcon name="device" />
            </span>
            <span class="item-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
// 定义类型
interface CategoryItem {
  name: string;
  id?: string;
}

interface Category {
  name: string;
  expanded: boolean;
  items: CategoryItem[];
}

// Props
interface Props {
  data?: Category[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
});

// Emits
const emit = defineEmits<{
  itemClick: [item: CategoryItem];
  search: [keyword: string];
}>();

// 搜索关键词
const searchKeyword = ref("");

// 假数据
const defaultCategories = ref<Category[]>([
  {
    name: "绿化种植区",
    expanded: true,
    items: [
      { name: "Solar Greenhouse", id: "1" },
      { name: "Solar Greenhouse", id: "2" }
    ]
  },
  {
    name: "生态种植区",
    expanded: false,
    items: [
      { name: "Solar Greenhouse", id: "3" },
      { name: "Solar Greenhouse", id: "4" },
      { name: "Solar Greenhouse", id: "5" }
    ]
  },
  {
    name: "农业种植区",
    expanded: false,
    items: [
      { name: "Solar Greenhouse", id: "6" }
    ]
  },
  {
    name: "植物生产区",
    expanded: false,
    items: [
      { name: "Solar Greenhouse", id: "7" },
      { name: "Solar Greenhouse", id: "8" }
    ]
  },
  {
    name: "智能种植区",
    expanded: false,
    items: [
      { name: "Solar Greenhouse", id: "9" },
      { name: "Solar Greenhouse", id: "10" },
      { name: "Solar Greenhouse", id: "11" }
    ]
  }
]);

// 使用传入的数据或默认数据
const categories = computed(() => {
  return props.data.length > 0 ? props.data : defaultCategories.value;
});

// 过滤后的类别列表
const filteredCategories = computed(() => {
  if (!searchKeyword.value) {
    return categories.value;
  }
  
  const keyword = searchKeyword.value.toLowerCase();
  return categories.value
    .map(category => {
      const matchedItems = category.items.filter(item =>
        item.name.toLowerCase().includes(keyword) ||
        category.name.toLowerCase().includes(keyword)
      );
      
      if (matchedItems.length > 0 || category.name.toLowerCase().includes(keyword)) {
        return {
          ...category,
          items: matchedItems.length > 0 ? matchedItems : category.items
        };
      }
      return null;
    })
    .filter(Boolean) as Category[];
});

// 切换类别展开/折叠
const toggleCategory = (index: number) => {
  const category = filteredCategories.value[index];
  if (category) {
    category.expanded = !category.expanded;
  }
};

// 处理搜索
const handleSearch = () => {
  emit("search", searchKeyword.value);
};

// 处理更多操作
const handleMore = (category: Category) => {
  console.log("更多操作:", category.name);
};

// 处理子项点击
const handleItemClick = (item: CategoryItem) => {
  emit("itemClick", item);
};
</script>

<style scoped>
.map-sidebar {
  position: absolute;
  left: 12px;
  top: 12px;
  width: 320px;
  max-height: calc(100vh - 40px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #1890ff;
}

.search-input::placeholder {
  color: #bfbfbf;
}

.search-button {
  width: 40px;
  height: 40px;
  border: none;
  background: #1890ff;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  flex-shrink: 0;
}

.search-button:hover {
  background: #40a9ff;
}

.search-button:active {
  background: #096dd9;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
  max-height: calc(100vh - 180px);
}

.category-item {
  border-bottom: 1px solid #f0f0f0;
}

.category-item:last-child {
  border-bottom: none;
}

.category-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 8px;
}

.category-header:hover {
  background-color: #fafafa;
}

.category-item.active .category-header {
  background-color: #f5f5f5;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c8c8c;
  transition: transform 0.2s;
}

.arrow-icon.expanded {
  transform: rotate(90deg);
}

.folder-icon {
  font-size: 18px;
  margin-right: 4px;
}

.category-name {
  flex: 1;
  font-size: 14px;
  color: #262626;
}

.more-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c8c8c;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.more-icon:hover {
  background-color: #f0f0f0;
}

.sub-items {
  background-color: #fafafa;
  padding: 4px 0;
}

.sub-item {
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 44px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 12px;
}

.sub-item:hover {
  background-color: #f0f0f0;
}

.item-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #595959;
  flex-shrink: 0;
}

.item-name {
  font-size: 14px;
  color: #262626;
}

/* 滚动条样式 */
.list-content::-webkit-scrollbar {
  width: 6px;
}

.list-content::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.list-content::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.list-content::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}
</style>

