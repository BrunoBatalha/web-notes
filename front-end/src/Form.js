import React from 'react';
import axios from 'axios';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anotacao: '',
            lista: [],
            mensagem: 'Talvez você já tenha feito alguma anotação, tente recarregar a lista',
            MAX_CARACTERE: 200
        };
        this.controlaInput = this.controlaInput.bind(this);
        this.controlaSubmit = this.controlaSubmit.bind(this);
        this.listaAnotacoes = this.listaAnotacoes.bind(this);
        this.atualizaListaNaTela = this.atualizaListaNaTela.bind(this);
        this.recarregarLista = this.recarregarLista.bind(this);
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
            this.enviaAnotacao();
        }
    }

    async enviaAnotacao() {
        try {
            const respostaEnvia =
                await axios.post('/enviar', { anotacao: this.state.anotacao })
                    .then(response => {
                        return response;
                    });
            if (respostaEnvia.status === 200) {
                this.atualizaListaNaTela(respostaEnvia.data.resposta);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    async listaAnotacoes() {
        try {
            const response = await axios.post('anotacoes').then(response => {
                return response;
            });
            return response.data.resultado;
        } catch (err) {
            return err
        }
    }

    async atualizaListaNaTela(mensagem) {
        this.setState({ mensagem: mensagem, lista: await this.listaAnotacoes() });
    }

    recarregarLista() {
        this.atualizaListaNaTela('Lista atualizada');
    }

    render() {
        return (
            <>
                <div className='col-12 col-lg-5'>

                    <hr className='linha-horizontal'></hr>

                    <form onSubmit={this.controlaSubmit}>
                        <h4 className='text-center w-100 text-uppercase'>Faça sua anotação</h4>
                        <div className='col-9 col-sm-7 col-lg-12 mx-auto d-flex justify-content-center'>
                            <textarea className='texto-area form-control' type='text' name='anotacao' value={this.state.anotacao} onChange={this.controlaInput}></textarea>
                        </div>
                        <div className='col-12 pt-3 d-flex justify-content-center justify-content-lg-start'>
                            <input className='btn btn-primary' type='submit' value='Salvar anotação' />
                            <input className='btn btn-primary mx-2' type='button' value='Recarregar lista' onClick={this.recarregarLista} />
                        </div>
                        <div className='col-12 pt-3'>
                            <p className='mensagem'>
                                {this.state.mensagem}
                            </p>
                        </div>
                    </form>
                </div>

                <div className='col-12 col-lg-7'>
                    <hr className='linha-horizontal'></hr>

                    <div className='col-12 pt-2'>
                        <h4 className='text-center w-100 text-uppercase'>Anotações</h4>
                        <ul className='pl-3'>
                            {this.state.lista.map((note, i) =>
                                <li key={i} className='anotacao'>
                                    <div className='grampo'></div>
                                    <div><pre>{note}</pre></div>
                                </li>)}
                        </ul>
                    </div>
                </div>
            </>

        );
    }
}
//<input type='text' name='anotacao' value={this.state.anotacao} onChange={this.controlaInput} />
export default Form;