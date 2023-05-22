import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormEntregador from './views/Entregador/FormEntregador';
import ListEntregador from './views/Entregador/ListEntregador';
import FormMaterial from './views/Material/FormMaterial';
import ListMaterial from './views/Material/ListMaterial';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormCupom from './views/cupomDesconto/FormCupom';
import ListCupom from './views/cupomDesconto/ListCupom';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';


function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="list-Produto" element={ <ListProduto/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-Entregador" element={ <ListEntregador/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-Material" element={ <ListMaterial/> } />
                <Route path="form-Material" element={ <FormMaterial/> } />
                <Route path="list-Cupom" element={ <ListCupom/> } />
                <Route path="form-Cupom" element={ <FormCupom/> } />

                
            </Routes>
        </>
    )
}

export default Rotas
