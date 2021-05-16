const url = require('url')
const Static = require('./Static')

const server = () => {
    const routers = {
        _get: {},
        _post: {},
        staticPath: ''
    }

    const app = function (req, res) {
        if (req.url === '/favicon.ico') return

        // 配置静态资源服务
        Static(req, res, routers.staticPath)

        const pathname = url.parse(req.url).pathname
        const method = req.method.toLocaleLowerCase()

        if (routers['_' + method][pathname]) {
            routers['_' + method][pathname](req, res)
        } else {
            // routers[error](req, res)
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
