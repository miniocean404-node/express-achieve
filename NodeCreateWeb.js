// 创建web服务器
const http = require('http')
const Static = require('./common/Static')
const express = require('./common/express')

const app = http.createServer(express)

app.get('/',(req,res)=>{

})

app.listen(3000, () => {
    console.log('服务运行在：http://192.168.31.155:3000')
})
