import express from 'express';
import apiRoutes from './routes/api.routes'; // Asegúrate de que esta ruta sea correcta
import dotenv from 'dotenv';  // Para gestionar variables de entorno si es necesario

dotenv.config(); // Para cargar variables de entorno si usas un archivo .env

const app = express();
const port = process.env.PORT || 3000; // Si tienes una variable de entorno PORT, la usará, si no, usará 3000

app.use(express.json()); // Para manejar cuerpos JSON en las peticiones

// Usar las rutas de la API
app.use('/api', apiRoutes); // Cambia '/api' si necesitas otro prefijo para las rutas

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
