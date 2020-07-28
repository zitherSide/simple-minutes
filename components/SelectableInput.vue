<template>
<div>
    <v-layout column>
        <v-card flat>
            <v-card-text class="pa=0"> {{label}} </v-card-text>
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