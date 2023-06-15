import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { ENDERECO_API } from '../../util/ENDERECO_API';

export default function FormEntregador() {
    const [idEntregador, setIdEntregador] = useState();
	const [nome, setNome] = useState();
	const [cpf, setCpf] = useState();
	const [rg, setRg] = useState();
	const [dataNascimento, setDataNascimento] = useState();
	const [foneCelular, setFoneCelular] = useState();
	const [foneFixo, setFoneFixo] = useState();
	const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
	const [valorFrete, setValorFrete] = useState();
	const [enderecoRua, setEnderecoRua] = useState();
	const [enderecoNumero, setEnderecoNumero] = useState();
	const [enderecoBairro, setEnderecoBairro] = useState();
	const [enderecoCidade, setEnderecoCidade] = useState();
	const [ enderecoCep, setEnderecoCep] = useState();
	const [enderecoUf, setEnderecoUf] = useState();
	const [enderecoComplemento, setEnderecoComplemento] = useState();
	const [ativo, setAtivo] = useState();


	const { state } = useLocation();
	useEffect(() => {
		if (state != null && state.id != null) {
			axios.get(ENDERECO_API + "api/Entregador/" + state.id)
				.then((response) => {
					setIdEntregador(response.data.id)
					setNome(response.data.nome)
					setCpf(response.data.cpf)
					setRg(response.data.rg)
					setDataNascimento(formatarData(response.data.dataNascimento))
					setFoneCelular(response.data.foneCelular)
					setFoneFixo(response.data.foneFixo)
					setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
	                setValorFrete(response.data.valorFrete)
					setEnderecoRua(response.data.enderecoRua)
	                setEnderecoNumero(response.data.enderecoNumero)
		            setEnderecoBairro(response.data.enderecoBairro)
	                setEnderecoCidade(response.data.enderecoCidade)
	                setEnderecoCep(response.data.enderecoCep)
	                setEnderecoUf(response.data.enderecoUf)
					setEnderecoComplemento(response.data.enderecoComplemento)
	                setAtivo(response.data.ativo)
				})
		}
	},[state])

	 function salvar() {

		let EntregadorRequest = {
			        nome:nome,
					cpf:cpf,
					dataNascimento: dataNascimento ,
					foneCelular :foneCelular,
					foneFixo :foneFixo,
					qtdEntregasRealizadas: qtdEntregasRealizadas,
	                valorFrete: valorFrete,
					enderecoRua :enderecoRua,
	                enderecoNumero:enderecoNumero,
		            enderecoBairro : enderecoBairro,
	                enderecoCidade : enderecoCidade,
	                enderecoCep : enderecoCep,
	                enderecoUf:enderecoUf,
					enderecoComplemento: enderecoComplemento,
	                ativo: ativo
					
				}
		}

		if (idEntregador != null) { //Alteração:
			axios.put(ENDERECO_API + "api/entregador/" + idEntregador, <EntregadorRequest></EntregadorRequest>)
			.then((response) => { console.log('Entregador alterado com sucesso.') })
			.catch((error) => { console.log('Erro ao alterar um Entregador.') })
		} else { //Cadastro:
			axios.post(ENDERECO_API + "api/entregador", <EntregadorRequest></EntregadorRequest>)
			.then((response) => { console.log('Entregador cadastrado com sucesso.') })
			.catch((error) => { console.log('Erro ao incluir o entregador.') })
		} 

	function formatarData(dataParam) {

        if (dataParam == null || dataParam == '') {
            return ''
        }

        let dia = dataParam.substr(8, 2);
        let mes = dataParam.substr(5, 2);
        let ano = dataParam.substr(0, 4);
        let dataFormatada = dia + '/' + mes + '/' + ano;

        return dataFormatada
    };


const countryOptions = [
    { key: 'bh', value: 'bh', text: 'BH' },
    { key: 'pe', value: 'pe', text: 'PE' },
]


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
										value={nome}
									    onChange={e => setNome(e.target.value)}
									/>

									<Form.Input
										fluid
										label='CPF'>
										<InputMask 
										mask="999.999.999-99"
										value={cpf}
			                            onChange={e => this.setCpf(e.target.value)}
                                    /> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='RG'>
										<InputMask 
										mask="9.999.999"
										value={rg}
		                             	onChange={e => this.setRg(e.target.value)}
                                  /> 
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
											value={dataNascimento}
			                                onChange={e => this.setDataNascimento(e.target.value)}
                                        /> 
                                    </Form.Input>

									<Form.Input
										fluid
										label='Fone Celular'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999" 
										value={foneCelular}
			                            onChange={e => this.setFoneCelular( e.target.value)}
										/> 
									</Form.Input>

									<Form.Input
										fluid
										label='Fone Fixo'
                                        width={6}>
										<InputMask 
										mask="(99) 9999.9999"
										value={foneFixo}
			                            onChange={e => this.setFoneFixo(e.target.value)} /> 
									</Form.Input>

                                    <Form.Input
										fluid
										label='Quantidade de Entregas Realizadas'
                                        width={6}
										value={qtdEntregasRealizadas}
			                            onChange={e => this.setQtdEntregasRealizadas(e.target.value)}>
									</Form.Input>

                                    <Form.Input
										fluid
										label='Valor por Frete'
                                        width={3}
											value={valorFrete}
			                                onChange={e => this.setValorFrete(e.target.value)}>
									</Form.Input>
								</Form.Group>

                                <Form.Group>
									<Form.Input
										fluid
										label='Rua'
                                        width={14}
										value={enderecoRua}
			                            onChange={e => this.setEnderecoRua(e.target.value)}>
									</Form.Input>

									<Form.Input
										fluid
										label='Número'
                                        width={4}
										value={enderecoNumero}
			                            onChange={e => this.setEnderecoNumero(e.target.value)}>
									</Form.Input>
								</Form.Group>

                                <Form.Group>
									<Form.Input
										fluid
										label='Bairro'
                                        width={10}
									    value={enderecoBairro}
			                            onChange={e => this.setEnderecoBairro(e.target.value)}>
									</Form.Input>

                                    <Form.Input
										fluid
										label='Cidade'
                                        width={10}
										value={enderecoCidade}
			                            onChange={e => this.setEnderecoCidade( e.target.value)}>
									</Form.Input>

									<Form.Input
										fluid
										label='CEP'
                                        width={10}
											value={this.state.enderecoCep}
			                                onChange={e => this.setEnderecoCep( e.target.value)}>
									</Form.Input>
								</Form.Group>

								<Form.Group widths='equal'>

									<Form.Select
									label='UF'
									placeholder='Selecione' 
									fluid 
									options={countryOptions}
									value={enderecoUf}
									onChange={(e, {value}) => {
										this.setEnderecoUf({value})
									}}
									/>

									</Form.Group>	

								<Form.Group widths='equal'>
									<Form.Input
										fluid
										label='Complemento'
										value={enderecoComplemento}
			                            onChange={e => this.setEnderecoComplemento( e.target.value)}>
									</Form.Input>
								</Form.Group>

								<Form.Group inline>
								<label>Ativo: </label>
								<Form.Field
									label='Sim'
									control='input'
									type='radio'
									name='htmlRadios'
									value={ativo}
			                        onChange={e => this.setAtivo(e.target.value)}
								/>
								<Form.Field
									label='Não'
									control='input'
									type='radio'
									name='htmlRadios'
									value={this.state.ativo}
			                        onChange={e => this.setState({ativo: e.target.value})}
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
										<Link to={'/list-Entregador'}>Voltar</Link>

									</Button>

									<Container textAlign='right'>
										
									<Button
										inverted
										circular
										icon
										labelPosition='left'
										color='blue'
										floated='right'
										onClick={() => salvar()}
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