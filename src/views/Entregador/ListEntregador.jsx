import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListEntregador extends React.Component{

   
    state = {
        openModal: false,
        idRemover: null,
        listaClientes: []

    }

   componentDidMount = () => {
      
       this.carregarLista();
      
   }
   carregarLista = () => {

    axios.get("http://localhost:8082/api/Entregador")
    .then((response) => {
       
        this.setState({
            listaEntregador: response.data
        })
    })

};

formatarData = (dataParam) => {

     if (dataParam === null || dataParam ==='') {
         return ''
     }
     
     let dia = dataParam.substr(8,2);
     let mes = dataParam.substr(5,2);
     let ano = dataParam.substr(0,4);
     let dataFormatada = dia + '/' + mes + '/' + ano;

     return dataFormatada
 };

    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
            })  
            setOpenModal = (val) => {

                this.setState({
                    openModal: val
                })
        
            };
        
        }

        remover = async () => {

            await axios.delete(ENDERECO_API + 'api/cliente/' + this.state.idRemover)
            .then((response) => {
       
                this.setState({ openModal: false })
                console.log('Cliente removido com sucesso.')
       
                axios.get(ENDERECO_API + "api/cliente")
                .then((response) => {
               
                    this.setState({
                        listaClientes: response.data
                    })
                })
            })
            .catch((error) => {
                this.setState({  openModal: false })
                console.log('Erro ao remover um cliente.')
            })
     };
     
 
 render(){
    return(
        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Button
                            inverted
                            circular
                            icon
                            labelPosition='left'
                            color='orange'
                            floated='right'
                        >
                            <Icon name='clipboard outline' />
                            <Link to={'/form-Entregador'}>Novo</Link>
                        </Button>
                        <br/><br/><br/>
                      
                      <Table color='orange' sortable celled>

                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Nome</Table.HeaderCell>
                                  <Table.HeaderCell>CPF</Table.HeaderCell>
                                  <Table.HeaderCell>Rg</Table.HeaderCell>
                                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                  <Table.HeaderCell>Quantidade de Entregas Realizadas</Table.HeaderCell>
                                  <Table.HeaderCell>Rua</Table.HeaderCell>
                                  <Table.HeaderCell>Rua</Table.HeaderCell>
                                  <Table.HeaderCell>Número</Table.HeaderCell>
                                  <Table.HeaderCell>Bairro</Table.HeaderCell>
                                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                                  <Table.HeaderCell>CEP</Table.HeaderCell>
                                  <Table.HeaderCell>UF</Table.HeaderCell>
                                  <Table.HeaderCell>Complemento</Table.HeaderCell>
                                  <Table.HeaderCell>Ativo</Table.HeaderCell>

                                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>
                     
                          <Table.Body>

                              { this.state.listaEntregador.map(Entregador => (

                                  <Table.Row>
                                      <Table.Cell>{Entregador.nome}</Table.Cell>
                                      <Table.Cell>{Entregador.cpf}</Table.Cell>
                                      <Table.Cell>{this.formatarData(Entregador.dataNascimento)}</Table.Cell>
                                      <Table.Cell>{Entregador.foneCelular}</Table.Cell>
                                      <Table.Cell>{Entregador.foneFixo}</Table.Cell>
                                      <Table.Cell>{Entregador.qtdEntregasrealizadas}</Table.Cell>
                                      <Table.Cell>{Entregador.EnderecoRua}</Table.Cell>
                                      <Table.Cell>{Entregador.Endereconumero}</Table.Cell>
                                      <Table.Cell>{Entregador.Enderecobairro}</Table.Cell>
                                      <Table.Cell>{Entregador.Enderecocidade}</Table.Cell>
                                      <Table.Cell>{Entregador.EnderecoCep}</Table.Cell>
                                      <Table.Cell>{Entregador.EnderecoUf}</Table.Cell>
                                      <Table.Cell>{Entregador.EnderecoComplemento}</Table.Cell>
                                      <Table.Cell>{Entregador.Ativo}</Table.Cell>
                                      <Table.Cell textAlign='center'>
                                    
                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    icon
                                                    onClick={e => this.confirmaRemover(Entregador.id)}>
                                                    <Icon name='trash' />
                                                </Button>

                                                <Button
                                                        inverted
                                                        circular
                                                        color='green'
                                                        title='Clique aqui para editar os dados deste entregador'
                                                        icon>
                                                            <Link to="/form-entregador" state={{id:Entregador.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;
                                     </Table.Cell>
                                 </Table.Row>
                                   ))}

                               </Table.Body>
                           </Table>
                       </div>
                   </Container>
                   <Modal
                            basic
                            onClose={() => this.setOpenModal(false)}
                            onOpen={() => this.setOpenModal(true)}
                            open={this.state.openModal}
                        >
                            <Header icon>
                                    <Icon name='trash' />
                                    <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
                            </Header>
                            <Modal.Actions>
                                    <Button basic color='red' inverted onClick={() => this.setOpenModal(false)}>
                                        <Icon name='remove' /> Não
                                    </Button>
                                    <Button color='green' inverted onClick={() => this.remover()}>
                                        <Icon name='checkmark' /> Sim
                                    </Button>
                            </Modal.Actions>
                        </Modal>
               </div>
           </div>
       )
   }
}

export default ListEntregador;
