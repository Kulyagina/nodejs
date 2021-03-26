const fs = require('fs')
const path = require('path')

class FileUtils {

    static read(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', fileName),
                'utf-8',
                (err, data) => {
                    if (err) reject(err)
                    else resolve(JSON.parse(data))
                }
            )
        })
    }

    static write(fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', fileName),
                JSON.stringify(data),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                }
            )
        })
    }

    static writeAndReturnData(fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', fileName),
                JSON.stringify(data),
                (err) => {
                    if (err) reject(err)
                    else resolve(data)
                }
            )
        })
    }
}

module.exports = FileUtils
