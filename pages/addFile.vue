<template>
    <div class="wrapper">
        <form action="/api/csv" method="post" enctype="multipart/form-data">
            <input type="file" name="csv" />
            <button type="submit">Отправить</button>
        </form>
        <div v-if="isset" class="table">
            <table>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>nickname</td>
                        <td>email</td>
                        <td>registration</td>
                        <td>status</td>
                    </tr>
                    <tr v-if="!error" v-for="item in json">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nickname }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.registration | convertToDate }}</td>
                        <td>{{ item.status }}</td>
                    </tr>
                </tbody>
            </table>
            
            <p v-if="error">Такой таблицы нет</p>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        data: function() {
            return {
                isset: false,
                json: '',
                error: false,
            }
        },
        mounted() {
            let url = window.location.pathname+''
            if( url.split('/').filter(element => element !== "").length == 2 ){
                this.isset = true

                let query = url.split('/').filter(element => element !== "")[1]
                axios.get(`/api/table/${query}`).then( res => {
                    this.json = res.data
                    if( res.data.name == 'error' ) {
                        this.error = true
                    }
                })

                
            }
        },
        filters: {
            convertToDate(text) {
                let result = moment.unix(text).format('DD.MM.YYYY HH:mm')
                return result
            }
        }
    }
</script>