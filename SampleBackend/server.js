import express from 'express';
import router from './router/router.js';
import cors from 'cors';
import connectDB from './db/db.js';

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000;

connectDB()
app.use('/api', router)
app.listen(PORT, () => {
    console.log('running at http://localhost:' + PORT + '/api');
})