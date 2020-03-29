import React, { useState, useEffect } from "react";
import "./style.css";

import api from "../../services/api";

import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]); //um array vazio pq ele ta pegando diretamente do banco de dados(API);

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(results => {
        // results => vai me retorna todos os casos
        setIncidents(results.data); // aqui vai atualizar
      });
  }, [ongId]); // (qual a função que eu quero exevutar, quando o valor aqui dentro mudar execute denovo)

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id)); // caso o incident id seja diferente

    } catch (err) {
      alert("Erro ao deletar, teste novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear(); // limpar o id e o name salvos;

    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Registrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              {/* no onClick, se eu apenas passar o handleDeleteIncident(incident.id) para ele, vai me retorna a resposta deletando todos os incidents. Para evitar isso,  fiz uma Arrow function para ele executar apenas essa função dentro dele , e não esperar o retorno da função.  */}
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
