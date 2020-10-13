import axios from 'axios'

export const state = ()=>({
    items: []
})

export const mutations = {
    addItem(state, payload){
        state.items.push(payload);
    },
    removeItem(state, id){
        state.items.forEach( (element, i) => {
            if(element.id == id){
                state.items.splice(i, 1)
                return
            }
        });
    },
    setItems(state, payload){
        state.items = payload
    },
    editContent(state, payload){
        state.items[payload.id].content = payload.content
    }
}
