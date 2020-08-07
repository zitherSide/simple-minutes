import axios from 'axios'
import articles from 'assets/json/items.json'

export const state = ()=>({
    articles
})

export const mutations = {
    addArticle(state, payload){
        state.articles.push(payload);
        console.log("store add article")
        console.log(state.articles)
        axios.post(`${process.env.baseUrl}api/save`, {data: state.articles})
            .then( (response) => {
            }).catch( (err) => {
                alert(err)   
            })
    },
    removeArticle(state, index){
        state.articles.splice(index, 1);
        axios.post(`${process.env.baseUrl}api/save`, {data: state.articles})
            .then( (response) => {
            }).catch( (err) => {
                alert(err)
            })
    },
    setArticles(state, payload){
        state.articles = payload
        console.log("set: " + JSON.stringify(state.articles))
    }
}
