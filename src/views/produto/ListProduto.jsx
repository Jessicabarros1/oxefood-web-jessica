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
        menuFiltro: false,
        codigo: '',
        titulo: '',
        idCategoria: '',
        listaCategoriaProduto: []
 
    }

   componentDidMount = () => {
      
       this.carregarLista();
      
   }
   carregarLista = () => {

    axios.get(ENDERECO_API+ "api/produto")
    .then((response) => {
       
        this.setState({
            listaProduto: response.data
        })
    })
    axios.get(ENDERECO_API + "api/categoriaproduto")
    .then((response) => {

        const dropDownCategorias = [];
        dropDownCategorias.push({ text: '', value: '' });
        response.data.map(c => (
            dropDownCategorias.push({ text: c.descricao, value: c.id })
        ))
     
        this.setState({
            listaCategoriaProduto: dropDownCategorias
        })
    })


};

        handleMenuFiltro = () => {
            this.state.menuFiltro === true ? this.setState({menuFiltro: false}) : this.setState({menuFiltro: true})
        }

        handleChangeCodigo = (e, {value}) => {
            this.setState({
                codigo: value
            }, () => this.filtrarProdutos())
        }

        handleChangeTitulo = (e, {value}) => {
            this.setState({
                titulo: value
            }, () => this.filtrarProdutos())
        }

        handleChangeCategoriaProduto = (e, { value }) => {
            this.setState({
                idCategoria: value,
            }, () => this.filtrarProdutos())
        }
        filtrarProdutos = () => {

            let formData = new FormData();
     
            formData.append('codigo', this.state.codigo);
            formData.append('titulo', this.state.titulo);
            formData.append('idCategoria', this.state.idCategoria);
     
            axios.post(ENDERECO_API + "api/produto/filtrar", formData)
            .then((response) => {
                this.setState({
                    listaProdutos: response.data
                })
            })
       
        }
     

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


                    <Menu compact>
                               <Menu.Item
                                   name='menuFiltro'
                                   active={this.state.menuFiltro === true}
                                   onClick={this.handleMenuFiltro}
                               >
                                   <Icon name='filter' />
                                   Filtrar
                               </Menu.Item>
                           </Menu>

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
                                                <Button
                                                    label='Novo'
                                                    circular
                                                    color='orange'
                                                    icon='clipboard outline'
                                                    floated='right'
                                                    as={Link}
                                                    to='/form-produto'
                                                    />

                                                    { this.state.menuFiltro ?
                                                    <Segment>
                                                        <Form className="form-filtros">
                                                            <Form.Input
                                                                icon="search"
                                                                value={this.state.codigo}
                                                                onChange={this.handleChangeCodigo}
                                                                label='Código do Produto'
                                                                placeholder='Filtrar por Código do Produto'
                                                                labelPosition='left'
                                                                width={4}
                                                            />
                                                                <Form.Group widths='equal'>
                                                                <Form.Input
                                                                icon="search"
                                                                value={this.state.titulo}
                                                                onChange={this.handleChangeTitulo}
                                                                label='Título'
                                                                placeholder='Filtrar por título'
                                                                labelPosition='left'
                                                                />                              
                                                                <Form.Select
                                                                placeholder='Filtrar por Categoria'
                                                                label='Categoria'
                                                                options={this.state.listaCategoriaProduto}
                                                                value={this.state.idCategoria}
                                                                onChange={this.handleChangeCategoriaProduto}
                                                                /> 
                                                            </Form.Group>
                                                        </Form>
                                                    </Segment>:""
}




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
