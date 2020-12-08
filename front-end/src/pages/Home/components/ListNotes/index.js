import React from 'react';
import {Context} from '../../context';
import NoteService from '../../../../services/NoteService';
import ColumnListNotes from './components/ColumnListNotes';
import './style.css';

class ListNotes extends React.Component {

    constructor(props) {        
        super(props);
        this.state ={ 
            listaPrincipal:['1','2','3',4,6,7,8,9,10] ,
            lista1: [],
            lista2: [],
            lista3: [],
            lista4: [],
        };
        this.separaListas = this.separaListas.bind(this);
    }
    
    componentDidMount() { 
        console.log(this.context.lista)
        const lista = this.context.lista
        this.separaListas(lista);
    }
    
    separaListas(lista) {        
        this.setState({
            listaPrincipal: lista
        });
        if(lista.length != 0){
            const ifObj = {
                contador: 1,
                1:(novaNota,ifObjRef)=>{
                    this.setState({...this.state,lista1: [...this.state.lista1, novaNota]});
                    ifObjRef.contador = 2;
                },
                2:(novaNota,ifObjRef)=>{
                    this.setState({...this.state,lista2: [...this.state.lista2, novaNota]});
                    ifObjRef.contador = 3;
                },
                3:(novaNota,ifObjRef)=>{
                    this.setState({...this.state,lista3: [...this.state.lista3, novaNota]});
                    ifObjRef.contador = 4;
                },
                4:(novaNota,ifObjRef)=>{
                    this.setState({...this.state,lista4: [...this.state.lista4, novaNota]});
                    ifObjRef.contador = 1;
                },
            }    
            lista.forEach((nota) => {
                ifObj[ifObj.contador](nota,ifObj);
            });
        }
    }    

    render() {
        return (
            <React.Fragment>
                <div className='row' id="listNotes">
                    <div className='col-12 pt-2'>
                        <h4 className='w-100 text-uppercase'>Anotações</h4>
                        <div className="row p-2">
                            <ColumnListNotes lista={this.state.lista1} />
                            <ColumnListNotes lista={this.state.lista2} />
                            <ColumnListNotes lista={this.state.lista3} />
                            <ColumnListNotes lista={this.state.lista4} />                            
                        </div>                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
ListNotes.contextType = Context;
export default ListNotes;