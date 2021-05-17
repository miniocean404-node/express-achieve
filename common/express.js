const url = require('url')
const path = require('path')
const Static = require('./Static')

function addSent(res) {
    res.send = (data) => {
        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
        res.end(data)
    }
}

const server = () => {
    const routers = {
        _get: {},
        _post: {},
        staticPath: ''
    }

    const app = function (req, res) {
        if (req.url === '/favicon.ico') return

        addSent(res)

        // 配置静态资源服务
        Static(req, res, routers.staticPath)

        // 配置路由
        const pathname = url.parse(req.url).pathname
        const method = req.method.toLocaleLowerCase()
        const extname = path.extname(pathname)

        // 如果没有文件拓展名就让路由处理，防止end使用过多
        if(!extname){
            if (routers['_' + method][pathname]) {
                if (method === 'post') {
                    // todo post请求是流形式，需要监听data
                    let postDate = ''
                    req.on('data', chunk => {
                        postDate += chunk
                    })
                    req.on('end', () => {
                        res.body = JSON.parse(JSON.stringify(postDate))
                    })
                }
                routers['_' + method][pathname](req, res)
            } else {
                res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                res.end('页面不存在')
            }
        }
    }

    app.get = function (url, cb) {
        routers._get[url] = cb
    }

    app.post = function (url, cb) {
        routers._post[url] = cb
    }

    app.static = function (staticPath) {
        routers.staticPath = staticPath
    }

    return app
}

// 闭包返回app函数
module.exports = server()
