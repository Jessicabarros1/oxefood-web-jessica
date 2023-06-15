import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';
import { ENDERECO_API } from '../../util/ENDERECO_API';

export default function FormProduto() {

	const [idProduto, setIdProduto] = useState();
	const [titulo, setTitulo] = useState();
	const [codigo, setCodigo] = useState();
	const [descricao, setDescricao] = useState();
	const [valorUnitario, setValorUnitario] = useState();
	const [tempodeEntregaMinimoemMinutos, setTempodeEntregaMinimoemMinutos] = useState();
	const [tempodeEntregaMaximoemMinutos, setTempodeEntregaMaximoemMinutos] = useState();

	const { state } = useLocation();
	useEffect(() => {
		if (state != null && state.id != null) {
			axios.get(ENDERECO_API + "api/Produto/" + state.id)
				.then((response) => {
					setIdProduto(response.data.titulo)
					setTitulo(response.data.codigo)
					setCodigo(response.data.descricao)
					setValorUnitario(response.data.valorUnitario)
					setTempodeEntregaMinimoemMinutos(response.data.tempodeEntregaMinimoemMinutos)
					setTempodeEntregaMaximoemMinutos(response.data.tempodeEntregaMaximoemMinutos)
				})
		}
	},[state])


	function salvar() {

		let ProdutoRequest = {
			titulo: titulo,
			codigo: codigo,
			descricao: descricao,
			valorUnitario: valorUnitario,
			tempodeEntregaMinimo: tempodeEntregaMinimoemMinutos,
			tempodeEntregaMaximo: tempodeEntregaMaximoemMinutos
		}

		if (idProduto != null) { //Alteração:
			axios.put(ENDERECO_API + "api/Produto/" + idProduto, ProdutoRequest)
			.then((response) => { console.log('Produto alterado com sucesso.') })
			.catch((error) => { console.log('Erro ao alterar um Produto.') })
		} else { //Cadastro:
			axios.post(ENDERECO_API + "api/Produto", ProdutoRequest)
			.then((response) => { console.log('Produto cadastrado com sucesso.') })
			.catch((error) => { console.log('Erro ao incluir o Produto.') })
		} 
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


        return(
            <div>

                <div style={{marginTop: '3%'}}>

                    <Container textAlign='justified' >

                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                        <Divider />

						<div style={{marginTop: '4%'}}>

							<Form>

								<Form.Group widths='equal'>

									<Form.Input
										required
										fluid
										label='Titulo'
										maxLength="100"
										value={titulo}
										onChange={e => setTitulo(e.target.value)}  
									/>

									<Form.Input
                                        required
										fluid
										label='Código do Produto'>
										<InputMask 
										width={8}
										value={codigo}
										onChange={e => setCodigo(e.target.value)}
										>   
                                        </InputMask>

									</Form.Input>

								</Form.Group>
								
                                   <Form.Field
                                         id='form-textarea-control-Descricao'
                                         control={TextArea}
                                         label='Descrição'
                                         placeholder='Descreva o Produto'
										value={descricao}
										onChange={e =>setDescricao(e.target.value)} 
                                    />
                    
                                <Form.Group>
									<Form.Input
                                        required
										fluid
										label='Valor Unitário'
                                        width={6}
										value={valorUnitario}
										onChange={e =>setValorUnitario(e.target.value)} 
										>
									</Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Mínimo em Minutos'
                                        width={6}
										value={tempodeEntregaMinimoemMinutos}
										onChange={e => setTempodeEntregaMinimoemMinutos(e.target.value)} 
										>
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Tempo de Entrega Maximo em Minutos'
                                        width={6}
										value={tempodeEntregaMaximoemMinutos}
										onChange={e => setTempodeEntregaMaximoemMinutos(e.target.value)}
										>
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
			
										>
										<Icon name='reply' />
										<Link to={'/list-Produto'}> Voltar</Link>

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
