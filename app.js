var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var connectDB = require('./config/db');
var initMySQL = require('./config/iniMysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/tasks');
var goalRouter = require('./routes/goals');

var app = express();
let mysqlDB = null;

async function initializeDatabase() {
  try {
    if (process.env.DATABASE === 'MONGODB') {
      await connectDB();
      console.log('MongoDB conectado exitosamente');
    }

  if (process.env.DATABASE === 'MYSQL') {
    mysqlDB = await initMySQL();
    console.log('MySQL conectado y tablas verificadas ');
  }
}catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}
}

initializeDatabase();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (req.headers.authorization && req.headers.authorization === '123456') {
    req.db = mysqlDB; // Agrega la conexión a MySQL al objeto req para que esté disponible en las rutas
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', taskRouter);
app.use('/goals', goalRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`💾 Base de datos: ${process.env.DATABASE || 'MONGODB'}`);
  });
}

module.exports = app;
