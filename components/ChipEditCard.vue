<template>
    <v-card outlined sm='6'>
        <v-card-subtitle>
            {{title}} 
            <v-btn icon small depressed @click="OnClick"><v-icon color="success">mdi-plus</v-icon></v-btn>
        </v-card-subtitle>
        <v-chip-group column>
            <v-chip v-for="(item, i) in items" :key="i"
                :outlined="!selectedFlags[item[contentStr]]" :color='item.color' @click="toggleSelectedFunc(item)">
                {{item[contentStr]}}
            </v-chip>
        </v-chip-group>
    </v-card>
</template>

<script>
export default {
    props:{
        title: String,
        items: Array,
        contentStr: String,
        selectedFlags: Object,
        toggleSelectedFunc: Function,
        click: Function,
        addFunc: Function,
    },
    methods: {
        OnClick(){
            this.$emit("addClick")
        }
    }
}
</script>