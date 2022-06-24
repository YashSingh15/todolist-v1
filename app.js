const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');

const items = ['Buy Food', 'Cook Food', 'Eat Food'];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    const day = date.getDate();

    res.render('list', { listTitle: day, items: items });
});

app.get('/work', function (req, res) {
    res.render('list', { listTitle: 'Work List', items: workItems })
});

app.get('/about', function (req, res) {
    res.render('about');
})

app.post('/', function (req, res) {
    const item = req.body.newItem;

    if (req.body.list === 'Work List') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(req.body.newItem);
        res.redirect('/');
    }
});

app.post('/work', function (req, res) {
    workItems.push(req.body.newItem);
    res.redirect('/home');
});

app.listen(3000, () => console.log('Server started on port 3000!'));