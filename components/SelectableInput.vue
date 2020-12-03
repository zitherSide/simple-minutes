<template>
    <v-card outlined :class="styleClass">
        <v-card-subtitle>
            {{label}} 
            <v-btn icon small depressed @click=OnClick><v-icon color="success">mdi-plus</v-icon></v-btn>
        </v-card-subtitle>
        <v-autocomplete class="mx-4" v-model='innerModel' :items="items"/>
    </v-card>
</template>

<script>
export default {
    props:{
        label: String,
        model: String,
        items: Array,
        styleClass: String
    },
    computed:{
        innerModel:{
            get(){
                return this.$props.model;
            },
            set(value){
                this.$emit('change', value);
            }
        },
    },
    methods:{
        OnClick(){
            this.$emit('click')
        }
    }
}
</script>