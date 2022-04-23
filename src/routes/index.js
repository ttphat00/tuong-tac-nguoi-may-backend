const authRouter = require('./auth');
const userRouter = require('./users');
const animalRouter = require('./animals');

function route(app) {
    //api users
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);

    //api animals
    app.use('/api/animals', animalRouter);

    app.use('/', function (req, res) {
        res.send('HELLO !!!');
    });
}

module.exports = route;
