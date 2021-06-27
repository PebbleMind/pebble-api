const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/route');
const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use('/', routes);
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

mongoose.connect(
    'mongodb+srv://admin:pebble@pebble-api.30qlv.mongodb.net/Pebble?retryWrites=true&w=majority',
    { 
        useFindAndModify: false, 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useCreateIndex: true,
        server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log(
            "MongoDB Connection -- Ready state is:", 
            mongoose.connection.readyState
        );
    },
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})  