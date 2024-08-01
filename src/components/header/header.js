import { useNavigate } from 'react-router-dom';
import './header.css'

export default function Header(){
    const navigate = useNavigate();

    return(
        <header className="navBar">
            <h2 className="option-link" onClick={()=>navigate(`/`, {replace: true})}>Home</h2>
            <h2 className="option-link" onClick={()=>navigate(`/contatos`, {replace: true})}>Contato</h2>
        </header>
    )
}