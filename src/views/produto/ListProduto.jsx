import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import { ENDERECO_API } from '../../util/ENDERECO_API';

class ListProduto extends React.Component{

   
    state = {
        openModal: false,
        idRemover: null,
        listaClientes: []

    }

   componentDidMount = () => {
      
       this.carregarLista();
      
   }
   carregarLista = () => {

    axios.get("http://localhost:8082/api/Produto")
    .then((response) => {
       
        this.setState({
            listaProduto: response.data
        })
    })

};
    confirmaRemover = (id) => {

        this.setState({
            openModal: true,
            idRemover: id
            })  
        
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

                 
     setOpenModal = (val) => {

        this.setState({
            openModal: val
        })

    };
     
 render(){
    return(
        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> Produto </h2>

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
                            <Link to={'/form-Produto'}>Novo</Link>
                        </Button>
                        <br/><br/><br/>
                      
                      <Table color='orange' sortable celled>

                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Título</Table.HeaderCell>
                                  <Table.HeaderCell>Código</Table.HeaderCell>
                                  <Table.HeaderCell>Categoria</Table.HeaderCell>
                                 <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                  <Table.HeaderCell>Tempo de Entrega Minimo</Table.HeaderCell>
                                  <Table.HeaderCell>Tempo de Entrega Maximo</Table.HeaderCell>
                        
                                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>
                     
                          <Table.Body>

                              { this.state.listaProduto.map(produto => (

                                  <Table.Row>
                                      <Table.Cell>{produto.titulo}</Table.Cell>
                                      <Table.Cell>{produto.codigo}</Table.Cell>
                                      <Table.Cell>{produto.categoria.descricao}</Table.Cell>
                                      <Table.Cell>{produto.descricao}</Table.Cell>
                                      <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                      <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                      <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>

                                      <Table.Cell textAlign='center'>
                                            <Button
                                                   inverted
                                                   circular
                                                   color='green'
                                                        title='Clique aqui para editar os dados deste Produto'
                                                        icon>
                                                            <Link to="/form-Produto" state={{id: produto.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;
                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este cliente'
                                                    icon
                                                    onClick={e => this.confirmaRemover(produto.id)}>
                                                    <Icon name='trash' />
                                                </Button>

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

export default ListProduto;
