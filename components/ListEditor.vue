<template>
    <v-card flat>
        <v-card-title class='headline grey darken-4 grey--text text--lighten-4'>
            {{title}}
            <v-btn icon color="success" @click='$emit("addClick")'><v-icon>mdi-plus</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
            <v-list class='transparent'>
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-title>
                        <v-text-field :value=item[contentStr] @input="updateFunc({id: item.id, [contentStr]: $event})"></v-text-field>
                    </v-list-item-title>
                    <v-list-item-icon><v-btn @click='deleteFunc({id: item.id, [contentStr]: $event})' icon><v-icon>mdi-delete</v-icon></v-btn></v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:{
        items: Array,
        deleteFunc: Function,
        updateFunc: Function,
        contentStr: String,
        title: String
    }
}
</script>