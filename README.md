# nuxt-tz

> TZ

Конфигурация БД postgre находится в /server/queries.js
роуты сервера которые используют queries в /server/index.js

Сделал ТЗ как понял дословно (в коментах над запросами указал):
В основном то что при загрузке csv создается новая таблица с данными из этого файла. Сделал так чтоб создавалась таблица с именем такимже как у загружаемого файла без точки. Тестировал на csv созданном с exel в кодировке utf-8

Само описание ТЗ:
Задание​​1 Цель:​​продемонстрировать​​навыки​​владения​​JavaScript​​node.js​​и​​PostgreSQL.
Требуется​​создать​​скрипт​​на​​языке​​JavaScript​​node.js,​к​оторый​​должен: Создать​т​аблицу​​в​​PostgreSQL​​под​​данную​​структуру​​файла. Все​​данные​​из​​CSV-файла​​экспортировать​​в​​созданную​т​аблицу. Данные​​в​​поле​"​Зарегистрирован"​​должны​​храниться​​в​​формате​I​NTEGER.
После полного экспорта данных в таблицу отобразить на странице всех игроков со статусом​​On​​в​​порядке​​времени​​регистрации.

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
