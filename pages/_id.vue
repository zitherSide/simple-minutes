<template>
    <v-app>
        <v-row class="mx-1" justify="center" align="start" height="12">
            <selectable-input
                label="Type"
                styleClass="ma-3"
                :model="type"
                @change="type=$event"
                :items="$store.getters['attributes/typeArray']"/>
            <selectable-input
                label="Department"
                styleClass="ma-3"
                :model="department"
                @change="department=$event"
                :items="$store.getters['attributes/departmentArray']"/>
            <v-card outlined class="ma-3">
                <v-card-subtitle>
                    Name
                </v-card-subtitle>
                <v-card-text>
                    <v-select
                        dense
                        outlined
                        multiple
                        v-model="names"
                        :items='$store.getters["attributes/nameArray"]'>
                    </v-select>
                </v-card-text>
            </v-card>
            <v-card class="ma-3" outlined>
                <v-card-subtitle>Tags</v-card-subtitle>
                <v-card-text>
                    <chip-list
                        contentStr="tag"
                        :items='$store.state.attributes.tags'
                        :selecteds="tags"
                        @change="tags=$event"
                    />
                </v-card-text>
            </v-card>
        </v-row>
        <v-row class="ma-3" align="start">
            <v-textarea
                outlined
                auto-grow
                v-model="content"
                label="Content"
            />
        </v-row>
        <v-row class="ma-3  fill-height" align="start" justify="space-around">
            <v-btn outlined @click="back"><v-icon>mdi-keyboard-backspace</v-icon></v-btn>
            <v-btn outlined @click="save($route.params.id, type, department, names, tags, content)" color="success"><v-icon>mdi-check</v-icon></v-btn>
        </v-row>
    </v-app>
</template>

<script>
import ChipList from '~/components/ChipList.vue'
import SelectableInput from '~/components/SelectableInput.vue'
import axios from 'axios'

export default {
    components: {
         SelectableInput,
         ChipList
    },
    computed: {
        item(){
            return this.$store.state.items.items.filter(elem => elem.id == this.$route.params.id)[0]
        }
    },
    created() {
        this.type = this.item.type
        this.department = this.item.department
        this.names = this.item.names ? this.item.names : []
        this.tags = this.item.tags ? this.$store.state.attributes.tags.filter(elem => this.item.tags.includes(elem.tag)) : []
        this.content = this.item.content
    },
    data() {
        return {
            type: "",
            department: "",
            names: [],
            tags: [],
            content: ""
        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        save(id, type, department, names, tags, content)
        {
            const item = {
                id,
                type,
                department,
                names: names ? names : [],
                tags: tags ? tags.map( tag => tag.tag) : [],
                content
            }
            this.$store.commit('items/addItem', item)
            axios.post(`${process.env.baseUrl}api/updateItem`, item).then( () => {
                const msg = `Saved! ID: ${id}, ${content}, ${item.tags}`
                this.$nuxt.$emit("updateLayoutData", {snackbarMessage: msg, snackbarColor: 'success', showSnackbar: true})
                this.back()
            }
            ).catch( (err) => {
                const msg = `Error! ID: ${id}, ${content}`
                this.$nuxt.$emit("updateLayoutData", {snackbarMessage: msg, snackbarColor: 'error', showSnackbar: true})
            })
        }
    }
}
</script>