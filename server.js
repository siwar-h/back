const express = require('express')
const mongoose = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swaggerConfig');
const cors = require('cors');
const multer = require('multer')
require('dotenv').config()
const path = require('path');

const app = express() ;
app.use(express.json())
// app.use(bodyParser.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5000',  'http://localhost:5000/api-docs'], // Replace with your allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.listen(5000, () => {
//     console.log('Server running on http://localhost:5000');
//     console.log('Swagger docs available at http://localhost:5000/api-docs');
// });

const PORT = process.env.PORT || 5000 ;


mongoose.connect(process.env.db_URI)
.then(()=> console.log("DataBase connected successfully"))
.catch((err)=>console.log('error',err))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', require('./routes/product'));
app.use('/api/users', require("./routes/userRoutes"))
app.use('/api', require('./routes/productRoutes'));
//app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images


app.listen(PORT , (err)=>{
    err? console.log('err', err) : console.log(`Server is Running on port : ${PORT} `)
})