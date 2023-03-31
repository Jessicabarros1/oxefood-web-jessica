import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

class FormEntregador extends React.Component{

    render(){
        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Nome'
										maxLength="100"
									/>

									<Form.Input
										fluid
										label='CPF'>
										<InputMask 
										mask="999.999.999-99"/> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='RG'>
										<InputMask 
										mask="9.999.999"/> 
									</Form.Input>

								</Form.Group>
								
								<Form.Group>
                                <Form.Input
                                        fluid
                                        label='Data Nascimento'
                                        width={6}
                                    >
                                        <InputMask 
                                            mask="99/99/9999" 
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
                                        /> 
                                    </Form.Input>

									<Form.Input
										fluid
										label='Fone Celular'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" /> 
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" /> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='Quantidade de Entregas Realizadas'
                                        width={6}>
									</Form.Input>

                                    <Form.Input
										fluid
										label='Valor por Frete'
                                        width={3}>
									</Form.Input>
								</Form.Group>

                                <Form.Group>
									<Form.Input
										fluid
										label='Rua'
                                        width={14}>
									</Form.Input>

									<Form.Input
										fluid
										label='Número'
                                        width={4}>
									</Form.Input>
								</Form.Group>

                                <Form.Group>
									<Form.Input
										fluid
										label='Bairro'
                                        width={10}>
									</Form.Input>

                                    <Form.Input
										fluid
										label='Cidade'
                                        width={10}>
									</Form.Input>

									<Form.Input
										fluid
										label='CEP'
                                        width={10}>
									</Form.Input>
								</Form.Group>

								<Form.Group widths='equal'>
									<Form.Field label='UF' control='select'>
											   <option value='ACRE'>AC</option>
											   <option value='ALAGOAS'>AL</option>
											   <option value='AMAPÁ'>AP</option>
											   <option value='AMAZONAS'>AM</option>
											   <option value='BAHIA'>BA</option>
											   <option value='CEARÁ'>CE</option>
											   <option value='DISTRITO FEDERAL'>PE</option>
											   <option value='PERNAMBUCO'>PE</option>
											   <option value='SERGIPE'>SE</option>
											   <option value='MARANHÃO'>MA</option>
									</Form.Field>
								</Form.Group>	

								<Form.Group widths='equal'>
									<Form.Input
										fluid
										label='Complemento'
                                    >
									</Form.Input>
								</Form.Group>

								<Form.Group inline>
								<label>Ativo: </label>
								<Form.Field
									label='Sim'
									control='input'
									type='radio'
									name='htmlRadios'
								/>
								<Form.Field
									label='Não'
									control='input'
									type='radio'
									name='htmlRadios'
								/>
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
										Voltar
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

export default FormEntregador;