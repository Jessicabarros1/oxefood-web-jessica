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
                                  <Table.HeaderCell>Código Produto</Table.HeaderCell>
                                  <Table.HeaderCell>Descrição</Table.HeaderCell>
                                  <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                  <Table.HeaderCell>Tempo de Entrega Minimo em Minutos</Table.HeaderCell>
                                  <Table.HeaderCell>Tempo de Entrega Maximo em Minutos</Table.HeaderCell>
                        
                                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>
                     
                          <Table.Body>

                              { this.state.listaProduto.map(Produto => (

                                  <Table.Row>
                                      <Table.Cell>{Produto.nome}</Table.Cell>
                                      <Table.Cell>{Produto.CodigodoProduto}</Table.Cell>
                                      <Table.Cell>{Produto.Descricao}</Table.Cell>
                                      <Table.Cell>{Produto.ValorUnitario}</Table.Cell>
                                      <Table.Cell>{Produto.qtdEntregasrealizadas}</Table.Cell>
                                      <Table.Cell>{Produto.TempodeEntregaMinimoemMinutos}</Table.Cell>
                                      <Table.Cell>{Produto.TempodeEntregaMaximoemMinutos}</Table.Cell>

                                      <Table.Cell textAlign='center'>

                                         
                                          <Button
                                              inverted
                                              circular
                                              icon='edit'
                                              color='blue'
                                              itle='Clique aqui para editar os dados deste Produto' /> &nbsp;
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
