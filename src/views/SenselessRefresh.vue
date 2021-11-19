<template>
    <el-descriptions
        title="无感刷新"
        direction="vertical"
        :column="4"
        border>
        <el-descriptions-item label="数据-1">
            <el-empty description="No Data" v-if="!data1"></el-empty>
            <span v-else> {{ data1 }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="数据-2">
            <el-empty description="No Data" v-if="!data2"></el-empty>
            <span v-else> {{ data2 }} </span>
        </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 20px;">
        <el-button type="primary" @click="getToken">登录</el-button>
        <el-button type="primary" @click="getData">获取数据</el-button>
    </div>
</template>

<script>
import { get } from '@/service'
import { ref } from 'vue'

export default {
    name: 'App',
    setup () {
        const getToken = () => {
            get('/login').then((res) => {
                // 储存token
                localStorage.setItem('L-Token', res.data.refreshToken)
                localStorage.setItem('S-Token', res.data.accessToken)
            })
        }
        const data1 = ref(null)
        const data2 = ref(null)

        const getData = () => {
            get('/getData', {}, true).then((res) => {
                if (res) {
                    data1.value = res.data.data.id
                }
            })
            get('/getData2', {}, true).then((res) => {
                if (res) {
                    data2.value = res.data.data.age
                }
            })
        }

        return {
            getToken,
            getData,
            data1,
            data2
        }
    }
}
</script>
