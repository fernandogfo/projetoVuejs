import { http } from './config'

export default {

    listar: () => {

        return http.get('receber/contas')

    },

    salvar: (conta) => {
        
        return http.post('receber/conta', conta)
    },

    atualizar: (conta) => {
        return http.put('receber/conta', conta)
    },

    deletar: (conta) => {
        return http.delete('receber/conta', {data: conta})
    }
}