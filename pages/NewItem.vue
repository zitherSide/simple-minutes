<template>
    <v-dialog
        v-model=showEditDlg
        width=500>
        <v-card>
            <v-card-title>Write new item.</v-card-title>
            <v-divider/>
            <v-container>
                <v-layout row>
                    <SelectableInput
                        :label="Type"
                    />
                </v-layout>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="primary"
                        @click="showEditDlg = false">
                        Create
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                        color="secondary"
                        @click="showEditDlg = false">
                        Cancel
                    </v-btn>
                    <v-spacer/>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import SelectableInput from '~/components/SelectableInput.vue'
export default {
    data(){
        return {
            showEditDlg : true,
        }
    },
    components : {
        SelectableInput
    }
}
</script>