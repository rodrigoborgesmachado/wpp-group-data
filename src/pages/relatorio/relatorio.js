import './relatorio.css';
import DadosRelatorioItem from '../../components/dadosItemRelatorio/dadosItemRelatorio';
import BasicPie from '../../components/chartPie/chartPie.js';
import QuadradoInfo from '../../components/quadradoInfo/quadradoInfo.js';
import { BasicBars, GayBasicBars } from '../../components/chartBar/chartBar.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loader from '../../components/loader/loader';

export default function Relatorio(){
    const{filtro} = useParams();
    const [relatorio, setRelatorio] = useState(null);
    const [loadding, setLoadding] = useState(true);

    async function GetDate(id){
        api.get('/Wpp?id=' + id + '&type=1')
        .then(response => {
            setRelatorio(response.data.object);
            setLoadding(false);
        });
    }

    useEffect(() => {
        GetDate(filtro);
    }, [filtro]);

    function criaInformacoesMensagensPorUsuarioPie(){
        var itens = new Array();
        var i = 0;
        relatorio.dados.forEach(element => {
            itens.push({
                id: i,
                value: element.qtMensagens,
                label: element.nome + ' - ' + element.qtMensagens
            })
            i++;
        });

        return itens;
    }

    function criaInformacoesMensagensPorUsuarioUltimos30DiasBars(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtUltimos30Dias);
        });

        return itens;
    }

    function criaInformacoesMensagensRacistasPorUsuarioBars(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtMsgRacistas);
        });

        return itens;
    }

    function criaInformacoesMensagensGordofobicasPorUsuarioBars(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtMsgGordofobicas);
        });

        return itens;
    }

    function criaInformacoesMensagensHomofobicasPorUsuarioBars(){
        var itens = new Array();

        var i = 0;
        relatorio.dados.forEach(element => {
            itens.push({
                data: [element.qtMsgHomofobica],
                label: element.nome
            })
            i++;
        });

        return itens;
    }

    function criaInformacoesQuantidadeCaracteresBars(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtCaracteres);
        });

        return itens;
    }

    function criaInformacoesFinalDeSemana(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtMensagensFds);
        });

        return itens;
    }

    function criaInformacoesDuranteSemana(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.qtMensagensDuranteSemana);
        });

        return itens;
    }

    function criaNomesBars(){
        var itens = new Array();

        relatorio.dados.forEach(element => {
            itens.push(element.nome);
        });

        return itens;
    }

    if(loadding)
        return(
            <Loader/>
        )
    else
    return(
        <div className='container'>
            <div className='titulo'>
                <h1>Análise Detalhada das Interações do Grupo</h1>
                <h3>Confira uma análise completa e detalhada das dinâmicas de interação no seu grupo de WhatsApp.</h3>
            </div>
            <div className='relatorio-sessao'>
                <h2>Destaques</h2>
                <div className='relatorio-sessao-itens'>
                    <div className='relatorio-sessao-destaques'>
                        <QuadradoInfo descricao={"Tagarela"} nome={relatorio.topMensagens}/>
                        <QuadradoInfo descricao={"Herdeiro"} nome={relatorio.topHorarioComercial}/>
                        <QuadradoInfo descricao={"Testemunha de Jeová"} nome={relatorio.topTestemunhaGeova}/>
                        <QuadradoInfo descricao={"Palestrinha"} nome={relatorio.topCaracteres}/>
                    </div>
                    <div className='relatorio-sessao-destaques'>
                        <QuadradoInfo descricao={"Racista"} nome={relatorio.topRacista}/>
                        <QuadradoInfo descricao={"Homofóbico"} nome={relatorio.topHomofobico}/>
                        <QuadradoInfo descricao={"Gordofóbico"} nome={relatorio.topGordofobico}/>
                    </div>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Mais ativos do grupo</h2>
                <div className='relatorio-sessao-itens'>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas:'} quantidade={relatorio.topMensagens}/>
                    <DadosRelatorioItem mensagem={'Integrante com menos mensagens enviadas:'} quantidade={relatorio.menosMensagens}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais caracteres digitados:'} quantidade={relatorio.topCaracteres}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas durante a semana:'} quantidade={relatorio.topDuranteSemana}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas durante o fim de semana:'} quantidade={relatorio.topFds}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas durante o horário comercial:'} quantidade={relatorio.topHorarioComercial}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas durante a madrugada:'} quantidade={relatorio.topMadrugada}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas últimos 30 dias:'} quantidade={relatorio.topUltimos30Dias}/>
                    <DadosRelatorioItem mensagem={'Integrante com mais mensagens enviadas das 6 às 8:'} quantidade={relatorio.topTestemunhaGeova}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens por integrante:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicPie dados={criaInformacoesMensagensPorUsuarioPie()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens por integrante nos últimos 30 dias:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesMensagensPorUsuarioUltimos30DiasBars()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens enviadas nos finais de semana:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesFinalDeSemana()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens enviadas durante a semana:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesDuranteSemana()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de caracteres digitados:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesQuantidadeCaracteresBars()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens racistas:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesMensagensRacistasPorUsuarioBars()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens gordofóbicas:</h2>
                <div className='relatorio-sessao-itens'>
                    <BasicBars nomes={criaNomesBars()} dados={criaInformacoesMensagensGordofobicasPorUsuarioBars()}/>
                </div>
            </div>
            <div className='relatorio-sessao'>
                <h2>Quantidade de mensagens homofóbicas:</h2>
                <div className='relatorio-sessao-itens'>
                    <GayBasicBars nomes={criaNomesBars()} dados={criaInformacoesMensagensHomofobicasPorUsuarioBars()}/>
                </div>
            </div>
        </div>
    )
}
