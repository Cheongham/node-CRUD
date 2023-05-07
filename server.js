const express = require('express');
const app = express();
const cors = require('cors')
const port = 4000;

// CORS이슈 해결
let corsOptions = {
   origin: 'https://www.domain.com',
   credentials: true
}
//app.use(cors(corsOptions));
app.use(cors());

// POST 요청을 받을 수 있도록 (body parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.get('/', function(req,res) {
   //res.send('get통신에 성공 했습니다 !!!');
   res.sendFile(__dirname + '/views/index.html');

   // ejs or pug 연결 해서 사용
   //res.render(__dirname + '/views/index.html');
})


const database = [{"id":"", "pname":"", "email":""}];

// ## 방법1 (get 으로 처리하는 방법::잘 사용하지 않음)
// app.get('/database/:remark', function(req,res) {
//    const id = req.params.id
//    database.push ({
//       id: database.length + 1, // 최종 갯수
//       remark,
//    });
//    res.send(database);
//    res.send('새로운 이름이 추가 되었습니다 !!!');
// })

// ## 방법1 (get 으로 daatabase 가져오기)
app.get('/database', function(req,res) {
   res.send(database);
})
// ## 방법1 (get 으로 특정 id만 가져오기)
app.get('/database/:id', function(req,res) {
   const id = req.params.id;    // String
   const data = database.find((el) => el.id === Number(id));
   res.send(data);
})

// REST API ( 생성:post 수정: put/patch 삭제:delete)
//## 방법2 (post > body로 담아서 처리하는 방법)
app.post('/database', function(req,res) {
   const {pname,email} = req.body;
   database.push ({
      id: database.length + 1, // 최종 갯수
      pname:pname,
      email:email,
   });
   //res.send(database);
   res.send('새로운 멤버가 추가 되었습니다 !!!');
})

   //수정
app.put('/database', function(req,res) {
   const {id,pname,email} = req.body;
   database[id-1].pname = pname;
   database[id-1].email = email;
   //res.send(database);
   res.send(`멤버 ${id}번이 수정 되었습니다 !!!`);
})

app.delete('/database', function(req,res) {
   const id = req.body.id;
   database.splice(id-1, 1);
   //res.send(database);
   res.send('새로운 멤버가 삭제 되었습니다 !!!');
})

// 서버 동작 PORT
app.listen(port, function() {
   console.log(`서버의 ${port}번 포트로 웹서비스가 시작 되었습니다 ... `);
})
