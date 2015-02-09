var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Get Home Page */
router.get('/home',function(req, res){
  res.render('home');
});
/* Get About Page */
router.get('/about',function(req, res){
  res.render('about');
});
/* Get Project Page */
router.get('/project',function(req, res){
  res.render('project');
});
/* Get Chat Page */
router.get('/chatroom',function(req, res){
  res.render('chatroom');
});
router.get('/room',function(req, res){
  res.render('room');
});
router.get('/messageBoard',function(req, res){
  res.render('messageBoard');
});

// router.get('/chat',function(req, res){
//   res.render('chat');
// });

module.exports = router;
