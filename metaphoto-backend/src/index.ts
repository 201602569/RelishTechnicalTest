import express from 'express';
import apiRoutes from './routes/api.routes';
import cors from 'cors';
const app = express();
const port = Number(process.env.PORT) || 3000

app.use(express.json()); 
app.use(cors());
app.use('/api', apiRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
