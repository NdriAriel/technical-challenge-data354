const http = require("http");
const path =require('path')
var logger = require('morgan');

const express = require('express')
const app = express()
const host = process.env.HOST||'localhost';
const port = process.env.PORT||8001;

app.use(require("cors")())
app.use(logger('dev'));

app.use(express.static(path.join(__dirname , './documentation')));

app.get('/docs',(req, res,next) => {
  try{
    res.status(200).sendFile('index.html',{root:path.join(__dirname , "./documentation")})
  }catch(err){
   next(err)
  }
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // next(createError(404));
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
    console.log(`Aq54 doc server is running on http://localhost:${port}`);
});
