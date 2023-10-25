var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');

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

router.get('/NickWahlberg', function(req, res, next) {
  models.actor
    .findOne({
      where: {
        actor_id: 2
      }
    })
    .then(actor => {
      res.render('NickWahlberg', {
        actor: actor
      });
    });
});

router.get('/actors', function(req, res, next) {
models.actor.findAll({}).then(actorsFound => {
  res.render('actors', {
    actors: actorsFound
  });
})
});

module.exports = router;
