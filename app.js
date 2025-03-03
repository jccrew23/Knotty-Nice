import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import { initDb } from './src/mongodb/connect.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import productsRouter  from './src/routes/products.js';
import transactionRouter from './src/routes/transactions.js';

const port = process.env.PORT || 3000;

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "KnottyNice API",
            version: "1.0.0",
            description: "API for KnottyNice",
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
            {
                url: "https://knotty-nice.onrender.com/"
            }
        ],
    },
    apis: ['./src/routes/*.js'],
};


try {
    const specs = swaggerJsDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
catch (err) {
    console.error('Error initializing Swagger', err);
}

app 
    .use(cors())
    .use(bodyParser.json())
    .use(express.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })
    .use('/', productsRouter)
    .use('/', transactionRouter);


initDb((err, mongodb) => {
    if (err) {
        console.error(err);
    }else{
        app.listen(port, () => {
        console.log('Web Server is listening on port ' + port);
        })
    }
});