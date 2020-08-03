<template>
    <v-app>
        <v-card>
            <v-container fluid pa="20">
            <v-layout column>
                <v-layout>
                    <v-toolbar-title>Search : {{search}}</v-toolbar-title>
                    <v-spacer/>
                </v-layout>
                <v-text-field append-outer-icon="mdi-magnify" outlined v-model="search"></v-text-field>
                <v-btn-toggle
                    v-model="filters"
                    dense
                    multiple
                >
                    <v-spacer/>
                    <v-btn>Content</v-btn>   
                    <v-btn>Type</v-btn>   
                    <v-btn>Dep.</v-btn>   
                    <v-btn>Name</v-btn>   
                    <v-btn>Tag</v-btn>   
                </v-btn-toggle>
            </v-layout>
            </v-container>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="items"
            :options="options"
            :search="search"
            :custom-filter="customSearch">
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

const ContentIdx = 0
const TypeIdx = 1
const DepIdx = 2
const NameIdx = 3
const TagIdx = 4

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
            },
            search: "",
            filters:[ContentIdx, TypeIdx, DepIdx, NameIdx, TagIdx]
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
            this.$store.commit("items/removeArticle", index)
        },
        customSearch(value, search, item){
            function searchInAttrib(search, item, attrib){
              return item[attrib] != null && search != null && item[attrib].match(new RegExp(search, 'i'))
            }

            if(this.filters.some(elem => elem === ContentIdx)){
                if(searchInAttrib(search, item, "content")){
                    return true;
                }
            }
            if(this.filters.some(elem => elem === TypeIdx)){
                if(searchInAttrib(search, item, "type")){
                    return true;
                }
            }
            if(this.filters.some(elem => elem === DepIdx)){
                if(searchInAttrib(search, item, "department")){
                    return true;
                }
            }
            if(this.filters.some(elem => elem === NameIdx)){
                if(searchInAttrib(search, item, "name")){
                    return true;
                }
            }
            if(this.filters.some(elem => elem === TagIdx)){
                if(searchInAttrib(search, item, "tags")){
                    return true;
                }
            }
            return false;
        },
    }
}
   
</script>