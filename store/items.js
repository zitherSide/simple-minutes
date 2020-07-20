import axios from 'axios'
import articles from 'assets/json/items.json'

export const state = ()=>({
    articles
})

export const mutations = {
    addArticle(state, payload){
        state.articles.push(payload);
        axios.post(`http://localhost:3000/api/save`, {data: state.articles})
            .then( (response) => {
            }).catch( (err) => {
                alert(err)   
            })
    },
    removeArticle(state, index){
        state.articles.splice(index, 1);
    },
}
