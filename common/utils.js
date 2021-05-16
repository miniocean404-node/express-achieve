const path = require('path')

// 获取根目录
function resolve(...args) {
    const arr = args.map(arg => {
        return arg.indexOf('/') === -1 ? '/' + arg : arg;
    })
    return path.join(__dirname, '../', ...arr)
}

module.exports = {
    resolve,
}
