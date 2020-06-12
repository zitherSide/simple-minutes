<template>
<div>
    <v-container>
        <v-layout column>
            <v-card>
                <v-card-title> {{label}} </v-card-title>
                <v-combobox/>
            </v-card>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
export default {
    props:[
        'label',
    ],
}
</script>