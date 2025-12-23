import './home.css';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/loader';
import { useNavigate } from 'react-router-dom';

export default function Home(){
    const [loadding, setLoadding] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function GeraRelatorio(rotaDestino, type){
        if (!file) {
            toast.info("Por favor selecione um arquivo.");
            return;
        }
        setLoadding(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post(type == 1 ? '/Wpp' : '/Wpp/retrospective', formData);
            navigate(rotaDestino.replace(':id', response.data.object.id), {replace: true});
        } catch (error) {
            toast.error('Erro ao processar o arquivo: ' + error);
        } finally {
            setLoadding(false);
        }
    }

    return(
        <div className="container">
            {loadding ? <Loader/> : null}
            <div className='home'>
                <div className='titulo'>
                    <h1>Wpp Group Data</h1>
                </div>
                <p>Bem-vindo! Este é o lugar onde você pode organizar e analisar as conversas do seu grupo de WhatsApp. Veja o quanto você e seus amigos são ativos no grupo!</p>
                <p><b>Privacidade Assegurada:</b> Não se preocupe, não utilizamos seus dados para fins além deste relatório e não guardamos nenhuma informação sua após a análise.</p>
                <div className='passo-a-passo'>
                    <p>Aqui está o passo a passo de como é feito o trabalho:</p>
                    <ol>
                        <li>
                            <p>Exporte a conversa do WhatsApp:</p>
                            <ul>
                                <li>Entre no grupo que deseja analisar.</li>
                                <li>Acesse <b>Mais Opções {'>'} Mais {'>'} Exportar conversa</b>.</li>
                                <li>Salve o arquivo onde desejar.</li>
                            </ul>
                        </li>
                        <li>
                            <p>Envie o arquivo aqui:</p>
                            <ul>
                                <li>Clique em "Escolher arquivo" para selecionar a conversa exportada.</li>
                                <li>Clique em "Criar Relatório" para gerar seu relatório.</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <p>
                    <b>Notas:</b> 
                    <ol>
                        <li>Apenas são analisadas as últimas 100 mil mensagens mais recentes de cada conversa para garantir eficiência e rapidez no processamento (e porque o whatsapp limita a exportação de conversa).</li>
                        <li>São gerados os dados apenas dos contatos salvos.</li>
                    </ol>
                </p>
                <div className='upload-file'>
                    <input type='file' accept=".zip" onChange={handleFileChange}/>
                    <div className='upload-actions'>
                        <button onClick={() => GeraRelatorio('/relatorio/:id', 1)} disabled={loadding}>
                            {loadding ? 'Gerando relatorio...' : 'Criar relatorio'}
                        </button>
                        <button onClick={() => GeraRelatorio('/relatorio/:id', 2)} disabled={loadding}>
                            {loadding ? 'Gerando relatorio...' : 'Criar retrospectiva'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
