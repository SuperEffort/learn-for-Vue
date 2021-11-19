import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    name: 'senselessRefresh',
                    path: '/senselessRefresh',
                    meta: {
                        title: '无感刷新'
                    },
                    component: () => import('@/views/SenselessRefresh.vue')
                },
                {
                    name: 'largeFileUpload',
                    path: '/largeFileUpload',
                    meta: {
                        title: '大文件上传'
                    },
                    component: () => import('@/views/LargeFileUpload.vue')
                }
            ]
        }
    ]
})

export default router
