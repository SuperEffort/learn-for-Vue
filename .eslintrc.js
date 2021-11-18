module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        "indent": ["error", 4],
        "no-var": "error",
        "object-shorthand": "error", // 使用对象简写方式
        "prefer-destructuring": "error", // 需要使用对象的多个属性时，请使用解构赋值
        "prefer-template": "error", // 生成字符串时，请使用模板字符串(1)
        "template-curly-spacing": "error", // 生成字符串时，请使用模板字符串(2)
        "no-param-reassign": "error", // 不要更改参数
        "func-style": "error", // 使用具名函数表达式而非函数声明
        "no-loop-func": "error", // 不要在非函数代码块（if , while 等）中声明函数
        "prefer-spread": "error", // 调用可变参数函数时建议使用展开运算符 ....
        "prefer-arrow-callback": "error", // 当你必须使用函数表达式（传递匿名函数）时，使用箭头函数标记(1)
        "arrow-spacing": "error", // 当你必须使用函数表达式（传递匿名函数）时，使用箭头函数标记(2)
        "arrow-parens": "error", // 函数如果只接收一个参数并且没使用用花括号，则省略圆括号
        "arrow-body-style": "error", // 如果函数体只包含一条没有副作用的返回表达式的语句，可以省略花括号并使用隐式的 return， 否则保留花括号并使用 return 语句
        "import/imports-first": "error", // 将所有 import 语句放在文件最前方
        "import/no-webpack-loader-syntax": "error", // 在模块 import 声明中禁止使用 Webpack 的 loader 语法
        "no-iterator": "error", // 使用 JS 更高优先级的函数代替 for-in 或 for-of 循环
        "no-restricted-syntax": "error", // 使用 JS 更高优先级的函数代替 for-in 或 for-of 循环
        "prefer-const": "error", // 如果一个变量从未被重新赋值，使用const声明会更好。
    }
}
