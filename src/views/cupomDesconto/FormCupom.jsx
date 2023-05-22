import axios from "axios";
import React from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

class FormCupom extends React.Component{
	state = {

		id: null,
		versao: null,
		codigoDesconto: null,
		percentualDesconto: null,
        valorDesconto: null,
        valorMinimoPedidoPermitido: null,
        quantidadeMaximaUso:null,
        inicioVigencia: null,
        fimVigencia: null
   
	}

	salvar = () => {

		let cupomRequest = {

			id: this.state.id,
			versao: this.state.versao,
			codigoDesconto: this.state.codigoDesconto,
            percentualDesconto:this.state.percentualDesconto,
			valorDesconto: this.state.valorDesconto,
			valorMinimoPedidoPermitido: this.state.valorMinimoPedidoPermitido,
            quantidadeMaximaUso: this.state.quantidadeMaximaUso,
            inicioVigencia: this.state.inicioVigencia,
            fimVigencia: this.state. fimVigencia

		}
	
		axios.post("http://localhost:8082/api/cupomDesconto", cupomRequest)
		.then((response) => {
			console.log('Cupom de Desconto cadastrado com sucesso.')
		})
		.catch((error) => {
			console.log('Erro ao incluir o um Cupom de Desconto.')
		})
	}
 

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Cupons de Desconto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

                                    <Form.Input
                                        required
										fluid
										label='Código do Produto'>
										<InputMask 
										width={10}
										value={this.state.codigoDesconto}
										onChange={e => this.setState({codigoDesconto: e.target.value})}
										>   
                                    </InputMask>
                                    </Form.Input>

                                    <Form.Input
                                        required
										fluid
										label='Percentual do Desconto'
                                        width={6}
										value={this.state.percentualDesconto}
										onChange={e => this.setState({percentualDesconto: e.target.value})} 
										>
									</Form.Input>
                                    
                                    <Form.Input
                                        required
										fluid
										label='Valor do Desconto'
                                        width={6}
										value={this.state.valorDesconto}
										onChange={e => this.setState({valorDesconto: e.target.value})} 
										>
									</Form.Input>

								</Form.Group>
								
								<Form.Group>

                                <Form.Input
                                        required
										fluid
										label='Valor Mínimo de Compra'
                                        width={10}
										value={this.state.valorMinimoPedidoPermitidoo}
										onChange={e => this.setState({valorMinimoPedidoPermitido: e.target.value})} 
										>
								</Form.Input>

                                <Form.Input
                                        fluid
                                        label='Quantidade Máxima de Uso'
                                        width={10}
										value={this.state. quantidadeMaximaUso}
										onChange={e => this.setState({quantidadeMaximaUso: e.target.value})} 
										>
                                    </Form.Input>
                                    </Form.Group>

                                   <Form.Group>
                                    <Form.Input
                                        fluid
                                        label='Inicio da Vigência do Código'
                                        width={6}
                                    >
                                        <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
										value={this.state. inicioVigencia}
										onChange={e => this.setState({ inicioVigencia: e.target.value})} 
                                        /> 
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Fim da Vigência do Código'
                                        width={6}
                                    >
                                        <InputMask 
                                        mask="99/99/9999" 
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
										value={this.state. fimVigencia}
										onChange={e => this.setState({fimVigencia: e.target.value})} 
                                        /> 
                                    </Form.Input>

								</Form.Group>

								<Form.Group widths='equal' style={{marginTop: '4%'}}  className='form--empresa-salvar'>

									<Button
										type="button"
										inverted
										circular
										icon
										labelPosition='left'
										color='orange'
										onClick={this.listar}
										>
										<Icon name='reply' />
										<Link to={'/list-cupomDesconto'}>Voltar</Link>
									</Button>

									<Container textAlign='right'>
										
										<Button
											inverted
											circular
											icon
											labelPosition='left'
											color='blue'
											floated='right'
											onClick={this.salvar}
										>
											<Icon name='save' />
											Salvar
										</Button>
										
									</Container>

								</Form.Group>

							</Form>
						</div>
                    </Container>
                </div>
			</div>
		)
	}
}

export default FormCupom;