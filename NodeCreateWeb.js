// 创建web服务器
const http = require('http')
const url = require('url')
const path = require('path')
const utils = require('./common/utils')

const app = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return

    utils.source('/static/css/xx.sass').then(res=>{
        console.log(res)
    })

    res.writeHead(200, {'Content-Type': 'application-json;charset=utf-8'})
    res.end('hello')
})

app.listen(3000, () => {
    console.log('服务运行在：http://192.168.31.155:3000')
})
