import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/header/header";
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Error from './pages/erro/erro';
import Relatorio from './pages/relatorio/relatorio';
import Retrospectiva from './pages/retrospectiva/retrospectiva';
import Contato from './pages/contato/contato';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/relatorio/:filtro' element={<Relatorio/>}/>
                <Route path='/relatorio/:filtro/retrospective' element={<Retrospectiva/>}/>
                <Route path='/contatos' element={<Contato/>}/>
                <Route path='/' element={<Home/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}
