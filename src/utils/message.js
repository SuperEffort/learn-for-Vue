import { ElMessage } from 'element-plus'

let messageInstance = null
const resetMessage = (options) => {
    if (messageInstance) {
        messageInstance.close()
    }
    messageInstance = ElMessage(options)
};

['error', 'success', 'info', 'warning'].forEach((type) => {
    resetMessage[type] = (options) => {
        let messageOptions = options
        if (typeof options === 'string') {
            messageOptions = {
                message: options
            }
        }
        messageOptions.type = type
        return resetMessage(messageOptions)
    }
})

export default resetMessage
