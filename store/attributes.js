export const state = ()=>({
    types: [],
    departments: [],
    names: [],
    tags: []
})

export const getters = {
    hasTag: (state, getters) => (tag) => {
        return getters.tagArray.includes(tag)
    },
    hasType: (state, getters) => (type) => {
        return getters.typeArray.includes(type)
    },
    hasName: (state, getters) => (name) => {
        return getters.nameArray.includes(name)
    },
    hasDepartment: (state, getters) => (dep) => {
        return getters.departmentArray.includes(dep)
    },
    tagArray: state => state.tags.map( elem => elem.tag ),
    typeArray: state => state.types.map( elem => elem.type ),
    nameArray: state => state.names.map( elem => elem.name ),
    departmentArray: state => state.departments.map( elem => elem.department),
    tagColor: state => tag => {
        let ret;
        state.tags.forEach(element => {
            if(element.tag == tag) {
                ret = element.color
            }
        })
        return ret
    }
}

export const mutations = {
    setTags(state, payload){
        state.tags = payload
    },
    deleteTag(state, payload){
        state.tags = state.tags.filter( elem => elem !== payload )
    },
    updateTag(state, payload) {
        const index = state.tags.findIndex(elem => elem.id === payload.id)
        state.tags[index] = payload
    },
    addTag(state, payload){
        state.tags.push(payload)
    },

    setNames(state, payload){
        state.names = payload
    },
    addName(state, payload){
        state.names.push(payload)
    },
    updateName(state, payload) {
        const index = state.names.findIndex(elem => elem.id === payload.id)
        state.names[index] = payload.name
    },
    deleteName(state, payload){
        state.names = state.names.filter( elem => elem.id !== payload.id)
    },

    setDepartments(state, payload){
        state.departments = payload
    },
    addDepartment(state, payload){
        state.departments.push(payload)
    },
    updateDepartment(state, payload){
        const index = state.departments.findIndex(elem => elem.id === payload.id)
        state.departments[index] = payload.department
    },
    deleteDepartment(state, payload){
        state.departments = state.departments.filter(elem => elem.id !== payload.id)
    },

    setTypes(state, payload){
        state.types = payload
    },
    addType(state, payload){
        state.types.push(payload)
    },
    deleteType(state, payload){
        state.types = state.types.filter( elem => elem.id !== payload.id)
    },
    updateType(state, payload){
        const index = state.types.findIndex(elem => elem.id === payload.id)
        state.types[index] = payload
    }
}
