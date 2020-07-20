<template>
    <v-app>
        <v-data-table
            :headers="headers"
            :items="$store.state.items.articles"
            items-per-page="10000">
            <template v-slot:item.createdDate="{ item }">
                <span>{{(new Date(item.createdDate)).toLocaleString()}}</span>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data () {
        return {
            headers:[
                { text: 'Content', value: "content"},
                { text: 'Type', value: "type"},
                { text: 'Department', value: 'department'},
                { text: 'Name', value: 'name'},
                { text: 'tag', value: 'tags'},
                { text: 'created', value: 'createdDate'}
            ]
        }
    }
}
</script>