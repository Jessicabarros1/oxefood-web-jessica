import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListCupom extends React.Component{

   state = {

       listaCupom: []
      
   }

   componentDidMount = () => {
      
       this.carregarLista();
      
   }
   carregarLista = () => {

    axios.get("http://localhost:8082/api/cupomDesconto")
    .then((response) => {
       
        this.setState({
            listaCupom: response.data
        })
    })

};

formatarData = (dataParam) => {

     if (dataParam == null || dataParam == '') {
         return ''
     }
     
     let dia = dataParam.substr(8,2);
     let mes = dataParam.substr(5,2);
     let ano = dataParam.substr(0,4);
     let dataFormatada = dia + '/' + mes + '/' + ano;

     return dataFormatada
 };
 render(){
    return(
        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> Cupom de Desconto </h2>

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
                            <Link to={'/form-cupom'}>Novo</Link>
                        </Button>
                        <br/><br/><br/>
                      
                      <Table color='orange' sortable celled>

                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>codigo de Desconto</Table.HeaderCell>
                                  <Table.HeaderCell>percentual de Desconto</Table.HeaderCell>
                                  <Table.HeaderCell> valor de Desconto</Table.HeaderCell>
                                  <Table.HeaderCell> valor Minimo Pedido Permitido</Table.HeaderCell>
                                  <Table.HeaderCell>quantidade Maxima Uso</Table.HeaderCell>
                                  <Table.HeaderCell>inicio Vigencia</Table.HeaderCell>
                                  <Table.HeaderCell>fim Vigencia</Table.HeaderCell>
                                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>

                          <Table.Body>

                              { this.state.listaCupom.map(cupom => (

                                  <Table.Row>
                                      <Table.Cell>{cupom.codigoDesconto}</Table.Cell>
                                      <Table.Cell>{cupom.percentualDesconto}</Table.Cell>
                                      <Table.Cell>{cupom.valorDesconto}</Table.Cell>
                                      <Table.Cell>{cupom.valorMinimoPedidoPermitido}</Table.Cell>
                                      <Table.Cell>{cupom. quantidadeMaximaUso}</Table.Cell>
                                      <Table.Cell>{this.formatarData(cupom.inicioVigencia)}</Table.Cell>
                                      <Table.Cell>{this.formatarData(cupom. fimVigencia)}</Table.Cell>
                                     
                                      <Table.Cell textAlign='center'>

                                                                
                                          <Button
                                              inverted
                                              circular
                                              icon='edit'
                                              color='blue'
                                              itle='Clique aqui para editar os dados deste cliente' /> &nbsp;
                                          <Button
                                                   inverted
                                                   circular
                                                   icon='trash'
                                                   color='red'
                                                   title='Clique aqui para remover este cliente' />

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

export default ListCupom;

