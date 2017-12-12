module.exports = function(app){
    var episodes = require('./controllers/episodes');
    app.get('/episodes', episodes.get);
    app.get('/episodes/:season', episodes.get);
}