// Campos vazios tratados via HTML5 com os comandos
//required="required"
//class="required"

import React, { useState, useEffect } from "react";
import "./styles.css";

function Home() {
  const [ patrimonio, setPatrimonio ] = useState('')
  const [ numero, setNumero ] = useState('')
  const [ descricao, setDescricao ] = useState('')
  const [ tipo, setTipo ] = useState('')
  const [ clients, setClients ] = useState([])

  function handleAddClient(event) {
    event.preventDefault();
    const data = {
      //if (newSkill === '' || newTimeExperience === '') {
      // alert ('Favor preencher o campo que está vazio')
      //  return
      //}
      id: new Date().getTime(),
      patrimonio,
      numero,
      descricao,
      tipo
    }
    console.log(data)

    setClients([...clients, data])
    setPatrimonio('')
    setNumero('')
    setDescricao('')
    setTipo('')
  }

  function handleDelete(id) {
    setClients(clients.filter(client => client.id !== id))
  }
  
  useEffect(() => {
    function loadData() {
      const storagedclients = localStorage.getItem('@cadclients.clients')
      if (storagedclients) {
        setClients(JSON.parse(storagedclients))
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    function saveData() {
      localStorage.setItem('@cadclients: clients', JSON.stringify(clients))
    }
   saveData()
  }, [clients])

  return (
    <div className='page'>

        <h1>Cadastrar Equipamentos de TI</h1>

      <form className='cadastro' onSubmit={handleAddClient}>
        <input
          name='patrimonio'
          placeholder='Código do Patrimonio'
          required="required"
          class="required"
          type='text'
          value={patrimonio}
          onChange={(event) => setPatrimonio(event.target.value)}
        />
        <input
          name='numero'
          type='text'
          placeholder='Número de série'
          required="required"
          class="required"
          value={numero}
          onChange={(event) => setNumero(event.target.value)}
        />
        <input
          name='descricao'
          type='text'
          placeholder='Descrição do produto'
          required="required"
          class="required"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        />
        <input
          name='tipo'
          type='text'
          placeholder='Tipo de equipamento'
          required="required"
          class="required"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        />
        <button type='submit'>Enviar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Código do Patrimonio</th>
            <th>Número de Série</th>
            <th>Descrição do Produto</th>
            <th>Tipo do Produto</th>
            <th colSpan={1}>Ações</th>
          </tr>
        </thead>
        <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td class="count"></td>
            <td>{client.patrimonio}</td>
            <td>{client.numero}</td>
            <td>{client.descricao}</td>
            <td>{client.tipo}</td>
            <td>
              <button
              className='Excluir'
              onClick={() => handleDelete(client.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
