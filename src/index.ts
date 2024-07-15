import express from 'express';
import cors from "cors";
import morgan from "morgan";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import offerteLavoroRoutes from './api/routes/router-offertelavoro'; 
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI!

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/api/offerte-lavoro', offerteLavoroRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.set('debug', true);
mongoose.connect(mongoURI)
  .then(_ => {
    console.log('Connected to db');
    app.listen(8080, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
  })
