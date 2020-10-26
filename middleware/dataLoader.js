import axios from 'axios'

export default async function({store}){
    let res = await axios.get(`${process.env.baseUrl}api/getTags`)//.then( (req, res, next) => {
    res.data.forEach( elem => {
        if(elem.color === null)
            elem.color = ""
    })
    store.commit("attributes/setTags", res.data)

    res = await axios.get(`${process.env.baseUrl}api/getNames`);
    store.commit("attributes/setNames", res.data)

    res = await axios.get(`${process.env.baseUrl}api/getDepartments`)
    store.commit("attributes/setDepartments", res.data)

    res = await axios.get(`${process.env.baseUrl}api/getTypes`)
    store.commit("attributes/setTypes", res.data)

    res = await axios.get(`${process.env.baseUrl}api/getItems`)
    const items = res.data
    items.forEach(elem => {
        elem.tags = JSON.parse(elem.tags)
        elem.names = JSON.parse(elem.names)
    })
    store.commit("items/setItems", items)
}