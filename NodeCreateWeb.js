// 创建web服务器
const http = require('http')
const Static = require('./common/Static')
const express = require('./common/express')

const app = http.createServer(express)

express.static('/static')

express.get('/', (req, res) => {
    // send是封装的方法
    // res.send('你好express')
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
    const a = {
        a: 1, b: 2
    }
    res.end(JSON.stringify(a))
})

app.listen(3000, () => {
    console.log('服务运行在：http://localhost:3000')
})
