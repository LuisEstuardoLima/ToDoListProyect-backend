var express = require('express');
var router = express.Router();

let goals = [
  { id_: 1, name: 'Objetivo 1', description: 'Descripción del objetivo 1', duedate: '2024-07-01' },
  { id_: 2, name: 'Objetivo 2', description: 'Descripción del objetivo 2', duedate: '2024-07-02' },
  { id_: 3, name: 'Objetivo 3', description: 'Descripción del objetivo 3', duedate: '2024-07-03' }
];


router.get('/getGoals', (req, res) => {
  res.json(goals);
});

router.post('/addGoal', (req, res) => {
  const { name, description, duedate } = req.body;
  const newGoal = {
     id_: Math.floor(Math.random() * 1000) + 1, 
     name, 
     description, 
     duedate 
    };
  goals.push(newGoal);
  res.json(newGoal);
});

router.delete('/removeGoal/:id', (req, res) => {
  const goalId = parseInt(req.params.id);
  goals = goals.filter(goal => goal.id_ !== goalId);
  res.json({ message: `Objetivo con id ${goalId} eliminado` });
});

module.exports = router;