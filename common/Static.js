const fs = require('fs')
const url = require('url')
const path = require('path')
const utils = require('./utils')

// 获取mime类型
function getMime(mime) {
    const data = fs.readFileSync(utils.resolve('/static/json/mime.json'), "utf-8")
    return JSON.parse(data)[mime]
}

// 获取静态资源
function source(dir) {
    return new Promise((res, rej) => {
        let str = ''
        fs.readFile(utils.resolve(dir), 'utf-8', (err, data) => {
            if (err) {
                rej(false)
                console.log(err.toString() || err, '获取静态资源错误')
                return
            }
            str += data
            res(str)
        })
    })
}

module.exports = function (req, resp, staticPath) {
    const extname = path.extname(req.url)
    const mime = getMime(extname)

    source(staticPath + req.url).then((res, rej) => {
        resp.writeHead(200, {'Content-Type': `${mime};charset=utf-8`})
        resp.end(rej)
    })
}


