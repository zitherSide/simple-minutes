<template>
<v-app fluid style="margin: 10px; padding: 10px">
    <v-row dense> 
        <v-col md='3' sm='6' xs='6'>
            <ListEditor
                :items="$store.state.attributes.types"
                :updateFunc="updateType"
                :deleteFunc="deleteType"
                contentStr="type"
                title="Type"
                @addClick="showAddTypeDlg=true"
            />
        </v-col>
        <v-col md='3' sm='6' xs='6'>
            <ListEditor
                :items="$store.state.attributes.departments"
                :updateFunc="updateDepartment"
                :deleteFunc="deleteDepartment"
                contentStr="department"
                title="Department"
                @addClick="showAddDepartmentDlg=true"
            />
        </v-col>
        <v-col md='3' sm='6' xs='6'>
            <ListEditor
                :items="$store.state.attributes.names"
                :updateFunc="updateName"
                :deleteFunc="deleteName"
                contentStr="name"
                title="Name"
                @addClick="showAddNameDlg=true"
            />
        </v-col>
        <v-col md='3' sm='6' xs='6'>
            <v-card>
                <v-card-title class='headline grey darken-4 grey--text text--lighten-4'>
                    Tag
                    <v-btn icon color="success" @click="showAddTagDlg = true"><v-icon>mdi-plus</v-icon></v-btn>
                </v-card-title>
                <v-chip-group column>
                    <v-chip 
                        close
                        close-icon="mdi-delete"
                        :color="tag.color"
                        @click="editTag(tag)" 
                        @click:close="deleteTag(tag)"
                        v-for="(tag, i) in $store.state.attributes.tags" :key="i">
                        {{tag.tag}} 
                    </v-chip>
                </v-chip-group>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog v-model=showTagEditDlg width='40%'>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col xs='6'>
                        <v-color-picker v-model="edittingColor"></v-color-picker>
                    </v-col>
                    <v-col xs='6'>
                        <v-text-field v-model=edittingAttrib></v-text-field>
                        <v-chip :color="edittingColor">{{edittingAttrib}}</v-chip>
                        <v-spacer/>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn outlined color='success' @click='updateTag({
                    id: edittingID,
                    tag: edittingAttrib,
                    color: edittingColor
                })'>OK</v-btn>
                <v-btn outlined color='error' @click='this.showTagEditDlg = !this.showTagEditDlg'>Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

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
import axios from 'axios'
import ListEditor from '~/components/ListEditor.vue'
import AddCard from '~/components/AddCard.vue'

export default {
    data() {
        return{
            showTagEditDlg: false,
            edittingID: 0,
            edittingAttrib: "",
            edittingColor: "",
            showAddTypeDlg: false,
            showAddDepartmentDlg: false,
            showAddNameDlg: false,
            showAddTagDlg: false,
            newAttrib: ""
        }
    },
    components: {
        ListEditor,
        AddCard
    },
    methods: {
        test(){
            alert("test")
        },
        editTag(tag){
            this.edittingID = tag.id
            this.edittingAttrib = tag.tag
            this.edittingColor = tag.color
            this.showTagEditDlg = true
        },
        updateTag(tag){
            axios.post('/api/updateTag', tag).then(
                this.showLayoutSnackbar("Updated " + tag.tag, "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err , "error")
            })
            this.$store.commit("attributes/updateTag", tag)
            this.showTagEditDlg = false
        },
        deleteTag(tag){
            axios.post(`${process.env.baseUrl}api/deleteTag`, {id: tag.id}).then(
                this.showLayoutSnackbar("Deleted " + tag.tag + " tag!", "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err , "error")
            })
            this.$store.commit("attributes/deleteTag", tag)
        },

        updateType(type){
            axios.post(`${process.env.baseUrl}api/updateType`, type).then(
                this.showLayoutSnackbar("Update " + JSON.stringify(type), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/updateType", type)
        },
        deleteType(type){
            axios.post(`${process.env.baseUrl}api/deleteType`, type).then(
                this.showLayoutSnackbar("Deleted" + JSON.stringify(type), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/deleteType", type)
        },

        updateName(name){
            axios.post(`${process.env.baseUrl}api/updateName`, name).then(
                this.showLayoutSnackbar("Update " + JSON.stringify(name), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/updateName", name)
        },
        deleteName(name){
            axios.post(`${process.env.baseUrl}api/deleteName`, name).then(
                this.showLayoutSnackbar("Delete " + JSON.stringify(name), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/deleteName", name)
        },

        updateDepartment(department){
            axios.post(`${process.env.baseUrl}api/updateDepartment`, department).then(
                this.showLayoutSnackbar("Update " + JSON.stringify(department), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/updateDepartment", department)
        },
        deleteDepartment(department){
            axios.post(`${process.env.baseUrl}api/deleteDepartment`, department).then(
                this.showLayoutSnackbar("Delete " + JSON.stringify(department), "success")
            ).catch( (err) => {
                this.showLayoutSnackbar("Err: " + err, "error")
            })
            this.$store.commit("attributes/deleteDepartment", department)
        },
        showLayoutSnackbar(msg, color){
            this.$nuxt.$emit('updateLayoutData', {showSnackbar:true, snackbarMessage: msg, snackbarColor: color})
        },
        addAttrib(hasAttribGetter, addAttribServerAPI, addAttribMutation, newVal, newObj){
            if(this.$store.getters[hasAttribGetter](newVal)){
                this.showLayoutSnackbar('Already Exists!', 'error')
            }else{
                axios.post(`${process.env.baseUrl}${addAttribServerAPI}`, {data: newObj})
                this.$store.commit(addAttribMutation, newObj)
                this.showLayoutSnackbar('Added ' + newVal, 'success')
            }
        },
    }
}
</script>