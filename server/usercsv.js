const fs = require('fs')
const csvToJson = require('convert-csv-to-json');
const assert = require('assert')

let output = []


//Передаем файл который пользователь загрузил на сервер. Точнее передаем только имя этого файла
//

function parserCsv(file) {
    output = csvToJson.formatValueByType().getJsonFromCsv(file)

    return output
}

//parserCsv(file)

module.exports = {
    parserCsv,
}
//Здесь парсим CSV на строки итд
