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
                    <SelectableInput v-for="item in items" :key=item.label
                        :label="item.label"
                        :model="item.data"
                        @change="item.data = $event"
                        @click="startAttribEdit(item.label, item.addMutation, item.hadKeyGetter, item.webAPI)"
                        :items="item.list"
                        class="mx-2">
                    </SelectableInput>
                    <v-col sm='4' md='3'>
                        <v-card outlined sm='6'>
                            <v-card-subtitle>
                                Tags 
                                <v-btn icon small depressed><v-icon color="green">mdi-plus</v-icon></v-btn>
                            </v-card-subtitle>
                            <v-chip-group column>
                                <v-chip v-for="(tag, i) in $store.state.attributes.tags" :key="i"
                                    :outlined="!selectedTag[tag.tag]" :color='tag.color' @click="toggleSelectTag(tag)">
                                    {{tag.tag}}
                                </v-chip>
                            </v-chip-group>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="saveItem(items[0].data, items[1].data, items[2].data, content);">
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
    <v-dialog v-model=saved max-width="300">
        <v-card>
            <v-card-title class="headline">Item was Saved!</v-card-title>
            <v-divider/>
            <v-card-text >
                <span v-for="item in items" :key=item.label>
                    {{item.label}}: {{item.data}}, 
                </span>
            </v-card-text>
            <v-divider/>
            <v-card-text>
                Content: {{content}}
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn @click="saved = false" text autofocus>
                    OK
                </v-btn> 
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>

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

    <v-dialog v-model="showAddAttribDlg" max-width='600px'>
        <v-card>
            <v-card-title class="headline grey darken-3">New {{edittingAttrib}}</v-card-title>
            <v-col>
                <v-text-field 
                    v-model="newAttribValue" 
                    autofocus
                    :rules="[attribRules.notEmpty]"></v-text-field>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn outlined color="success" @click="addAttrib(newAttribValue, edittingAttribMutaion, edittingAttribHasKeyGetter, edittingAttribWebAPI)">Add</v-btn>
                </v-card-actions>
            </v-col>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script>
import SelectableInput from '~/components/SelectableInput.vue'
import axios from 'axios'
import {mapState} from 'vuex'

export default {
    data(){
        return {
            saved:false,
            items:[
                {
                    label:"Type",
                    addMutation: "attributes/addType",
                    hadKeyGetter: "attributes/hasType",
                    webAPI: "api/addType",
                    data: "",   //履歴はlocalstorageに保存したい
                    list:this.$store.getters["attributes/typeArray"],
                },
                {
                    label:"Department",
                    addMutation: "attributes/addDepartment",
                    hadKeyGetter: "attributes/hasDepartment",
                    webAPI: "api/addDepartment",
                    data: "",
                    list:this.$store.getters["attributes/departmentArray"],
                },
                {
                    label:"Name",
                    addMutation: "attributes/addName",
                    hadKeyGetter: "attributes/hasName",
                    webAPI: "api/addName",
                    data: "",
                    list:this.$store.getters["attributes/nameArray"],
                },
            ],
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
            edittingAttrib: "",
            edittingAttribMutaion: "",
            edittingAttribWebAPI: "",
            edittingAttribHasKeyGetter: "",
            showAddAttribDlg: false,
            newAttribValue: "",
            enabled: false,
            selectedTag: {},
        }
    },
    created() {
        this.$store.getters["attributes/tagArray"].forEach( (element, i) => {
            this.$set(this.selectedTag, element, false)
        });
    },
    components : {
        SelectableInput
    },
    methods : {
        saveItem(type, department, name, content){
            let tags = Object.keys(this.selectedTag).filter(elem => this.selectedTag[elem])
            alert(tags)
            let item = {
                "id": -1,
                "type": type,
                "department": department,
                "names": name,
                "tags": tags,
                "content": content,
                "created": Date.now(),
                "updated": Date.now()
            }
            this.$store.commit("items/addItem", item);
            axios.post(`${process.env.baseUrl}api/addItem`, item)
            this.saved = true;
            return;
        },
        clearInput(){
            this.content = "";
        },
        startAttribEdit(attrib, mutation, getter, webAPI){
            this.edittingAttrib = attrib
            this.edittingAttribMutaion = mutation
            this.edittingAttribWebAPI = webAPI
            this.edittingAttribHasKeyGetter = getter
            this.showAddAttribDlg = true
        },
        addAttrib(newVal, mutation, getter, webAPI){
            if(!!newVal && this.$store.getters[getter](newVal)){
                this.showLayoutSnackbar('Already Exists!', 'error')
            }else{
                this.$store.commit(mutation, newVal)
                axios.post(`${process.env.baseUrl}${webAPI}`, {data: newVal})
                this.showAddAttribDlg = false;
                this.showLayoutSnackbar('Added!', 'success')
            }
        },
        showLayoutSnackbar(msg, color){
            this.$nuxt.$emit("updateLayoutData", {snackbarMessage: msg, snackbarColor: color, showSnackbar: true})
        },
        toggleSelectTag(tag){
            this.$set(this.selectedTag, tag.tag, !this.selectedTag[tag.tag])
        },
    },
}

</script>