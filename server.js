const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");
const routes = require('./routes/route');
const app = express();

app.use(helmet());
app.use(compression());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

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