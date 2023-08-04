const pool = require("../../db");
const queries = require("./queries");

const getClients = (req, res) => {
  pool.query(queries.getClients, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getClientById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getClientById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addClient = (req, res) => {
  const { nome, cpf, rg, data_nasc, sexo } = req.body;
  // Verifica se o CPF já existe na tabela
  pool.query(queries.checkCpfExist, [cpf], (error, cpfResults) => {
    if (cpfResults.rows.length > 0) {
      return res.status(400).send("CPF já existe.");
    }
    if (error) {
      return res.status(500).send("Erro ao verificar CPF.");
    }
  });
  // Verifica se o RG já existe na tabela
  pool.query(queries.checkRgExist, [rg], (error, rgResults) => {
    if (rgResults.rows.length > 0) {
      return res.status(400).send("RG já existe.");
    }
    if (error) {
      return res.status(500).send("Erro ao verificar RG.");
    }
  });
  pool.query(
    queries.addClient,
    [nome, cpf, rg, data_nasc, sexo],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Cliente adicionado com sucesso!");
    }
  );
};

const deleteClient = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getClientById, [id], (error, results) => {
    const noClientsFound = !results.rows.length;
    if (noClientsFound) {
      res.send("Cliente não existe");
    }
    pool.query(queries.deleteClient, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Cliente removido com sucesso");
    });
  });
};

const updateClientHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, cpf, rg, data_nasc, sexo } = req.body;

  pool.query(queries.getClientById, [id], (error, results) => {
    const noClientsFound = !results.rows.length;
    if (noClientsFound) {
      res.send("Cliente não encontrado");
    }

    // Array para armazenar as promises de atualização
    const updatePromises = [];

    // Atualize os campos fornecidos
    if (nome) {
      updatePromises.push(pool.query(queries.updateClientNome, [nome, id]));
    }

    if (cpf) {
      updatePromises.push(pool.query(queries.updateClientCpf, [cpf, id]));
    }

    if (rg) {
      updatePromises.push(pool.query(queries.updateClientRg, [rg, id]));
    }

    if (data_nasc) {
      updatePromises.push(
        pool.query(queries.updateClientDataNasc, [data_nasc, id])
      );
    }

    if (sexo) {
      updatePromises.push(pool.query(queries.updateClientSexo, [sexo, id]));
    }

    // Aguarde todas as atualizações serem concluídas antes de enviar a resposta
    Promise.all(updatePromises)
      .then(() => {
        res.status(200).send("Cliente atualizado com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Erro ao atualizar cliente.");
      });
  });
};

module.exports = {
  getClients,
  getClientById,
  addClient,
  deleteClient,
  updateClientHandler,
};
