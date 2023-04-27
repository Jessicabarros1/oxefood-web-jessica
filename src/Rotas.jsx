import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormEntregador from './views/Entregador/FormEntregador';
import ListEntregador from './views/Entregador/ListEntregador';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
               
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-Entregador" element={ <ListEntregador/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
            </Routes>
        </>
    )
}

export default Rotas
