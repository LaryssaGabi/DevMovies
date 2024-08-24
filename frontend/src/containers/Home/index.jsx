import api from '../../services/api'
import { Backgroud } from './styles'

function Home() {

    async function getMovies() {
        const data = await api.get('/movie/popular')
        console.log(data)
    }

    getMovies()

    return (
        <>
            <Backgroud img='https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg'>
                <h1>Home</h1>
            </Backgroud>
        </>
    )
}

export default Home
