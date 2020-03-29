import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";
// api, que faz a ligação com o back-end;
import api from "../../services/api";

//images;
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

//icon;
import { FiLogIn } from "react-icons/fi"; // usando icons de uma biblioteca(no caso estamos desestruturando)

//usando enviando o html dentro do javacript;
export default function Logon() {
  // jsx
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault(); // sempre usamos isso no react para ele não atualizar a pág;

    try {
      const res = await api.post("sessions", { id });

      localStorage.setItem("ongId", id); // setItem(dando um nome, valor); 
      localStorage.setItem("ongName", res.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Erro");
    }
  }

  return (
    <div className="logon__container">
      <section className="form">
        <img src={logoImg} alt="" />

        <form onSubmit={handleLogin}>
          <h1>Faça Logon</h1>

          <input
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            {/* podemon alterar o tamanho e cor do icon */}
            Não sou cadastrado
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
