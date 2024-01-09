const http = require("http");
var createError = require('http-errors');
const path =require('path')
const express = require('express')
const app = express()
const host = 'localhost';
const port = 8001;
var logger = require('morgan');



app.use(require("cors")())
app.use(logger('dev'));

app.use(express.static(path.join(__dirname,'aq54')));

app.get('**',(req,res,next)=>{
  res.sendFile('index.html',{root:path.join(__dirname,'aq54')})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('**')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page//
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
