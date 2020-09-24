
export const state = ()=>({
    types: [],
    departments: [],
    names: [],
    tags: []
})

export const getters = {
    hasTag: (state) => (tag) => {
        return state.tags.includes(tag)
    },
    hasType: (state) => (type) => {
        return state.types.includes(type)
    },
    hasName: (state) => (name) => {
        return state.names.includes(name)
    },
    hasDepartment: (state) => (dep) => {
        return state.departments.includes(dep)
    }
}

export const mutations = {
    setTags(state, payload){
        state.tags = payload
    },
    setNames(state, payload){
        state.names = payload
    },
    setDepartments(state, payload){
        state.departments = payload
    },
    setTypes(state, payload){
        state.types = payload
    },
    addType(state, payload){
        state.types.push(payload)
    },
    addDepartment(state, payload){
        state.departments.push(payload)
    },
    addName(state, payload){
        state.names.push(payload)
    },
    addTags(state, payload){
        state.tags.push(payload)
    }
}
