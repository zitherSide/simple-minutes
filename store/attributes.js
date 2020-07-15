import axios from 'axios'
import types from 'assets/json/types.json'
import departments from 'assets/json/departments.json'
import names from 'assets/json/names.json'
import tags from 'assets/json/tags.json'

export const state = ()=>({
    types,
    departments,
    names,
    tags
})

export const mutations = {
    addType(state, payload){
        addUnique(state.types, payload);
        axios.post('http://localhost:3000/api/saveAttrib', {
            typename: "types",
            data: state.types
        })
    },
    addDepartment(state, payload){
        addUnique(state.departments, payload);
        axios.post('http://localhost:3000/api/saveAttrib', {
            typename: "departments",
            data: state.departments
        })
    },
    addName(state, payload){
        addUnique(state.names, payload);
        axios.post('http://localhost:3000/api/saveAttrib', {
            typename: "names",
            data: state.names
        })
    },
    addTags(state, payload){
        addUnique(state.tags, payload);
        axios.post('http://localhost:3000/api/saveAttrib', {
            typanema: "tags",
            data: state.tags
        })
    }
}

function addUnique(array, item){
    if(!array.includes(item)){
        array.push(item);
    }
}
