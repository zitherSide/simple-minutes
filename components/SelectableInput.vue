<template>
    <div>
        <v-card flat>
            <v-card-text class="pa=5 ma=5">
                {{label}} 
                <v-btn fab small depressed @click=OnClick><v-icon color="green">mdi-plus</v-icon></v-btn>
            </v-card-text>
            <v-autocomplete v-model='innerModel' :items="items"/>
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        label: String,
        model: String,
        items: Array,
        btnFunc: Function
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