<template>
    <div id="app">

        <nav>
            <div class="nav-wrapper blue darken-1">
                <a href="#" class="brand-logo center">Contas a Receber ou Paga FrontEnd</a>
            </div>
        </nav>

        <div class="container">
            <ul>
                <li v-for="(erro, index) of errors" :key="index">
                campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
                </li>
            </ul>
            <form @submit.prevent="salvar">

                <label>Nome</label>
                <input type="text" placeholder="Nome" v-model="conta.nome">
                <label>Valor</label>
                <input type="text" placeholder="Valor" v-model="conta.valor">
                <label>Parcelas</label>
                <input type="number" placeholder="Parcelas" v-model="conta.parcelas">
                <label>Tipo</label>
                <input type="text" placeholder="Pagar ou Receber" v-model="conta.tipo">
                <label>Permantente</label>
                <input type="text" v-model="conta.permanente">
                <label>Data do Vencimento</label>
                <input type="date" v-model="conta.dataVenc">

                <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

            </form>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>TIPO</th>
                        <th>PARCELAS</th>
                        <th>VALOR</th>
                        <th>PERMANENTE</th>
                        <th>DATA VENCIMENTO</th>
                        <th>DATA PAGAMENTO</th>
                        <th>PAGO</th>

                        <th>OPÇÕES</th>
                    </tr>

                </thead>

                <tbody>

                    <tr v-for="conta of contas" :key="conta.id">

                        <td>{{conta.id}}</td>
                        <td>{{conta.nome}}</td>
                        <td>{{conta.tipo}}</td>
                        <td>{{conta.parcelas}}</td>
                        <td>{{conta.valor}}</td>
                        <td>{{conta.permanente}}</td>
                        <td>{{conta.dataVenc}}</td>
                        <td>{{conta.dataPagamento}}</td>
                        <td>{{conta.pago}}</td>
                        <td>
                            <button @click="editar(conta)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
                            <button @click="pagar(conta)" class="waves-effect btn-small green darken-1"><i class="material-icons">attach_money</i></button>
                            <button @click="deletar(conta)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>
</template>

<script>
import Conta from './services/contas'
    export default {
        data() {
            return {
                conta: {
                    id:'',
                    nome: '',
                    valor: '',
                    parcelas: '',
                    tipo: '',
                    dataVenc: '',
                    permanente: '',
                    dataPagamento:''

                },
                contas: [],
                errors: []

            }
        },
        mounted() {

            this.listar()
       
        },

        methods: {

            listar() {//método para listar os produtos
             Conta.listar().then(resposta => {
            
            this.contas = resposta.data
             })
            },

            salvar() {//método para salvar produto do formulário
                if (!this.conta.id) {
                    Conta.salvar(this.conta).then(resposta => {//passa os produtos para a api
                        this.produto = {}//limpa o formulário
                        alert('Conta adicionada com sucesso!')
                        this.listar()//lista os produtos
                    }).catch(e => {//tratando erro de formulario                    
                        this.errors = e.response.data.errors
                    })
                } else {
                    Conta.atualizar(this.conta).then(resposta => {//passa os produtos para a api
                        this.produto = {}//limpa o formulário
                        alert('Conta atualizada com sucesso!')
                        this.listar()//lista os produtos
                    }).catch(e => {//tratando erro de formulario                    
                        this.errors = e.response.data.errors
                    })
                }
            },

            editar(conta) {
                this.conta = conta

            },

            deletar(conta) {
                if (confirm('Deseja excluir o produto?')) {
                    Conta.deletar(conta).then(resposta => {
                        this.listar()
                        this.errors = []
                    }).catch(e => {
                        this.errors = e.response.data.errors
                    })
                }
            },
            pagar(conta) {
                result = prompt('Insira o valor para efetuar o pagamento', 0);
            }
            
        },
        
    }

  
</script>

<style>
</style>
