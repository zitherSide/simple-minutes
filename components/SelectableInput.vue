<template>
<div>
    <v-layout column>
        <v-card class="pa-3" flat ripple>
            <v-card-title> {{label}} </v-card-title>
            <v-combobox v-model='innerModel' :items="items"/>
        </v-card>
    </v-layout>
    </div>
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
        }
    }
}
</script>