<template>
    <v-app fluid style="margin: 10px; padding: 10px; width: 100%">
        <v-card>
            <v-col fluid pa="20">
                <v-layout>
                    <v-toolbar-title>Search : {{search}}</v-toolbar-title>
                    <v-spacer/>
                </v-layout>
                <v-text-field append-outer-icon="mdi-magnify" outlined v-model="search"></v-text-field>
                <v-row>
                    <v-spacer/>
                    <v-btn-toggle
                        v-model="filters"
                        dense
                        multiple>
                        <v-spacer/>
                        <v-btn>Content</v-btn>   
                        <v-btn>Type</v-btn>   
                        <v-btn>Dep.</v-btn>   
                        <v-btn>Name</v-btn>   
                        <v-btn>Tag</v-btn>   
                    </v-btn-toggle> 
                </v-row>
            </v-col>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="$store.state.items.items"
            :options="options"
            :search="search"
            :custom-filter="customSearch">

            <template v-slot:item.content="{item}">
                <v-textarea auto-grow @input="editItemContent({content: $event, id: item.id})" :value="item.content"/>
            </template>
            <template v-slot:item.tags="{ item }">
                <v-chip v-for="(tag, i) in item.tags" :key="i" close :color="$store.getters['attributes/tagColor'](tag)">{{tag}}</v-chip>
            </template>
            <template v-slot:item.created="{ item }">
                <span>{{(new Date(item.created)).toLocaleString()}}</span>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn icon @click="deleteItem(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

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
                { text: 'Name', value: 'names'},
                { text: 'tag', value: 'tags'},
                { text: 'created', value: 'created', width: '10%'},
                { text: 'action', value: 'action', width: '5%', class: 'px-0' }
            ],
            options:{
                sortBy: ['created', 'department', 'type'],
                sortDesc: [true, false, false],
                itemsPerPage: 1000
            },
            search: "",
            filters:[ContentIdx, TypeIdx, DepIdx, NameIdx, TagIdx],
        }
    },
    methods:{
        deleteItem(id){
            if(id === -1){
                this.showLayoutSnackbar("Reload the page to update the database!", "error")
            }else{
                axios.post(`${process.env.baseUrl}api/deleteItem`, {id}).then( (res)=>{
                    this.$store.commit("items/removeItem", id)
                    this.showLayoutSnackbar('Deleted', 'Success')
                }).catch((err) => {
                    this.showLayoutSnackbar("Err: " + err, 'error')
                })
            }
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
        editItemContent(item){
            this.showLayoutSnackbar(item, "")
            axios.post(`${process.env.baseUrl}api/updateItemContent`, item).then(
                this.showLayoutSnackbar("Updated: " + item.content, "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
        },
        showLayoutSnackbar(msg, color){
            this.$nuxt.$emit("updateLayoutData", {snackbarMessage:msg, snackbarColor: color, showSnackbar: true})
        },
    }
}
   
</script>