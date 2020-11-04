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
                        :model="selectedType"
                        @change="selectedType = $event"
                        @click="showAddTypeDlg=true"
                        :items="$store.getters['attributes/typeArray']"/>
                    <SelectableInput
                        label="Department"
                        :model="selectedDepartment"
                        @change="selectedDepartment = $event"
                        @click="showAddDepartmentDlg=true"
                        :items="$store.getters['attributes/departmentArray']"/>
                    <v-col sm='4' md='3'>
                        <v-card outlined>
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
                    </v-col>
                    <v-col sm='4' md='3'>
                        <chip-edit-card
                            title="Tag"
                            :items="$store.state.attributes.tags"
                            :toggleSelectedFunc="toggleSelectTag"
                            :selectedFlags="selectedTag"
                            contentStr="tag"
                            @addClick="showAddTagDlg=true"
                            hasButton
                        />
                    </v-col>
                </v-row>
            </v-card>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="saveItem(selectedType, selectedDepartment, selectedNames, selectedTag, content);">
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
import ChipEditCard from '~/components/ChipEditCard.vue'
import AddCard from '~/components/AddCard.vue'
import axios from 'axios'
import {mapState} from 'vuex'

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
            selectedTag: {},
            selectedNames:[],
            showAddTagDlg: false,
            showAddTypeDlg: false,
            showAddNameDlg: false,
            showAddDepartmentDlg: false,
            newAttrib: ""
        }
    },
    created() {
        this.$store.getters["attributes/tagArray"].forEach( (element, i) => {
            this.$set(this.selectedTag, element, false)
        });
    },
    components : {
        SelectableInput,
        ChipEditCard,
        AddCard
    },
    methods : {
        saveItem(type, department, selectedNameFlagsArray, selectedTagFlagObject, content){
            const tags = Object.keys(selectedTagFlagObject).filter(elem => selectedTagFlagObject[elem])
            const names = this.$store.getters["attributes/nameArray"].filter( (elem, i) => selectedNameFlagsArray[i])
            let item = {
                "id": -1,
                "type": type,
                "department": department,
                "names": names,
                "tags": tags,
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
        toggleSelectTag(tag){
            this.$set(this.selectedTag, tag.tag, !this.selectedTag[tag.tag])
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