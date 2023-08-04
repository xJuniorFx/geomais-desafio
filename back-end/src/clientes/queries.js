const getClients = "SELECT * FROM public.cliente";
const getClientById = "SELECT * FROM public.cliente WHERE id = $1";
const checkCpfExist = "SELECT c FROM public.cliente c WHERE c.cpf = $1";
const checkRgExist = "SELECT c FROM public.cliente c WHERE c.rg = $1";
const addClient =
  "INSERT INTO public.cliente (nome, cpf, rg, data_nasc, sexo) VALUES ($1, $2, $3, $4, $5)";
const deleteClient = "DELETE FROM public.cliente WHERE id = $1";
const updateClientNome = "UPDATE public.cliente SET nome = $1 WHERE id = $2";
const updateClientCpf = "UPDATE public.cliente SET cpf = $1 WHERE id = $2";
const updateClientRg = "UPDATE public.cliente SET rg = $1 WHERE id = $2";
const updateClientDataNasc =
  "UPDATE public.cliente SET data_nasc = $1 WHERE id = $2";
const updateClientSexo = "UPDATE public.cliente SET sexo = $1 WHERE id = $2";

module.exports = {
  getClients,
  getClientById,
  addClient,
  checkCpfExist,
  checkRgExist,
  deleteClient,
  updateClientNome,
  updateClientCpf,
  updateClientRg,
  updateClientDataNasc,
  updateClientSexo,
};
