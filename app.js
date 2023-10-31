const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { exec } = require('child_process')
const py_path = '\\opencv.py'
const asb_py_path = process.cwd() + py_path

// create socket.io server
const { createServer } = require('http')
const httpServer = createServer(app)
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    credentials: true
  }
})

app.use(express.static('public'));

io.on('connection', socket => {
	socket.on('open-webcam', () => {
    exec(`python ${asb_py_path}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error from executing python script：${error}`);
        return;
      }
    })
  })

  // get python opencv frame
  socket.on('python-opencv', (data) => {
    // emit frames to front-end
		// const frame = Buffer.from(data, 'base64').toString()
    socket.broadcast.emit('node-server-frame', data)
  })
	// screenshot event
	socket.on('capture-screenshot', () => {
	  // emit to python
	  socket.broadcast.emit('python-screenshot')
	})
	
	// close webcam
	socket.on('close-webcam', () => {
	  socket.broadcast.emit('close-opencv')
	})
})

app.get('/', (req,res)=>{
  res.redirect('index.html');
})

// start
httpServer.listen(port, () => console.log(`Server is running on http://localhost:${port}`))