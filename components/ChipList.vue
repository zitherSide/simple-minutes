<template>
    <v-chip-group column>
        <v-chip v-for="(item, i) in items" :key="i"
            :outlined="!isSelected(item)" :color='item.color' @click="OnClick(item)">
            {{item[contentStr]}}
        </v-chip>
    </v-chip-group>
</template>

<script>
export default {
    props:{
        items: Array,
        selecteds: Array,
        contentStr: String,
    },
    methods: {
        OnClick(item){
            if(this.selecteds && this.selecteds.includes(item)){
                this.$emit('change', this.selecteds.filter( elem => elem !== item))
            }else{
                let newVal;
                if(this.selecteds){
                    newVal = this.selecteds
                }else{
                    newVal = []
                }
                newVal.push(item)
                this.$emit('change', newVal)
            }
            this.$emit("chipClick")
        },
    },
    computed: {
        isSelected: function() {
            return function(item){
                return this.selecteds && this.selecteds.includes(item)
            }
        },
    }
}
</script>