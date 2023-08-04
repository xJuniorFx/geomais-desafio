import React, { useRef, useState, useEffect } from "react";
import {
  ColumnType,
  FilterConfirmProps,
  TablePaginationConfig,
} from "antd/es/table/interface";
import {
  Input,
  Button,
  Space,
  Table,
  Form,
  InputNumber,
  Typography,
  Popconfirm,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd/lib/input";
import { Cliente } from "./Cliente";
import {
  EditableCellProps,
  EditableColumnType,
  EditableCell,
} from "./EditableCell";

interface ClienteUpdate {
  id: number;
  nome?: string;
  cpf?: string;
  rg?: string;
  data_nasc?: string;
  sexo?: string;
}

type DataIndex = keyof Cliente;

const Tabela = () => {
  /*
  Estados para gerenciar: 
  Dados da tabela
  Indicar se os dados foram carregados
  Gerenciar os dados das celulas da tabela
  */
  const [data, setData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Função para formatar a data no formato "dd-mm-yyyy"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Função para buscar os dados do servidor
  const fetchData = async () => {
    try {
      setLoading(true); // Inicia o carregamento
      const response = await fetch("http://localhost:3000/api/v1/clientes/");
      if (!response.ok) {
        throw new Error("Erro ao carregar dados dos clientes");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false); // Finaliza o carregamento
    } catch (error) {
      console.error(error);
      setLoading(false); // Finaliza o carregamento em caso de erro
    }
  };

  // Busca os dados quando o componente é montado
  useEffect(() => {
    fetchData();
  }, []);

  // Estados para lidar com a funcionalidade de busca na tabela
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [editingKey, setEditingKey] = useState("");

  // Verifica se uma linha está sendo editada no momento
  const isEditing = (record: Cliente) => record.id.toString() === editingKey;

  /// Função para iniciar a edição de uma linha
  const edit = (record: Partial<Cliente> & { id: React.Key }) => {
    form.setFieldsValue({
      nome: "",
      cpf: "",
      rg: "",
      data_nasc: "",
      seco: "",
      ...record,
    });
    setEditingKey(record.id.toString());
  };

  // Função para deletar um cliente
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/clientes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Client deleted successfully!");
        fetchData(); // Fetch updated data after successful delete
        setEditingKey("");
      } else {
        console.log("Failed to delete client:", response);
        fetchData();
        setEditingKey("");
      }
    } catch (error) {
      console.error("Error while deleting client:", error);
      fetchData();
      setEditingKey("");
    }
  };

  // Função para salvar as alterações feitas em um cliente
  const handleSave = async (values: ClienteUpdate, id: number) => {
    try {
      // Extraia o 'id' e o restante dos campos do objeto 'values'
      const { ...record } = values;

      const response = await fetch(
        `http://localhost:3000/api/v1/clientes/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record), // Use apenas os campos atualizados
        }
      );

      // Verifique se a requisição foi bem-sucedida
      if (response.ok) {
        console.log("Client updated successfully!");
        fetchData(); // Atualize os dados após a atualização bem-sucedida
      } else {
        console.log("Failed to update client:", response);
      }
    } catch (error) {
      console.error("Error while updating client:", error);
    }
  };

  // Função para cancelar a edição
  const cancel = () => {
    setEditingKey("");
  };

  // Atualize a função 'save' para usar a função 'handleSave' que atualiza os dados no servidor
  const save = async (id: number) => {
    try {
      const row = (await form.validateFields()) as Cliente;

      // Chame a função 'handleSave' para enviar as alterações para o servidor
      await handleSave(row, id);

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Erro na validação:", errInfo);
    }
  };

  // Referência para o input de busca
  const searchInput = useRef<InputRef>(null);
  // Estado para controlar a página atual da tabela
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Estado para controlar a quantidade de clientes por página
  const clientsPerPage = 15;

  // Função para lidar com a busca em uma coluna específica
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Função para lidar com a mudança de paginação na tabela
  const handleTableChange = (pagination: TablePaginationConfig) => {
    // Atualizar o estado da página atual
    setCurrentPage(pagination.current || 1);
  };

  // Função para resetar os filtros de busca
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  // Função que retorna uma coluna personalizada para a tabela com funcionalidade de busca
  const columnSearch = (dataIndex: DataIndex): ColumnType<Cliente> => ({
    // Configuração do filtro de busca personalizado
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      // Componente para o filtro de busca
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    // Ícone que indica se o filtro de busca está ativo ou não
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    // Função de filtro para realizar a busca nos registros da tabela
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    // Função para abrir o menu de busca e selecionar o campo de busca quando ele é aberto
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // Função de renderização para destacar o texto pesquisado no resultado da busca
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Defina as colunas personalizadas para a tabela de clientes
  const columns: EditableColumnType<Cliente>[] = [
    // Coluna para o 'Nome'
    {
      title: "Nome",
      dataIndex: "nome",
      width: "100",
      filterMultiple: false, // Permite apenas uma única seleção no filtro
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Função personalizada para ordenar por 'nome'
      sortDirections: ["ascend", "descend"], // Métodos de ordenação disponíveis para essa coluna
      ...columnSearch("nome"), // Configurações do filtro de busca personalizado
      onCell: (record) => ({
        key: record.id,
        record,
        pattern: /^[A-Za-z]{2}/,
        inputType: "text",
        dataIndex: "nome",
        title: "Nome",
        editing: isEditing(record), // Define se a célula está em modo de edição
      }),
    },
    // Coluna para o 'CPF'
    {
      title: "CPF",
      dataIndex: "cpf",
      width: "100",
      ...columnSearch("cpf"), // Configurações do filtro de busca personalizado
      onCell: (record) => ({
        key: record.id,
        record,
        inputType: "text",
        dataIndex: "cpf",
        title: "CPF",
        editing: isEditing(record), // Define se a célula está em modo de edição
      }),
    },
    // Coluna para o 'RG'
    {
      title: "RG",
      dataIndex: "rg",
      width: "100",
      ...columnSearch("rg"), // Configurações do filtro de busca personalizado
      onCell: (record) => ({
        key: record.id,
        record,
        inputType: "text",
        dataIndex: "rg",
        title: "RG",
        editing: isEditing(record), // Define se a célula está em modo de edição
      }),
    },
    // Coluna para a 'Data de Nascimento'
    {
      title: "Data de Nascimento",
      dataIndex: "data_nasc",
      width: "100",
      ...columnSearch("data_nasc"), // Configurações do filtro de busca personalizado
      onCell: (record) => ({
        key: record.id,
        record,
        inputType: "date",
        dataIndex: "data_nasc",
        title: "Data de Nascimento",
        editing: isEditing(record), // Define se a célula está em modo de edição
      }),
      render: (dateString) => formatDate(dateString), // Formata a data antes de exibi-la na coluna
    },
    // Coluna para o 'Sexo'
    {
      title: "Sexo",
      dataIndex: "sexo",
      width: "100",
      filters: [
        { text: "Masculino", value: "Masculino" },
        { text: "Feminino", value: "Feminino" },
        { text: "Outro", value: "Outro" },
      ], // Opções de filtro disponíveis
      onFilter: (value, record) => record.sexo === value, // Função de filtro para o campo 'Sexo'
      onCell: (record) => ({
        key: record.id,
        record,
        inputType: "text",
        dataIndex: "sexo",
        title: "Sexo",
        editing: isEditing(record), // Define se a célula está em modo de edição
      }),
    },
    // Coluna de operações (Salvar, Editar, Excluir)
    {
      title: "Operação",
      dataIndex: "operation",
      width: "100",
      render: (_: any, record: Cliente) => {
        const editable = isEditing(record);
        return editable ? (
          // Modo de edição: exibe botões 'Salvar', 'Excluir' e 'Cancelar'
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Salvar
            </Typography.Link>
            <Typography.Link
              onClick={() => handleDelete(record.id)}
              style={{ marginRight: 8 }}
            >
              Excluir
            </Typography.Link>
            <Popconfirm
              title="Tem certeza que deseja cancelar?"
              onConfirm={cancel}
            >
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          // Modo de visualização: exibe botão 'Editar'
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Editar
          </Typography.Link>
        );
      },
    },
  ];

  // Mapeia as colunas e ajusta as configurações para suportar edição
  const mergedColumns: ColumnType<Cliente>[] = columns.map((col) =>
    col.editable ? { ...col, onCell: col.onCell! } : col
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={fetchData} loading={loading}>
          Atualizar Tabela
        </Button>
      </Space>
      <Form form={form} component={false}>
        <Table
          scroll={{ x: 1500 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          size="small"
          bordered
          dataSource={data} // Usar o estado 'dados' aqui
          columns={mergedColumns}
          rowClassName="editable-row"
          loading={loading}
          pagination={{
            onChange: cancel,
          }}
          onChange={handleTableChange}
        />
      </Form>
    </>
  );
};

export default Tabela;
