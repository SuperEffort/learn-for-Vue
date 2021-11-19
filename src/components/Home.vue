<template>
    <div class="container">
        <div class="menu">
            <el-menu default-active="2" background-color="#001529" text-color="#fff" router>
                <Menu></Menu>
            </el-menu>
        </div>
        <div class="content">
            <el-card class="box-card">
            <router-view></router-view>
            </el-card>
        </div>
    </div>
</template>

<script>
import Menu from './Menu'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Menu
    },
    setup () {
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath)
        }
        return {
            handleOpen,
            handleClose
        }
    }
})
</script>

<style scoped>
.container {
    display: flex;
}
.menu {
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
}
.content {
    padding: 5px;
    box-sizing: border-box;
    flex: 1;
}
.box-card {
    width: 100%;
    height: 100%;
}
</style>
