import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Browser == ele precisa estár em volta para que o roteamento funcione;
//Route == é cada uma das rotas;
//Switch == ele garante que execute uma rota por vez;

//as rotas em si
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from './pages/NewIncident'

//no react, ele não analisa todo o path, ele ve se o começo bate;
//portanto quando começa com '/' ele já redeniza a primeira rota;
//então usaremos o exact para que ele entenda que só redenize se rota for exatamente essa;
//em path, é a escolha do caminho(rota);

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}
