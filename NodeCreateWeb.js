const http = require('http')
const utils = require('./common/utils')
const express = require('./common/express')

const app = http.createServer(express)

express.static('/static')

express.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
    const a = {
        a: 1, b: 2
    }
    res.end(JSON.stringify(a))
})

const server = app.listen(3000, utils.getIpAddress(), () => {
    const port = server.address().port
    const address = server.address().address
    console.log(`服务器运行在http://${address}:${port}`)
})
