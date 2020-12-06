import React from 'react';
import NoteService from '../../../../services/NoteService';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anotacao: '',
            mensagem: 'Talvez você já tenha feito alguma anotação, tente recarregar a lista',
            MAX_CARACTERES: 200
        };
        this.controlaInput = this.controlaInput.bind(this);
        this.controlaSubmit = this.controlaSubmit.bind(this);
    }

    controlaInput(event) {
        const qntCarateres = event.target.value.length
        this.setState({ mensagem: 'Caracteres: ' + qntCarateres + ' de ' + this.state.MAX_CARACTERES });
        if (qntCarateres >= this.state.MAX_CARACTERES) {
            this.setState({ mensagem: 'Máximo de ' + this.state.MAX_CARACTERES + ' caracteres' });
        } else {
            this.setState({ anotacao: event.target.value });
        }
    }

    async controlaSubmit(event) {
        event.preventDefault();
        if (this.state.anotacao.trim() === '') {
            this.setState({ ...this.state, mensagem: 'Você não anotou nada'});
        } else {
            this.setState({  anotacao: '' });
            await NoteService.adiciona(this.state.anotacao);
        }
    }


    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
export default Form;