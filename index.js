// const http = require('http');
// const color = require('colors');

// const server = function(req, res){
//     res.writeHead(200,{ 'Content-type': 'text/html' });
//     res.write('<h1>mensaje server</h1>');
//     res.end();
// }

// const app = http.createServer(server);
// app.listen(3000, function(){
//     console.log('servidor en el puerto 3000'.green)
// });

const express = require('express');
const color = require('colors');
const morg = require('morgan');

function logger(req,res,next){
    ruta = "request recibido: " + req.protocol+"://"+req.get('host');
    console.log(ruta.blue);
    next();
}

const app = express();

//setings

app.set('appName', 'Pruebas curso');
app.set('port', '3000');
app.set('view engine', 'ejs');

//middlewarea
app.use(express.json());
app.use(morg('dev'));

//routes

app.all("/user", (req,res,next) =>{
    console.log('es una peticion a usuario'.yellow);
    next();
});

app.get("/user", (req,res) => {
    res.json({
        user: 'usuario1',
        pasword: '123456'
    });
});

app.get('/',(req,res) =>{
    const data = [{ name: 'jhon'},{ name: 'cameron'},{ name: 'joe'},{name:'santiago'}]
    res.render('index.ejs', {people:data});
});

app.post("/user/:id", (req,res) =>{
    console.log(req.body);
    console.log(req.params);
    res.send("respuesta post"); 
});

app.put("/user/:id",(req,res) =>{
    console.log(req.body);
    res.send('User ' + req.params.id + ' update');
});

app.delete("/user/:id",(req,res) =>{
    res.send('User ' + req.params.id + ' deleted');
});

app.use(express.static('public'));

app.listen(app.get('port'), () =>{
    console.log(app.get('appName'));
    console.log("server on port ",app.get('port').green);    
});