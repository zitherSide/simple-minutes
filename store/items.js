import axios from 'axios'
import articles from 'assets/json/items.json'

export const state = ()=>({
    articles
})

export const mutations = {
    addArticle(state, payload){
        state.articles.push(payload);
        const postMsg = JSON.stringify(state.articles);
        axios.post(`http://localhost:3000/api/post`, {data: state.articles})
            .then( (response) => {
            }).catch( (err) => {
                alert(err)   
            })
    },
    removeArticle(state, index){
        state.articles.splice(index, 1);
    },
}
