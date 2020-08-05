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
        if(addUnique(state.types, payload)){
            console.log("store addtype")
            console.log(`${process.env.baseUrl}api/saveAttrib`)
            axios.post(`${process.env.baseUrl}api/saveAttrib`, {
                typename: "types",
                data: state.types
            })
        }
    },
    addDepartment(state, payload){
        if(addUnique(state.departments, payload)){
            axios.post(`${process.env.baseUrl}api/saveAttrib`, {
                typename: "departments",
                data: state.departments
            })
        }
    },
    addName(state, payload){
        if(addUnique(state.names, payload)){
            axios.post(`${process.env.baseUrl}api/saveAttrib`, {
                typename: "names",
                data: state.names
            })
        }
    },
    addTags(state, payload){
        if(addUnique(state.tags, payload)){
            axios.post(`${process.env.baseUrl}api/saveAttrib`, {
                typename: "tags",
                data: state.tags
            })
        }
    }
}

function addUnique(array, item){
    if(!array.includes(item)){
        array.push(item);
        return true
    }
    return false
}
