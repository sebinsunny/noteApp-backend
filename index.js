const express = require('express');
const bodyParser = require('body-parser')
const pool = require('./db');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
  res.json({msg: 'Work in progress!'});
});

app.get('/notes/all', async (req, res) => {
  const notes = await pool.query('SELECT * FROM user_notes');
  res.json({notes: notes.rows});
});

app.get('/notes/byId/:id', async (req, res) => {
  const notes = await pool.query('SELECT * FROM user_notes WHERE note_id = $1 ', [req.params.id]);
  res.json(notes.rows[0] || {});
});

app.get('/notes/byUser/:username', async (req, res) => {
  const notes = await pool.query('SELECT note_id, users.user_id, note_lat, note_long, note_text, username FROM user_notes Inner join users on users.user_id = user_notes.user_id where username = $1', [req.params.username]);
  res.json({notes: notes.rows});

});

app.get('/userid/:username', async (req, res) => {
  const id = await pool.query('SELECT user_id FROM users where username = $1', [req.params.username]);
  res.json({id: id.rows[0]});

});

app.get('/notes/byText/:text', async (req, res) => {
  let term = '%' + req.params.text + '%';
  const notes = await pool.query('SELECT * FROM user_notes WHERE note_text LIKE $1', [term]);
  res.json({notes: notes.rows});
});


app.post('/notes/new', async (req, res) => {
  let values = [req.body.user_id, req.body.note_lat, req.body.note_long, req.body.note_text];
  try {
    await pool.query('INSERT INTO user_notes (user_id, note_lat, note_long, note_text) VALUES($1, $2, $3, $4)', values);
    res.json({status: 'success', msg: 'Note added!'});
  } catch (e) {
    console.log('\n Error occurred : ', e);
    res.json({status: 'failed', msg: 'Something went wrong!'});
  }
});

app.post('/signup', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1',
      [username]);

    // Checking if user already exists
    // following condition returns undefined if no matches found
    if (userExists.rowCount) {
      res.json({errorMsg: 'User already exists!'});
    } else {
      const newUser = await pool.query('INSERT INTO users (username, password) VALUES($1, $2)',
        [username, password]);
      res.json({status: 'success', msg: 'sign up completed!'});
    }
  } catch (e) {
    console.log('\n Error occurred : ', e);
    res.json({status: 'failed', msg: 'Something went wrong!'});
  }
});

app.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]);

    // Checking if user already exists
    // following condition returns undefined if no matches found
    if (userExists.rowCount) {
      res.json({status: 'success', msg: 'Login success!'});
    } else {
      res.json({status: 'failed', msg: 'The username or password you entered is incorrect'});
    }
  } catch (e) {
    console.log('\n Error occurred : ', e);
    res.json({status: 'failed', msg:'Something went wrong!'});
  }
});

app.listen(5000, "0.0.0.0", () => console.log('sebin app listening on port 5000!'));
