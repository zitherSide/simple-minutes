export const state = ()=>({
    types:["Decision", "Proposal"],
    departments:["Dev."],
    names:["Tom"],
    categories:["GUI"],
    test:"hello"
})

export const mutations = {
    addType(state, payload){
        addUnique(state.types, payload);
    },
    addDepartment(state, payload){
        addUnique(state.departments, payload);
    },
    addName(state, payload){
        addUnique(state.names, payload);
    },
    addCategory(state, payload){
        addUnique(state.categories, payload);
    }
}

function addUnique(array, item){
    if(!array.includes(item)){
        array.push(item);
    }
}