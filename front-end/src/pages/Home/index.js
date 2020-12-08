import React from 'react';
import NoteService from '../../services/NoteService';
import Form from './components/Form';
import ListNotes from './components/ListNotes';
import {Context} from './context';

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            lista: ['Anotacao1', 'Anotacao2', 'Anotacao1', 
                    'Anotacao2', 'Anotacao1', 'Anotacao2', 
                    'Anotacao1', 'Anotacao2Anotacao2Anotacao2Anotacao2Anotacao2', 
                    'Anotacao1', 'Anotacao2'],
        };
        this.getListaAtualizada = this.getListaAtualizada.bind(this);
    }
    
    componentDidMount() { 
        const lista = this.getListaAtualizada();
        this.setState({listaPrincipal:lista});
    }
    
    async getListaAtualizada() {        
        const resposta =  await NoteService.lista();
        const lista = resposta.data;
        return lista;
    }
    
    render() {
        return (
            <>
                <h1 className='text-center bg-yellow py-4'>Web Notes</h1>
                <Context.Provider value={{lista:[...this.state.lista]}}>
                    <div className='container-fluid'>
                        <Form />
                        <ListNotes/>                    
                    </div>
                </Context.Provider>                
            </>
        );
    }
}

export default Home;
