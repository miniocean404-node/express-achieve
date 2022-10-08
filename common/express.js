const url = require('url')
const path = require('path')
const setStatic = require('./static')

function setSend(res) {
  res.send = (data) => {
    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
    res.end(data)
  }
}

const server = () => {
  const routers = {
    _get: {},
    _post: {},
    staticPath: '',
  }

  // http.createServer 每次请求时候的回调函数
  const app = function (req, res) {
    if (req.url === '/favicon.ico') return

    setSend(res)

    // 配置静态资源服务
    setStatic(req, res, routers.staticPath)

    // 配置路由
    const pathname = url.parse(req.url).pathname // 获取请求路由地址
    const method = req.method.toLocaleLowerCase()
    const extname = path.extname(pathname)

    // 不处理 static
    if (extname) return

    // 如果没有文件拓展名就让路由处理，防止end使用过多
    const route = routers['_' + method][pathname]

    if (route) {
      if (method === 'post') {
        // todo post请求是流形式，需要监听data
        let postDate = ''

        req.on('data', (chunk) => {
          postDate += chunk
        })

        req.on('end', () => {
          res.body = JSON.parse(JSON.stringify(postDate))
        })
      }

      route(req, res)
    }

    if (!route) {
      res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
      res.end('页面不存在')
    }
  }

  // 扩展路由方法 初始化时候注册
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
