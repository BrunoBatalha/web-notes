import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa'
import NoteService from '../../../../services/NoteService';
import {Context} from '../../context';
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
        this.lista = this.lista.bind(this);
        this.exclui = this.exclui.bind(this);
    }
    
    componentDidMount() {        
        this.lista();
    }
    
    async lista(mensagem) {        
        const resposta =  await NoteService.lista();
        const lista = resposta.data;
        // const lista = ['1','2jadnsjdnjasndjanjsdnajdsndjanjsdnjanjsnjdandjsndas','3',4,6,7,8,9,10];
        console.log(lista)
        this.setState({...this.state, mensagem: mensagem, listaPrincipal:lista});
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

    async exclui(note) {
        // const {listaAnotacoes} = useContext(Context);
        // console.log(listaAnotacoes);
        let index = -1;
        this.state.listaPrincipal.forEach((e,i)=>{
            if(e===note) index = i;
        })
        await NoteService.exclui(index);
    }

    render() {
        return (
            <React.Fragment>
                <div className='row' id="listNotes">
                    <div className='col-12 pt-2'>
                        <h4 className='w-100 text-uppercase'>Anotações</h4>
                        <div className="row p-2">
                            
                            <ul className="col-6 col-lg-3 lista-anotacoes">
                                {this.state.lista1.map((note,i)=>
                                    <li key={i} className='my-2'>
                                        <div className='anotacao h-100 '>
                                            <div className='opcoes'>
                                                <button className='btn btn-outline'
                                                    onClick={e => this.exclui(note)}>
                                                    <FaTrash fontSize='1.2rem' />
                                                </button>
                                            </div>
                                            <div className='nota'>{note}</div>
                                        </div>
                                    </li>                                                
                                )}
                            </ul>
                            
                            <ul className="col-6 col-lg-3 lista-anotacoes">
                                {this.state.lista2.map((note,i)=>
                                    <li key={i} className='my-2'>
                                        <div className='anotacao h-100 '>
                                            <div className='opcoes'>
                                                <button className='btn btn-outline'
                                                    onClick={e => this.exclui(note)}>
                                                    <FaTrash fontSize='1.2rem' />
                                                </button>
                                            </div>
                                            <div className='nota'>{note}</div>
                                        </div>
                                    </li>                                
                                )}
                            </ul>
                            
                            <ul className="col-6 col-lg-3 lista-anotacoes">
                                {this.state.lista3.map((note,i)=>
                                    <li key={i} className='my-2'>
                                        <div className='anotacao h-100 '>
                                            <div className='opcoes'>
                                                <button className='btn btn-outline'
                                                    onClick={e => this.exclui(note)}>
                                                    <FaTrash fontSize='1.2rem' />
                                                </button>
                                            </div>
                                            <div className='nota'>{note}</div>
                                        </div>
                                    </li>                               
                                )}
                            </ul>
                            
                            <ul className="col-6 col-lg-3 lista-anotacoes">
                                {this.state.lista4.map((note,i)=>
                                    <li key={i} className='my-2'>
                                        <div className='anotacao h-100 '>
                                            <div className='opcoes'>
                                                <button className='btn btn-outline'
                                                    onClick={e => this.exclui(note)}>
                                                    <FaTrash fontSize='1.2rem' />
                                                </button>
                                            </div>
                                            <div className='nota'>{note}</div>
                                        </div>
                                    </li>                                  
                                )}
                            </ul>

                        </div>
                        {/* <ul className='pl-3 lista-anotacoes'>
                            {this.state.listaPrincipal.map((note, i) =>
                                <li key={i} className='col-lg-3 col-12 my-2'>
                                    <div className='anotacao h-100 '>
                                        <div className='opcoes'>
                                            <button className='btn btn-outline'
                                                onClick={e => this.exclui(i)}>
                                                <FaTrash fontSize='1.2rem' />
                                            </button>
                                        </div>
                                        <div className='nota'>{note}</div>
                                    </div>
                                </li>
                            )}
                        </ul> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ListNotes;