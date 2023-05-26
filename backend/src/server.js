const express = require('express');
const app = express();
const port = 5000;


// 1. agregamos la uri de la base de datos
const uri = "mongodb://0.0.0.0:27017/Civilizaciones";
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

// 9. Configuramos multer para manejar los datos del formulario que se envían a través de solicitudes HTTP con cabeceras
// enctype de multipart/form-data, es decir, para subir archivos.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// 10. creamos un objeto multer para guardar los archivos
const upload = multer({ storage });

// 12. API Post
app.post('/api/models', upload.single('model'), (req, res) => {
  // 13. Creamos un nuevo modelo de nuestro esquema
  const newModel = new Model({
    name: req.body.name,
    model: req.file.path
  });

  // 14. Lo guardamos en la DB
  newModel.save()
    .then(model => {
      console.log('Model saved:', model);
      res.json(model);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to save model' });
    });
});

// 15. API get
app.get('/api/models/:id', (req, res) => {
  const id = req.params.id;
  Model.findById(id)
    .then(model => {
      const modelPath = model.model;
      const filePath = `${process.cwd()}/${modelPath}`;
      res.sendFile(filePath);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to get model' });
    });
});

//Get users
app.get('/api/users', async(req,res)=>{
  const users = await User.find();
  res.send(users)
})

app.listen(port, () => console.log(`Server running on port ${port}`));
