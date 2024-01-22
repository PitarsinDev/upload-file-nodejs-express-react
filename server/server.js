const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'upload_file_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connection to database');
    } else {
        console.log('Connected to database');
    }
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const uploadedFile = req.files.file;
    const fileName = uploadedFile.name;
    const fileSize = uploadedFile.size;
  
    if (fileSize > 10 * 1024 * 1024) {
      return res.status(400).send('File size exceeds 10 MB limit.');
    }
    const insertQuery = 'INSERT INTO files (file_name, file_size) VALUES (?, ?)';
    db.query(insertQuery, [fileName, fileSize], (err, result) => {
      if (err) {
        console.error('Error inserting file into database:', err);
        return res.status(500).send('Internal Server Error');
      }
      uploadedFile.mv(`${__dirname}/uploads/${fileName}`, (mvErr) => {
        if (mvErr) {
          console.error('Error moving file:', mvErr);
          return res.status(500).send('Internal Server Error');
        }
  
        res.send('File uploaded and database updated.');
      });
    });
});

app.listen(port, () => {
    console.log('Server is running');
});