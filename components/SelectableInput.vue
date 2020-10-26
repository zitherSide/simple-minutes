<template>
    <v-col sm='4' md='2'>
        <v-card outlined >
            <v-card-subtitle>
                {{label}} 
                <v-btn icon small depressed @click=OnClick><v-icon color="success">mdi-plus</v-icon></v-btn>
            </v-card-subtitle>
            <v-autocomplete class="mx-4" v-model='innerModel' :items="items"/>
        </v-card>
    </v-col>
</template>

<script>
export default {
    props:{
        label: String,
        model: String,
        items: Array,
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