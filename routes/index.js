var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
/* 
For complex operations, Sequelize and op need to be defined.
use an op.and or op.or to specify multiple complex requests.
*/
var Sequelize = require('sequelize');
var op = Sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* The router function calls for something to be done using a specific view.
models.actor provides the list of actors I'm pulling from.
where: specifies which actors information is wanted.
Then, I use an arrow function to render the actor.
actor: actor tells refers to the actor.first_name + actor.last_name commands found in the view.
*/
router.get('/specificActor', function(req, res, next) {
  models.actor
    .findOne({
      where: {
        actor_id: 2
      }
    })
    .then(actor => {
      res.render('specificActor', {
        actor: actor
      });
    });
});


router.get('/actors', function(req, res, next) {
  models.actor.findAll({}).then(actorsFound => {
    let mappedActors = actorsFound.map(actor => (
      { ActorID: actor.actor_id, 
      Name: `${actor.first_name} ${actor.last_name}`}
    ));
    res.send(JSON.stringify(mappedActors));
  });
});

router.get('/actor/:id', function(req, res, next) {
let actorId = parseInt(req.params.id);
models.actor.findOne({
  where: {
    actor_id: actorId
  }
})
.then(actor => {
res.render('specificActor', {
  actor: actor
})
});
});

router.post('/actor', (req, res) => {
  models.actor
    .findOrCreate({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/actors');
      } else {
        res.send('This actor already exists!');
      }
    });
});

module.exports = router;
