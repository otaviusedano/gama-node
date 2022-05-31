const http = require('http')
const url  =require('url')
const queryString = require('query-string')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const location = url.parse(req.url, true)
  const params = queryString.parse(location.search)
  const userContent = JSON.stringify(params)
  let fileContent
  const file = `users/${params.id}.txt`

  if (location.pathname == '/create-user') {
    fs.writeFile(file, userContent, (err) => {
      if (err) throw err
      console.log('Usuario criado')
    })
  } else if (location.pathname == '/select-user') {
      if(!fs.existsSync(file)) {
        console.log('arquivo nao encontrado') 
      } else {
        const data = fs.readFileSync(file, 'utf-8')
        fileContent = data
        console.log('Usuario selecionado')
      }
  } else if (location.pathname == '/delete-user') {
    fs.unlink(file, (err) => {
      if (err.code !== 'ENOENT') console.log(`${file} Deletado`) 
       else console.log('arquivo nao encontrado');
    })
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(fileContent)
})

const hostname = '127.0.0.1'

const port = 3000

server.listen(port, hostname, () => {
  console.log(`Estou ouvindo na: ${hostname}:${port}`)
})
