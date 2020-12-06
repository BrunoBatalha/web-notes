import axios from 'axios';

class NoteService{
    
    constructor(){}

    async adiciona(mensagem) {
        return await axios.post('anotacao', { anotacao: mensagem });
    }
    
    async lista() {
        return await axios.get('anotacao');
    }
    
    async exclui(index) {
        return await axios.delete(`anotacao/:${index}`);
    }
}

export default new NoteService;