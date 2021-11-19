<template>
    <el-menu-item v-for="(item, index) in menuRouterList" :key="index" :index="item.path">
        <el-icon>
            <icon-menu />
        </el-icon>
        <span>{{item.meta.title}}</span>
    </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Menu as IconMenu } from '@element-plus/icons'

export default defineComponent({
    components: {
        IconMenu
    },
    setup () {
        const router = useRouter()
        const menuRouterList = router.options.routes[0].children
        console.log(menuRouterList)

        return {
            menuRouterList
        }
    }
})
</script>
