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
                    </v-btn-toggle> 
                    <chip-edit-card
                        title="Tag"
                        contentStr="tag"
                        :items='$store.state.attributes.tags'
                        :selectedFlags="selectedTags"
                        :toggleSelectedFunc="toggleSelectTag"
                    />
                </v-row>
            </v-col>
        </v-card>
        <v-data-table
            :headers="headers"
            :items="filteredItems"
            :options="options"
            :search="search"
            :custom-filter="customSearch"
            >

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
                <v-row>
                    <v-btn icon @click="click(item.id)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn icon @click="deleteItem(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
                </v-row>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
import ChipEditCard from  '~/components/ChipEditCard.vue'
import SelectableInput from '~/components/SelectableInput.vue'
import {mapState} from 'vuex'
import axios from 'axios'

const ContentIdx = 0
const TypeIdx = 1
const DepIdx = 2
const NameIdx = 3

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
            filters:[ContentIdx, TypeIdx, DepIdx, NameIdx],
            selectedTags: {},
        }
    },
    computed: {
        filteredItems() {
            let tagSearch = ""
            Object.keys(this.selectedTags).forEach( (key) => {
                if(this.selectedTags[key])
                    tagSearch += key + "|"
            })
            tagSearch = tagSearch.slice(0, -1) //最後の|を消す

            let res = this.$store.state.items.items.filter( (elem) => {
                let found = false;
                elem.tags.forEach( (tag) => {
                    if(tag.match(new RegExp(tagSearch, 'i'))){
                        found = true;
                        return
                    }
                })
                return found;
            })

            return res;
        }
    },
    components: {
        ChipEditCard,
        SelectableInput
    },
    created(){
        this.$store.getters["attributes/tagArray"].forEach(element => {
            this.$set(this.selectedTags, element, true)
        });
    },
    methods:{
        click(row){
            this.showsTagEdit = false
        },
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
                 if(item.content != null && search != null && item.content.match(new RegExp(search, 'i')) ){
                    return true
                }
            }
            if(this.filters.some(elem => elem === TypeIdx)){
                 if(item.type != null && search != null && item.type.match(new RegExp(search, 'i')) ){
                    return true
                }
            }
            if(this.filters.some(elem => elem === DepIdx)){
                 if(item.department != null && search != null && item.department.match(new RegExp(search, 'i')) ){
                    return true
                }
            }
            if(this.filters.some(elem => elem === NameIdx)){
                if(item.names != null && search != null){
                    let found = false
                    item.names.forEach((elem) =>{
                        if(elem.match(new RegExp(search, 'i'))){
                            found = true
                            return
                        }
                    })
                    if(found){
                        return true
                    }
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
        toggleSelectTag(tag){
            this.$set(this.selectedTags, tag.tag, !this.selectedTags[tag.tag])
        },
    }
}
   
</script>