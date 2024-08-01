import { useNavigate } from 'react-router-dom';
import './erro.css'


export default function Error(){
    const navigate = useNavigate();

    return(
        <div className="container">
            <div className='erro'>
                <h1>Página não encontrada</h1>
                <button onClick={() => navigate('/', {replace: true})}>Home</button>
            </div>
        </div>
    )
}