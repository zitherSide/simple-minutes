import axios from 'axios'

export const state = ()=>({
    items: []
})

export const mutations = {
    addItem(state, payload){
        state.items.push(payload);
    },
    removeItems(state, index){
        state.items.splice(index, 1);
    },
    setItems(state, payload){
        state.items = payload
        console.log(state.items)
    }
}
