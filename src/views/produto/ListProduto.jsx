import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListProduto extends React.Component{

   state = {

       listaProduto: []
      
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
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este Produto' />

                                           </Table.Cell>
                                       </Table.Row>
                                   ))}

                               </Table.Body>
                           </Table>
                       </div>
                   </Container>
               </div>
           </div>
       )
   }
}

export default ListProduto;
