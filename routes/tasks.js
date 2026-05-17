var express = require('express');
var router = express.Router();
var TaskSchema = require('../models/task');
const DATABASE = process.env.DATABASE;

router.get('/getTasks', async function (req, res, next) {
const db = req.db;
try {
  if (DATABASE === 'MONGODB') {
    let response = await TaskSchema.find({});
    return res.status(200).json(response);
  }
  if (DATABASE === 'MYSQL') {
    const [response] = await db.query(`
      SELECT 
      id, 
      name, 
      description, 
      duedate, 
      created_at, 
      updated_at 
      FROM tasks
      `);

    return res.status(200).json(response);
  }
  return res.status(500).json({ error: 'Invalid DATABASE env variable' });
} catch (error) {
  return res.status(500).json({ error: error.message });
}
});

router.post('/addTask', async function(req, res, next) {
    const db = req.db;
    if(req.body && req.body.name && req.body.description && req.body.duedate) {
      try {

        req.body.duedate = new Date(req.body.duedate);

        //MONGODB
        if (DATABASE === 'MONGODB') {

          let task = new TaskSchema(req.body);
          let savedTask = await task.save();

          return res.status(200).json(savedTask);
        }

        //MYSQL
        if (DATABASE === 'MYSQL') {

          
          const [response] = await db.query(`

            INSERT INTO tasks 
            (
            name, 
            description, 
            duedate
            ) 
            VALUES (?, ?, ?)
          `, [
            req.body.name, 
            req.body.description, 
            req.body.duedate
          ]);
  
          return res.status(200).json({ 
            id: response.insertId,
          ...req.body
        });

        }

        return res.status(500).json({ 
          error: 'Invalid DATABASE env variable'
         });
      } catch (err) {
        return res.status(500).json({ 
          error: err.message || 'Error al agregar la tarea'
        });
      }
    } else {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: name, description, duedate'
      });
    }
}); 

router.delete('/deleteTask/:id', async function(req, res, next) {
    const db = req.db;
  if(req.params && req.params.id) {
    
    let id = req.params.id;

    try {

      //MONGODB
      if (DATABASE === 'MONGODB') {

        await TaskSchema.findByIdAndDelete(id);

        return res.status(200).json({
          message: 'Tarea eliminada exitosamente'
        });
      }

      //MYSQL
      if (DATABASE === 'MYSQL') {
        await db.query(`
          DELETE FROM tasks
          WHERE id = ?
        `, [id]);

        return res.status(200).json({
          message: 'Tarea eliminada exitosamente'
        });
      }

      return res.status(500).json({ 
        error: 'Invalid DATABASE env variable' 
      });

    } catch (err) {

      res.status(500).json({ 
        error: err.message || 'Error al eliminar la tarea'
      });
    }
  } else {
    res.status(400).json({ 
      error: 'Falta el parámetro de ruta :id' 
    });
}
});

module.exports = router;