import React from "react";
import { FaTrash } from "react-icons/fa";
import NoteService from "../../../../../../services/NoteService";
import "./style.css";

export default function ColumnListNotes({lista}){
    
    async function exclui(note) {
        // const {listaAnotacoes} = useContext(Context);
        // console.log(listaAnotacoes);
        let index = -1;
        this.state.listaPrincipal.forEach((e,i)=>{
            if(e===note) index = i;
        })
        await NoteService.exclui(index);
    }
    
    return(
        <ul className="col-6 col-lg-3" id="ColumnListNotes">
            {lista.map((note,i)=>
                <li key={i} className='my-2'>
                    <div className='anotacao h-100 '>
                        <div className='opcoes'>
                            <button className='btn btn-outline'
                                onClick={e => exclui(note)}>
                                <FaTrash fontSize='1.2rem' />
                            </button>
                        </div>
                        <div className='nota'>{note}</div>
                    </div>
                </li>                                                
            )}
        </ul>
    )
}