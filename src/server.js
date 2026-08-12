const app = require('./app');

// Utilizar el puerto que asigna Render (process.env.PORT) o 3000 en desarrollo local
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});