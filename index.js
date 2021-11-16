const express = require('express')
const app = express()
const port = 5000

app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//     res.render("index");
// })


//crear conexion a bd

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
})

sequelize.authenticate()
.then(()=>{
    console.log("conexion establecida");
})
.catch(err=>{
    console.log("error al conectarse");
})

//creación de modelo
const Experiencia = sequelize.define(
    'experiencia',
    {
        puesto:Sequelize.STRING,
        empresa:Sequelize.STRING,
        descripcion:Sequelize.STRING,
        periodo:Sequelize.STRING
    }
  );

// const Persona = sequelize.define(
//     'persona',
//     {
//         nombre:Sequelize.STRING,
//         apellido:Sequelize.STRING,
//         direccion:Sequelize.STRING,
//         telefono:Sequelize.STRING,
//         correo:Sequelize.STRING,
//         descripcion:Sequelize.STRING
//     }
//   );
  
  //migración y poblado de data
  sequelize.sync({force:true})
  .then
  (
    ()=>
    {
        console.log("BD y tabla creada")
        Experiencia.bulkCreate(
            [
                {puesto:'Front-end developer', empresa: 'Nexus', descripcion: 'Desarrollador front-end en angular 11',periodo:'agosto 2021 - octubre 2021'},
                {puesto:'Full-stack developer', empresa: 'Freelancer', descripcion: 'Desarrollador Full-stack con Java, React, Django, Nodejs y Express',periodo:'octubre 2021 - Actualidad'},
            ]).then(function(){
                return Experiencia.findAll();
            }).then(function(experiencia){
                // console.log(experiencia)
            })
    }

    // ()=>
    // {
    //     // console.log("BD y tabla creada")
    //     Persona.bulkCreate(
    //         [
    //             {nombre:'Mauricio', apellido: 'Aguirre', direccion: 'Avenida José Leal 370 - Dpto nro. 301 - Lince', telefono: '918380045', correo: 'e-duam@outlook.com', descripcion: 'Ingeniero de Software de la UTP y desarrollador Full-stack en Tecsup'}
    //         ]).then(function(){
    //             return Persona.findAll();
    //         }).then(function(persona){
    //             // console.log(experiencia)
    //         })
    // }
  )

app.get('/',(req,res)=>{
    Experiencia.findAll()
    .then((exp) =>{
        // console.log(exp)
        res.render('index',{
            experiencias:exp,
            tituloexp:'EXPERIENCIA LABORAL'
        })
    })
})

app.use(express.static('static'))

app.listen(port, ()=>{
    console.log(`Servidor en http://localhost:${port}`)
})