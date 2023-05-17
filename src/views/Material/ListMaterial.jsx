import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';

class ListMaterial extends React.Component{

   state = {

       listaMaterial: []
      
   }

   componentDidMount = () => {
      
       this.carregarLista();
      
   }
   carregarLista = () => {

    axios.get("http://localhost:8082/api/Material")
    .then((response) => {
       
        this.setState({
            listaMaterial: response.data
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

                    <h2> Material </h2>

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
                            <Link to={'/form-Material'}>Novo</Link>
                        </Button>
                        <br/><br/><br/>
                      
                      <Table color='orange' sortable celled>

                          <Table.Header>
                              <Table.Row>
                                  <Table.HeaderCell>Titulo</Table.HeaderCell>
                                  <Table.HeaderCell>Valor</Table.HeaderCell>
                                  <Table.HeaderCell>Responsável</Table.HeaderCell>
                                  <Table.HeaderCell>Localização</Table.HeaderCell>
                                  <Table.HeaderCell>Peso</Table.HeaderCell>
                                  <Table.HeaderCell>Data de Aquisição</Table.HeaderCell>
                                  <Table.HeaderCell textAlign='center' width={2}>Ações</Table.HeaderCell>
                              </Table.Row>
                          </Table.Header>
                     
                          <Table.Body>

                              { this.state.listaMaterial.map(Material => (

                                  <Table.Row>
                                      <Table.Cell>{Material.titulo}</Table.Cell>
                                      <Table.Cell>{Material.valor}</Table.Cell>
                                      <Table.Cell>{Material.responsavel}</Table.Cell>
                                      <Table.Cell>{Material.localizacao}</Table.Cell>
                                      <Table.Cell>{Material.Peso}</Table.Cell>
                                      <Table.Cell>{this.formatarData(Material.dataAquisicao)}</Table.Cell>
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

export default ListMaterial;

