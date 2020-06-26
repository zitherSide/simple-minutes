<template>
<div>
    <v-card flat>
        <v-toolbar>
            <v-toolbar-title>New Item</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-card-title>Attributes</v-card-title>
            <v-layout row>
                <SelectableInput v-for="item in items" :key=item.label
                    :label="item.label"
                    :model="item.data"
                    @change="item.data = $event"
                    :items="item.list">
                </SelectableInput>
            </v-layout>
        </v-container>
        <v-divider/>
        <v-container>
            <v-card ripple>
                <v-card-title>Content</v-card-title>
                <v-textarea v-model="content"></v-textarea>
            </v-card>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="primary"
                    @click="saveItem(items[0].data, items[1].data, items[2].data, items[3].data, content);">
                    Create
                </v-btn>
                <v-spacer/>
                <v-btn color="secondary">
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
                <v-btn @click="saved = false" text autofocus=true>
                    OK
                </v-btn> 
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
                    label:"Category",
                    data:"",
                    list:this.$store.state.attributes.categories,
                }
            ],
            content:"",
        }
    },
    components : {
        SelectableInput
    },
    methods : {
        saveItem(type, department, name, category, content){
            this.$store.commit("attributes/addType", type);
            this.$store.commit("attributes/addDepartment", department);
            this.$store.commit("attributes/addName", name);
            this.$store.commit("attributes/addCategory", category);
            this.$store.commit("items/addArticle", {
                "type": type,
                "department": department,
                "name": name,
                "category": category,
                "content": content,
            });
            this.saved = true;
            return;
        },
    },
    
}

</script>