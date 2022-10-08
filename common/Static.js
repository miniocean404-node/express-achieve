const fs = require('fs')
const path = require('path')
const utils = require('./utils')

// 获取mime类型
function getMime(mime) {
  const data = fs.readFileSync(utils.resolve('/static/json/mime.json'), 'utf-8')
  return JSON.parse(data)[mime]
}

// 获取静态资源
function source(dir) {
  return new Promise((res, rej) => {
    fs.readFile(utils.resolve(dir), 'utf-8', (e, data) => {
      if (e) return rej(e)
      res(data)
    })
  })
}

module.exports = function (req, resp, staticPath) {
  const extname = path.extname(req.url)
  const mime = getMime(extname)
  const address = staticPath + req.url

  if (!extname) return

  if (mime) {
    source(address)
      .then((res, rej) => {
        if (res) {
          resp.writeHead(200, { 'Content-Type': `${mime};charset=utf-8` })
          resp.end(res)
        }
      })
      .catch((reason) => {
        resp.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
        reason.msg = '这个文件不存在'
        resp.end(JSON.stringify(reason))
      })
  }

  if (!mime) {
    resp.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' })
    resp.end(JSON.stringify({ msg: '没有这个mime类型' }))
  }
}
