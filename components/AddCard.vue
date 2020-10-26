<template>
    <v-card>
        <v-card-title class="headline grey darken-3">{{title}}</v-card-title>
        <v-col>
            <v-text-field 
                v-model='innerModel'
                autofocus
                :rules="rules"></v-text-field>
            <v-card-actions>
                <v-spacer/>
                <v-btn outlined color="success" @click="$emit('add')">Add</v-btn>
            </v-card-actions>
        </v-col>
    </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        model: String,
        rules: [],
    },
    computed: {
        innerModel: {
            get(){
                return this.$props.model
            },
            set(value){
                this.$emit('change', value)
            }
        }
    }
}
</script>