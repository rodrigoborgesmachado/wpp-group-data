import './quadradoInfo.css';

export default function QuadradoInfo({descricao, nome}){
    return(
        <div className='quadrado-info'>
            <div className='quadrado-descricao'>
                <p>{descricao}:</p>
            </div>
            <div className='quadrado-nome'>
                <p>{nome}</p>
            </div>
        </div>
    )
}