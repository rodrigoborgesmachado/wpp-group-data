import './home.css';
import { useState, useEffect } from 'react';
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

    async function GeraRelatorio(){
        if (!file) {
            toast.info("Por favor selecione um arquivo.");
            return;
        }
        setLoadding(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/Wpp', formData)
            .then(response => {
                setLoadding(false);
                navigate("/relatorio/" + response.data.object.id, {replace: true});
            })
            .catch(error => {
                setLoadding(false);
                toast.error('Erro ao processar o arquivo: ' + error);
            });
            
        } catch (error) {
            console.log(error);
            toast.error("There was an error uploading the file!" + error);
        }
    }

    if(loadding)
        return(
            <Loader/>
        )
    else
    return(
        <div className="container">
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
                <p><b>Nota:</b> Apenas são analisadas as últimas 100 mil mensagens mais recentes de cada conversa para garantir eficiência e rapidez no processamento.</p>
                <div className='upload-file'>
                    <input type='file' accept=".zip" onChange={handleFileChange}/>
                    <button onClick={()=> GeraRelatorio()}>Criar Relatório</button>
                </div>
            </div>
        </div>
    )
}