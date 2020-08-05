<template>
<div>
    <v-card flat>
        <v-toolbar>
            <v-toolbar-title>New Item</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
            <v-card>
                <v-card-text>Attributes</v-card-text>
                <v-layout row>
                    <v-spacer/>
                    <SelectableInput v-for="item in items" :key=item.label
                        :label="item.label"
                        :model="item.data"
                        @change="item.data = $event"
                        :items="item.list">
                    </SelectableInput>
                    <v-spacer/>
                </v-layout>
            </v-card>
            <v-divider/>
            <v-textarea label="Content" v-model="content" auto-grow outlined ></v-textarea>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="saveItem(items[0].data, items[1].data, items[2].data, items[3].data, content);">
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
            :items="$store.state.items.articles"
            :options="recentItemOption"
            dense>
            <template v-slot:item.createdDate="{ item }">
                <span>{{(new Date(item.createdDate)).toLocaleString()}}</span>
            </template>
        </v-data-table>
    </v-card>
</div>
</template>

<script>
import SelectableInput from '~/components/SelectableInput.vue'
import {mapState} from 'vuex'

export default {
    data(){
        return {
            showEditDlg : true,
            test:"testData",
            saved:false,
            items:[
                {
                    label:"Type",
                    data:"",
                    list:this.$store.state.attributes.types,
                },
                {
                    label:"Department",
                    data:"",
                    list:this.$store.state.attributes.departments,
                },
                {
                    label:"Name",
                    data:"",
                    list:this.$store.state.attributes.names,
                },
                {
                    label:"Tags",
                    data:"",
                    list:this.$store.state.attributes.tags,
                }
            ],
            content:"",
            recentItemsHeaders:[
                { text: 'Content', value: "content"},
                { text: 'Type', value: "type"},
                { text: 'Department', value: 'department'},
                { text: 'Name', value: 'name'},
                { text: 'tag', value: 'tags'},
                { text: 'created', value: 'createdDate'}
            ],
            recentItemOption:{
                sortBy: ['createdDate'],
                sortDesc: [true],
                itemsPerPage: 5
            }
        }
    },
    components : {
        SelectableInput
    },
    methods : {
        saveItem(type, department, name, tags, content){
            this.$store.commit("attributes/addType", type);
            this.$store.commit("attributes/addDepartment", department);
            this.$store.commit("attributes/addName", name);
            this.$store.commit("attributes/addTags", tags);
            this.$store.commit("items/addArticle", {
                "type": type,
                "department": department,
                "name": name,
                "tags": tags,
                "content": content,
                "createdDate": Date.now(),
            });
            this.saved = true;
            return;
        },
        clearInput(){
            this.content = "";
        }
    },
    
}

</script>