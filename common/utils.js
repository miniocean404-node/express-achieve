const path = require('path')
const os = require('os')

// 获取根目录
function resolve(...args) {
    const arr = args.map(arg => {
        return arg.indexOf('/') === -1 ? '/' + arg : arg;
    })
    return path.join(__dirname, '../', ...arr)
}

/**
 * 获取当前机器的ip地址
 */
function getIpAddress() {
    // 网络接口
    const interfaces = os.networkInterfaces()
    let Inter = interfaces['WLAN']

    for (const value of Inter) {
        const {family, address, internal} = value
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
            return address
        }
    }
}

module.exports = {
    resolve,
    getIpAddress
}
