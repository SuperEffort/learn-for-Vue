<template>
    <el-upload
        class="upload-demo"
        action=""
        multiple
        :limit="3"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
    >
        <el-button size="small" type="primary">上传文件</el-button>
    </el-upload>
</template>
<script>
import { ref } from 'vue'

const SIZE = 10 * 1024 * 1024 // 切片大小 10M

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

        // 上传钩子
        const beforeAvatarUpload = (fileData) => {
            const fileChunkList = handleFileChunk(fileData)
            const data = fileChunkList.map(({ file }, index) => ({
                chunk: file,
                hash: `${fileData.name}-${index}` // 文件名 + 数组下标
            }))
            console.log(data)
        }

        return {
            fileList,
            beforeAvatarUpload
        }
    }
}
</script>
