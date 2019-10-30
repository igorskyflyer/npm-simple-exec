const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')

const rootDirectory = path.resolve(__dirname, '../')
const releaseDirectory = path.resolve(rootDirectory, 'release/')

function clearDir() {
	const files = fs.readdirSync(releaseDirectory, {
		encoding: 'utf-8'
	})

	files.forEach((file, index, array) => {
		fs.unlinkSync(path.resolve(releaseDirectory, file))
	})
}

console.log('Building...')

exec('npm pack', (err, out, stderr) => {
	if (err) {
		throw err
	}

	const filename = out.trim()
	const filepath = path.join(rootDirectory, filename)

	if (fs.existsSync(filepath)) {
		clearDir()
		fs.renameSync(filepath, path.resolve(releaseDirectory, filename))

		console.clear()
		console.log('Build completed.')
	}
})
