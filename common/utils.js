const fs = require('fs')
const path = require('path')

// 获取根目录
function resolve(...args) {
    const arr = args.map(arg => {
        return arg.indexOf('/') === -1 ? '/' + arg : arg;
    })
    return path.join(__dirname, '../', ...arr)
}

// 获取mime类型
function getMime(mime) {
    const data = fs.readFileSync(resolve('/static/json/mime.json'), "utf-8")
    return JSON.parse(data)[mime]
}

// 获取静态资源
function source(dir) {
    return new Promise((res, rej) => {
        let str = ''
        fs.readFile(resolve(dir), 'utf-8', (err, data) => {
            if (err) {
                console.log(err.toString() || err)
                return rej(false)
            }
            str = str += data
        })
        res(str)
    })
}

module.exports = {
    resolve,
    getMime,
    source
}



