export default function DadosRelatorioItem({mensagem, quantidade}){
    return(
        <p>
            {mensagem} <b>{quantidade}</b>
        </p>
    )
}