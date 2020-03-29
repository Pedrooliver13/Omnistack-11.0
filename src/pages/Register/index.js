import React, { useState } from "react";
import "./style.css";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg"; // logo

export default function Register() {
  const [name, setName] = useState(""); // como é do tipo texto seu valor inicial é de ''(vazio do tipo string);
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault(); // vai previnir de a pag atualizar desnecessáriamente;

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const res = await api.post("ongs", data);

      alert(`Seu id de cadastro é: ${res.data.id}`);

      history.push('/'); // faz navegação , funciona como uma tag <Link> , mas, é usado quando o link não pode ser usado;
    } catch (err) {
      alert(`Erro no cadastro.`);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="be the hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          {/* input padrão já é do type="text" */}
          <input
            placeholder="Nome da ONG"
            value={name} /* valor digitado */
            onChange={e => setName(e.target.value)} /* aqui passamos o valor digitado para a setName(que vai ser responsável por 'enviar' o value) */
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} /* e == event */
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              value={uf}
              onChange={e => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>
          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
