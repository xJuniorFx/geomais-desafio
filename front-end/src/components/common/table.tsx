import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import { ColumnsType, FilterValue, SorterResult, TablePaginationConfig, TableCurrentDataSource } from 'antd/es/table/interface';
import jsonData from './db.json';

// Interface para tipagem dos dados dos clientes
interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  data_nasc: string;
  sexo: string;
}

const Tabela: React.FC = () => {
  // Estado para armazenar os dados dos clientes
  const [data, setData] = useState<Cliente[]>(jsonData.Clientes);

  // Estados para armazenar os filtros aplicados em cada coluna
  const [nomeFilter, setNomeFilter] = useState<FilterValue | null>(null);
  const [cpfFilter, setCpfFilter] = useState<FilterValue | null>(null);
  const [rgFilter, setRgFilter] = useState<FilterValue | null>(null);
  const [dataNascFilter, setDataNascFilter] = useState<FilterValue | null>(null);

  // Estado para controlar a página atual da tabela
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Estado para controlar a quantidade de clientes por página
  const clientsPerPage = 15;

  // Carregar os dados iniciais na tabela
  useEffect(() => {
    setData(jsonData.Clientes);
  }, []);

  // Função para lidar com as mudanças na tabela (filtro, ordenação, etc.)
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Cliente> | SorterResult<Cliente>[],
    extra: TableCurrentDataSource<Cliente>
  ) => {
    console.log('Filtros:', filters);
    console.log('Ordenação:', sorter);

    // Atualizar o estado da página atual
    setCurrentPage(pagination.current || 1);

    // Se nenhum filtro estiver aplicado, mostrar todos os dados
    if (Object.keys(filters).length === 0) {
      setData(jsonData.Clientes);
      return;
    }

    // Filtrar os dados com base nos filtros aplicados
    const filteredData = jsonData.Clientes.filter((item) => {
      let isMatch = true;
      for (const columnKey in filters) {
        const filterValue = filters[columnKey] as string[] | null;

        if (filterValue !== null) {
          // Tratamento de erro para filtro de letras e números
          if (columnKey === 'nome' || columnKey === 'cpf' || columnKey === 'rg') {
            // Converter o filtro para letras minúsculas e remover caracteres especiais
            const filtroSanitizado = filterValue[0].toLowerCase().replace(/[^a-z0-9]/g, '');
            // Converter o valor do item para letras minúsculas e remover caracteres especiais
            const valorItemSanitizado = item[columnKey].toLowerCase().replace(/[^a-z0-9]/g, '');

            // Verificar se o filtro corresponde a parte do valor do item
            isMatch = isMatch && valorItemSanitizado.includes(filtroSanitizado);
          } else if (columnKey === 'data_nasc') {
            // Tratamento de erro para filtro de data
            isMatch = isMatch && item[columnKey].startsWith(filterValue[0]);
          } else {
            // Para outros filtros, verificar se o valor do filtro está no array de valores do item
            isMatch = isMatch && filterValue.includes((item as any)[columnKey]);
          }
        }
      }
      return isMatch;
    });

    setData(filteredData);
  };

  // Função para limpar todos os filtros e pesquisas
  const clearAll = () => {
    setNomeFilter(null);
    setCpfFilter(null);
    setRgFilter(null);
    setDataNascFilter(null);

    setData(jsonData.Clientes);
  };



  // Configuração das colunas da tabela
  const columns: ColumnsType<Cliente> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      width: '15%',
      filterMultiple: false,
      sorter: (a, b) => a.nome.localeCompare(b.nome), // Função personalizada para ordenar por 'nome'
      sortDirections: ['ascend', 'descend'], // Métodos de ordenação disponíveis para essa coluna
      // Filtro de busca personalizado para a coluna 'nome'
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar por Nome"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90 }}>
              Buscar
            </Button>
            <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
              Limpar
            </Button>
          </Space>
        </div>
      ),
      filteredValue: nomeFilter,
      // Limpar o filtro quando o menu do filtro é fechado
      onFilterDropdownOpenChange: (open) => {
        if (!open) {
          setNomeFilter(null);
        }
      },
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      width: '15%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar por CPF"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
              Limpar
            </Button>
          </Space>
        </div>
      ),
      filteredValue: cpfFilter,
      // Limpar o filtro quando o menu do filtro é fechado
      onFilterDropdownVisibleChange: (visible) => {
        if (!visible) {
          setCpfFilter(null);
        }
      },
    },
    {
      title: 'RG',
      dataIndex: 'rg',
      width: '15%',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar por RG"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
              Limpar
            </Button>
          </Space>
        </div>
      ),
      filteredValue: rgFilter,
      onFilterDropdownVisibleChange: (visible) => {
        if (!visible) {
          setRgFilter(null);
        }
      },
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'data_nasc',
      width: '15%',
      // Filtrar por pesquisa na coluna de data
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="dd/mm/yyyy"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 90 }}>
              Buscar
            </Button>
            <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
              Limpar
            </Button>
          </Space>
        </div>
      ),
      filteredValue: dataNascFilter,
      onFilterDropdownVisibleChange: (visible) => {
        if (!visible) {
          setDataNascFilter(null);
        }
      },
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      width: '15%',
      filters: [
        { text: 'Masculino', value: 'Masculino' },
        { text: 'Feminino', value: 'Feminino' },
        { text: 'Outro', value: 'Outro' },
      ],
      onFilter: (value, record) => record.sexo === value,
    },
  ];

  return (
    <>
      <Button style={{ marginBottom: '12px' }} onClick={clearAll}>Limpar Filtros</Button>
      <Table
        bordered
        dataSource={data.map((item) => ({ ...item, key: item.id.toString() }))}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          current: currentPage,
          pageSize: clientsPerPage,
          total: data.length,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
        style={{ fontSize: '14px' }}
      />
    </>
  );
};

export default Tabela;







