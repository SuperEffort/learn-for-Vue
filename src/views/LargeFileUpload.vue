<template>
    <el-upload
        action=""
        :limit="1"

        :file-list="fileList"
        :http-request="beforeAvatarUpload"
    >
        <el-button size="small" type="primary">上传文件</el-button>
    </el-upload>
</template>
<script>
import { ref } from 'vue'
import { post } from '@/service'

const SIZE = 5 * 1024 * 1024 // 切片大小 10M

export default {
    setup () {
        const fileList = ref([])

        // 文件切片
        const handleFileChunk = (file, size = SIZE) => {
            const fileChunkList = [] // 切片列表
            let cur = 0
            while (cur < file.size) {
                fileChunkList.push({ file: file.slice(cur, cur + size) })
                cur += size
            }
            return fileChunkList
        }

        // 合并切片
        const mergeRequest = (fileName) => {
            post('/mergeFileChunk', { fileName, size: SIZE }, true).then()
        }

        // 上传切片
        const uploadChunks = async (fileChunkList, fileName) => {
            const requestList = fileChunkList.map(({ file }, index) => {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('hash', `${fileName}-${index}`)
                formData.append('fileName', fileName)
                return { formData }
            }).map(async ({ formData }) => {
                post('/uploadBigFile', formData, true).then()
            })
            await Promise.all(requestList)
            await mergeRequest(fileName)
        }

        // 上传钩子
        const beforeAvatarUpload = async (fileData) => {
            const { file } = fileData
            const fileChunkList = handleFileChunk(file)
            await uploadChunks(fileChunkList, file.name)
        }

        return {
            fileList,
            beforeAvatarUpload
        }
    }
}
</script>
