<template>
    <v-app>
        <v-data-table
            :headers="headers"
            :items="items"
            :options="options">
            <template v-slot:item.content="{item}">
                <v-textarea auto-grow disabled :value="item.content">
                </v-textarea>
            </template>
            <template v-slot:item.createdDate="{ item }">
                <span>{{(new Date(item.createdDate)).toLocaleString()}}</span>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn small @click="deleteItem(item.index)"><v-icon>mdi-delete</v-icon></v-btn>
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
                { text: 'Content', value: "content", width: "50%"},
                { text: 'Type', value: "type"},
                { text: 'Department', value: 'department', width: "10%"},
                { text: 'Name', value: 'name'},
                { text: 'tag', value: 'tags'},
                { text: 'created', value: 'createdDate', width: '10%'},
                { text: 'action', value: 'action', width: '5%', class: 'px-0' }
            ],
            options:{
                sortBy: ['createdDate', 'department', 'type'],
                sortDesc: [true, false, false],
                itemsPerPage: 1000
            }
        }
    },
    computed: {
        items(){
            return this.$store.state.items.articles.map( (obj, index) => {
                let rObj = obj
                rObj['index'] = index
                return rObj
            })
        }
    },
    methods:{
        deleteItem(index){
            alert("delete at" + index)
            this.$store.commit("items/removeArticle", index)
        }
    }
}
</script>