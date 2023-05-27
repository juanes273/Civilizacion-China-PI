const express = require('express');
const app = express();
const port = 5000;


// 1. agregamos la uri de la base de datos
const uri = "mongodb+srv://brandjuan:nDV1dZYmQCH7bbq4@civilizacion-china.p8tyooj.mongodb.net/CivilizacionesDB";
// 2. instalamos npm i mongoose@6.0.11
const mongoose = require('mongoose');
// 5. instalamos bodyParser
const bodyParser = require('body-parser');
// 6. instalamos cors - npm i cors@2.8.5
const cors = require('cors');
// 8. instalamos multer - npm i multer@1.4.3
const multer = require('multer');

// 11. requerimos nuestro modelo que mapeara la BD
const User = require('./model/Model');

// 3. Configuramos la conexion a mongodb con mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// 4. Configuramos nuestros middlewares para que analice los datos enviados en el cuerpo de una solicitud HTTP.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 7. Habilitamos el cors para el intercambio de recursos entre dominios web.
app.use(cors());

//Get users
app.get('/api/users', async(req,res)=>{
  const users = await User.find();
  res.send(users)
})


app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;