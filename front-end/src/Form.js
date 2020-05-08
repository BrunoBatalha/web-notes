import React from 'react';
import { FaTrash, FaChevronDown } from 'react-icons/fa'
import axios from 'axios';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anotacao: '',
            lista: ['Anotacao1', 'Anotacao2', 'Anotacao1', 'Anotacao2', 'Anotacao1',
                'Anotacao2', 'Anotacao1', 'Anotacao2Anotacao2Anotacao2Anotacao2Anotacao2', 'Anotacao1', 'Anotacao2'],
            mensagem: 'Talvez você já tenha feito alguma anotação, tente recarregar a lista',
            MAX_CARACTERE: 200
        };
        this.controlaInput = this.controlaInput.bind(this);
        this.controlaSubmit = this.controlaSubmit.bind(this);
        this.lista = this.lista.bind(this);
        this.adiciona = this.adiciona.bind(this);
        this.exclui = this.exclui.bind(this);
        this.atualizaListaNaTela = this.atualizaListaNaTela.bind(this);
    }

    controlaInput(event) {
        const qntCarateres = event.target.value.length
        this.setState({ mensagem: 'Caracteres: ' + qntCarateres + ' de ' + this.state.MAX_CARACTERE });
        if (qntCarateres >= this.state.MAX_CARACTERE) {
            this.setState({ mensagem: 'Máximo de ' + this.state.MAX_CARACTERE + ' caracteres' });
        } else {
            this.setState({ anotacao: event.target.value });
        }
    }

    controlaSubmit(event) {
        event.preventDefault();
        if (this.state.anotacao.trim() === '') {
            this.setState({ mensagem: 'Você não anotou nada', anotacao: '' });
        } else {
            this.setState({ anotacao: '' });
            this.adiciona();
        }
    }

    componentDidMount() {
        this.atualizaListaNaTela();
    }

    async adiciona() {
        const resposta = await axios.post('/enviar', { anotacao: this.state.anotacao });
        if (resposta.status === 200) this.atualizaListaNaTela(resposta.data.resposta);
    }

    async lista() {
        return await (await axios.post('anotacoes')).data.resultado
    }

    async atualizaListaNaTela(mensagem) {
        this.setState({
            mensagem: mensagem,
            lista: await this.lista()
        });
    }

    async exclui(index) {
        const novaLista = await (await axios.get(`/excluir/:${index}`)).data.novaLista;
        this.setState({ lista: novaLista })
    }

    render() {
        return (
            <>
                <div className='row'>
                    <form onSubmit={this.controlaSubmit} className='col-12'>
                        <div className='form-group row'>
                            <h3 className='col-12 col-lg-3 text-uppercase d-flex align-items-center'>Faça sua anotação</h3>
                            <div className="col-12 col-lg-6">
                                <input className='form-control w-100 h-100'
                                    type='text'
                                    name='anotacao'
                                    value={this.state.anotacao}
                                    onChange={this.controlaInput}/>
                            </div>
                            <div className="col-12 col-lg-3 pt-3 pt-lg-0">
                                <input className='btn btn-secondary w-100  text-uppercase'
                                    type='submit'
                                    value='Salvar anotação'
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </div>
                            <div className='col-12 pt-3 pt-lg-0'>
                                <p className='mensagem' style={{ fontSize: '.8rem' }}>{this.state.mensagem}</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='row'>
                    <div className='col-12 pt-2'>
                        <h4 className='w-100 text-uppercase'>Anotações</h4>
                        <ul className='pl-3'>
                            {this.state.lista.map((note, i) =>
                                <li key={i} className='col-lg-4 col-12 my-2'>
                                    <div className='anotacao  h-100 '>
                                        <div className='grampo'></div>
                                        <div className='opcoes'>
                                            <button className='btn btn-outline'
                                                onClick={e => this.exclui(i)}>
                                                <FaTrash fontSize='1.2rem' />
                                            </button>
                                            {/* <button className='btn btn-outline'
                                        onClick={}>
                                            <FaChevronDown />
                                        </button> */}
                                        </div>
                                        <div className='nota'>{note}</div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </>

        );
    }
}
export default Form;