const usercsv = require('./usercsv.js')
const moment = require('moment')

var multer  = require('multer')
var upload = multer({ dest: './static/csv/' })

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'zoomplus',
  host: '127.0.0.1',
  database: 'TZ',
  password: '',
  port: 5432,
})

//console.log('worked')
//console.log(pool)

const getUsers = (request, response) => {
    pool.query('SELECT * FROM usercsv ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM usercsv WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM usercsv WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const addTableOfCsvFile = (request, response) => {

    //О файле неизвестно
    let uploadFile = request.files.csv
    let uploadFileName = uploadFile.name

    uploadFile.mv('./static/csv/'+uploadFileName, function() {
        //Когда известно о файле и он загружен:
        const file = `./static/csv/${uploadFileName}`
        const parser = usercsv.parserCsv(file)
        
        //Остановился на том что не могу созхдать страницу, все остальное есть
        //todo Создаем таблицу у которой имя будет совпадать с именем файла, заносим туда все данные
        /* 
            По заданию "Создать​ т​аблицу​​ в​​ PostgreSQL​ ​под​​ данную​​ структуру ​​файла.
            Чисто логически трактую как создать таблицу именно под такую структуру как у этого файла

            Также "Требуется​​ создать​​ скрипт​​ на​​ языке​​ JavaScript​​ node.js,​ к​оторый​​ должен: Создать​ т​аблицу​​ в​​ PostgreSQL​​"
            Тут также трактовал как типа скрипт создает таблицу, подобно отзеркаливанию самого себя в таблицу
        */
        let nameForTable = uploadFileName.replace(".","")
        pool.query(`CREATE TABLE ${nameForTable} (Id SERIAL PRIMARY KEY, NickName CHARACTER VARYING(30), Email CHARACTER VARYING(30), Registration INTEGER, Status CHARACTER VARYING(30));`, (error, results) => {
            //response.status(200).json( results )
        });

        //Перебираем свойства csv и заносим в таблицу, не апдейтится если заносить новые данные одного и того же файла, просто заменяет строки
        //console.log(parser)
        for( item in parser ){
            let id = parseInt(item),
                nickname = parser[item].Ник,
                email = parser[item].Email,
                registration = moment(parser[item].Зарегистрирован, 'DD.MM.YYYY HH:mm').unix()//parseInt(parser[item].Зарегистрирован),
                status = parser[item].Статус
            console.log(registration)
            pool.query(`INSERT INTO ${nameForTable} VALUES (${id}, '${nickname}', '${email}', ${registration}, '${status}');`,(error, results) => {
                                //response.status(200).json( error )
            })
        }
        response.writeHead(302, {
            'Location': '/addFile/'+nameForTable
        });
        response.end();
        
    });

    
    
}

//Получаем через метод таблицу на клиентe /api/table/*
const getTable = (request, response) => {
    pool.query(`SELECT * FROM ${request.params.name} WHERE status = 'On' ORDER BY registration ASC`, (error, results) => {
        if (error) {
            response.status(200).json(error)
        }
        else{
            response.status(200).json(results.rows)
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    addTableOfCsvFile,
    getTable
}