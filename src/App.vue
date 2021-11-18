<template>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>
        data- {{data1}}
    </div>
    <div>
        data2-{{data2}}
    </div>
    <button @click="getToken">登录</button>
    <button @click="getData">获取数据</button>
</template>

<script>
import { get } from './service'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    setup () {
        const getToken = () => {
            get('/login').then((res) => {
                // 储存token
                localStorage.setItem('L-Token', res.data.refreshToken)
                localStorage.setItem('S-Token', res.data.accessToken)
            })
        }
        const data1 = ref('1')
        const data2 = ref('2')
        const getData = () => {
            get('/getData', {}, true).then((res) => {
                if (res.data.code === 200) {
                    data1.value = res.data.data.id
                }
            })
            get('/getData2', {}, true).then((res) => {
                if (res.data.code === 200) {
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
