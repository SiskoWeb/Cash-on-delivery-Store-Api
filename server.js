

const express = require('express')
const app = express()
const port = 3000

const path = require('path')


const dbConnect = require('./config/contactDB')
const { query, validationResult } = require('express-validator');
const globalError = require('./middlewares/errorMiddleWare')

const ApiError = require('./utils/ApiError')

const categoriesRoute = require('./routes/categoriesRoute')
const productsRoute = require('./routes/productRoute')
const authRoute = require('./routes/authRoute')
const orderRoute = require('./routes/orderRoute')

app.use(express.json())




//@desc Cal Function to conect db
dbConnect()




// //@desc EndPoints
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/products', productsRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/order', orderRoute)


//@desc EndPoints
// app.post('/sa', query('email').notEmpty().withMessage('email required'), (req, res) => {
//     const result = validationResult(req);
//     if (result.isEmpty()) {
//         return res.send(`Hello, ${req.query.person}!`);
//     }

//     res.send({ errors: result.array() });

// })



//endpoit get all images
// app.use('/images' , express.static('./uploads'))
app.use(express.static(path.join(__dirname, 'uploads')))

//@Desc : Handle Error if User Request Url Not Found
app.all('*', (req, res, next) => {
    next(new ApiError(`cant find this url  ${req.originalUrl}`, 400))
})



//@ Desc : MiddleWare Handel Error Inside Express = every error wil handl
// MORE : built method in express for  catch any error 
app.use(globalError)




const servier = app.listen(port, () => {
    console.log(`server working on Port:  ${port}`)
})



// Events => list =? callback(err)  handle any error outside  express like mongoose ...
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`)
    servier.close(() => {
        console.error(`ShuttDown...`)

        process.exit(1)

    })
})
