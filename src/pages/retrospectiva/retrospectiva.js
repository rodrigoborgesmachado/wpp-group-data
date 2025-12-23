import './retrospectiva.css';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api.js';
import Loader from '../../components/loader/loader';

function formatNumber(value) {
    if (value === null || value === undefined) return '0';
    return new Intl.NumberFormat('pt-BR').format(value);
}

function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

function formatDateOnly(value) {
    if (!value) return '-';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
    });
}

function formatHour(value) {
    if (value === null || value === undefined) return '-';
    return `${String(value).padStart(2, '0')}h`;
}

function formatDuration(seconds) {
    if (seconds === null || seconds === undefined) return '-';
    const total = Math.max(0, Math.round(seconds));
    if (total < 60) return `${total}s`;
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours}h ${remMins}m`;
}

function buildRanking(items, getValue) {
    if (!Array.isArray(items) || items.length === 0) return [];
    const max = Math.max(...items.map(getValue), 1);
    return items.map((item) => ({
        ...item,
        percent: Math.round((getValue(item) / max) * 100),
    }));
}

export default function Retrospectiva() {
    const { filtro } = useParams();
    const [retrospectiva, setRetrospectiva] = useState(null);
    const [loadding, setLoadding] = useState(true);

    useEffect(() => {
        api.get(`/Wpp?id=${filtro}&type=2`)
            .then((response) => {
                setRetrospectiva(response.data.object);
                setLoadding(false);
            });
    }, [filtro]);

    const topDias = useMemo(
        () => buildRanking(retrospectiva?.topDias, (item) => item.quantidade),
        [retrospectiva]
    );
    const topHoras = useMemo(
        () => buildRanking(retrospectiva?.topHoras, (item) => item.quantidade),
        [retrospectiva]
    );
    const topEmojis = useMemo(
        () => buildRanking(retrospectiva?.topEmojis, (item) => item.quantidade),
        [retrospectiva]
    );
    const topPalavras = useMemo(
        () => buildRanking(retrospectiva?.topPalavras, (item) => item.quantidade),
        [retrospectiva]
    );

    if (loadding) return <Loader />;

    return (
        <div className='container retro-container'>
            <section className='retro-hero'>
                <div className='retro-hero-text'>
                    <span className='retro-kicker'>Retrospectiva do grupo</span>
                    <h1>As melhores memorias e os momentos mais falados</h1>
                    <p className='retro-range'>
                        De {formatDate(retrospectiva.inicio)} ate {formatDate(retrospectiva.fim)}
                    </p>
                    <div className='retro-actions'>
                        <Link className='retro-link' to={`/relatorio/${filtro}`}>
                            Ver relatorio completo
                        </Link>
                    </div>
                </div>
                <div className='retro-hero-card'>
                    <div className='retro-hero-stat'>
                        <p>Total de mensagens</p>
                        <strong>{formatNumber(retrospectiva.totalMensagens)}</strong>
                    </div>
                    <div className='retro-hero-stat'>
                        <p>Dias ativos</p>
                        <strong>{formatNumber(retrospectiva.diasAtivos)}</strong>
                    </div>
                    <div className='retro-hero-stat'>
                        <p>Media por dia</p>
                        <strong>{formatNumber(Number(retrospectiva.mediaMensagensPorDia || 0).toFixed(1))}</strong>
                    </div>
                </div>
            </section>

            <section className='retro-grid'>
                <div className='retro-highlight'>
                    <h3>Dia mais movimentado</h3>
                    <p>{retrospectiva.diaMaisMovimentado || '-'}</p>
                </div>
                <div className='retro-highlight'>
                    <h3>Hora mais ativa</h3>
                    <p>{retrospectiva.horaMaisAtiva || '-'}</p>
                </div>
                <div className='retro-highlight'>
                    <h3>Puxador de role</h3>
                    <p>{retrospectiva.puxadorDeRole || '-'}</p>
                </div>
                <div className='retro-highlight'>
                    <h3>Responde mais rapido</h3>
                    <p>{retrospectiva.respondeMaisRapido || '-'}</p>
                </div>
            </section>

            <section className='retro-panels'>
                <div className='retro-panel'>
                    <div className='retro-panel-title'>
                        <h2>Top dias</h2>
                        <span>Os dias com mais conversas</span>
                    </div>
                    <div className='retro-ranking'>
                        {topDias.map((item) => (
                            <div className='retro-rank-row' key={`dia-${item.dia}`} style={{ '--bar': `${item.percent}%` }}>
                                <span>{formatDateOnly(item.dia)}</span>
                                <strong>{formatNumber(item.quantidade)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='retro-panel'>
                    <div className='retro-panel-title'>
                        <h2>Top horas</h2>
                        <span>Quando o grupo esta pegando fogo</span>
                    </div>
                    <div className='retro-ranking'>
                        {topHoras.map((item) => (
                            <div className='retro-rank-row' key={`hora-${item.hora}`} style={{ '--bar': `${item.percent}%` }}>
                                <span>{formatHour(item.hora)}</span>
                                <strong>{formatNumber(item.quantidade)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='retro-panels'>
                <div className='retro-panel'>
                    <div className='retro-panel-title'>
                        <h2>Top emojis</h2>
                        <span>As reacoes mais usadas</span>
                    </div>
                    <div className='retro-ranking'>
                        {topEmojis.map((item) => (
                            <div className='retro-rank-row' key={`emoji-${item.item}`} style={{ '--bar': `${item.percent}%` }}>
                                <span>{item.item}</span>
                                <strong>{formatNumber(item.quantidade)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='retro-panel'>
                    <div className='retro-panel-title'>
                        <h2>Top palavras</h2>
                        <span>Os termos que dominaram o papo</span>
                    </div>
                    <div className='retro-ranking'>
                        {topPalavras.map((item) => (
                            <div className='retro-rank-row' key={`palavra-${item.item}`} style={{ '--bar': `${item.percent}%` }}>
                                <span>{item.item}</span>
                                <strong>{formatNumber(item.quantidade)}</strong>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='retro-people'>
                <div className='retro-panel-title'>
                    <h2>Pessoas em destaque</h2>
                    <span>Resumo rapido por integrante</span>
                </div>
                <div className='retro-people-grid'>
                    {(retrospectiva.pessoas || []).map((pessoa) => (
                        <article className='retro-person' key={pessoa.nome}>
                            <h3>{pessoa.nome}</h3>
                            <div className='retro-person-metrics'>
                                <div>
                                    <span>Mensagens</span>
                                    <strong>{formatNumber(pessoa.totalMensagens)}</strong>
                                </div>
                                <div>
                                    <span>Dias ativos</span>
                                    <strong>{formatNumber(pessoa.diasAtivos)}</strong>
                                </div>
                                <div>
                                    <span>Propostas de role</span>
                                    <strong>{formatNumber(pessoa.propostasDeRole)}</strong>
                                </div>
                                <div>
                                    <span>Tempo medio de resposta</span>
                                    <strong>{formatDuration(pessoa.tempoMedioRespostaSegundos)}</strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
