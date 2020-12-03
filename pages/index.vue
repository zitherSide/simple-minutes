<template>
<v-app fluid style="margin: 10px; padding: 10px; width: 100%">
    <v-card flat>
        <v-toolbar>
            <v-toolbar-title>New Item</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
            <v-textarea label="Content" v-model="content" auto-grow outlined ></v-textarea>
            <v-divider/>
            <v-card>
                Attributes
                <v-row justify="center">
                    <SelectableInput
                        label="Type"
                        styleClass="ma-3"
                        :model="selectedType"
                        @change="selectedType = $event"
                        @click="showAddTypeDlg=true"
                        :items="$store.getters['attributes/typeArray']"/>
                    <SelectableInput
                        label="Department"
                        styleClass="ma-3"
                        :model="selectedDepartment"
                        @change="selectedDepartment = $event"
                        @click="showAddDepartmentDlg=true"
                        :items="$store.getters['attributes/departmentArray']"/>
                    <v-card outlined class="ma-3">
                        <v-card-subtitle>
                            Name
                            <v-btn color='success' icon @click="showAddNameDlg=true"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-select
                                dense
                                outlined
                                multiple
                                v-model="selectedNames"
                                :items='$store.getters["attributes/nameArray"]'>
                            </v-select>
                        </v-card-text>
                    </v-card>
                    <v-card outlined class="ma-3">
                        <v-card-subtitle>
                            Tag
                            <v-btn color='success' icon @click="showAddTagDlg=true"><v-icon>mdi-plus</v-icon></v-btn>
                        </v-card-subtitle>
                        <chip-list
                            :items='$store.state.attributes.tags'
                            :selecteds='selectedTags'
                            contentStr='tag'
                            @change='selectedTags = $event'/>
                    </v-card>
                </v-row>
            </v-card>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="saveItem(selectedType, selectedDepartment, selectedNames, selectedTags, content);">
                    Create
                </v-btn>
                <v-spacer/>
                <v-btn color="secondary" @click="clearInput()">
                    Cancel
                </v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-container>
    </v-card>

    <v-divider/>
    <v-card>
        <v-card-title>Recent Items</v-card-title>
        <v-data-table
            :headers="recentItemsHeaders"
            :items="$store.state.items.items"
            :options="recentItemOption"
            dense>
            <template v-slot:item.created="{ item }">
                <span>{{(new Date(item.created)).toLocaleString()}}</span>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="showAddTagDlg" max-width='600px'>
        <add-card
            title="New Tag"
            :model="newAttrib"
            @change="newAttrib = $event"
            @add="addAttrib('attributes/hasTag', 'api/addTag', 'attributes/addTag', newAttrib, {'tag': newAttrib, 'color': ''})"/>
    </v-dialog>
    <v-dialog v-model="showAddTypeDlg" max-width='600px'>
        <add-card
            title="New Type"
            :model="newAttrib"
            @change="newAttrib = $event"
            @add="addAttrib('attributes/hasType', 'api/addType', 'attributes/addType', newAttrib, {'type': newAttrib})"/>
    </v-dialog>
    <v-dialog v-model="showAddDepartmentDlg" max-width='600px'>
        <add-card
            title="New Department"
            :model="newAttrib"
            @change="newAttrib = $event"
            @add="addAttrib('attributes/hasDepartment', 'api/addDepartment', 'attributes/addDepartment', newAttrib, {'department': newAttrib})"/>
    </v-dialog>
    <v-dialog v-model="showAddNameDlg" max-width='600px'>
        <add-card
            title="New Name"
            :model="newAttrib"
            @change="newAttrib = $event"
            @add="addAttrib('attributes/hasName', 'api/addName', 'attributes/addName', newAttrib, {'name': newAttrib})"/>
    </v-dialog>
</v-app>
</template>

<script>
import SelectableInput from '~/components/SelectableInput.vue'
import AddCard from '~/components/AddCard.vue'
import axios from 'axios'
import {mapState} from 'vuex'
import ChipList from '~/components/ChipList.vue'

export default {
    data(){
        return {
            saved:false,
            content:"",
            recentItemsHeaders:[
                { text: 'Content', value: "content"},
                { text: 'Type', value: "type"},
                { text: 'Department', value: 'department'},
                { text: 'Name', value: 'names'},
                { text: 'tag', value: 'tags'},
                { text: 'created', value: 'created'}
            ],
            recentItemOption:{
                sortBy: ['created'],
                sortDesc: [true],
                itemsPerPage: 5
            },
            attribRules: {
                notEmpty: value => !!value || 'Must have one letter at least.'
            },
            selectedType: "",
            selectedDepartment: "",
            selectedNames:[],
            selectedTags: [],
            showAddTagDlg: false,
            showAddTypeDlg: false,
            showAddNameDlg: false,
            showAddDepartmentDlg: false,
            newAttrib: ""
        }
    },
    components : {
        SelectableInput,
        AddCard,
        ChipList
    },
    methods: {
        saveItem(type, department, selectedNames, selectedTags, content){
            let item = {
                "id": -1,
                "type": type,
                "department": department,
                "names": selectedNames ? selectedNames : [],
                "tags": selectedTags ? selectedTags : [],
                "content": content,
                "created": Date.now(),
                "updated": Date.now()
            }
            this.$store.commit("items/addItem", item)
            axios.post(`${process.env.baseUrl}api/addItem`, item)
            this.showLayoutSnackbar(`Added ${this.content}`, 'success')
            return
        },
        clearInput(){
            this.content = "";
        },
        showLayoutSnackbar(msg, color){
            this.$nuxt.$emit("updateLayoutData", {snackbarMessage: msg, snackbarColor: color, showSnackbar: true})
        },
        addAttrib(hasAttribGetter, addAttribServerAPI, addAttribMutation, newVal, newObj){
            if(this.$store.getters[hasAttribGetter](newVal)){
                this.showLayoutSnackbar('Already Exists!', 'error')
            }else{
                axios.post(`${process.env.baseUrl}${addAttribServerAPI}`, {data: newObj})
                this.showLayoutSnackbar('Added ' + newVal, 'success')
                this.$store.commit(addAttribMutation, newObj)
            }
        },
    },
}

</script>