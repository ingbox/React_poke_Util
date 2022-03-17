const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer'); // 파일 업로드 라이브러리
const upload = multer({dest: './upload'});

app.get('/api/pokemon',(req, res) => {
    connection.query(
      "SELECT * FROM POKEMON WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

app.post('/api/pokemon', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO POKEMON VALUES (null, ?, ?, ?, ?, ?, now(), 0)'; // 맨 처음엔 삭제되지 않은 상태
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let type = req.body.type;
  let classi = req.body.classi;
  let descr = req.body.descr;
  console.log(image);
  console.log(name);

  let params = [image, name, type, classi, descr];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
      console.log(rows);
    }
  );
});

app.use('/image', express.static('./upload'));

app.delete('/api/pokemon/:id', (req, res) => {
  let sql = 'UPDATE POKEMON SET isDeleted = 1 WHERE id= ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fileds) => {
      res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// 오류를 찾을 때는 console.log(변수명) 으로 찾아보면 편함, 또는 err를 출력해보는 것도 괜찮
// 파일 업로드시 AWS S3를 사용하면 더 효과적으로 사용할 수 있음, 우리는 로컬 사용중

