import axios from 'axios'


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '227ae2232a0ace0af4f717c61b3e7073',
        language: 'pt-BR',
        page: 1
    }
})

export default api