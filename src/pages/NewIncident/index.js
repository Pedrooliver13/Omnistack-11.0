import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "./style.css";

import logoImg from "../../assets/logo.svg";

export default function Incident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem('ongId'); // pegando o id que enviamos quando fiz o login

  const history = useHistory(); // perfeito para mudar de rota quando termina de executar algo;

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      const response = await api.post("incidents/new", data , {
        headers:{
          Authorization: ongId,
        } // conseguio enviar o id como terceiro parametro;
      }); // (rota onde vai acontecer a função, o que eu to enviando;)

      alert("Cadastro efetuado com sucesso" + response.data.id);
      
      history.push('/profile');
    } catch (error) {
      alert("Erro no cadastro;");
    }
  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encotrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valores em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <div className="bottom-group">
            <Link to="/profile" className="bottom-link">
              Cancelar
            </Link>
            <button className="button" type="submit">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
