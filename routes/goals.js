var express = require('express');
var router = express.Router();
var GoalSchema = require('../models/goal');
const DATABASE = process.env.DATABASE;



router.get('/getGoals', async function (req, res, next) {
const db = req.db;
try {
  if (DATABASE === 'MONGODB') {
    let response = await GoalSchema.find({});
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
      FROM goals
      `);

    return res.status(200).json(response);
  }
  return res.status(500).json({ error: 'Invalid DATABASE env variable' });
} catch (error) {
  return res.status(500).json({ error: error.message });
}
});

router.post('/addGoal', async function(req, res, next) {
    const db = req.db;
    if(req.body && req.body.name && req.body.description && req.body.duedate) {
      try {

        req.body.duedate = new Date(req.body.duedate);

        //MONGODB
        if (DATABASE === 'MONGODB') {

          let goal = new GoalSchema(req.body);
          let savedGoal = await goal.save();

          return res.status(200).json(savedGoal);
        }

        //MYSQL
        if (DATABASE === 'MYSQL') {

          
          const [response] = await db.query(`

            INSERT INTO goals 
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
          error: err.message || 'Error al agregar el objetivo'
        });
      }
    } else {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: name, description, duedate'
      });
    }
});  

  router.delete('/deleteGoal/:id', async function(req, res, next) {
    const db = req.db;
  if(req.params && req.params.id) {
    
    let id = req.params.id;

    try {

      //MONGODB
      if (DATABASE === 'MONGODB') {

        await GoalSchema.findByIdAndDelete(id);

        return res.status(200).json({
          message: 'Objetivo eliminado exitosamente'
        });
      }

      //MYSQL
      if (DATABASE === 'MYSQL') {
        await db.query(`
          DELETE FROM goals
          WHERE id = ?
        `, [id]);

        return res.status(200).json({
          message: 'Objetivo eliminado exitosamente'
        });
      }

      return res.status(500).json({ 
        error: 'Invalid DATABASE env variable' 
      });

    } catch (err) {

      res.status(500).json({ 
        error: err.message || 'Error al eliminar el objetivo'
      });
    }
  } else {
    res.status(400).json({ 
      error: 'Falta el parámetro de ruta :id' 
    });
  }
});

module.exports = router;