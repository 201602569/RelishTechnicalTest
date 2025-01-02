import express from 'express';
import apiRoutes from './routes/api.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

app.use('/api', apiRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
