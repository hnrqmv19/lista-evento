import { useState } from 'react'
import './App.css'

function App(){
    const[nome, setNome] = useState('');
    const[participantes, setParticipantes] = useState([]);
    const[erro, setErro] = useState('');

    function cadastrarParticipante(evento){
        evento.preventDefault();
        if(nome.trim() === ''){
            setErro('Digite um nome antes de cadastrar!');
            return;
        }
        const novoParticipante = {
            id: Date.now(),
            nome: nome.trim()
        };
        setParticipantes([...participantes, novoParticipante]);
        setNome('');
        setErro('');
    }

    function excluirParticipante(id){
        setParticipantes(participantes.filter((participante) => participante.id !== id));
    }

    return(
        <main>
            <h1>Lista de Participantes</h1>
            <p className='Introducao'>Cadastre os visitantes da mostra de tecnologia</p>

            <form onSubmit={cadastrarParticipante}>
                <div className='Campo'>
                    <input
                        id='nome'
                        type='text'
                        placeholder='Digite o nome do participante'
                        value={nome}
                        onChange={(evento) => {
                            setNome(evento.target.value);
                            if(erro) setErro('');
                        }}
                    />
                    <button type='submit'>Cadastrar</button>
                </div>

                {erro && <p className='msgerro'>{erro}</p>}
            </form>

            <section className='resultado'>
                <h2>Participantes registrados ({participantes.length})</h2>

                {participantes.length === 0 ? (
                    <p className='vazio'>Nenhum participante cadastrado ainda.</p>
                ) : (
                    <ul className='listaParticipantes'>
                        {participantes.map((participante, index) => (
                            <li key={participante.id}>
                                <span className='numero'>{String(index + 1).padStart(2, '0')}</span>
                                <span className='nomeParticipante'>{participante.nome}</span>
                                <button
                                    type='button'
                                    className='botaoExcluir'
                                    onClick={() => excluirParticipante(participante.id)}
                                >
                                    Excluir
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default App;